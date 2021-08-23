import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSelect, CSwitch, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getInsprAreaList, updateInspector } from "../../agent/inspection";
import { getInputValue, getValidInput, handleChangePhoneNumber } from "../../agent/commonIndex";

const InsprUpdateModal = props => {
  const { modal, setModal, userContent, handleInitTable } = props;
  const [appSwitch, setAppSwitch] = useState({ alarmUse: true, pushUse: true, smsUse: true, useYn: true });

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ mode: "all" });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let inputCmmHtml = (id, txt, type, placeholder, required, handle) =>
    <CCol md={"6"}>
      <CLabel htmlFor={id}>{txt}{required && <span className={"required-span"}> *</span>}</CLabel>
      <input className={getValidInput(errors[id], getValues(id), "")} id={id} type={type} placeholder={placeholder} onKeyUp={handle}
             {...register(id, regOpts[id])} />
      { errors[id] && <span className={"invalid-feedback"}>{errors[id].message}</span> }
    </CCol>;

  let switchCmmHtml = (id, txt, checked) =>
    <CFormGroup className={"pr-3 d-inline-flex"}>
      <CLabel htmlFor={id} className={"pr-1"}>{txt}</CLabel>
      <CSwitch className={'mx-1'} id={id} color={"info"} labelOn={"사용"} labelOff={"미사용"} onChange={setUpdSwitchValue} checked={checked} />
    </CFormGroup>;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    appSwitch.alarmUse = (userContent.alarmUse === "Y");
    appSwitch.pushUse = (userContent.pushUse === "Y");
    appSwitch.smsUse = (userContent.smsUse === "Y");
    appSwitch.useYn = (userContent.useYn === "Y");

    reset(userContent);
  }, [userContent]);

  useEffect(() => {
    handleInitListInsprArea();
  }, []);

  const handleInitListInsprArea = () => {
    getInsprAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("insprUpdInspAreaCode").innerHTML += html;

        let sel = document.getElementById("insprUpdInspAreaCode");
      }
    });
  };

  const setUpdSwitchValue = e => {
    const value = getInputValue(e);
    setAppSwitch(data => ({ ...data, [e.target.id]: (value === "Y") }));
    setValue(e.target.id, value);
  };

  const regOpts = {
      inspPass: {
          minLength: { value: 8, message: '8자 이상 입력하세요.' }
        , maxLength: { value: 15, message: '15자 내로 입력하세요.' }
        , pattern: { value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/, message: '숫자/문자/특수문자 포함 8~15자 내로 입력하세요.' }
      }
    , inspName: {
          required: { value: true, message: '이름은 필수입니다.' }
        , minLength: { value: 2, message: '2자 이상 입력하세요.' }
        , maxLength: { value: 50, message: '50자 내로 입력하세요.' }
        , pattern: { value: /^[가-힣]{2,50}[0-9]*$|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/, message: '이름 형식에 맞게 입력하세요.' }
      }
    , inspEmail: {
          pattern: {
              value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
            , message: "이메일 형식에 맞게 입력해주세요."
          }
      }
    , inspTel: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message: "전화번호 형식에 맞게 입력해주세요." } }
    , inspMobile: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message: "휴대폰번호 형식에 맞게 입력해주세요." } }
    , inspShopName: {
          minLength: { value: 2, message: "2자 이상 입력하세요." }
        , maxLength: { value: 100, message: "100자 내로 입력하세요." }
      }
    , inspAddr: {
          minLength: { value: 2, message: "2자 이상 입력하세요." }
        , maxLength: { value: 200, message: "200자 내로 입력하세요." }
      }
  };

  const onSubmit = (data, e) => {
    if (window.confirm("점검자 정보를 수정하시겠습니까?")) {
      updateInspector(data).then(resp => {
        if (resp['data']) {
          alert("점검자 수정이 완료되었습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("점검자 수정 도중 오류가 발생했습니다.");
        }
      });
    }
  };

  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  return (
    <CModal show={modal} onClose={closeModal} color="info" size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader>
          <CModalTitle style={{ width: '100%' }}>
            <div className={'w-100 d-flex justify-content-between'} style={{ width: '100%' }}>
              <div className={'text-white'}>점검자 정보 수정</div>
              <div style={{ cursor: 'pointer' }} onClick={() => closeModal()}>X</div>
            </div>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"inspId"}>점검자 ID</CLabel>
              <input className={"form-control"} id={"inspId"} readOnly={true} { ...register("inspId") } />
            </CCol>
            {inputCmmHtml("memPwd", "점검자 비밀번호", "password", "숫자/문자/특수문자 포함 8~15자 내로 입력하세요.", false, null)}
          </CFormGroup>
          <CFormGroup row>
            {inputCmmHtml("inspName", "점검자 이름", "text", "2~50자 내로 입력하세요.", true, null)}
            {inputCmmHtml("inspEmail", "점검자 이메일", "text", "이메일 형식에 맞게 입력하세요.", false, null)}
          </CFormGroup>
          <CFormGroup row>
            {inputCmmHtml("inspTel", "점검자 연락처", "text", "연락처 형식에 맞게 입력하세요.", false, handleChangePhoneNumber)}
            {inputCmmHtml("inspMobile", "점검자 휴대폰 번호", "text", "휴대폰 번호 형식에 맞게 입력하세요.", false, handleChangePhoneNumber)}
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"insprUpdInspAreaCode"}>점검자 소속 시장</CLabel>
              <CSelect id={"insprUpdInspAreaCode"} { ...register("inspAreaCode") }></CSelect>
            </CCol>
            {inputCmmHtml("inspShopName", "점검자 소속 업체", "text", "2~100자 내로 입력하세요.", false, null)}
          </CFormGroup>
          <CFormGroup row>
            <CCol md="12">
              <CLabel htmlFor={"inspAddr"}>점검자 주소</CLabel>
              <input className={getValidInput(errors["inspAddr"], getValues("inspAddr"), "")} id={"inspAddr"} type={"text"}
                     placeholder={"200자 내로 입력하세요."} { ...register("inspAddr", regOpts["inspAddr"]) } />
              { errors.inspAddr && <span className={"invalid-feedback"}>{errors.inspAddr.message}</span> }
            </CCol>
          </CFormGroup>
          <CRow className={"pl-3 pr-3"}>
            {switchCmmHtml('alarmUse', '알림유무', appSwitch.alarmUse)}
            {switchCmmHtml('pushUse', 'PUSH 유무', appSwitch.pushUse)}
            {switchCmmHtml('smsUse', 'SMS 유무', appSwitch.smsUse)}
            {switchCmmHtml('useYn', '사용유무', appSwitch.useYn)}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className={"mr-2"} color={"secondary"} onClick={closeModal}>취소</CButton>
          <CButton color={"info"} type={"submit"}>수정</CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default InsprUpdateModal;
