import {
  CButton, CFormGroup,
  CRow,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol, CSwitch
} from "@coreui/react";
import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

const StrActionModal = (props) => {
  const API_ROOT = 'http://localhost:8081/api';    // 로컬
  const { modal, setModal, handleInitTable } = props
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {

      }, mode: "all"
    }
  );

  const onSubmit = (data, e) => {

  };

  const closeModal = () => {
    setModal(!modal);
    reset();
  }

  const setSwitchValue = (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setValue(e.target.id, value);
  }

  // const handleChangePhoneNumber = (e) => {
  //   e = e || window.e;
  //   let _val = e.target.value.trim();
  //   e.target.value = convertPhoneNumber(_val) ;
  // }

  return (
    <>
      <CModal
        show={modal}
        onClose={() => closeModal()}
        color="info"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader>
          <CModalTitle>회원 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
           <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="userId">아이디<span className={"required-span"}> *</span></CLabel>
              <input className={errors.userId && "is-invalid form-control" || (!errors.userId && getValues("userId") !== "") && "form-control is-valid" || (!errors.userId && getValues("userId") === "") && "form-control"}
                onBlur={(e) => {
                  if(!errors.userId) {
                    axios
                      .get(`${API_ROOT}/dupMemChk?userId=${e.target.value}`)
                      .then(resp => {if(resp.data["result"] !== 0) {
                        setValue("userId", "");
                        setError("userId", {type: "dupUserId", message: "중복되는 아이디가 존재합니다. 다른 아이디로 등록해주세요."})
                        setFocus("userId");
                      }});
                  }
                }}
              />
              {errors.userId && errors.userId.type === "required" && <span className={"invalid-feedback"}>아이디를 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "pattern" && <span className={"invalid-feedback"}>{errors.userId.message}</span>}
              {errors.userId && errors.userId.type === "minLength" && <span className={"invalid-feedback"}>아이디를 5글자 이상으로 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "maxLength" && <span className={"invalid-feedback"}>아이디를 20글자 이하로 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "dupUserId" && <span className={"invalid-feedback"}>{errors.userId.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="userId">사용자 이름<span className={"required-span"}> *</span></CLabel>
              <input className={errors.memName && "is-invalid form-control" || (!errors.memName && getValues("memName") !== "") && "form-control is-valid" || (!errors.memName && getValues("memName") === "") && "form-control"}
                     placeholder={"최소 2글자 최대 50글자"}
                     {...register("memName", { required: true, minLength: 2, maxLength: 20})} />
              {errors.memName && errors.memName.type === "required" && <span className={"invalid-feedback"}>이름을 입력해주세요.</span>}
              {errors.memName && errors.memName.type === "minLength" && <span className={"invalid-feedback"}>이름을 2글자 이상으로 입력해주세요.</span>}
              {errors.memName && errors.memName.type === "maxLength" && <span className={"invalid-feedback"}>이름을 50글자 이하로 입력해주세요.</span>}
            </CCol>

          </CFormGroup>



          <CRow className={"pl-3 pr-3"}>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
              <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue} defaultChecked/>
            </CFormGroup>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="delYn" className="pr-1">삭제유무</CLabel>
              <CSwitch className={'mx-1'} color={'danger'} labelOn={'삭제'} labelOff={'미삭제'} id={"delYn"} onChange={setSwitchValue} />
            </CFormGroup>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
          <CButton color="info" type="submit">등록</CButton>
        </CModalFooter>
      </form>
      </CModal>
    </>
  )
}

export default StrActionModal
