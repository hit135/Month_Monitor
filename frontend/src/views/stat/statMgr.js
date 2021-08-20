import React, {lazy, useEffect, useState} from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import {ko} from "date-fns/esm/locale";
import { ResponsiveBar } from '@nivo/bar'
import {
  areaKwhStatComp, areaKwhStatYearComp,
  areaStatusComponent, areaTotalChartStatComp, areaTotalKwhComp,
  areaTotalWarningComp,
  getSelectGroup,
  getStatInfo, levelAreaStatComp, levelStoreStatComp, strKwhStatComp
} from "../../agent/stat";

const StatMgr = () => {
  const [typeValue, setTypeValue] = useState("areaCode");
  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [topBtnValue, setTopBtnValue] = useState("시장보고");
  const [guCode, setGuCode] = useState("30110");
  const [areaCode, setAreaCode] = useState("AREA_000003");
  const [areaState, setAreaState] = useState();
  const [areaTotalWarning, setAreaTotalWarning] = useState();
  const [areaHourlyStat, setAreaHourlyStat] = useState();
  const [levelAreaStat, setLevelAreaStat] = useState();
  const [levelStrStat, setLevelStrStat] = useState();
  const [areaKwhStat, setAreaKwhStat] = useState();
  const [areaKwhYearStat, setAreaKwhYearStat] = useState();
  const [areaKwhHourlyStat, setAreaKwhHourlyStat] = useState();
  const [strKwhStat, setStrKwhStat] = useState();

  useEffect(async () => {
    await handleClickBtnGroup("areaCode")
    handleClickSearchStat();
  }, [])

  const handleClickBtnGroup = type => {
    getSelectGroup(type).then(resp => {
      setTypeValue(type);
      document.getElementById("selectGroup").innerHTML = '';
      if(type !== "store") {
        if (resp.data['result'] === "success") {
          let html = '';
          for (let item of resp.data['resultList'])
            if(type === "guCode")
              html += `<option value="${item['guCode']}">${item['guName']}</option>`;
            else if(type === "areaCode")
              html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

          document.getElementById("selectGroup").innerHTML += html;
        }
      }
    } );
  }

  const handleChangeGroup = e => {
    if(typeValue === "guCode") setGuCode(e.target.value);
    else setAreaCode(e.target.value);
  }

  const handleClickSearchStat = () => {
    getStatInfo(typeValue, guCode, areaCode, startDate, endDate).then(resp => {
      console.log(resp);
      let areaName;
      if (resp.data['result'] === "success") {
        if(resp.data["infoStat"].length > 1) {
          let compList = [];
          resp.data["infoStat"].map((item, idx) => {
            compList.push(areaStatusComponent(item.areaName, startDate, endDate, item.areaAddr));
          })
          setAreaState(compList);
        } else {
          const temp = resp.data["infoStat"];
          areaName = temp.areaName;
          setAreaState(areaStatusComponent(temp.areaName, startDate, endDate, temp.areaAddr));
        }

        setAreaTotalWarning(areaTotalWarningComp(areaName, resp.data["weekMonthStat"]));
        setAreaHourlyStat(areaTotalChartStatComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));

        if(resp.data["levelAreaStat"] !== null)
          if(resp.data["levelAreaStat"].length > 0)
            setLevelAreaStat(levelAreaStatComp(areaName, resp.data["levelAreaStat"]));
        else
          setLevelAreaStat("");

        if(resp.data["levelStrStat"] !== null)
          if(resp.data["levelStrStat"].length > 0)
            setLevelStrStat(levelStoreStatComp(areaName, resp.data["levelStrStat"]));
        else
          setLevelStrStat("");

        if(resp.data["areaKwhStat"] !== null)
          if(resp.data["areaKwhStat"].length > 0)
            setAreaKwhStat(areaKwhStatComp(areaName, resp.data["areaKwhStat"]));
        else
          setAreaKwhStat("");

        if(resp.data["weekMonthStat"] !== null)
          if(resp.data["weekMonthStat"].length > 0)
            setAreaKwhYearStat(areaKwhStatYearComp(resp.data["weekMonthStat"]));
        else
          setAreaKwhYearStat("");

        setAreaKwhHourlyStat(areaTotalKwhComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));

        if(resp.data["weekMonthStat"] !== null)
          if(resp.data["weekMonthStat"].length > 0)
            setStrKwhStat(strKwhStatComp(areaName, resp.data["areaStrKwhStat"]))
        else
          setStrKwhStat("");
      } else {
        alert("서버 통신에 오류가 발생했습니다.");
      }
    });
  }

  return (
    <>
      <CCol md={"12"} style={{ paddingLeft : "15rem", paddingRight: "15rem"}}>
        <CCard>
          <CCardHeader>
            <div className={'d-flex justify-content-between'}>
              <h5 className={"mb-0 ml-0 d-flex justify-content-center align-items-center"}>통계 보고서</h5>
              <div className={'d-flex'}>
                <CButtonGroup className="mr-3">
                  {
                    [{type: 'guCode', name : '구청보고'}, {type: 'areaCode', name : '시장보고'}, {type: 'store', name : '상점주보고'}].map((item, idx) => (
                      <CButton
                        color="outline-info"
                        key={item.name}
                        className="mx-0"
                        active={item.name === topBtnValue}
                        disabled={item.name === '구청보고'}
                        onClick={(e) => { setTopBtnValue(e.target.innerHTML); handleClickBtnGroup(item.type); }}
                      >
                      {item.name}
                      </CButton>
                    ))
                  }
                </CButtonGroup>

                <div className={"d-flex justify-content-center  mb-0 align-items-center mt-1 mr-2"}>
                  <CSelect style={{ width: "185px"}} id={"selectGroup"} onChange={handleChangeGroup}>
                    <option>전체(시장)</option>
                  </CSelect>
                </div>

                <DatePicker locale={ko} className={"form-control mt-1"} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)}/>
                <span className={'ml-1 mt-2'}>~</span>
                <DatePicker className={'ml-1 form-control mt-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>
                <CButton color="info" className={"ml-2"} onClick={handleClickSearchStat}>
                  검색
                </CButton>

                <CButton color="secondary" className={"ml-1"}>
                  <CIcon name="cil-print"/>
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            {areaState}
            {areaTotalWarning}
            {areaHourlyStat}
            {levelAreaStat}
            {levelStrStat}
            {areaKwhStat}
            {areaKwhYearStat}
            {areaKwhHourlyStat}
            {strKwhStat}
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default StatMgr;
