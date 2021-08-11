import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch, CInput, CFormText } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { getAreaList, getParentKey } from "../../agent/area";
import { deleteSnsr, updateSnsr } from "../../agent/sensor";
import PageStrTableModalWidget from "../../widget/pageStrTableModalWidget";

const SnsrUpdateModal = props => {
  let gData = [];

  const { modal, setModal, snsrContent, handleInitTable } = props
  const [onAreaModal, setOnAreaModal] = useState();
  const [onStrModal, setOnStrModal] = useState();

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
          sVol: 20, sSce: 240, sOc1V1: 100, sOc1V2: 120, sOc1T1: 60, sOc1T2: 30, sOc2V1: 120, sOc2V2: 130, sOc2T1: 60, sOc2T2: 10
        , sIgo1V: 15, sIgo1T: 10, sIgo2V: 17, sIgo2T: 10, sIgr1V: 3, sIgr1T: 10, sIgr2V: 5, sIgr2T: 120, snsrPosLat: null, snsrPosLon: null
      }, mode: "all"
    }
  );

  useEffect(async () => reset(snsrContent), [snsrContent]);

  const initAreaCode = () => {
    setValue("areaCode", "");
    setValue("levelAreaCode", "");
  };

  const initStrCode = () => setValue("strCode", "");

  const nodeClick = async (e, node) => {
    if (gData !== [])
      await getAreaList().then(resp => gData = resp.data["resultList"]);

    const parentKey = getParentKey(node.key, gData);
    setValue("levelAreaCode", node["key"]);
    setValue("areaCode", (typeof parentKey !== 'undefined') ? parentKey : node["key"]);
  };

  const clickStrRow = e => setValue("strCode", e.strCode);

  let handleInputClass = key =>
    (Object.keys(errors).length === 0) ? "form-control" : ((typeof errors[key] !== 'undefined') ? "is-invalid form-control" : "is-valid form-control");

  let inputSnsrValueCommonHtml = (key, txt, initValue=0) =>
    <CCol md="6">
      <CLabel htmlFor={key} className={"mb-0"}>{txt}</CLabel>
      <input className={handleInputClass(key)} type={"number"} value={initValue} { ...register(key, regOpts[key]) } />
      { errors[key] && <span className={"invalid-feedback"}>{errors[key].message}</span> }
    </CCol>;

  let inputSnsrValueCommonHtml2 = (key, txt, initValue=0) =>
    <>
      <CCol md="3">
        <CLabel htmlFor={key} className={"label-text"}>{txt}</CLabel>
      </CCol>
      <CCol xs="6" md="3">
        <input className={handleInputClass(key)} type={"number"} value={initValue} { ...register(key, regOpts[key]) } />
        { errors[key] && <span className={"invalid-feedback"}>{errors[key].message}</span> }
      </CCol>
    </>;

  const regOpts = {
      snsrId: { required: { value: true, message: '센서아이디를 입력해주세요.' } }
    , snsrNick: {
          required: { value: true, message: '센서명을 입력해주세요.' }
        , minLength: { value: 1, message: '센서명을 1글자 이상으로 입력해주세요.' }
        , maxLength: { value: 50, message: '센서명을 50글자 이하로 입력해주세요.' }
      }
    , snsrAddr: {
          minLength: { value: 5, message: '주소를 5글자 이상으로 입력해주세요.' }
        , maxLength: { value: 200, message: '주소를 200글자 이하로 입력해주세요.' }
      }
    , snsrPosLat: { pattern: { value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000" } }
    , snsrPosLon: { pattern: { value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"} }
    , sVol: { required: { value: true, message: '차단기 용량를 입력해주세요.' } }
    , sSec: { required: { value: true, message: '전송주기를 입력해주세요.' } }
    , sOc1V1: { required: { value: true, message: '1차 전류 임계값#1을 입력해주세요.' } }
    , sOc1V2: { required: { value: true, message: '1차 전류 임계값#2를 입력해주세요.' } }
    , sOc1T1: { required: { value: true, message: '1차 전류 임계시간#1을 입력해주세요.' } }
    , sOc1T2: { required: { value: true, message: '1차 전류 임계시간#2를 입력해주세요.' } }
    , sOc2V1: { required: { value: true, message: '2차 전류 임계값#1을 입력해주세요.' } }
    , sOc2V2: { required: { value: true, message: '2차 전류 임계값#2를 입력해주세요.' } }
    , sOc2T1: { required: { value: true, message: '2차 전류 임계시간#1을 입력해주세요.' } }
    , sOc2T2: { required: { value: true, message: '2차 전류 임계시간#2를 입력해주세요.' } }
    , sIgo1V: { required: { value: true, message: '1차 IGO 임계값을 입력해주세요.' } }
    , sIgo1T: { required: { value: true, message: '1차 IGO 임계시간을 입력해주세요.' } }
    , sIgo2V: { required: { value: true, message: '2차 IGO 임계값을 입력해주세요.' } }
    , sIgo2T: { required: { value: true, message: '2차 IGO 임계시간을 입력해주세요.' } }
    , sIgr1V: { required: { value: true, message: '1차 IGR 임계값을 입력해주세요.' } }
    , sIgr1T: { required: { value: true, message: '1차 IGR 임계시간을 입력해주세요.' } }
    , sIgr2V: { required: { value: true, message: '2차 IGR 임계값을 입력해주세요.' } }
    , sIgr2T: { required: { value: true, message: '2차 IGR 임계시간을 입력해주세요.' } }
  };

  const handleClickDeleteSnsr = snsrId => deleteSnsr(snsrId).then(resp => {
    if (resp.data["result"] === "success") {
      alert("센서 삭제를 완료했습니다.");
      closeModal();
      handleInitTable();
    } else {
      alert("센서 삭제에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      closeModal();
    }
  });

  const onSubmit = (data, e) => {
    console.log(data);
    data.updSnsrId = snsrContent.snsrId;

    updateSnsr(data).then(resp => {
      if (resp.data["result"] === "success") {
        alert("센서 수정을 완료했습니다.");
        closeModal();
        handleInitTable();
      } else if (resp.data["result"] === "duplicate") {
        alert("중복되는 센서아이디가 존재합니다. 확인 후 다시 시도해주세요.");
      } else {
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        closeModal();
      }
    });
  };

  const closeModal = async () => {
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={() => closeModal()} color="info">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>센서 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="snsrId" className={"mb-0"}>센서 아이디<span className={"required-span"}> *</span></CLabel>
                <input className={handleInputClass("snsrId")} type={"text"} placeholder={"센서아이디를 입력해주세요."}
                       { ...register("snsrId", regOpts["snsrId"]) } />
                { errors.snsrId && <span className={"invalid-feedback"}>{errors.snsrId.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="snsrNick" className={"mb-0"}>센서명<span className={"required-span"}> *</span></CLabel>
                <input className={handleInputClass("snsrNick")} type={"text"} placeholder={"센서명을 입력해주세요."}
                       { ...register("snsrNick", regOpts["snsrNick"]) } />
                { errors.snsrNick && <span className={"invalid-feedback"}>{errors.snsrNick.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="areaCode" className={"mb-0"}>구역선택</CLabel>
                <input className={handleInputClass("areaCode")} type={"text"}  placeholder={"구역을 선택해주세요."} readOnly={true}
                       onClick={e => setOnAreaModal(true)} />
              </CCol>

              <CCol md="6">
                <CLabel htmlFor="strCode"  className={"mb-0"}>상점선택</CLabel>
                <input className={handleInputClass("strCode")} type={"text"}  placeholder={"상점을 선택해주세요."} readOnly={true}
                       onClick={e => setOnStrModal(true)} />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="channel" className={"mb-0"}>채널</CLabel>
                <select className={"form-control"}>
                  <option key={1} value={1}>1</option>
                  <option key={2} value={2}>2</option>
                  <option key={3} value={3}>3</option>
                  <option key={4} value={4}>4</option>
                </select>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="snsrAddr" className={"mb-0"}>주소</CLabel>
                <input className={handleInputClass("snsrAddr")} type={"text"} placeholder={"주소를 입력해주세요."}
                       { ...register("snsrAddr", regOpts["snsrAddr"]) } />
                { errors.snsrAddr && <span className={"invalid-feedback"}>{errors.snsrAddr.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="snsrPosLat" className={"mb-0"}>구역위도</CLabel>
                <input className={handleInputClass("snsrPosLat")} type={"text"} placeholder={"구역 위도를 입력해주세요."}
                       { ...register("snsrPosLat", regOpts["snsrPosLat"]) } />
                { errors.snsrPosLat && <span className={"invalid-feedback"}>{errors.snsrPosLat.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="strPosLon" className={"mb-0"}>구역경도</CLabel>
                <input className={handleInputClass("snsrPosLon")} type={"text"} placeholder={"구역 경도를 입력해주세요."}
                       { ...register("snsrPosLon", regOpts["snsrPosLat"]) } />
                { errors.snsrPosLon && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              {inputSnsrValueCommonHtml("sVol", "차단기용량", 20)}
              {inputSnsrValueCommonHtml("sSec", "전송주기", 240)}
              {inputSnsrValueCommonHtml("sOc1V1", "1차 전류 경보 임계값#1", 100)}
              {inputSnsrValueCommonHtml("sOc1V2", "1차 전류 경보 임계값#2", 120)}
              {inputSnsrValueCommonHtml("sOc1T1", "1차 전류 경보 임계시간#1", 60)}
              {inputSnsrValueCommonHtml("sOc1T2", "1차 전류 경보 임계시간#2", 30)}
              {inputSnsrValueCommonHtml("sOc2V1", "2차 전류 경보 임계값#1", 120)}
              {inputSnsrValueCommonHtml("sOc2V2", "2차 전류 경보 임계값#2", 130)}
              {inputSnsrValueCommonHtml("sOc2T1", "2차 전류 경보 임계시간#1", 60)}
              {inputSnsrValueCommonHtml("sOc2T2", "2차 전류 경보 임계시간#2", 10)}
            </CFormGroup>
            <CFormGroup row>
              {inputSnsrValueCommonHtml2("sIgo1V", "1차 IGO 임계값", 15)}
              {inputSnsrValueCommonHtml2("sIgo1T", "1차 IGO 임계시간", 10)}
              {inputSnsrValueCommonHtml2("sIgo2V", "2차 IGO 임계값", 17)}
              {inputSnsrValueCommonHtml2("sIgo2T", "2차 IGO 임계시간", 10)}
              {inputSnsrValueCommonHtml2("sIgr1V", "1차 IGR 임계값", 3)}
              {inputSnsrValueCommonHtml2("sIgr1T", "1차 IGR 임계시간", 10)}
              {inputSnsrValueCommonHtml2("sIgr2V", "2차 IGR 임계값", 5)}
              {inputSnsrValueCommonHtml2("sIgr2T", "2차 IGR 임계시간", 120)}
            </CFormGroup>
          </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color="danger" className={"mr-auto"} onClick={e => handleClickDeleteSnsr(snsrContent.snsrId)}>삭제</CButton>
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
      <PageStrTableModalWidget onStrModal={onStrModal} setOnStrModal={setOnStrModal} clickStrRow={clickStrRow} initStrCode={initStrCode}/>
    </>
  );
};

export default SnsrUpdateModal;
