import { CButton, CFormGroup, CRow, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropzoneArea } from 'material-ui-dropzone';
import { handleValidInputClass, handleChangePhoneNumber, API_ROOT, filePathName } from "../../agent/commonIndex";
import { deleteStr, insertStr, updateStr } from "../../agent/store";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { getAreaList, getParentKey } from "../../agent/area";

const StrUpdateModal = props => {
  let gData = [];

  const { modal, setModal, strContent, fileContent, handleInitTable } = props;
  const [onAreaModal, setOnAreaModal] = useState();
  const [initDropZone, setInitDropZone] = useState();
  const [fileList, setFileList] = useState();
  const [deleteFileList, setDeleteFileList] = useState();
  const [appSwitch, setAppSwitch] = useState({ useYn: false });

  let delFileList = [];
  let storeFileList = [];

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: { useYn: 'Y', strPosLat: null, strPosLon: null }, mode: "all"
    }
  );

  useEffect(async () => {
    appSwitch.useYn = (strContent.useYn === "Y");

    delFileList = [];
    reset(strContent);
  }, [strContent]);

  useEffect(async () => {
    setInitDropZone("");

    if (typeof fileContent !== "undefined") {
      await fileContent.map((item, idx) => {
        const filePath = filePathName + item.areaCode + "/" + item.strCode + "/" + item.imgName + ".png";
        storeFileList.push(filePath);
      });
    }

    if (storeFileList !== [])
      setFileList(storeFileList);
  }, [fileContent]);

  useEffect(() => setDropZoneArea(), [fileList]);

  const setDropZoneArea = () =>
    setInitDropZone(
      <DropzoneArea
        initialFiles={fileList}
        acceptedFiles={['image/*']}
        filesLimit={10}
        maxFileSize={1000000}
        dropzoneText={"상점 이미지를 넣어주세요. 최대 10개, 개당 10MB"}
        getFileRemovedMessage={fileName => `${fileName} 파일을 삭제했습니다.`}
        getFileLimitExceedMessage={filesLimit =>  `상점 이미지는 최대 ${filesLimit}개까지 가능합니다.`}
        getFileAddedMessage={fileName => `${fileName} 이미지 추가를 완료했습니다.`}
        getDropRejectMessage={(file, rejectedFile, maxFileSize) => (file.size > maxFileSize) ? `파일의 사이즈가 너무 큽니다. (10MB)` : "허용되지 않은 파일입니다."}
        onChange={files => setValue("files", files)}
        onDelete={file => {
          delFileList.push(file.name);
          setDeleteFileList(delFileList);
        }} />
    );

  const initAreaCode = () => setValue("areaCode", "");

  const nodeClick = async (e, node) => {
    if (gData !== [])
      await getAreaList().then(resp => gData = resp.data["resultList"]);

    const parentKey = getParentKey(node.key, gData);
    setValue("levelAreaCode", node["key"]);
    setValue("areaCode", (typeof parentKey !== 'undefined') ? parentKey : node["key"]);
  };

  const setSwitchValue = e => setValue(e.target.id, (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value);

  const regOpts = {
      strName: {
          required: { value: true, message: '상점명을 입력해주세요.' }
        , minLength: { value: 2, message: '상점명을 2글자 이상으로 입력해주세요.' }
        , maxLength: { value: 200, message: '상점명을 200글자 이하로 입력해주세요.' }
      }
    , strAddr: {
          minLength: { value: 5, message: '주소를 5글자 이상으로 입력해주세요.' }
        , maxLength: { value: 200, message: '주소를 200글자 이하로 입력해주세요.' }
      }
    , strTel: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "전화번호 형식에 맞게 입력해주세요." } }
    , strOwnTel: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "휴대폰번호 형식에 맞게 입력해주세요." } }
    , strPosLat: { pattern: { value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000" } }
    , strPosLon: { pattern: { value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"} }
  };

  const handleClickDeleteStore = () => {
    if (window.confirm("상점을 삭제하시겠습니까?")) {
      const strCode = getValues("strCode");
      const areaCode = getValues("areaCode");
      const levelAreaCode = getValues("levelAreaCode");
      const file = getValues("files");

      deleteStr(strCode, areaCode, levelAreaCode, file).then(resp => {
        if (resp.data["result"] === "success") {
          alert("상점 삭제를 완료했습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("상점 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.");
          closeModal();
        }
      });
    }
  };

  const onSubmit = (data, e) => {
    if (strContent.strCode === data.strCode) {
      data.modifyStrCode = data.strCode;
      data.strCode = strContent.strCode;
      data.deleteFileList = deleteFileList;

      console.log(data);
      updateStr(data).then(resp => {
        if (resp.data["result"] === "duplicate") {
          alert("상점코드가 중복됩니다.");
        } else if (resp.data["result"] === "success") {
          alert("상점 수정을 완료했습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("상점 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.");
          closeModal();
        }
      })
    } else {
      alert("악의적으로 상점코드가 수정됐습니다. 잠시 후 다시 시도해주세요.");
      return false;
    }
  };

  const closeModal = async () => {
    await setInitDropZone("");
    setModal(!modal);
    setDeleteFileList([]);
    reset({});
  };

  return (
    <>
      <CModal show={modal} onClose={closeModal} color={"info"} size={"lg"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>상점 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"strCode"}>상점코드<span className={"required-span"}> *</span></CLabel>
                <input className={"form-control"} type={"text"} readOnly={true} />
              </CCol>
              <CCol md={"6"}>
                <CLabel htmlFor={"strName"}>상점명<span className={"required-span"}> *</span></CLabel>
                <input className={handleValidInputClass(errors, "strName")} type={"text"} placeholder={"상점명을 입력해주세요."}
                       { ...register("strName", regOpts["strName"]) } />
                { errors.strName && <span className={"invalid-feedback"}>{errors.strName.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"areaCode"}>구역선택<span className={"required-span"}> *</span></CLabel>
                <input className={"form-control"} type={"text"} placeholder={"구역을 선택해주세요."}
                       onClick={e => setOnAreaModal(true)} readOnly={true} />
              </CCol>
              <CCol md={"6"}>
                <CLabel htmlFor={"strAddr"}>주소</CLabel>
                <input className={handleValidInputClass(errors, "strAddr")} type={"text"} placeholder={"주소를 입력해주세요."}
                       { ...register("strAddr", regOpts["strAddr"] )} />
                { errors.strAddr && <span className={"invalid-feedback"}>{errors.strAddr.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"strTel"}>전화번호</CLabel>
                <input className={handleValidInputClass(errors, "strTel")} type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"전화번호를 입력해주세요."}
                       { ...register("strTel",  regOpts["strTel"]) } />
                { errors.strTel && <span className={"invalid-feedback"}>{errors.strTel.message}</span> }
              </CCol>
              <CCol md={"6"}>
                <CLabel htmlFor={"strOwnTel"}>휴대폰번호</CLabel>
                <input className={handleValidInputClass(errors, "strOwnTel")} type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"휴대폰번호를 입력해주세요."}
                       { ...register("strOwnTel", regOpts["strOwnTel"]) } />
                { errors.strOwnTel && <span className={"invalid-feedback"}>{errors.strOwnTel.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"strPosLat"}>구역위도</CLabel>
                <input className={handleValidInputClass(errors, "strPosLat")} type={"text"} placeholder={"구역 위도를 입력해주세요."}
                       { ...register("strPosLat", regOpts["strPosLat"]) } />
                { errors.strPosLat && <span className={"invalid-feedback"}>{errors.strPosLat.message}</span> }
              </CCol>
              <CCol md={"6"}>
                <CLabel htmlFor={"strPosLon"}>구역경도</CLabel>
                <input className={handleValidInputClass(errors, "strPosLon")} type={"text"} placeholder={"구역 경도를 입력해주세요."}
                       { ...register("strPosLon", regOpts["strPosLon"]) } />
                { errors.strPosLon && <span className={"invalid-feedback"}>{errors.strPosLon.message}</span> }
              </CCol>
            </CFormGroup>
            <CCol md={"6"}>
              <CRow className={"pl-3 pr-3"} style={{ marginTop : '2.3rem' }}>
                <CFormGroup className={"pr-3 d-inline-flex"}>
                  <CLabel htmlFor={"useYn"} className={"pr-1"}>사용유무</CLabel>
                  <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue} defaultChecked />
                </CFormGroup>
              </CRow>
            </CCol>
            <CRow id={"dropzone"} className={"pl-2 pr-2 mt-4"}>{initDropZone}</CRow>
          </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color={"danger"} className={"mr-auto"} onClick={handleClickDeleteStore}>삭제</CButton>
              </div>
              <div>
                <CButton className={"mr-2"} color={"secondary"} onClick={closeModal}>취소</CButton>
                <CButton color={"info"} type={"submit"}>수정</CButton>
              </div>
            </div>
          </CModalFooter>
        </form>
      </CModal>

      <PageAreaTreeModalWidget onAreaModal={onAreaModal} setOnAreaModal={setOnAreaModal} nodeClick={nodeClick} initAreaCode={initAreaCode} />
    </>
  );
};

export default StrUpdateModal;
