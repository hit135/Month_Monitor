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
import {convertPhoneNumber, insertMem} from "../../agent/member";

const MemActionModal = (props) => {
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
  const API_ROOT = 'http://1.223.40.19:30081/api/';   // 로컬
  const { modal, setModal, handleInitTable } = props
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
        useYn : "Y",
        memIsLeave: "N",
        memRcvSms: "Y",
        delYn : "N",
        groupUse: "N",
      }, mode: "all"
    }
  );
  const { onBlur, ...rest } = register("userId", { required: true, minLength: 5, maxLength: 20, pattern: {value: /^[a-z]+[a-z0-9]{4,19}$/g,
      message: "아이디는 영문자로 시작하는 5~20자 영문자 또는 숫자이어야 합니다."}});

  const onSubmit = (data, e) => {
    insertMem(data).then(resp => {
      if(resp.data["result"] === "success") {
        alert("회원 등록을 완료했습니다.");
        closeModal();
        handleInitTable();
      } else {
        alert("회원 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
        closeModal();
      }
    });
  };

  const closeModal = () => {
    setModal(!modal);
    reset();
  }

  const setSwitchValue = (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setValue(e.target.id, value);
  }

  const handleChangePhoneNumber = (e) => {
    e = e || window.e;
    let _val = e.target.value.trim();
    e.target.value = convertPhoneNumber(_val) ;
  }

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
                {...rest}
              />
              {errors.userId && errors.userId.type === "required" && <span className={"invalid-feedback"}>아이디를 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "pattern" && <span className={"invalid-feedback"}>{errors.userId.message}</span>}
              {errors.userId && errors.userId.type === "minLength" && <span className={"invalid-feedback"}>아이디를 5글자 이상으로 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "maxLength" && <span className={"invalid-feedback"}>아이디를 20글자 이하로 입력해주세요.</span>}
              {errors.userId && errors.userId.type === "dupUserId" && <span className={"invalid-feedback"}>{errors.userId.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="memPwd">비밀번호<span className={"required-span"}> *</span></CLabel>
              <input className={errors.memPwd && "is-invalid form-control" || (!errors.memPwd && getValues("memPwd") !== "") && "form-control is-valid" || (!errors.memPwd && getValues("memPwd") === "") && "form-control"}
                     {...register("memPwd", { required: true, minLength: 8, maxLength: 15, pattern: {value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/} })} placeholder={"특수문자 / 문자 / 숫자 포함 형태의 8~15자리"} type={"password"}/>
              {errors.memPwd && errors.memPwd.type === "required" && <span className={"invalid-feedback"}>비밀번호를 입력해주세요.</span>}
              {errors.memPwd && errors.memPwd.type === "minLength" && <span className={"invalid-feedback"}>비밀번호를 8글자 이상으로 입력해주세요.</span>}
              {errors.memPwd && errors.memPwd.type === "maxLength" && <span className={"invalid-feedback"}>비밀번호를 15글자 이하로 입력해주세요.</span>}
              {errors.memPwd && errors.memPwd.type === "pattern" && <span className={"invalid-feedback"}>비밀번호 형식에 맞게 입력해주세요. (특수문자 / 문자 / 숫자 포함 8~15자리)</span>}
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

            <CCol md="6">
              <CLabel htmlFor="memEmail">사용자 이메일</CLabel>
              <input className={errors.memEmail && "is-invalid form-control" || (!errors.memEmail && getValues("memEmail") !== "") && "form-control is-valid" || (!errors.memEmail && getValues("memEmail") === "") && "form-control"}
                     {...register("memEmail", { pattern: {value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                                                                       message : "이메일 형식에 맞게 입력해주세요."} })} />
              {errors.memEmail && <span className={"invalid-feedback"}>{errors.memEmail.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="userId">전화번호</CLabel>

              <input className={errors.memTel && "is-invalid form-control" || (!errors.memTel && getValues("memTel") !== "") && "form-control is-valid" || (!errors.memTel && getValues("memTel") === "") && "form-control"}
                     onKeyUp={handleChangePhoneNumber} {...register("memTel", { pattern: {value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "전화번호 형식에 맞게 입력해주세요."} })} />
              {errors.memTel && errors.memTel.type === "pattern" && <span className={"invalid-feedback"}>{errors.memTel.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="memPwd">휴대폰번호</CLabel>
              <input className={errors.memMobile && "is-invalid form-control" || (!errors.memMobile && getValues("memMobile") !== "") && "form-control is-valid" || (!errors.memMobile && getValues("memMobile") === "") && "form-control"}
                     onKeyUp={handleChangePhoneNumber} {...register("memMobile", { pattern: {value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message : "휴대폰번호 형식에 맞게 입력해주세요."} })} />
              {errors.memMobile && errors.memMobile.type === "pattern" && <span className={"invalid-feedback"}>{errors.memMobile.message}</span>}
            </CCol>
          </CFormGroup>

          <CRow className={"pl-3 pr-3"}>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
              <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue} defaultChecked/>
            </CFormGroup>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="memIsLeave" className="pr-1">탈퇴유무</CLabel>
              <CSwitch className={'mx-1'} color={'danger'} labelOn={'탈퇴'} labelOff={'미탈퇴'} id={"memIsLeave"} onChange={setSwitchValue} />
            </CFormGroup>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="delYn" className="pr-1">삭제유무</CLabel>
              <CSwitch className={'mx-1'} color={'danger'} labelOn={'삭제'} labelOff={'미삭제'} id={"delYn"} onChange={setSwitchValue} />
            </CFormGroup>
            <CFormGroup className="pr-3 d-inline-flex">
              <CLabel htmlFor="memRcvSms" className="pr-1">SMS수신여부</CLabel>
              <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"memRcvSms"} onChange={setSwitchValue} defaultChecked />
            </CFormGroup>
          </CRow>

          <CFormGroup row>
            <CCol md="12">
              <CLabel htmlFor="memMemo">메모</CLabel>
              <textarea className={"form-control textarea-height"}
                name="textarea-input"
                id="textarea-input"
                rows="12"
                placeholder="메모를 입력해주세요."
                {...register("memMemo")}
              />
            </CCol>
          </CFormGroup>


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

export default MemActionModal
