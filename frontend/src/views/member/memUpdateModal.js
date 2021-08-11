import { CButton, CFormGroup, CRow, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteMem, updateMem } from "../../agent/member";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { convertPhoneNumber } from "../../agent/commonIndex";

const MemUpdateModal = props => {
  const { modal, setModal, userContent, handleInitTable } = props;
  const [onAreaModal, setOnAreaModal] = useState();
  const [appSwitch, setAppSwitch] = useState({ useYn: false, delYn: false, memIsLeave: false, memRcvSms: false });

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues, setFocus, setError } = useForm(
    { mode: "all" }
  );

  useEffect(() => {
    appSwitch.useYn = (userContent.useYn === "Y");
    appSwitch.delYn = (userContent.delYn === "Y");
    appSwitch.memIsLeave = (userContent.memIsLeave === "Y");
    appSwitch.memRcvSms = (userContent.memRcvSms === "Y");

    reset(userContent);
  }, [userContent]);

  let switchCommonHtml = (txt, color, labelOn, labelOff, id, checked) =>
    <CFormGroup className="pr-3 d-inline-flex">
      <CLabel htmlFor="useYn" className="pr-1">{txt}</CLabel>
      <CSwitch className={'mx-1'} color={color} labelOn={labelOn} labelOff={labelOff} id={id} onChange={setSwitchValue} checked={checked} />
    </CFormGroup>;

  const initAreaCode = () => setValue("memAreaCode", "");
  const nodeClick = (e, node) => setValue("memAreaCode", node["key"]);

  const setSwitchValue = e => {
    const value = (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setAppSwitch(data => ({ ...data, [e.target.id]: (value === "Y") }));
    setValue(e.target.id, value);
  };

  const handleChangePhoneNumber = e => {
    e = e || window.e;
    e.target.value = convertPhoneNumber(e.target.value.trim());
  };

  let handleInputClass = key =>
    (Object.keys(errors).length === 0) ? "form-control" : ((typeof errors[key] !== 'undefined') ? "is-invalid form-control" : "is-valid form-control");

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
    , memMemo: {}
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
          closeModal();
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
          closeModal();
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
      <CModal show={modal} onClose={() => closeModal()} color="info" size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>회원 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
             <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="userId">아이디</CLabel>
                <input readOnly={true} className={"form-control"} {...register("userId")} />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="memPwd">비밀번호</CLabel>
                <input className={handleInputClass("memPwd")} type={"password"} placeholder={"비밀번호 입력 시 변경됩니다."}
                       { ...register('memPwd', regOpts['memPwd']) } />
                { errors.memPwd && <span className={"invalid-feedback"}>{errors.memPwd.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="memName">사용자 이름<span className={"required-span"}> *</span></CLabel>
                <input className={handleInputClass("memName")} type={"text"} placeholder={"최소 2글자, 최대 50글자"}
                       { ...register("memName", regOpts['memName']) } />
                { errors.memName && <span className={"invalid-feedback"}>{errors.memName.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="memEmail">사용자 이메일</CLabel>
                <input className={handleInputClass("memEmail")} type={"text"}
                       { ...register("memEmail", regOpts['memEmail']) } />
                { errors.memEmail && <span className={"invalid-feedback"}>{errors.memEmail.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="memTel">전화번호</CLabel>
                <input className={handleInputClass("memTel")} type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"전화번호를 입력해주세요."}
                       { ...register("memTel", regOpts['memTel']) } />
                { errors.memTel && <span className={"invalid-feedback"}>{errors.memTel.message}</span> }
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="memMobile">휴대폰번호</CLabel>
                <input className={handleInputClass("memMobile")}  type={"text"} onKeyUp={handleChangePhoneNumber} placeholder={"휴대폰번호를 입력해주세요."}
                       { ...register("memMobile", regOpts['memMobile']) } />
                { errors.memMobile && <span className={"invalid-feedback"}>{errors.memMobile.message}</span> }
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="memAreaCode">구역선택</CLabel>
                <input className={"form-control"} readOnly={true} placeholder={"구역을 선택해주세요."} onClick={e => setOnAreaModal(true)} />
              </CCol>
            </CFormGroup>
            <CRow className={"pl-3 pr-3 mt-4"}>
              {switchCommonHtml('사용유무', 'info', '사용', '미사용', 'useYn', appSwitch.useYn)}
              {switchCommonHtml('탈퇴유무', 'danger', '탈퇴', '미탈퇴', 'memIsLeave', appSwitch.memIsLeave)}
              {switchCommonHtml('삭제유무', 'danger', '삭제', '미삭제', 'delYn', appSwitch.delYn)}
              {switchCommonHtml('SMS수신여부', 'info', '사용', '미사용', 'memRcvSms', appSwitch.memRcvSms)}
            </CRow>
            <CFormGroup row>
              <CCol md="12">
                <CLabel htmlFor="memMemo">메모</CLabel>
                <textarea className={"form-control textarea-height"} name="textarea-input" id="textarea-input" rows="12" placeholder="메모를 입력해주세요."
                          { ...register("memMemo", regOpts['memMemo']) } />
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter style={{ display: "block" }}>
            <div className={'d-flex'}>
              <div className={"mr-auto"}>
                <CButton color="danger" className={"mr-auto"} onClick={() => handleConfirmDelUser(userContent.userId)}>삭제</CButton>
              </div>
              <div>
                <CButton className={"mr-2"} color="secondary" onClick={() => closeModal()}>취소</CButton>
                <CButton color="info" type="submit">수정</CButton>
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
