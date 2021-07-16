import {
  CButton, CFormGroup,
  CInput,
  CForm,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol, CInvalidFeedback
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const MemActionModal = (props) => {
  const { info, setInfo } = props
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <CModal
        show={info}
        onClose={() => setInfo(!info)}
        color="info"
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>회원 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
           <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="userId">아이디</CLabel>
              <input className={"form-control"} {...register("userId", { required: true })} />
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="userPwd">패스워드</CLabel>
              <input className={errors.userPwd && "is-invalid form-control" || !errors.userPwd && "form-control is-valid"}
                     {...register("userPwd", { required: true })} />
              {errors.userPwd && <span>비밀번호 형식에 맞게 입력해주세요.</span>}
            </CCol>
          </CFormGroup>
          <input type="submit" />
          </form>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
          <CButton color="info" onClick={() => setInfo(!info)}>Do Something</CButton>{' '}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default MemActionModal
