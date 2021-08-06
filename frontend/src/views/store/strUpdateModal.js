import {
  CButton, CFormGroup,
  CRow,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol, CSwitch
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { DropzoneArea } from 'material-ui-dropzone';
import {convertPhoneNumber} from "../../agent/commonIndex";
import {deleteStr, insertStr, updateStr} from "../../agent/store";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import {getAreaList, getParentKey} from "../../agent/area";

const StrUpdateModal = (props) => {
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
  const API_ROOT = 'http://1.223.40.19:30081/api/';
  // const filePathName = "http://localhost:8081/localImgstore/";
  const filePathName = "http://1.223.40.19:30081/imgstore/";
  let gData = [];
  const { modal, setModal, strContent, fileContent, handleInitTable } = props
  const [onAreaModal, setOnAreaModal] = useState();
  const [initDropZone, setInitDropZone] = useState();
  const [fileList, setFileList] = useState();
  const [deleteFileList, setDeleteFileList] = useState();
  const [appSwitch, setAppSwitch] = useState({
    useYn : false,
  });

  let delFileList = [];
  let storeFileList = [];
  useEffect(async () => {
    appSwitch.useYn = (strContent.useYn === "Y");
    delFileList = [];
    reset(strContent);
  }, [strContent]);

  useEffect(async () => {

    setInitDropZone("");
    if(fileContent !== undefined) {
      await fileContent.map(function(item, idx) {
        const filePath = filePathName + item.areaCode + "/" + item.strCode + "/" + item.imgName + ".png";
        storeFileList.push(filePath);
      })
    }

    if(storeFileList !== []) {
      setFileList(storeFileList);
    }
  }, [fileContent]);

  useEffect(() => {
    setDropZoneArea();
  }, [fileList])



  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
        useYn : 'Y',
        strPosLat: null,
        strPosLon: null,
      }, mode: "all"
    }
  );

  const onSubmit = (data, e) => {
    data.modifyStrCode = data.strCode;
    data.strCode = strContent.strCode;
    data.deleteFileList = deleteFileList;

    console.log(data);
    updateStr(data).then((resp) => {
      if(resp.data["result"] === "duplicate") {
        alert("상점코드가 중복됩니다.");
      } else if(resp.data["result"] === "success") {
        alert("상점 수정을 완료했습니다.");
        closeModal();
        handleInitTable();
      } else {
        alert("상점 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.");
        closeModal();
      }
    })
  };

  const closeModal = async () => {
    await setInitDropZone("");
    setModal(!modal);
    setDeleteFileList([]);
    reset({});
  }

  const setSwitchValue = (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setValue(e.target.id, value);
  }

  const handleChangePhoneNumber = (e) => {
    e = e || window.e;
    let _val = e.target.value.trim();
    e.target.value = convertPhoneNumber(_val) ;
  }

  const nodeClick = async (e, node) => {
    if(gData !== []) {
      await getAreaList().then(function (resp) {
        gData = resp.data["resultList"];
      });
    }

    const parentKey = getParentKey(node.key, gData);
    setValue("levelAreaCode", node["key"]);
    if(parentKey !== undefined) {
      setValue("areaCode", parentKey);
    } else {
      setValue("areaCode", node["key"]);
    }
  }

  const initAreaCode = () => {
    setValue("areaCode", "");
  }

  const handleClickDeleteStore = () => {
    if(window.confirm("상점을 삭제하시겠습니까?")) {
      const strCode = getValues("strCode");
      const areaCode = getValues("areaCode");
      const levelAreaCode = getValues("levelAreaCode");
      const file = getValues("files");
      deleteStr(strCode, areaCode, levelAreaCode, file).then((resp) => {
        if(resp.data["result"] === "success") {
          alert("상점 삭제를 완료했습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("상점 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.");
          closeModal();
        }
      });
    }

  }

  const setDropZoneArea = () => {
    setInitDropZone(
      <DropzoneArea
        initialFiles={fileList}
        acceptedFiles={['image/*']}
        filesLimit={10}
        maxFileSize={1000000}
        dropzoneText={"상점 이미지를 넣어주세요. 최대 10개, 개당 10MB"}
        getFileRemovedMessage={(fileName) => `${fileName} 파일을 삭제했습니다.`}
        getFileLimitExceedMessage={(filesLimit =>  `상점 이미지는 최대 ${filesLimit}개까지 가능합니다.`)}
        getFileAddedMessage={(fileName => `${fileName} 이미지 추가를 완료했습니다.`)}
        getDropRejectMessage={(file, rejectedFile, maxFileSize) => (file.size > maxFileSize) ? `파일의 사이즈가 너무 큽니다. 10MB` : "허용되지 않은 파일입니다."}
        onChange={(files) => {
          setValue("files", files);
        }}
        onDelete={(file) => {
          delFileList.push(file.name);
          setDeleteFileList(delFileList);
        }}
      />
    )
  }

  return (
    <>
      <CModal
        show={modal}
        onClose={() => closeModal()}
        color="info"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader>
          <CModalTitle style={{ color: "#fff" }}>상점 수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="strName">상점코드<span className={"required-span"}> *</span></CLabel>
              <input className={errors.strCode && "is-invalid form-control" || (!errors.strCode && getValues("strCode") !== "") && "form-control is-valid" || (!errors.strCode && getValues("strCode") === "") && "form-control"}
                     {...register("strCode", { required: true, minLength: 20, maxLength: 20})} placeholder={"상점명을 입력해주세요."} />
              {errors.strCode && errors.strCode.type === "required" && <span className={"invalid-feedback"}>상점코드를 입력해주세요.</span>}
              {errors.strCode && errors.strCode.type === "minLength" && <span className={"invalid-feedback"}>상점코드를 20글자 이상으로 입력해주세요.</span>}
              {errors.strCode && errors.strCode.type === "maxLength" && <span className={"invalid-feedback"}>상점코드를 20글자 이하로 입력해주세요.</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="strName">상점명<span className={"required-span"}> *</span></CLabel>
              <input className={errors.strName && "is-invalid form-control" || (!errors.strName && getValues("strName") !== "") && "form-control is-valid" || (!errors.strName && getValues("strName") === "") && "form-control"}
                     {...register("strName", { required: true, minLength: 2, maxLength: 200})} placeholder={"상점명을 입력해주세요."} />
              {errors.strName && errors.strName.type === "required" && <span className={"invalid-feedback"}>상점명을 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "minLength" && <span className={"invalid-feedback"}>상점명을 1글자 이상으로 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "maxLength" && <span className={"invalid-feedback"}>상점명을 200글자 이하로 입력해주세요.</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="areaCode">구역선택<span className={"required-span"}> *</span></CLabel>
              <input className={errors.areaCode && "is-invalid form-control" || (!errors.areaCode && getValues("areaCode") !== "") && "form-control is-valid" || (!errors.areaCode && getValues("areaCode") === "") && "form-control"}
                     {...register("areaCode", { required: true, minLength: 11, maxLength: 11})} placeholder={"구역을 선택해주세요."} onClick={(e) => setOnAreaModal(true)}
                     readOnly={true}
              />
              {errors.areaCode && errors.areaCode.type === "required" && <span className={"invalid-feedback"}>구역코드를 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "minLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이상으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "maxLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이하으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "dupAreaCode" && <span className={"invalid-feedback"}>{errors.areaCode.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strAddr">주소</CLabel>
              <input className={errors.strAddr && "is-invalid form-control" || (!errors.strAddr && getValues("strAddr") !== "") && "form-control is-valid" || (!errors.strAddr && getValues("strAddr") === "") && "form-control"}
                     {...register("strAddr", { minLength: 5, maxLength: 200})} placeholder={"주소를 입력해주세요."} />
              {errors.strAddr && errors.strAddr.type === "minLength" && <span className={"invalid-feedback"}>주소를 5글자 이상으로 입력해주세요.</span>}
              {errors.strAddr && errors.strAddr.type === "maxLength" && <span className={"invalid-feedback"}>주소를 200글자 이하으로 입력해주세요.</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="strTel">전화번호</CLabel>
              <input className={errors.strTel && "is-invalid form-control" || (!errors.strTel && getValues("strTel") !== "") && "form-control is-valid" || (!errors.strTel && getValues("strTel") === "") && "form-control"}
                     onKeyUp={handleChangePhoneNumber} {...register("strTel", { pattern: {value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "전화번호 형식에 맞게 입력해주세요."} })}
                     placeholder={"전화번호를 입력해주세요."}/>
              {errors.strTel && errors.strTel.type === "pattern" && <span className={"invalid-feedback"}>{errors.strTel.message}</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="strOwnTel">휴대폰번호</CLabel>
              <input className={errors.strOwnTel && "is-invalid form-control" || (!errors.strOwnTel && getValues("strOwnTel") !== "") && "form-control is-valid" || (!errors.strOwnTel && getValues("strOwnTel") === "") && "form-control"}
                     onKeyUp={handleChangePhoneNumber} {...register("strOwnTel", { pattern: {value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "휴대폰번호 형식에 맞게 입력해주세요."} })}
                     placeholder={"휴대폰번호를 입력해주세요."} />
              {errors.strOwnTel && errors.strOwnTel.type === "pattern" && <span className={"invalid-feedback"}>{errors.strOwnTel.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="strPosLat">구역위도</CLabel>
              <input className={errors.strPosLat && "is-invalid form-control" || (!errors.strPosLat && getValues("strPosLat") !== null) && "form-control is-valid" || (!errors.strPosLat && getValues("strPosLat") === null) && "form-control"}
                     {...register("strPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.strPosLat && errors.strPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.strPosLat.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strPosLon">구역경도</CLabel>
              <input className={errors.strPosLon && "is-invalid form-control" || (!errors.strPosLon && getValues("strPosLon") !== null) && "form-control is-valid" || (!errors.strPosLon && getValues("strPosLon") === null) && "form-control"}
                     {...register("strPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.strPosLon && errors.strPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.strPosLon.message}</span>}
            </CCol>
          </CFormGroup>
          <CCol md="6">
            <CRow className={"pl-3 pr-3"} style={{marginTop : '2.3rem'}}>
              <CFormGroup className="pr-3 d-inline-flex">
                <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue} defaultChecked/>
              </CFormGroup>
            </CRow>
          </CCol>

          <CRow id={"dropzone"} className={"pl-2 pr-2 mt-4"}>
            {initDropZone}
          </CRow>

        </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color="danger" className={"mr-auto"} onClick={() => handleClickDeleteStore()}>영구삭제</CButton>
              </div>
              <div>
                <CButton className={"mr-2"} color="secondary" onClick={() => closeModal()}>취소</CButton>
                <CButton color="info" type="submit">수정</CButton>
              </div>
            </div>
          </CModalFooter>
      </form>
      </CModal>

      <PageAreaTreeModalWidget onAreaModal={onAreaModal} setOnAreaModal={setOnAreaModal} nodeClick={nodeClick} initAreaCode={initAreaCode} />
    </>
  )
}

export default StrUpdateModal