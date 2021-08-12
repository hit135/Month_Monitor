import { CButton, CFormGroup, CRow, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch } from "@coreui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { insertMem } from "../../agent/member";
import { convertPhoneNumber, API_ROOT } from "../../agent/commonIndex";

const MemInsertModal = props => {
  const { modal, setModal, handleInitTable } = props;

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    { defaultValues: { useYn: "Y", memIsLeave: "N", memRcvSms: "Y", delYn: "N", groupUse: "N" }, mode: "all" }
  );

  let switchCommonHtml = (id, txt, color, labelOn, labelOff, defaultChecked) =>
    <CFormGroup className="pr-3 d-inline-flex">
      <CLabel htmlFor={id} className="pr-1">{txt}</CLabel>
      <CSwitch className={'mx-1'} id={id} color={color} labelOn={labelOn} labelOff={labelOff} onChange={setSwitchValue} defaultChecked={defaultChecked}
               { ...register(id) } />
    </CFormGroup>;

  const setSwitchValue = e => setValue(e.target.id, (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value);

  const handleChangePhoneNumber = e => {
    e = e || window.e;
    e.target.value = convertPhoneNumber(e.target.value.trim());
  };

  let handleInputClass = key =>
    (Object.keys(errors).length === 0) ? "form-control" : ((typeof errors[key] !== 'undefined') ? "is-invalid form-control" : "is-valid form-control");

  const { onBlur, ...rest } = register("userId", {
      required: { value: true, message: '아이디를 입력해주세요.' }
    , minLength: { value: 5, message: '아이디를 5글자 이상으로 입력해주세요.' }
    , maxLength: { value: 20, message: '아이디를 20글자 이하로 입력해주세요.' }
    , pattern: { value: /^[a-z]+[a-z0-9]{4,19}$/g, message: "아이디는 영문자로 시작하는 5~20자 영문자 또는 숫자이어야 합니다." }
  });

  const handleOnBlurUserId = userId => {
    if (!errors.userId) {
      axios.get(`${API_ROOT}/dupMemChk?userId=${userId}`).then(resp => {
        if (resp.data["result"] > 0) {
          setValue("userId", "");
          setError("userId", { type: "dupUserId", message: "중복되는 아이디가 존재합니다. 다른 아이디로 등록해주세요." });
          setFocus("userId");
        }
      });
    }
  };

  const regOpts = {
      memPwd: {
          required: { value: true, message: '비밀번호를 입력해주세요.' }
        , minLength: { value: 8, message: '비밀번호를 8글자 이상으로 입력해주세요.' }
        , maxLength: { value: 15, message: '비밀번호를 15글자 이하로 입력해주세요.' }
        , pattern: {
              value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/
            , message: '비밀번호 형식에 맞게 입력해주세요. (특수문자 / 문자 / 숫자 포함 8~15자리)'
          }
      }
    , memName: {
          required: { value: true, message: '이름을 입력해주세요.' }
        , minLength: { value: 2, message: '이름을 2글자 이상으로 입력해주세요.' }
        , maxLength: { value: 50, message: '이름을 50글자 이하로 입력해주세요.' }
      }
    , memEmail: {
        pattern: {
            value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
          , message: "이메일 형식에 맞게 입력해주세요."
        }
      }
    , memTel: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message: "전화번호 형식에 맞게 입력해주세요." } }
    , memMobile: { pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, message: "휴대폰번호 형식에 맞게 입력해주세요." } }
  };

  const onSubmit = (data, e) => insertMem(data).then(resp => {
    if (resp.data["result"] === "success") {
      alert("회원 등록을 완료했습니다.");
      closeModal();
      handleInitTable();
    } else {
      alert("회원 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      closeModal();
    }
  });

  const closeModal = () => {
    setModal(!modal);
    reset();
  };

  return (
    <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader>
          <CModalTitle style={{ color: "#fff" }}>회원 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
           <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"userId"}>아이디<span className={"required-span"}> *</span></CLabel>
              <input className={handleInputClass("userId")} id={"userId"} type={"text"} placeholder={"아이디를 입력해주세요."}
                     onBlur={e => handleOnBlurUserId(e.target.value)} { ...rest } />
              { errors.userId && <span className={"invalid-feedback"}>{errors.userId.message}</span> }
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"memPwd"}>비밀번호<span className={"required-span"}> *</span></CLabel>
              <input className={handleInputClass("memPwd")} id={"memPwd"} type={"password"} placeholder={"특수문자 / 문자 / 숫자 포함 형태의 8~15자리"}
                     { ...register('memPwd', regOpts['memPwd']) } />
              { errors.memPwd && <span className={"invalid-feedback"}>{errors.memPwd.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor={"memName"}>사용자 이름<span className={"required-span"}> *</span></CLabel>
              <input className={handleInputClass("memName")} id={"memName"} type={"text"} placeholder={"최소 2글자, 최대 50글자"}
                     { ...register("memName", regOpts['memName']) } />
              { errors.memName && <span className={"invalid-feedback"}>{errors.memName.message}</span> }
            </CCol>
            <CCol md="6">
              <CLabel htmlFor={"memEmail"}>사용자 이메일</CLabel>
              <input className={handleInputClass("memEmail")} id={"memEmail"} type={"text"} placeholder={"이메일을 입력해주세요."}
                     { ...register("memEmail", regOpts['memEmail']) } />
              { errors.memEmail && <span className={"invalid-feedback"}>{errors.memEmail.message}</span> }
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="memTel">전화번호</CLabel>
              <input className={handleInputClass("memTel")} id={"memTel"} type={"text"} placeholder={"전화번호를 입력해주세요."}
                     onKeyUp={handleChangePhoneNumber} { ...register("memTel", regOpts['memTel']) } />
              { errors.memTel && <span className={"invalid-feedback"}>{errors.memTel.message}</span> }
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="memMobile">휴대폰번호</CLabel>
              <input className={handleInputClass("memMobile")} id={"memMobile"} type={"text"} placeholder={"휴대폰번호를 입력해주세요."}
                     onKeyUp={handleChangePhoneNumber} { ...register("memMobile", regOpts['memMobile']) } />
              { errors.memMobile && <span className={"invalid-feedback"}>{errors.memMobile.message}</span> }
            </CCol>
          </CFormGroup>
          <CRow className={"pl-3 pr-3"}>
            {switchCommonHtml('useYn', '사용유무', 'info', '사용', '미사용', true)}
            {switchCommonHtml('memIsLeave', '탈퇴유무', 'danger', '탈퇴', '미탈퇴', false)}
            {switchCommonHtml('delYn', '삭제유무', 'danger', '삭제', '미삭제', false)}
            {switchCommonHtml('memRcvSms', 'SMS수신여부', 'info', '사용', '미사용', true)}
          </CRow>
          <CFormGroup row>
            <CCol md="12">
              <CLabel htmlFor={"memMemo"}>메모</CLabel>
              <textarea className={"form-control textarea-height"} id={"memMemo"} rows="12" placeholder="메모를 입력해주세요." { ...register("memMemo") } />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
          <CButton color="info" type="submit">등록</CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default MemInsertModal;
