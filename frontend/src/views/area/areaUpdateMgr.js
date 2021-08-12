import { CCard, CCardBody, CCardHeader, CCol, CLabel, CFormGroup, CButton, CSwitch, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { handleValidInput, handleValidInputPos, API_ROOT } from "../../agent/commonIndex";

const AreaUpdateMgr = props => {
  let { areaContent, nodeLv2Btn, handleClickUpdateItem } = props;

  const [appSwitch, setAppSwitch] = useState({ useYn: false });

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues, setFocus, setError } = useForm(
    { mode: "all" }
  );

  useEffect(() => {
    if (nodeLv2Btn) {
      areaContent = undefined;

      reset({
          areaCode: "", areaName: "", areaPosLat: null, areaPosLon: null, areaAddr: "", areaManager: "", areaOrder: 0
        , useYn: "N", areaOrderUpdate: false, areaOrderType: false
      });
    } else {
      reset(areaContent);
    }

    if (typeof areaContent !== "undefined") {
      appSwitch.useYn = (areaContent.useYn === "Y");
      setValue("prevAreaCode", areaContent.areaCode);
    } else {
      setAppSwitch(data => ({ ...data, ["useYn"]: false }));
    }
  }, [areaContent]);

  const setSwitchValue = e => {
    const value = (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    setAppSwitch(data => ({ ...data, [e.target.id]: (value === "Y") }));
    setValue(e.target.id, value);
  };

  const { onBlur, ...rest } = register("areaCode", {
      required: { value: true, message: "구역코드를 입력해주세요." }
    , minLength: { value: 11, message: "구역코드를 11글자 이상으로 입력해주세요." }
    , maxLength: { value: 11, message: "구역코드를 11글자 이하으로 입력해주세요." }
  });

  const handleOnBlurAreaCode = areaCode => {
    console.log(areaCode);

    if (!errors.areaCode && areaContent.areaCode !== areaCode) {
      axios.get(`${API_ROOT}/dupAreaChk?areaCode=${areaCode}`).then(resp => {
        if (resp.data["result"] > 0) {
          setValue("areaCode", "");
          setError("areaCode", { type: "dupAreaCode", message: "중복되는 구역코드가 존재합니다. 다른 코드로 등록해주세요." });
          setFocus("areaCode");
        }
      });
    }
  };

  const regOpts = {
      upAreaCode: { required: { value: true, message: "상위구역코드를 입력해주세요." } }
    , areaName: {
          required: { value: true, message: "구역명을 입력해주세요." }
        , minLength: { value: 1, message: "구역명을 1글자 이상으로 입력해주세요." }
        , maxLength: { value: 100, message: "구역명을 100글자 이하로 입력해주세요." }
      }
    , areaAddr: {
          minLength: { value: 5, message: "주소를 5글자 이상으로 입력해주세요." }
        , maxLength: { value: 200, message: "주소를 200글자 이하으로 입력해주세요." }
      }
    , areaManager: {
          minLength: { value: 1, message: "구역담당자를 1글자 이상으로 입력해주세요." }
        , maxLength: { value: 50, message: "구역담당자를 50글자 이하로 입력해주세요." }
      }
    , areaPosLat: { pattern: { value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g, message: "위도의 형식에 맞게 입력해주세요. ex) 00.00000" } }
    , areaPosLon: { pattern: { value: /^-?((1?[0-7]|[0-9]?)[0-9]{3}|180)\.[0-9]{1,15}$/g, message: "경도의 형식에 맞게 입력해주세요. ex) 100.0000"} }
  };

  const onSubmit = (data, e) => {
    if (areaContent.areaOrder !== data.areaOrder) {
      data.areaOrderUpdate = true;

      if (parseInt(data.areaOrder) === data.orderCnt)
        data.areaOrderType = true;
    }

    handleClickUpdateItem(data);
  };

  return (
    <>
      <CCol md={7} className={"fixed-right-form"}>
        <CCard>
          <CCardHeader>
            <CCol md={"12"} xl={"12"} className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>{ (typeof areaContent === 'undefined') ? "" : areaContent.areaName } 상세 및 수정</h5>
                </div>
              </div>
            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CFormGroup row>
                <CCol md={"6"}>
                  <CLabel htmlFor={"areaCode"}>구역코드<span className={"required-span"}> *</span></CLabel>
                  <input className={handleValidInput(errors, "areaCode", getValues("areaCode"))} id={"areaCode"} type={"text"} placeholder={"AREA_000000"}
                         onBlur={e => handleOnBlurAreaCode(e.target.value)} { ...rest } />
                  { errors.areaCode && <span className={"invalid-feedback"}>{errors.areaCode.message}</span> }
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor="upAreaCode">상위구역코드</CLabel>
                  <input className={"form-control"} readOnly={true} placeholder={""} { ...register("upAreaCode", regOpts['upAreaCode']) }/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor={"areaName"}>구역명<span className={"required-span"}> *</span></CLabel>
                  <input className={handleValidInput(errors, "areaName", getValues("areaName"))} id={"areaName"} type={"text"}
                         placeholder={"구역명을 입력해주세요"} { ...register("areaName", regOpts['areaName']) } />
                  { errors.areaName && <span className={"invalid-feedback"}>{errors.areaName.message}</span> }
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor="memPwd">구역순번<span className={"required-span"}> *</span></CLabel>
                  <select className={"form-control"}>{
                    Array.from(
                      Array((typeof areaContent === "undefined") ? 0 : areaContent.orderCnt), (e, i) =>
                        <option key={i} value={i + 1}>{i + 1}</option>
                    )
                  }</select>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor={"areaAddr"}>주소</CLabel>
                  <input className={handleValidInput(errors, "areaAddr", getValues("areaAddr"))} id={"areaAddr"} type={"text"}
                         placeholder={"주소를 입력해주세요."} { ...register("areaAddr", regOpts['areaAddr']) }  />
                  { errors.areaAddr && <span className={"invalid-feedback"}>{errors.areaAddr.message}</span> }
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor={"areaManager"}>구역담당자</CLabel>
                  <input className={handleValidInput(errors, "areaManager", getValues("areaManager"))} id={"areaManager"} type={"text"}
                         placeholder={"구역담당자를 입력해주세요."} { ...register("areaManager", regOpts['areaManager']) } />
                  { errors.areaManager && <span className={"invalid-feedback"}>{errors.areaManager.message}</span> }
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="areaPosLat">구역위도</CLabel>
                  <input className={handleValidInputPos(errors, "areaPosLat", getValues("areaPosLat"))} type={"text"} placeholder={"구역 위도를 입력해주세요."}
                         { ...register("areaPosLat", regOpts['areaPosLat']) } />
                  { errors.areaPosLat && <span className={"invalid-feedback"}>{errors.areaPosLat.message}</span> }
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor="areaPosLon">구역경도</CLabel>
                  <input className={handleValidInputPos(errors, "areaPosLon", getValues("areaPosLon"))} type={"text"} placeholder={"구역 경도를 입력해주세요."}
                         { ...register("areaPosLon", regOpts['areaPosLon']) } />
                  { errors.areaPosLon && <span className={"invalid-feedback"}>{errors.areaPosLon.message}</span> }
                </CCol>
              </CFormGroup>
              <CRow className={"pl-3 pr-3 mt-4"}>
                <CCol md="6" className={"pl-0"}>
                  <CFormGroup className="pr-3 d-inline-flex">
                    <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                    <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"} onChange={setSwitchValue}
                             checked={appSwitch.useYn} />
                  </CFormGroup>
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
    </>
  );
};

export default AreaUpdateMgr;
