import {CCard, CCardBody, CCardHeader, CCol, CLabel, CFormGroup} from "@coreui/react";
import React from "react";
import {useForm} from "react-hook-form";

const AreaModifyMgr = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, setFocus, setError } = useForm({
    mode: "all"
  });


  return (
    <>
      <CCol md={7} className={"fixed-right-form"}>
        <CCard>
          <CCardHeader>
            <CCol md="12" xl="12" className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>시장 상세 및 수정</h5>
                </div>
                {/*<div>*/}
                {/*  <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterLv1Item}>상위 레벨 등록</button>*/}
                {/*</div>*/}
              </div>

            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            {/*  areaPostLat, areaPosLon, areaTel, useYn, userId, guCode */}
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="areaCode">구역코드<span className={"required-span"}> *</span></CLabel>
                <input className={errors.areaCode && "is-invalid form-control" || !errors.areaCode && "form-control is-valid"}
                       {...register("areaCode", { required: true, minLength: 11, maxLength: 11})} placeholder={"AREA_000000"} />
                {errors.areaCode && errors.areaCode.type === "required" && <span className={"invalid-feedback"}>구역코드를 입력해주세요.</span>}
                {errors.areaCode && errors.areaCode.type === "minLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이상으로 입력해주세요.</span>}
                {errors.areaCode && errors.areaCode.type === "maxLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이하으로 입력해주세요.</span>}
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="upAreaCode">상위구역코드</CLabel>
                <input className={"form-control"} readOnly={true}
                       {...register("upAreaCode", { required: true })} placeholder={""} />
              </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="areaName">구역명<span className={"required-span"}> *</span></CLabel>
              <input className={errors.areaName && "is-invalid form-control" || !errors.areaName && "form-control is-valid"}
                     {...register("areaName", { required: true, minLength: 1, maxLength: 1100})} placeholder={"구역명을 입력해주세요"} />
              {errors.areaName && errors.areaName.type === "required" && <span className={"invalid-feedback"}>구역명을 입력해주세요.</span>}
              {errors.areaName && errors.areaName.type === "minLength" && <span className={"invalid-feedback"}>구역명을 1글자 이상으로 입력해주세요.</span>}
              {errors.areaName && errors.areaName.type === "maxLength" && <span className={"invalid-feedback"}>구역명을 100글자 이하으로 입력해주세요.</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="memPwd">구역순번<span className={"required-span"}> *</span></CLabel>
              <select className={"form-control"}>
                <option>1</option>
              </select>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="areaName">주소</CLabel>
              <input className={errors.areaAddr && "is-invalid form-control" || !errors.areaAddr && "form-control is-valid"}
                     {...register("areaAddr", { minLength: 5, maxLength: 200})} placeholder={"주소를 입력해주세요."} />
              {errors.areaAddr && errors.areaAddr.type === "minLength" && <span className={"invalid-feedback"}>주소를 5글자 이상으로 입력해주세요.</span>}
              {errors.areaAddr && errors.areaAddr.type === "maxLength" && <span className={"invalid-feedback"}>주소를 200글자 이하으로 입력해주세요.</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="memPwd">구역담당자</CLabel>
              <input className={errors.areaManager && "is-invalid form-control" || !errors.areaManager && "form-control is-valid"}
                     {...register("areaManager")} />
              {errors.areaManager && errors.areaManager.type === "minLength" && <span className={"invalid-feedback"}>구역담당자를 1글자 이상으로 입력해주세요.</span>}
              {errors.areaManager && errors.areaManager.type === "maxLength" && <span className={"invalid-feedback"}>구역담당자를 50글자 이하으로 입력해주세요.</span>}
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="areaPostLat">구역위도</CLabel>
              <input className={errors.areaPostLat && "is-invalid form-control" || !errors.areaPostLat && "form-control is-valid"}
                     {...register("areaPostLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                     placeholder={"구역 위도를 입력해주세요."} />
              {errors.areaPostLat && errors.areaPostLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.areaPostLat.message}</span>}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="areaPostLon">구역경도</CLabel>
              <input className={errors.areaPostLon && "is-invalid form-control" || !errors.areaPostLon && "form-control is-valid"}
                     {...register("areaPostLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}})}
                     placeholder={"구역 경도를 입력해주세요."}/>
              {errors.areaPostLon && errors.areaPostLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.areaPostLon.message}</span>}
            </CCol>
          </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )

}

export default AreaModifyMgr;
