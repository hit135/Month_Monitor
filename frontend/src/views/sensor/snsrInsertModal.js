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
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { DropzoneArea } from 'material-ui-dropzone';
import {convertPhoneNumber} from "../../agent/commonIndex";
import {insertStr} from "../../agent/store";
import PageAreaTreeModalWidget from "../../widget/pageAreaTreeModalWidget";
import {getAreaList, getParentKey} from "../../agent/area";

const StrInsertModal = (props) => {
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
  const API_ROOT = 'http://1.223.40.19:30081/api/';
  let gData = [];
  const { modal, setModal, handleInitTable } = props
  const [onAreaModal, setOnAreaModal] = useState();

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, getValues, setError } = useForm(
    {
      defaultValues: {
        snsrPosLat: null,
        snsrPosLon: null,
      }, mode: "all"
    }
  );

  const onSubmit = (data, e) => {

  };

  const closeModal = async () => {
    setModal(!modal);
    reset();
  }

  const setSwitchValue = (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setValue(e.target.id, value);
  }

  const nodeClick = async (e, node) => {
    if(gData !== []) {
      await getAreaList().then(function (resp) {
        gData = resp.data["resultList"];
      });
    }

    const parentKey = getParentKey(node.key, gData);
    setValue("levelAreaCode", node["key"]);
    if(parentKey !== undefined) {
      setValue("areaCode", parentKey);
    } else {
      setValue("areaCode", node["key"]);
    }
  }

  const initAreaCode = () => {
    setValue("areaCode", "");
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
          <CModalTitle style={{ color: "#fff" }}>센서 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="strName">센서 아이디<span className={"required-span"}> *</span></CLabel>
              <input className={errors.strName && "is-invalid form-control" || (!errors.strName && getValues("strName") !== "") && "form-control is-valid" || (!errors.strName && getValues("strName") === "") && "form-control"}
                     {...register("strName", { required: true, minLength: 2, maxLength: 200})} placeholder={"센서아이디를 입력해주세요."} />
              {errors.strName && errors.strName.type === "required" && <span className={"invalid-feedback"}>상점명을 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "minLength" && <span className={"invalid-feedback"}>상점명을 1글자 이상으로 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "maxLength" && <span className={"invalid-feedback"}>상점명을 200글자 이하로 입력해주세요.</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strName">센서명<span className={"required-span"}> *</span></CLabel>
              <input className={errors.strName && "is-invalid form-control" || (!errors.strName && getValues("strName") !== "") && "form-control is-valid" || (!errors.strName && getValues("strName") === "") && "form-control"}
                     {...register("strName", { required: true, minLength: 2, maxLength: 200})} placeholder={"센서명을 입력해주세요."} />
              {errors.strName && errors.strName.type === "required" && <span className={"invalid-feedback"}>상점명을 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "minLength" && <span className={"invalid-feedback"}>상점명을 1글자 이상으로 입력해주세요.</span>}
              {errors.strName && errors.strName.type === "maxLength" && <span className={"invalid-feedback"}>상점명을 200글자 이하로 입력해주세요.</span>}
            </CCol>

          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="areaCode">구역선택</CLabel>
              <input className={errors.areaCode && "is-invalid form-control" || (!errors.areaCode && getValues("areaCode") !== "") && "form-control is-valid" || (!errors.areaCode && getValues("areaCode") === "") && "form-control"}
                     {...register("areaCode", { required: true, minLength: 11, maxLength: 11})} placeholder={"구역을 선택해주세요."} onClick={(e) => setOnAreaModal(true)}
                     readOnly={true}
              />
              {errors.areaCode && errors.areaCode.type === "required" && <span className={"invalid-feedback"}>구역코드를 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "minLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이상으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "maxLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이하으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "dupAreaCode" && <span className={"invalid-feedback"}>{errors.areaCode.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="areaCode">상점선택</CLabel>
              <input className={errors.areaCode && "is-invalid form-control" || (!errors.areaCode && getValues("areaCode") !== "") && "form-control is-valid" || (!errors.areaCode && getValues("areaCode") === "") && "form-control"}
                     {...register("areaCode", { required: true, minLength: 11, maxLength: 11})} placeholder={"구역을 선택해주세요."} onClick={(e) => setOnAreaModal(true)}
                     readOnly={true}
              />
              {errors.areaCode && errors.areaCode.type === "required" && <span className={"invalid-feedback"}>구역코드를 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "minLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이상으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "maxLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이하으로 입력해주세요.</span>}
              {errors.areaCode && errors.areaCode.type === "dupAreaCode" && <span className={"invalid-feedback"}>{errors.areaCode.message}</span>}
            </CCol>
          </CFormGroup>


          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="memPwd">채널</CLabel>
              <select className={"form-control"} {...register("areaOrder")}>
                <option key={1} value={1}>1</option>
                <option key={2} value={2}>2</option>
                <option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option>
              </select>
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strAddr">주소</CLabel>
              <input className={errors.strAddr && "is-invalid form-control" || (!errors.strAddr && getValues("strAddr") !== "") && "form-control is-valid" || (!errors.strAddr && getValues("strAddr") === "") && "form-control"}
                     {...register("strAddr", { minLength: 5, maxLength: 200})} placeholder={"주소를 입력해주세요."} />
              {errors.strAddr && errors.strAddr.type === "minLength" && <span className={"invalid-feedback"}>주소를 5글자 이상으로 입력해주세요.</span>}
              {errors.strAddr && errors.strAddr.type === "maxLength" && <span className={"invalid-feedback"}>주소를 200글자 이하으로 입력해주세요.</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="snsrPosLat">구역위도</CLabel>
              <input className={errors.snsrPosLat && "is-invalid form-control" || (!errors.snsrPosLat && getValues("snsrPosLat") !== null) && "form-control is-valid" || (!errors.snsrPosLat && getValues("snsrPosLat") === null) && "form-control"}
                     {...register("snsrPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.snsrPosLat && errors.snsrPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLat.message}</span>}
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="strPosLon">구역경도</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="snsrPosLat">차단기용량</CLabel>
              <input className={errors.snsrPosLat && "is-invalid form-control" || (!errors.snsrPosLat && getValues("snsrPosLat") !== null) && "form-control is-valid" || (!errors.snsrPosLat && getValues("snsrPosLat") === null) && "form-control"}
                     {...register("snsrPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.snsrPosLat && errors.snsrPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLat.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">전송주기</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">1차 전류 경보 임계값#1</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">1차 전류 경보 임계값#2</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="strPosLon">1차 전류 경보 임계시간#2</CLabel>
              <input className={errors.snsrPosLat && "is-invalid form-control" || (!errors.snsrPosLat && getValues("snsrPosLat") !== null) && "form-control is-valid" || (!errors.snsrPosLat && getValues("snsrPosLat") === null) && "form-control"}
                     {...register("snsrPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.snsrPosLat && errors.snsrPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLat.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">1차 전류 경보 임계시간#2</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">2차 전류 경보 임계값#1</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>

            <CCol md="3">
              <CLabel htmlFor="strPosLon">2차 전류 경보 임계값#2</CLabel>
              <input className={errors.snsrPosLon && "is-invalid form-control" || (!errors.snsrPosLon && getValues("snsrPosLon") !== null) && "form-control is-valid" || (!errors.snsrPosLon && getValues("snsrPosLon") === null) && "form-control"}
                     {...register("snsrPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                     placeholder={"구역 경도를 입력해주세요."} />
              {errors.snsrPosLon && errors.snsrPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.snsrPosLon.message}</span>}
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeModal()}>취소</CButton>
          <CButton color="info" type="submit">등록</CButton>
        </CModalFooter>
      </form>
      </CModal>

      {/*<PageAreaTreeModalWidget onAreaModal={onAreaModal} setOnAreaModal={setOnAreaModal} nodeClick={nodeClick} initAreaCode={initAreaCode} />*/}
    </>
  )
}

export default StrInsertModal
