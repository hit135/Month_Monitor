import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol } from "@coreui/react";
import { insertSnsru } from "../../agent/sensor";

const SnsruInsertModal = props => {

  const { modal, setModal, handleInitTable } = props;

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm(
    {
      defaultValues: {}, mode: "all"
    }
  );

  const onSubmit = (data, e) => insertSnsru(data).then(resp => {
    if (resp.data["result"]) {
      alert("센서 갱신 이력 등록을 완료했습니다.");
      closeModal();
      handleInitTable();
    } else {
      alert("센서 갱신 이력 등록 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });


  const closeModal = async () => {
    setModal(!modal);
    reset();
  };

  return (
    <>
      <CModal show={modal} onClose={closeModal} color={"info"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle style={{ color: "#fff" }}>센서 갱신 이력 등록</CModalTitle>
          </CModalHeader>
          <CModalBody>


          </CModalBody>
        </form>
      </CModal>
    </>
  );

};

export default SnsruInsertModal;
