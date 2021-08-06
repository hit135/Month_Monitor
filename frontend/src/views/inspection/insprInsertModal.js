import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSelect } from "@coreui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { getDupChkInspId, getInsprAreaList, insertInspector } from "../../agent/inspection";

const InsprInsertModal = (props) => {
  const { modal, setModal, handleInitTable } = props;
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    { defaultValues: {}, mode: "all" }
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

        document.getElementById("modalInsInspAreaCode").innerHTML += html;

        let sel = document.getElementById("modalInsInspAreaCode");
        setValue("inspAreaCode", sel.options[sel.selectedIndex].value);
      } else {
        alert("점검자 소속 시장 목록을 불러오는 도중 오류가 발생했습니다.");
      }
    });
  }

  const handleDupChkInspId = () => {
    let checkIdMap = { 'inspId': document.getElementById("modalInsInspId").value };

    getDupChkInspId(checkIdMap).then(resp => {
      if (resp['data']['result']) {
        if (resp['data']['dupChk']) {
          setError("inspId", { type: "dupUserId", message: "중복 ID가 존재합니다." } )
          setFocus("inspId");
        }
      } else {
        setError("inspId", { type: "error", message: "중복 검사 도중 오류가 발생했습니다." } )
        setFocus("inspId");
      }
    });
  }

  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  const onSubmit = (data, e) => {
    if (window.confirm("등록하시겠습니까?")) {
      insertInspector(data).then(resp => {
        if (resp['data']) {
          alert("점검자 등록이 완료되었습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("점검자 등록 도중 오류가 발생했습니다.");
        }
      });
    }
  };

  return (
    <>
      <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ width: '100%' }}>
              <div className={'d-flex justify-content-between'} style={{ width: '100%' }}>
                <div className={'text-white'}>점검자 정보 등록</div>
                <div style={{ cursor: 'pointer' }} onClick={() => closeModal()}>X</div>
              </div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="6">
                <CLabel>점검자 ID</CLabel>
                <input className={ errors.inspId && "is-invalid form-control"
                                  || (!errors.inspId && getValues("inspId") !== "") && "form-control is-valid"
                                  || (!errors.inspId && getValues("inspId") === "") && "form-control" }
                       id="modalInsInspId" type={"text"} placeholder={"5~20자 내로 입력하세요."}
                       { ...register("inspId", {
                           required: { value: true, message: 'ID는 필수입니다.' }
                         , minLength: { value: 5, message: '5자 이상 입력하세요.' }
                         , maxLength: { value: 20, message: '20자 내로 입력하세요.' }
                         , pattern: { value: /^[a-z]+[a-z0-9]{4,19}$/g, message: 'ID는 영문자로 시작하는 5~20자 영문자/숫자 조합이어야 합니다.' }
                         , validate: { checkUrl: async () => await handleDupChkInspId() }
                       } )} />
                { errors.inspId && <span className={"invalid-feedback"}>{errors.inspId.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel>점검자 비밀번호</CLabel>
                <input className={ errors.inspPass && "is-invalid form-control"
                                  || (!errors.inspPass && getValues("inspPass") !== "") && "form-control is-valid"
                                  || (!errors.inspPass && getValues("inspPass") === "") && "form-control" }
                       type={"password"} placeholder={"숫자/문자/특수문자 포함 8~15자 내로 입력하세요."}
                       { ...register("inspPass", {
                           required: { value: true, message: '비밀번호는 필수입니다.' }
                         , minLength: { value: 8, message: '8자 이상 입력하세요.' }
                         , maxLength: { value: 15, message: '15자 내로 입력하세요.' }
                         , pattern: { value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/, message: '숫자/문자/특수문자 포함 8~15자 내로 입력하세요.' }
                       }) } />
                { errors.inspPass && <span className={"invalid-feedback"}>{errors.inspPass.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel>점검자 이름</CLabel>
                <input className={ errors.inspName && "is-invalid form-control"
                                  || (!errors.inspName && getValues("inspName") !== "") && "form-control is-valid"
                                  || (!errors.inspName && getValues("inspName") === "") && "form-control" }
                       type={"text"} placeholder={"2~50자 내로 입력하세요."}
                       { ...register("inspName", {
                           required: { value: true, message: '이름은 필수입니다.' }
                         , minLength: { value: 2, message: '2자 이상 입력하세요.' }
                         , maxLength: { value: 50, message: '50자 내로 입력하세요.' }
                         , pattern: { value: /^[가-힣]{2,50}[0-9]*$|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/, message: '이름 형식에 맞게 입력하세요.' }
                       }) } />
                { errors.inspName && <span className={"invalid-feedback"}>{errors.inspName.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel>점검자 이메일</CLabel>
                <input className={ errors.inspEmail && "is-invalid form-control"
                                  || (!errors.inspEmail && getValues("inspEmail") !== "") && "form-control is-valid"
                                  || (!errors.inspEmail && getValues("inspEmail") === "") && "form-control" }
                       type={"text"} placeholder={"이메일 형식에 맞게 입력하세요."}
                       { ...register("inspEmail", {
                         pattern: {
                             value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
                           , message: "이메일 형식에 맞게 입력해주세요."
                         }
                       }) } />
                { errors.inspEmail && <span className={"invalid-feedback"}>{errors.inspEmail.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel>점검자 연락처</CLabel>
                <input className={ errors.inspTel && "is-invalid form-control"
                                  || (!errors.inspTel && getValues("inspTel") !== "") && "form-control is-valid"
                                  || (!errors.inspTel && getValues("inspTel") === "") && "form-control" }
                       type={"text"} placeholder={"연락처 형식에 맞게 입력하세요."}
                       { ...register("inspTel", {
                         pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "전화번호 형식에 맞게 입력해주세요." }
                       }) } />
                { errors.inspTel && <span className={"invalid-feedback"}>{errors.inspTel.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel>점검자 휴대폰 번호</CLabel>
                <input className={ errors.inspMobile && "is-invalid form-control"
                                  || (!errors.inspMobile && getValues("inspMobile") !== "") && "form-control is-valid"
                                  || (!errors.inspMobile && getValues("inspMobile") === "") && "form-control" }
                       type={"text"} placeholder={"휴대폰 번호 형식에 맞게 입력하세요."}
                       { ...register("inspMobile", {
                         pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "휴대폰 번호 형식에 맞게 입력하세요." }
                       }) } />
              </CCol>
              { errors.inspMobile && <span className={"invalid-feedback"}>{errors.inspMobile.message}</span> }
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor={"inspAreaCode"}>점검자 소속 시장</CLabel>
                <CSelect id={"modalInsInspAreaCode"} {...register("inspAreaCode")}></CSelect>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor={"inspShopName"}>점검자 소속 업체</CLabel>
                <input className={ errors.inspShopName && "is-invalid form-control"
                                  || (!errors.inspShopName && getValues("inspShopName") !== "") && "form-control is-valid"
                                  || (!errors.inspShopName && getValues("inspShopName") === "") && "form-control" }
                       type={"text"} placeholder={"2~100자 내로 입력하세요."}
                       { ...register("inspShopName", {
                           minLength: { value: 2, message: "2자 이상 입력하세요." }
                         , maxLength: { value: 100, message: "100자 내로 입력하세요." }
                       }) } />
                { errors.inspShopName && <span className={"invalid-feedback"}>{errors.inspShopName.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="12">
                <CLabel htmlFor={"inspAddr"}>점검자 주소</CLabel>
                <input className={ errors.inspAddr && "is-invalid form-control"
                                  || (!errors.inspAddr && getValues("inspAddr") !== "") && "form-control is-valid"
                                  || (!errors.inspAddr && getValues("inspAddr") === "") && "form-control" }
                       type={"text"} placeholder={"200자 내로 입력하세요."}
                       { ...register("inspAddr", {
                           minLength: { value: 2, message: "2자 이상 입력하세요." }
                         , maxLength: { value: 200, message: "200자 내로 입력하세요." }
                       }) } />
              </CCol>
              { errors.inspAddr && <span className={"invalid-feedback"}>{errors.inspAddr.message}</span> }
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
            <CButton color="info" type="submit">등록</CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default InsprInsertModal;
