import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch, CInput, CFormText } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { getAreaList, getParentKey } from "../../agent/area";
import { deleteSnsr, updateSnsr } from "../../agent/sensor";
import PageStrTableModalWidget from "../../widget/pageStrTableModalWidget";
import {getValidInput} from "../../agent/commonIndex";

const SnsrUpdateModal = props => {
  let gData = [];

  const { modal, setModal, snsrContent, handleInitTable } = props
  const [onAreaModal, setOnAreaModal] = useState();
  const [onStrModal, setOnStrModal] = useState();

  const { register, handleSubmit, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
          sVol: 20, sSce: 240, sOc1V1: 100, sOc1V2: 120, sOc1T1: 60, sOc1T2: 30, sOc2V1: 120, sOc2V2: 130, sOc2T1: 60, sOc2T2: 10
        , sIgo1V: 15, sIgo1T: 10, sIgo2V: 17, sIgo2T: 10, sIgr1V: 3, sIgr1T: 10, sIgr2V: 5, sIgr2T: 120, snsrPosLat: null, snsrPosLon: null
      }, mode: "all"
    }
  );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let inputCmmHtml = (id, txt, checkValid, placeholder, required) =>
    <CCol md="6">
      <CLabel htmlFor={id}>{txt}{ required && <span className={"required-span"}> *</span> }</CLabel>
      <input className={getValidInput(errors[id], getValues(id), checkValid)} id={id} type={"text"} placeholder={placeholder} { ...register(id, regOpts[id]) } />
      { errors[id] && <span className={"invalid-feedback"}>{errors[id].message}</span> }
    </CCol>;

  let inputReadOnlyHtml = (id, txt, placeholder, onclick) =>
    <CCol md="6">
      <CLabel htmlFor={id} className={"mb-0"}>{txt}</CLabel>
      <input className={getValidInput(errors[id], getValues(id), '')} id={id} type={"text"} placeholder={placeholder} readOnly={true}
             onClick={onclick} { ...register(id)} />
    </CCol>

  let inputNumberCmmHtml = (key, txt, initValue=0) =>
    <CCol md="6">
      <CLabel htmlFor={key} className={"mb-0"}>{txt}</CLabel>
      <input className={"form-control"} type={"number"} value={initValue} { ...register(key) } />
    </CCol>;

  let inputNumberCmmHtml2 = (key, txt, initValue=0) =>
    <>
      <CCol md="3">
        <CLabel htmlFor={key} className={"label-text"}>{txt}</CLabel>
      </CCol>
      <CCol xs="6" md="3">
        <input className={"form-control"} type={"number"} value={initValue} { ...register(key) } />
      </CCol>
    </>;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  };

  const handleClickDeleteSnsr = snsrId => deleteSnsr(snsrId).then(resp => {
    if (resp.data["result"] === "success") {
      alert("센서 삭제를 완료했습니다.");
      closeModal();
      handleInitTable();
    } else {
      alert("센서 삭제에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });

  const onSubmit = (data, e) => {
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
      }
    });
  };

  const closeModal = async () => {
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={closeModal} color={"info"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>센서 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              {inputCmmHtml("snsrId", "센서 아이디", '', "센서아이디를 입력해주세요.", true)}
              {inputCmmHtml("snsrNick", "센서명", '', "센서명을 입력해주세요.", true)}
              {inputReadOnlyHtml("areaCode", "구역선택", "구역을 선택해주세요.", e => setOnAreaModal(true))}
              {inputReadOnlyHtml("strCode", "상점선택", "상점을 선택해주세요.", e => setOnStrModal(true))}
              <CCol md="6">
                <CLabel htmlFor={"channel"} className={"mb-0"}>채널</CLabel>
                <select className={"form-control"} id={"channel"} { ...register("channel") }>
                  <option key={1} value={1}>1</option>
                  <option key={2} value={2}>2</option>
                  <option key={3} value={3}>3</option>
                  <option key={4} value={4}>4</option>
                </select>
              </CCol>
              {inputCmmHtml("snsrAddr", "주소", '', "주소를 입력해주세요.", false)}
              {inputCmmHtml("snsrPosLat", "구역위도", null,"구역 위도를 입력해주세요.", false)}
              {inputCmmHtml("snsrPosLon", "구역경도", null, "구역 경도를 입력해주세요.", false)}
            </CFormGroup>
            <CFormGroup row>
              {inputNumberCmmHtml("sVol", "차단기용량", 20)}
              {inputNumberCmmHtml("sSec", "전송주기", 240)}
              {inputNumberCmmHtml("sOc1V1", "1차 전류 경보 임계값#1", 100)}
              {inputNumberCmmHtml("sOc1V2", "1차 전류 경보 임계값#2", 120)}
              {inputNumberCmmHtml("sOc1T1", "1차 전류 경보 임계시간#1", 60)}
              {inputNumberCmmHtml("sOc1T2", "1차 전류 경보 임계시간#2", 30)}
              {inputNumberCmmHtml("sOc2V1", "2차 전류 경보 임계값#1", 120)}
              {inputNumberCmmHtml("sOc2V2", "2차 전류 경보 임계값#2", 130)}
              {inputNumberCmmHtml("sOc2T1", "2차 전류 경보 임계시간#1", 60)}
              {inputNumberCmmHtml("sOc2T2", "2차 전류 경보 임계시간#2", 10)}
            </CFormGroup>
            <CFormGroup row>
              {inputNumberCmmHtml2("sIgo1V", "1차 IGO 임계값", 15)}
              {inputNumberCmmHtml2("sIgo1T", "1차 IGO 임계시간", 10)}
              {inputNumberCmmHtml2("sIgo2V", "2차 IGO 임계값", 17)}
              {inputNumberCmmHtml2("sIgo2T", "2차 IGO 임계시간", 10)}
              {inputNumberCmmHtml2("sIgr1V", "1차 IGR 임계값", 3)}
              {inputNumberCmmHtml2("sIgr1T", "1차 IGR 임계시간", 10)}
              {inputNumberCmmHtml2("sIgr2V", "2차 IGR 임계값", 5)}
              {inputNumberCmmHtml2("sIgr2T", "2차 IGR 임계시간", 120)}
            </CFormGroup>
          </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color="danger" className={"mr-auto"} onClick={e => handleClickDeleteSnsr(snsrContent.snsrId)}>삭제</CButton>
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
      <PageStrTableModalWidget onStrModal={onStrModal} setOnStrModal={setOnStrModal} clickStrRow={clickStrRow} initStrCode={initStrCode}/>
    </>
  );
};

export default SnsrUpdateModal;
