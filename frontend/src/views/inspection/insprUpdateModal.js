import {
  CButton, CFormGroup,
  CRow,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol, CSwitch, CSelect
} from "@coreui/react";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {getInsprAreaList} from "../../agent/inspection";

const InsprUpdateModal = (props) => {
  const { modal, setModal } = props;
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, setError } = useForm(
    {
      defaultValues: {

      }, mode: "all"
    }
  );

  useEffect(() => {
    handleInitListInsprArea();
  }, []);

  const handleInitListInsprArea = () => {
    getInsprAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("modalUpdInspAreaCode").innerHTML += html;
      }
    });
  };

  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
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
              <CLabel htmlFor={"modalUpdInspId"}>점검자 ID</CLabel>
              <input className={"form-control"} id={"modalUpdInspId"}/>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspPass"}>점검자 비밀번호</CLabel>
              <input className={"form-control"} id={"modalUpdInspPass"}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspName"}>점검자 이름</CLabel>
              <input className={"form-control"} id={"modalUpdInspName"}/>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspEmail"}>점검자 이메일</CLabel>
              <input className={"form-control"} id={"modalUpdInspEmail"}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspTel"}>점검자 연락처</CLabel>
              <input className={"form-control"} id={"modalUpdInspTel"}/>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspMobile"}>점검자 휴대폰</CLabel>
              <input className={"form-control"} id={"modalUpdInspMobile"}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspAreaCode"}>점검자 소속 시장</CLabel>
              <CSelect id={'modalUpdInspAreaCode'}>
                <option value={''}>없음</option>
              </CSelect>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"modalUpdInspShopName"}>점검자 소속 업체</CLabel>
              <input className={"form-control"} id={"modalUpdInspShopName"}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="12">
              <CLabel htmlFor={"modalUpdInspAddr"}>점검자 주소</CLabel>
              <input className={"form-control"} id={"modalUpdInspAddr"}/>
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
