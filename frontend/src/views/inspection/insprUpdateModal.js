import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSelect } from "@coreui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { getInsprAreaList } from "../../agent/inspection";
import { getValidInput, getInputValue, handleChangePhoneNumber } from "../../agent/commonIndex";

const InsprUpdateModal = (props) => {
  const { modal, setModal, userContent, handleInitTable } = props;
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ mode: "all" });

  useEffect(() => {
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
      }
    });
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
    , inspTel: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "전화번호 형식에 맞게 입력해주세요." } }
    , inspMobile: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "휴대폰번호 형식에 맞게 입력해주세요." } }
    , inspShopName: {
          minLength: { value: 2, message: "2자 이상 입력하세요." }
        , maxLength: { value: 100, message: "100자 내로 입력하세요." }
      }
    , inspAddr: {
          minLength: { value: 2, message: "2자 이상 입력하세요." }
        , maxLength: { value: 200, message: "200자 내로 입력하세요." }
      }
  };


  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={closeModal} color="info" size="lg">
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
              <input className={"form-control"} id={"inspId"} readOnly={true} />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"inspPass"}>점검자 비밀번호</CLabel>
              <input className={getValidInput(errors["inspPass"], getValues("inspPass"), "")} id={"inspPass"} type={"password"}
                     placeholder={"숫자/문자/특수문자 포함 8~15자 내로 입력하세요."}
                     { ...register("inspPass", regOpts["inspPass"]) } />
              { errors.inspPass && <span className={"invalid-feedback"}>{errors.inspPass.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel for={"inspName"}>점검자 이름<span className={"required-span"}> *</span></CLabel>
              <input className={getValidInput(errors["inspName"], getValues("inspName"), "")} id={"inspName"} type={"text"}
                     placeholder={"2~50자 내로 입력하세요."} { ...register("inspName", regOpts["inspName"]) } />
              { errors.inspName && <span className={"invalid-feedback"}>{errors.inspName.message}</span> }
            </CCol>
            <CCol md="6">
              <CLabel for={"inspEmail"}>점검자 이메일</CLabel>
              <input className={getValidInput(errors["inspEmail"], getValues("inspEmail"), "")} id={"inspEmail"} type={"text"}
                     placeholder={"이메일 형식에 맞게 입력하세요."} { ...register("inspEmail", regOpts["inspEmail"]) } />
              { errors.inspEmail && <span className={"invalid-feedback"}>{errors.inspEmail.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel for={"inspTel"}>점검자 연락처</CLabel>
              <input className={getValidInput(errors["inspTel"], getValues("inspTel"), "")} id={"inspTel"} type={"text"}
                     placeholder={"연락처 형식에 맞게 입력하세요."} { ...register("inspTel", regOpts["inspTel"]) } />
              { errors.inspTel && <span className={"invalid-feedback"}>{errors.inspTel.message}</span> }
            </CCol>
            <CCol md="6">
              <CLabel for={"inspMobile"}>점검자 휴대폰 번호</CLabel>
              <input className={getValidInput(errors["inspMobile"], getValues("inspMobile"), "")} id={"inspMobile"} type={"text"}
                     placeholder={"휴대폰 번호 형식에 맞게 입력하세요."} { ...register("inspMobile", regOpts["inspMobile"]) } />
              { errors.inspMobile && <span className={"invalid-feedback"}>{errors.inspMobile.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"insprUpdInspAreaCode"}>점검자 소속 시장</CLabel>
              <CSelect id={"insprUpdInspAreaCode"} { ...register("inspAreaCode") }></CSelect>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"inspShopName"}>점검자 소속 업체</CLabel>
              <input className={getValidInput(errors["inspShopName"], getValues("inspShopName"), "")} id={"inspShopName"} type={"text"}
                     placeholder={"2~100자 내로 입력하세요."} { ...register("inspShopName", regOpts["inspShopName"]) } />
              { errors.inspShopName && <span className={"invalid-feedback"}>{errors.inspShopName.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="12">
              <CLabel htmlFor={"inspAddr"}>점검자 주소</CLabel>
              <input className={getValidInput(errors["inspAddr"], getValues("inspAddr"), "")} id={"inspAddr"} type={"text"}
                     placeholder={"200자 내로 입력하세요."} { ...register("inspAddr", regOpts["inspAddr"]) } />
              { errors.inspAddr && <span className={"invalid-feedback"}>{errors.inspAddr.message}</span> }
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
          <CButton color="info">수정</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default InsprUpdateModal;
