import { CButton, CFormGroup, CRow, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropzoneArea } from 'material-ui-dropzone';
import { convertPhoneNumber } from "../../agent/commonIndex";
import { insertStr } from "../../agent/store";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { getAreaList, getParentKey } from "../../agent/area";

const StrInsertModal = props => {
  let gData = [];

  const { modal, setModal, handleInitTable } = props;
  const [onAreaModal, setOnAreaModal] = useState();
  const [initDropZone, setInitDropZone] = useState();

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: { useYn: 'Y', strCode: 'FS_STR_0000000000000', strPosLat: null, strPosLon: null }, mode: "all"
    }
  );

  useEffect(() => setDropZoneArea(), [modal]);

  const setDropZoneArea = () =>
    setInitDropZone(
      <DropzoneArea
        clearOnUnmount={true}
        acceptedFiles={['image/*']}
        filesLimit={10}
        maxFileSize={1000000}
        dropzoneText={"상점 이미지를 넣어주세요. 최대 10개, 개당 10MB"}
        getFileRemovedMessage={fileName => `${fileName} 파일을 삭제했습니다.`}
        getFileLimitExceedMessage={filesLimit => `상점 이미지는 최대 ${filesLimit}개까지 가능합니다.`}
        getFileAddedMessage={fileName => `${fileName} 이미지 추가를 완료했습니다.`}
        getDropRejectMessage={(file, rejectedFile, maxFileSize) => (file.size > maxFileSize) ? `파일의 사이즈가 너무 큽니다. (10MB)` : "허용되지 않은 파일입니다."}
        onChange={files => setValue("files", files)} />
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

  const handleChangePhoneNumber = e => {
    e = e || window.e;
    e.target.value = convertPhoneNumber(e.target.value.trim()) ;
  };

  let handleInputClass = key =>
    (Object.keys(errors).length === 0) ? "form-control" : ((typeof errors[key] !== 'undefined') ? "is-invalid form-control" : "is-valid form-control");

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

  const onSubmit = (data, e) => insertStr(data).then(resp => {
    if (resp.data["result"] === "duplicate") {
      alert("상점코드가 중복됩니다.");
    } else if (resp.data["result"] === "success") {
      alert("상점 등록을 완료했습니다.");
      closeModal();
      handleInitTable();
    } else {
      alert("상점 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      closeModal();
    }
  });

  const closeModal = async () => {
    await setInitDropZone("");
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>상점 등록</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="strName">상점명<span className={"required-span"}> *</span></CLabel>
                <input className={handleInputClass("strName")} type={"text"} placeholder={"상점명을 입력해주세요."}
                       { ...register("strName", regOpts["strName"]) } />
                { errors.strName && <span className={"invalid-feedback"}>{errors.strName.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="areaCode">구역선택<span className={"required-span"}> *</span></CLabel>
                <input className={"form-control"} type={"text"} placeholder={"구역을 선택해주세요."} readOnly={true}
                       onClick={e => setOnAreaModal(true)} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="strAddr">주소</CLabel>
                <input className={handleInputClass("strAddr")} type={"text"} placeholder={"주소를 입력해주세요."}
                       { ...register("strAddr", regOpts["strAddr"] )} />
                { errors.strAddr && <span className={"invalid-feedback"}>{errors.strAddr.message}</span> }
              </CCol>
              <CCol md="6">
                <CRow className={"pl-3 pr-3"} style={{ marginTop : '2.3rem' }}>
                  <CFormGroup className="pr-3 d-inline-flex">
                    <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                    <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue} defaultChecked />
                  </CFormGroup>
                </CRow>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="strTel">전화번호</CLabel>
                <input className={handleInputClass("strTel")} type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"전화번호를 입력해주세요."}
                       { ...register("strTel",  regOpts["strTel"]) } />
                { errors.strTel && <span className={"invalid-feedback"}>{errors.strTel.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="strOwnTel">휴대폰번호</CLabel>
                <input className={handleInputClass("strOwnTel")} type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"휴대폰번호를 입력해주세요."}
                       { ...register("strOwnTel", regOpts["strOwnTel"]) } />
                { errors.strOwnTel && <span className={"invalid-feedback"}>{errors.strOwnTel.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="strPosLat">구역위도</CLabel>
                <input className={handleInputClass("strPosLat")} type={"text"} placeholder={"구역 위도를 입력해주세요."}
                       { ...register("strPosLat", regOpts["strPosLat"]) } />
                { errors.strPosLat && <span className={"invalid-feedback"}>{errors.strPosLat.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="strPosLon">구역경도</CLabel>
                <input className={handleInputClass("strPosLon")} type={"text"} placeholder={"구역 경도를 입력해주세요."}
                       { ...register("strPosLon", regOpts["strPosLon"]) } />
                { errors.strPosLon && <span className={"invalid-feedback"}>{errors.strPosLon.message}</span> }
              </CCol>
            </CFormGroup>
            <CRow id={"dropzone"} className={"pl-2 pr-2 mt-4"}>{initDropZone}</CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
            <CButton color="info" type="submit">등록</CButton>
          </CModalFooter>
        </form>
      </CModal>

      <PageAreaTreeModalWidget onAreaModal={onAreaModal} setOnAreaModal={setOnAreaModal} nodeClick={nodeClick} initAreaCode={initAreaCode} />
    </>
  );
};

export default StrInsertModal;
