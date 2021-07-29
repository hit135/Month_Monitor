import {CCard, CCardBody, CCardHeader, CCol, CLabel, CFormGroup, CButton, CSwitch, CRow} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {updateAreaItem} from "../../agent/area";
import PageUserTableModalWidget from "../../widget/pageUserTableModalWidget";
import {getMem} from "../../agent/member";

const AreaModifyMgr = (props) => {
  const API_ROOT = 'http://localhost:8081/api';    // 로컬
  let { areaContent, nodeLv2Btn, handleClickUpdateItem } = props
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues, setFocus, setError } = useForm({
    mode: "all"
  });

  const [appSwitch, setAppSwitch] = useState({useYn : false});
  const [onMemModal, setOnMemModal] = useState(false)             // Modal hook

  useEffect(() => {
    if(nodeLv2Btn) {
      areaContent = undefined;
      reset({
        areaCode: "",
        areaName : "",
        areaPosLat: null,
        areaPosLon: null,
        areaAddr: "",
        areaManager: "",
        areaOrder: 0,
        useYn : "N",
        memUpdAreaCodeType: false
      });

    } else {
      reset(areaContent);
    }
    if(areaContent !== undefined) {
      appSwitch.useYn = (areaContent.useYn === "Y");
      setValue("prevAreaCode", areaContent.areaCode);
    } else {
      setAppSwitch(data => ({
        ...data,
        ["useYn"]: false
      }));
    }
  }, [areaContent]);

  const setSwitchValue = (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setAppSwitch(data => ({
      ...data,
      [e.target.id]: (value === "Y")
    }));
    setValue(e.target.id, value);
  }

  const onSubmit = (data, e) => {

    if(areaContent.userId !== data.userId || areaContent.userId === "" && data.userId !== "") {
      data.memUpdAreaCodeType = true;
    }
    handleClickUpdateItem(data);
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setValue("userId", row["userId"]);
    }
  };

  const initUserId = () => {
    setValue("userId", "");
  }

  return (
    <>
      <CCol md={7} className={"fixed-right-form"}>
        <CCard>
          <CCardHeader>
            <CCol md="12" xl="12" className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>{areaContent === undefined ? "" : areaContent.areaName} 상세 및 수정</h5>
                </div>
              </div>

            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="areaCode">구역코드<span className={"required-span"}> *</span></CLabel>
                  <input className={errors.areaCode && "is-invalid form-control" || (!errors.areaCode && getValues("areaCode") !== "") && "form-control is-valid" || (!errors.areaCode && getValues("areaCode") === "") && "form-control"}
                         {...register("areaCode", { required: true, minLength: 11, maxLength: 11})} placeholder={"AREA_000000"}
                         onBlur={(e) => {
                           if(!errors.areaCode && areaContent.areaCode !== e.target.value) {
                             axios
                               .get(`${API_ROOT}/dupAreaChk?areaCode=${e.target.value}`)
                               .then(resp => {if(resp.data["result"] !== 0) {
                                 setValue("areaCode", "");
                                 setError("areaCode", {type: "dupAreaCode", message: "중복되는 구역코드가 존재합니다. 다른 코드로 등록해주세요."})
                                 setFocus("areaCode");
                               }});
                           }
                         }}
                  />
                  {errors.areaCode && errors.areaCode.type === "required" && <span className={"invalid-feedback"}>구역코드를 입력해주세요.</span>}
                  {errors.areaCode && errors.areaCode.type === "minLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이상으로 입력해주세요.</span>}
                  {errors.areaCode && errors.areaCode.type === "maxLength" && <span className={"invalid-feedback"}>구역코드를 11글자 이하으로 입력해주세요.</span>}
                  {errors.areaCode && errors.areaCode.type === "dupAreaCode" && <span className={"invalid-feedback"}>{errors.areaCode.message}</span>}
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
                <input className={errors.areaName && "is-invalid form-control" || (!errors.areaName && getValues("areaName") !== "") && "form-control is-valid" || (!errors.areaName && getValues("areaName") === "") && "form-control"}
                       {...register("areaName", { required: true, minLength: 1, maxLength: 1100})} placeholder={"구역명을 입력해주세요"} />
                {errors.areaName && errors.areaName.type === "required" && <span className={"invalid-feedback"}>구역명을 입력해주세요.</span>}
                {errors.areaName && errors.areaName.type === "minLength" && <span className={"invalid-feedback"}>구역명을 1글자 이상으로 입력해주세요.</span>}
                {errors.areaName && errors.areaName.type === "maxLength" && <span className={"invalid-feedback"}>구역명을 100글자 이하으로 입력해주세요.</span>}
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="memPwd">구역순번<span className={"required-span"}> *</span></CLabel>
                <select className={"form-control"} {...register("areaOrder")}>
                  {
                    Array.from(Array(areaContent === undefined ? 0 : areaContent.orderCnt), (e, i) => {
                      return <option key={i} value={i + 1}>{i + 1}</option>
                    })
                  }
                </select>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="areaAddr">주소</CLabel>
                <input className={errors.areaAddr && "is-invalid form-control" || (!errors.areaAddr && getValues("areaAddr") !== "") && "form-control is-valid" || (!errors.areaAddr && getValues("areaAddr") === "") && "form-control"}
                       {...register("areaAddr", { minLength: 5, maxLength: 200})} placeholder={"주소를 입력해주세요."} />
                {errors.areaAddr && errors.areaAddr.type === "minLength" && <span className={"invalid-feedback"}>주소를 5글자 이상으로 입력해주세요.</span>}
                {errors.areaAddr && errors.areaAddr.type === "maxLength" && <span className={"invalid-feedback"}>주소를 200글자 이하으로 입력해주세요.</span>}
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="areaManager">구역담당자</CLabel>
                <input className={errors.areaManager && "is-invalid form-control" || (!errors.areaManager && getValues("areaManager") !== "") && "form-control is-valid" || (!errors.areaManager && getValues("areaManager") === "") && "form-control"}
                       {...register("areaManager")}
                />
                {errors.areaManager && errors.areaManager.type === "minLength" && <span className={"invalid-feedback"}>구역담당자를 1글자 이상으로 입력해주세요.</span>}
                {errors.areaManager && errors.areaManager.type === "maxLength" && <span className={"invalid-feedback"}>구역담당자를 50글자 이하으로 입력해주세요.</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="6">
                <CLabel htmlFor="areaPosLat">구역위도</CLabel>
                <input className={errors.areaPosLat && "is-invalid form-control" || (!errors.areaPosLat && getValues("areaPosLat") !== null && areaContent !== undefined) && "form-control is-valid" || (!errors.areaPosLat && getValues("areaPosLat") === null || areaContent === undefined) && "form-control"}
                       {...register("areaPosLat", {pattern: {value:  /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000"}})}
                       placeholder={"구역 위도를 입력해주세요."} />
                {errors.areaPosLat && errors.areaPosLat.type === "pattern" && <span className={"invalid-feedback"}>{errors.areaPosLat.message}</span>}
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="areaPosLon">구역경도</CLabel>
                <input className={errors.areaPosLon && "is-invalid form-control" || (!errors.areaPosLon && getValues("areaPosLon") !== null && areaContent !== undefined) && "form-control is-valid" || (!errors.areaPosLon && getValues("areaPosLon") === null || areaContent === undefined) && "form-control"}
                       {...register("areaPosLon", {pattern: {value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"}}) }
                       placeholder={"구역 경도를 입력해주세요."} />
                {errors.areaPosLon && errors.areaPosLon.type === "pattern" && <span className={"invalid-feedback"}>{errors.areaPosLon.message}</span>}
              </CCol>
            </CFormGroup>
            <CRow className={"pl-3 pr-3 mt-4"}>
              <CCol md="6" className={"pl-0"}>
                <CFormGroup className="pr-3 d-inline-flex">
                  <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                  <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue}
                           checked={ appSwitch.useYn } />
                </CFormGroup>
              </CCol>
              <CCol md="6" className={"pr-0"}>
                <CLabel htmlFor="areaPosLon">회원선택</CLabel>
                <input className={"form-control"} {...register("userId") } readOnly={true}
                       placeholder={"회원을 선택해주세요."} onClick={(e) => setOnMemModal(true)} />
              </CCol>
            </CRow>
            <div className={'d-flex'}>
              <div className={"ml-auto mt-4"}>
                <CButton color="info" type="submit" disabled={nodeLv2Btn}>수정</CButton>
              </div>
            </div>
          </form>
          </CCardBody>
        </CCard>
      </CCol>
      <PageUserTableModalWidget onMemModal={onMemModal} setOnMemModal={setOnMemModal} memClickEvent={rowEvents} initUserId={initUserId} />
    </>
  )
}

export default AreaModifyMgr;
