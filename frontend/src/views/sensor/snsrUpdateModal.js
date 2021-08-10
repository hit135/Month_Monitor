import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol, CSwitch, CInput, CFormText } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import { getAreaList, getParentKey } from "../../agent/area";
import { deleteSnsr, updateSnsr } from "../../agent/sensor";
import PageStrTableModalWidget from "../../widget/pageStrTableModalWidget";

const SnsrUpdateModal = props => {
  let gData = [];
  const { modal, setModal, snsrContent, handleInitTable } = props
  const [onAreaModal, setOnAreaModal] = useState();
  const [onStrModal, setOnStrModal] = useState();

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
        sVol : 20,
        sSce : 240,
        sOc1V1 : 100,
        sOc1V2 : 120,
        sOc1T1 : 60,
        sOc1T2 : 30,
        sOc2V1 : 120,
        sOc2V2 : 130,
        sOc2T1 : 60,
        sOc2T2 : 10,
        sIgo1V : 15,
        sIgo1T : 10,
        sIgo2V : 17,
        sIgo2T : 10,
        sIgr1V : 3,
        sIgr1T : 10,
        sIgr2V : 5,
        sIgr2T : 120,
        snsrPosLat: null,
        snsrPosLon: null,
      }, mode: "all"
    }
  );

  useEffect(async () => {
    reset(snsrContent);
  }, [snsrContent]);

  const onSubmit = (data, e) => {
    console.log(data);
    data.updSnsrId = snsrContent.snsrId;

    updateSnsr(data).then((resp) => {
      if(resp.data["result"] === "success") {
        alert("센서 수정을 완료했습니다.");
        closeModal();
        handleInitTable();
      } else if(resp.data["result"] === "duplicate") {
        alert("중복되는 센서아이디가 존재합니다. 확인 후 다시 시도해주세요.");
      } else {
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        closeModal();
      }
    });
  };

  const closeModal = async () => {
    setModal(!modal);
    reset();
  }

  const nodeClick = async (e, node) => {
    if (gData !== []) {
      await getAreaList().then(function (resp) {
        gData = resp.data["resultList"];
      });
    }

    const parentKey = getParentKey(node.key, gData);
    setValue("levelAreaCode", node["key"]);
    if (parentKey !== undefined) {
      setValue("areaCode", parentKey);
    } else {
      setValue("areaCode", node["key"]);
    }
  }

  const initAreaCode = () => {
    setValue("areaCode", "");
    setValue("levelAreaCode", "");
  }

  const handleClickDeleteSnsr = snsrId => {
    deleteSnsr(snsrId).then(resp => {
      if (resp.data["result"] === "success") {
        alert("센서 삭제를 완료했습니다.");
        closeModal();
        handleInitTable();
      } else {
        alert("센서 삭제에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        closeModal();
      }
    });
  }

  const clickStrRow = e => setValue("strCode", e.strCode);
  const initStrCode = () => setValue("strCode", "");

  return (
    <>
      <CModal show={modal} onClose={() => closeModal()} color="info">
        <form onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader>
          <CModalTitle style={{ color: "#fff" }}>센서 수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="snsrId" className={"mb-0"}>센서 아이디<span className={"required-span"}> *</span></CLabel>
              <input className={errors.snsrId && "is-invalid form-control" || (!errors.snsrId && getValues("snsrId") !== "") && "form-control is-valid" || (!errors.snsrId && getValues("snsrId") === "") && "form-control"}
                     {...register("snsrId", { required: true})} placeholder={"센서아이디를 입력해주세요."} />
              {errors.snsrId && errors.snsrId.type === "required" && <span className={"invalid-feedback"}>센서아이디를 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="snsrNick" className={"mb-0"}>센서명<span className={"required-span"}> *</span></CLabel>
              <input className={errors.snsrNick && "is-invalid form-control" || (!errors.snsrNick && getValues("snsrNick") !== "") && "form-control is-valid" || (!errors.snsrNick && getValues("snsrNick") === "") && "form-control"}
                     {...register("snsrNick", { required: true, minLength: 1, maxLength: 50})} placeholder={"센서명을 입력해주세요."} />
              {errors.snsrNick && errors.snsrNick.type === "required" && <span className={"invalid-feedback"}>센서명을 입력해주세요.</span>}
              {errors.snsrNick && errors.snsrNick.type === "minLength" && <span className={"invalid-feedback"}>센서명을 1글자 이상으로 입력해주세요.</span>}
              {errors.snsrNick && errors.snsrNick.type === "maxLength" && <span className={"invalid-feedback"}>센서명을 50글자 이하로 입력해주세요.</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="areaCode" className={"mb-0"}>구역선택</CLabel>
              <input className={errors.areaCode && "is-invalid form-control" || (!errors.areaCode && getValues("areaCode") !== "") && "form-control is-valid" || (!errors.areaCode && getValues("areaCode") === "") && "form-control"}
                     {...register("areaCode")} placeholder={"구역을 선택해주세요."} onClick={(e) => setOnAreaModal(true)} readOnly={true} />
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strCode"  className={"mb-0"}>상점선택</CLabel>
              <input className={errors.strCode && "is-invalid form-control" || (!errors.strCode && getValues("strCode") !== "") && "form-control is-valid" || (!errors.strCode && getValues("strCode") === "") && "form-control"}
                     {...register("strCode")} placeholder={"상점을 선택해주세요."} onClick={(e) => setOnStrModal(true)} readOnly={true} />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="channel" className={"mb-0"}>채널</CLabel>
              <select className={"form-control"} {...register("channel")}>
                <option key={1} value={1}>1</option>
                <option key={2} value={2}>2</option>
                <option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option>
              </select>
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="snsrAddr" className={"mb-0"}>주소</CLabel>
              <input className={errors.snsrAddr && "is-invalid form-control" || (!errors.snsrAddr && getValues("snsrAddr") !== "") && "form-control is-valid" || (!errors.snsrAddr && getValues("snsrAddr") === "") && "form-control"}
                     {...register("snsrAddr", { minLength: 5, maxLength: 200})} placeholder={"주소를 입력해주세요."} />
              {errors.snsrAddr && errors.snsrAddr.type === "minLength" && <span className={"invalid-feedback"}>주소를 5글자 이상으로 입력해주세요.</span>}
              {errors.snsrAddr && errors.snsrAddr.type === "maxLength" && <span className={"invalid-feedback"}>주소를 200글자 이하으로 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="snsrPosLat" className={"mb-0"}>구역위도</CLabel>
              <input className={errors.snsrPosLat && "is-invalid form-control" || (!errors.snsrPosLat && getValues("snsrPosLat") !== null) && "form-control is-valid" || (!errors.snsrPosLat && getValues("snsrPosLat") === null) && "form-control"}
                     {...register("snsrPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.snsrPosLat && errors.snsrPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLat.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strPosLon" className={"mb-0"}>구역경도</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="sVol" className={"mb-0"}>차단기용량</CLabel>
              <input className={errors.sVol && "is-invalid form-control" || (!errors.sVol && getValues("sVol") !== "") && "form-control is-valid" || (!errors.sVol && getValues("sVol") === "") && "form-control"}
                     {...register("sVol")} />
              {errors.sVol && errors.sVol.type === "required" && <span className={"invalid-feedback"}>차단기 용량를 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sSec" className={"mb-0"}>전송주기</CLabel>
              <input className={errors.sSec && "is-invalid form-control" || (!errors.sSec && getValues("sSec") !== "") && "form-control is-valid" || (!errors.sSec && getValues("sSec") === "") && "form-control"}
                     {...register("sSec", {required: true}) } />
              {errors.sSec && errors.sSec.type === "required" && <span className={"invalid-feedback"}>전송주기를 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc1V1" className={"mb-0"}>1차 전류 경보 임계값#1</CLabel>
              <input className={errors.sOc1V1 && "is-invalid form-control" || (!errors.sOc1V1 && getValues("sOc1V1") !== "") && "form-control is-valid" || (!errors.sOc1V1 && getValues("sOc1V1") === "") && "form-control"}
                     {...register("sOc1V1", {required: true}) } />
              {errors.sOc1V1 && errors.sOc1V1.type === "required" && <span className={"invalid-feedback"}>1차 전류 임계값#1을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc1V2" className={"mb-0"}>1차 전류 경보 임계값#2</CLabel>
              <input className={errors.sOc1V2 && "is-invalid form-control" || (!errors.sOc1V2 && getValues("sOc1V2") !== "") && "form-control is-valid" || (!errors.sOc1V2 && getValues("sOc1V2") === "") && "form-control"}
                     {...register("sOc1V2", {required: true}) } />
              {errors.sOc1V2 && errors.sOc1V2.type === "required" && <span className={"invalid-feedback"}>1차 전류 임계값#2을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc1T1" className={"mb-0"}>1차 전류 경보 임계시간#2</CLabel>
              <input className={errors.sOc1T1 && "is-invalid form-control" || (!errors.sOc1T1 && getValues("sOc1T1") !== "") && "form-control is-valid" || (!errors.sOc1T1 && getValues("sOc1T1") === "") && "form-control"}
                     {...register("sOc1T1", {required: true}) }  />
              {errors.sOc1T1 && errors.sOc1T1.type === "required" && <span className={"invalid-feedback"}>1차 전류 임계시간#1을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc1T2" className={"mb-0"}>1차 전류 경보 임계시간#2</CLabel>
              <input className={errors.sOc1T2 && "is-invalid form-control" || (!errors.sOc1T2 && getValues("sOc1T2") !== "") && "form-control is-valid" || (!errors.sOc1T2 && getValues("sOc1T2") === "") && "form-control"}
                     {...register("sOc1T2", {required: true}) } />
              {errors.sOc1T2 && errors.sOc1T2.type === "required" && <span className={"invalid-feedback"}>1차 전류 임계시간#2을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc2V1" className={"mb-0"}>2차 전류 경보 임계값#1</CLabel>
              <input className={errors.sOc2V1 && "is-invalid form-control" || (!errors.sOc2V1 && getValues("sOc2V1") !== "") && "form-control is-valid" || (!errors.sOc2V1 && getValues("sOc2V1") === "") && "form-control"}
                     {...register("sOc2V1", {required: true}) } />
              {errors.sOc1T2 && errors.sOc1T2.type === "required" && <span className={"invalid-feedback"}>2차 전류 임계값#1을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc2V2" className={"mb-0"}>2차 전류 경보 임계값#2</CLabel>
              <input className={errors.sOc2V2 && "is-invalid form-control" || (!errors.sOc2V2 && getValues("sOc2V2") !== "") && "form-control is-valid" || (!errors.sOc2V2 && getValues("sOc2V2") === "") && "form-control"}
                     {...register("sOc2V2", {required: true}) } />
              {errors.sOc2V2 && errors.sOc2V2.type === "required" && <span className={"invalid-feedback"}>2차 전류 임계값#2을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc2T1" className={"mb-0"}>2차 전류 경보 임계시간#1</CLabel>
              <input className={errors.sOc2T1 && "is-invalid form-control" || (!errors.sOc2T1 && getValues("sOc2T1") !== "") && "form-control is-valid" || (!errors.sOc2T1 && getValues("sOc2T1") === "") && "form-control"}
                     {...register("sOc2T1", {required: true}) } />
              {errors.sOc2T1 && errors.sOc2T1.type === "required" && <span className={"invalid-feedback"}>2차 전류 임계시간#1을 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="sOc2T2" className={"mb-0"}>2차 전류 경보 임계시간#2</CLabel>
              <input className={errors.sOc2T2 && "is-invalid form-control" || (!errors.sOc2T2 && getValues("sOc2T2") !== "") && "form-control is-valid" || (!errors.sOc2T2 && getValues("sOc2T2") === "") && "form-control"}
                     {...register("sOc2T2") } />
              {errors.sOc2T2 && errors.sOc2T2.type === "required" && <span className={"invalid-feedback"}>2차 전류 임계시간#2을 입력해주세요.</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="sIgo1V" className={"label-text"}>1차 IGO 임계값</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgo1V && "is-invalid form-control" || (!errors.sIgo1V && getValues("sIgo1V") !== "") && "form-control is-valid" || (!errors.sIgo1V && getValues("sIgo1V") === "") && "form-control"}
                     {...register("sIgo1V", {required: true}) } />
              {errors.sIgo1V && errors.sIgo1V.type === "required" && <span className={"invalid-feedback"}>1차 IGO 임계값을 입력해주세요.</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="sIgo1T" className={"label-text"}>1차 IGO 임계시간</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgo1T && "is-invalid form-control" || (!errors.sIgo1T && getValues("sIgo1T") !== "") && "form-control is-valid" || (!errors.sIgo1T && getValues("sIgo1T") === "") && "form-control"}
                     {...register("sIgo1T", {required: true}) } />
              {errors.sIgo1T && errors.sIgo1T.type === "required" && <span className={"invalid-feedback"}>1차 IGO 임계시간을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgo2V" className={"label-text"}>2차 IGO 임계값</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgo2V && "is-invalid form-control" || (!errors.sIgo2V && getValues("sIgo2V") !== "") && "form-control is-valid" || (!errors.sIgo2V && getValues("sIgo2V") === "") && "form-control"}
                     {...register("sIgo2V", {required: true}) } />
              {errors.sIgo2V && errors.sIgo2V.type === "required" && <span className={"invalid-feedback"}>2차 IGO 임계값을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgo2T" className={"label-text"}>2차 IGO 임계시간</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgo2T && "is-invalid form-control" || (!errors.sIgo2T && getValues("sIgo2T") !== "") && "form-control is-valid" || (!errors.sIgo2T && getValues("sIgo2T") === "") && "form-control"}
                     {...register("sIgo2T", {required: true}) } />
              {errors.sIgo2T && errors.sIgo2T.type === "required" && <span className={"invalid-feedback"}>2차 IGO 임계시간을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgr1V" className={"label-text"}>1차 IGR 임계값</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgr1V && "is-invalid form-control" || (!errors.sIgr1V && getValues("sIgr1V") !== "") && "form-control is-valid" || (!errors.sIgr1V && getValues("sIgr1V") === "") && "form-control"}
                     {...register("sIgr1V", {required: true}) } />
              {errors.sIgr1V && errors.sIgr1V.type === "required" && <span className={"invalid-feedback"}>1차 IGR 임계값을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgr1T" className={"label-text"}>1차 IGR 임계시간</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgr1T && "is-invalid form-control" || (!errors.sIgr1T && getValues("sIgr1T") !== "") && "form-control is-valid" || (!errors.sIgr1T && getValues("sIgr1T") === "") && "form-control"}
                     {...register("sIgr1T", {required: true}) } />
              {errors.sIgr1T && errors.sIgr1T.type === "required" && <span className={"invalid-feedback"}>1차 IGR 임계시간을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgr2V" className={"label-text"}>2차 IGR 임계값</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgr2V && "is-invalid form-control" || (!errors.sIgr2V && getValues("sIgr2V") !== "") && "form-control is-valid" || (!errors.sIgr2V && getValues("sIgr2V") === "") && "form-control"}
                     {...register("sIgr2V", {required: true}) } />
              {errors.sIgr2V && errors.sIgr2V.type === "required" && <span className={"invalid-feedback"}>2차 IGR 임계값을 입력해주세요.</span>}
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="sIgr2T" className={"label-text"}>2차 IGR 임계시간</CLabel>
            </CCol>
            <CCol xs="6" md="3">
              <input className={errors.sIgr2T && "is-invalid form-control" || (!errors.sIgr2T && getValues("sIgr2T") !== "") && "form-control is-valid" || (!errors.sIgr2T && getValues("sIgr2T") === "") && "form-control"}
                     {...register("sIgr2T", {required: true}) } />
              {errors.sIgr2T && errors.sIgr2T.type === "required" && <span className={"invalid-feedback"}>2차 IGR 임계시간을 입력해주세요.</span>}
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter style={{ display: "block" }}>
          <div className={'d-flex'}>
            <div className={"mr-auto"}>
              <CButton color="danger" className={"mr-auto"} onClick={(e) => {handleClickDeleteSnsr(snsrContent.snsrId)}}>삭제</CButton>
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
      <PageStrTableModalWidget onStrModal={onStrModal} setOnStrModal={setOnStrModal} clickStrRow={clickStrRow} initStrCode={initStrCode}/>
    </>
  )
}

export default SnsrUpdateModal
