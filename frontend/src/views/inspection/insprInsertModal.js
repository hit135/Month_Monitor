import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSelect } from "@coreui/react";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";

import {getInspectorList, getInsprAreaList} from "../../agent/inspection";
import {insertMem} from "../../agent/member";

const InsprInsertModal = (props) => {
  const API_ROOT = 'http://localhost:8081/api';
  const { modal, setModal } = props;
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, setError } = useForm({ mode: "all" } );

  useEffect(() => {
    handleInitListInsprArea();
  }, []);

  const handleInitListInsprArea = () => {
    getInsprAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("modalInsInspAreaCode").innerHTML += html;
      }
    });
  }

  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  const onSubmit = (data, e) => {

  };

  return (
    <div>
      <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ width: '100%' }}>
              <div className={'w-100 d-flex justify-content-between'} style={{ width: '100%' }}>
                <div>점검자 정보 등록</div>
                <div style={{ cursor: 'pointer' }} onClick={() => closeModal()}>X</div>
              </div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspId"}>점검자 ID</CLabel>
                <input className={"form-control"} id={"modalInsInspId"}
                       {...register("inspId", { })} />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspPass"}>점검자 비밀번호</CLabel>
                <input className={"form-control"} id={"modalInsInspPass"}
                       {...register("inspPass", { })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspName"}>점검자 이름</CLabel>
                <input className={"form-control"} id={"modalInsInspName"}
                       {...register("inspName", { })} />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspEmail"}>점검자 이메일</CLabel>
                <input className={"form-control"} id={"modalInsInspEmail"}
                       {...register("inspEmail", { })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspTel"}>점검자 연락처</CLabel>
                <input className={"form-control"} id={"modalInsInspTel"}
                       {...register("inspTel", { })} />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspMobile"}>점검자 휴대폰</CLabel>
                <input className={"form-control"} id={"modalInsInspMobile"}
                       {...register("inspMobile", { })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspAreaCode"}>점검자 소속 시장</CLabel>
                <CSelect id={'modalInsInspAreaCode'}>
                  <option value={''}>없음</option>
                </CSelect>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor={"modalInsInspShopName"}>점검자 소속 업체</CLabel>
                <input className={"form-control"} id={"modalInsInspShopName"}
                       {...register("inspShopName", { })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="12">
                <CLabel htmlFor={"modalInsInspAddr"}>점검자 주소</CLabel>
                <input className={"form-control"} id={"modalInsInspAddr"}
                       {...register("inspAddr", { })} />
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
            <CButton color="info" type="submit">등록</CButton>
          </CModalFooter>
        </form>
      </CModal>
    </div>
  );
};

export default InsprInsertModal;
