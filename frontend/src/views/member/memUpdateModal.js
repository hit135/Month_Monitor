import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CButton, CFormGroup, CRow, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch } from "@coreui/react";

import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { deleteMem, updateMem } from "../../agent/member";
import { getValidInput, getInputValue, handleChangePhoneNumber } from "../../agent/commonIndex";

const MemUpdateModal = props => {
  const { modal, setModal, userContent, handleInitTable } = props;
  const [onAreaModal, setOnAreaModal] = useState();
  const [appSwitch, setAppSwitch] = useState({ useYn: false, delYn: false, memIsLeave: false, memRcvSms: false });

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ mode: "all" });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let inputCmmHtml = (id, txt, type, placeholder, required, handle) =>
    <CCol md={"6"}>
      <CLabel htmlFor={id}>{txt}{required && <span className={"required-span"}> *</span>}</CLabel>
      <input className={getValidInput(errors[id], getValues(id), "")} id={id} type={type} placeholder={placeholder} onKeyUp={handle}
             {...register(id, regOpts[id])} />
      { errors[id] && <span className={"invalid-feedback"}>{errors[id].message}</span> }
    </CCol>;

  let switchCmmHtml = (id, txt, color, labelOn, labelOff, checked) =>
    <CFormGroup className={"pr-3 d-inline-flex"}>
      <CLabel htmlFor={id} className={"pr-1"}>{txt}</CLabel>
      <CSwitch className={'mx-1'} id={id} color={color} labelOn={labelOn} labelOff={labelOff} onChange={setUpdSwitchValue} checked={checked} />
    </CFormGroup>;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    appSwitch.useYn = (userContent.useYn === "Y");
    appSwitch.delYn = (userContent.delYn === "Y");
    appSwitch.memIsLeave = (userContent.memIsLeave === "Y");
    appSwitch.memRcvSms = (userContent.memRcvSms === "Y");

    reset(userContent);
  }, [userContent]);

  const initAreaCode = () => setValue("memAreaCode", "");

  const nodeClick = (e, node) => setValue("memAreaCode", node["key"]);

  const setUpdSwitchValue = e => {
    const value = getInputValue(e);
    setAppSwitch(data => ({ ...data, [e.target.id]: (value === "Y") }));
    setValue(e.target.id, value);
  };

  const regOpts = {
      memPwd: {
          minLength: { value: 8, message: '비밀번호를 8글자 이상으로 입력해주세요.' }
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

  const handleConfirmDelUser = id => {
    if (window.confirm("회원을 영구 삭제하시겠습니까?")) {
      deleteMem(id).then(resp => {
        if (resp.data["result"] === "success") {
          alert("회원 삭제를 완료했습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("회원 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.");
        }
      });
    }
  };

  const onSubmit = (data, e) => {
    if (userContent.userId === data.userId) {
      updateMem(data).then(resp => {
        if (resp.data["result"] === "success") {
          alert("회원 수정을 완료했습니다.");
          closeModal();
          handleInitTable();
        } else {
          alert("회원 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.");
        }
      });
    } else {
      alert("악의적으로 아이디가 수정됐습니다. 잠시 후 다시 시도해주세요.");
      return false;
    }
  };

  const closeModal = () => {
    reset({});
    setModal(!modal);
  };

  return (
    <>
      <CModal show={modal} onClose={closeModal} color={"info"} size={"lg"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>회원 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
             <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"userId"}>아이디</CLabel>
                <input className={"form-control"} id={"userId"} type={"text"} readOnly={true} { ...register("userId") } />
              </CCol>
               {inputCmmHtml("memPwd", "비밀번호", "password", "비밀번호 입력시 변경됩니다.", false, null)}
            </CFormGroup>
            <CFormGroup row>
              {inputCmmHtml("memName", "사용자 이름", "text", "최소 2글자, 최대 50글자", true, null)}
              {inputCmmHtml("memEmail", "사용자 이메일", "text", "이메일을 입력해주세요.", false, null)}
            </CFormGroup>
            <CFormGroup row>
              {inputCmmHtml("memTel", "전화번호", "text", "전화번호를 입력해주세요.", true, handleChangePhoneNumber)}
              {inputCmmHtml("memMobile", "휴대폰번호", "text", "휴대폰번호를 입력해주세요.", false, handleChangePhoneNumber)}
            </CFormGroup>
            <CFormGroup row>
              <CCol md={"6"}>
                <CLabel htmlFor={"memAreaCode"}>구역선택</CLabel>
                <input className={"form-control"} id={"memAreaCode"} type={"text"} readOnly={true} onClick={e => setOnAreaModal(true)}
                       { ...register("memAreaCode") } />
              </CCol>
            </CFormGroup>
            <CRow className={"pl-3 pr-3 mt-4"}>
              {switchCmmHtml("useYn", "사용유무", "info", "사용", "미사용", appSwitch.useYn)}
              {switchCmmHtml("memIsLeave", "탈퇴유무", "danger", "탈퇴", "미탈퇴", appSwitch.memIsLeave)}
              {switchCmmHtml("delYn", "삭제유무", "danger", "삭제", "미삭제", appSwitch.delYn)}
              {switchCmmHtml("memRcvSms", "SMS수신여부", "info", "사용", "미사용", appSwitch.memRcvSms)}
            </CRow>
            <CFormGroup row>
              <CCol md={"12"}>
                <CLabel htmlFor={"memMemo"}>메모</CLabel>
                <textarea className={"form-control textarea-height"} id={"memMemo"} rows={"12"} placeholder={"메모를 입력해주세요."} { ...register("memMemo") } />
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color={"danger"} className={"mr-auto"} onClick={() => handleConfirmDelUser(userContent.userId)}>삭제</CButton>
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
    </>
  );
};

export default MemUpdateModal;
