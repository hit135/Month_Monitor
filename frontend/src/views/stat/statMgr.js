import React, {useState, useEffect, useRef} from "react";
import {CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CRow, CSelect} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import {ko} from "date-fns/esm/locale";
import {
  areaStatusComponent,
  storeYearWarningComp,
  getSelectGroup,
  getStatInfo,
  storeChartComp,
  areaTotalWarningComp,
  areaTotalChartStatComp
  ,
  levelAreaStatComp,
  levelStoreStatComp,
  areaKwhStatComp,
  areaKwhStatYearComp,
  strKwhStatComp,
  getStatInfoList,
  areaTotalChartStatComp2
  ,
  storePrintChartComp,
  strKwhListComp,
} from "../../agent/stat";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {ComponentToPrint} from "./printStatMgr";
import PageStrTableModalWidget from "../../widget/pageStrTableModalWidget";
import '../../scss/react-datepicker.css';
import {ComponentToPrint2} from "./printStatStoreMgr";

const StatMgr = () => {
  let Spinner = require('react-spinkit');
  let areaNameTitle = "";
  let strName = "";
  let snsrCnt = 0;
  let strTel = "";
  let strOwnTel = "";
  let searchStartDate = "";
  let searchEndDate = "";

  const [onStrModal, setOnStrModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalLoading, setTotalLoading] = useState(true);
  const [printLoading, setPrintLoading] = useState(false);
  const [typeValue, setTypeValue] = useState("areaCode");
  const [strCode, setStrCode] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateType, setDateType] = useState("년");
  const [yearDate, setYearDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [halfDate, setHalfDate] = useState(new Date());
  const [halfSelect, setHalfSelect] = useState("상반기");
  const [quarterDate, setQuarterDate] = useState(new Date());
  const [topBtnValue, setTopBtnValue] = useState("시장보고");
  const [guCode, setGuCode] = useState("30110");
  const [areaName, setAreaName] = useState("");
  const [areaCode, setAreaCode] = useState("AREA_000003");
  const [areaState, setAreaState] = useState();
  const [areaTotalWarning, setAreaTotalWarning] = useState();     // 시장
  const [areaKwhHourlyStat, setAreaKwhHourlyStat] = useState();
  const [areaHourlyStat, setAreaHourlyStat] = useState();
  const [areaHourlyStat2, setAreaHourlyStat2] = useState();
  const [levelAreaStat, setLevelAreaStat] = useState();
  const [levelStrStat, setLevelStrStat] = useState();
  const [areaKwhStat, setAreaKwhStat] = useState();
  const [areaKwhYearStat, setAreaKwhYearStat] = useState();
  const [strKwhStat, setStrKwhStat] = useState();
  const [strKwhList, setStrKwhList] = useState();

  const [propStrName, setPropStrName] = useState();
  const [printChartComp, setPrintChartComp] = useState();
  const [storeYearWarning, setStoreYearWarning] = useState();     // 상점
  const [storeChart, setStoreChart] = useState();                 // 상점

  useEffect(async () => {
    await handleClickBtnGroup("areaCode");
    //   handleClickSearchStat();
  }, []);

  const setHookReset = () => {
    setAreaState("");
    setStoreYearWarning("");
    setStoreChart("");
    setAreaTotalWarning("");
    setAreaHourlyStat("");
    setLevelAreaStat("");
    setAreaHourlyStat2("")
    setLevelStrStat("");
    setAreaKwhStat("");
    setAreaKwhYearStat("");
    setAreaKwhHourlyStat("");
    setStrKwhStat("");
    setStrKwhList("");
  }

  const initStrCode = () => {
    document.getElementById("strSelect").value = "";
    setStrCode("");
    setAreaCode("");
  }

  const clickStrRow = e => {
    document.getElementById("strSelect").value = e.strName;

    setStrCode(e.strCode);
    setAreaCode(e.areaCode);
  };

  const handleClickBtnGroup = type => {
    setTotalLoading(true);
    setHookReset();

    if (type !== "store") {
      document.getElementById("strSelect").style.display = "none";
      document.getElementById("strSelect").value = "";

      setStrCode("");
      setAreaCode("AREA_000003");

      getSelectGroup(type).then(resp => {
        setTypeValue(type);

        document.getElementById("selectGroup").innerHTML = '';
        document.getElementById("selectGroup").style.display = "block";

        if (type !== "store") {
          if (resp.data['result'] === "success") {
            let html = '';
            for (let item of resp.data['resultList'])
              if (type === "guCode")
                html += `<option value="${item['guCode']}">${item['guName']}</option>`;
              else if(type === "areaCode")
                html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

            document.getElementById("selectGroup").innerHTML += html;
          }
        }
      });
    } else {
      setTypeValue(type);

      document.getElementById("strSelect").style.display = "block";
      document.getElementById("selectGroup").style.display = "none";
    }
  };

  const handleChangeGroup = e => {
    if (typeValue === "guCode")
      setGuCode(e.target.value);
    else
      setAreaCode(e.target.value);
  };

  const handleChangeDateGroup = e => {
    let type = e.target.value;
    setDateType(type);

    let yearElement = document.getElementById("year");
    let monthElement = document.getElementById("month");
    let halfElement = document.getElementById("halfItem");
    let quarterElement = document.getElementById("quarter");

    if (type === "년") {
      yearElement.classList.add("display-inline");
      yearElement.classList.remove("display-none");
    } else {
      yearElement.classList.add("display-none");
      yearElement.classList.remove("display-inline");
    }

    if (type === "월") {
      monthElement.classList.add("display-inline");
      monthElement.classList.remove("display-none");
    } else {
      monthElement.classList.add("display-none");
      monthElement.classList.remove("display-inline");
    }

    if (type === "반기") {
      halfElement.classList.add("display-justify");
      halfElement.classList.remove("display-none");
    } else {
      halfElement.classList.add("display-none");
      halfElement.classList.remove("display-justify");
    }

    if (type === "분기") {
      quarterElement.classList.add("display-justify");
      quarterElement.classList.remove("display-none");
    } else {
      quarterElement.classList.add("display-none");
      quarterElement.classList.remove("display-justify");
    }
  };

  const handleClickSearchStat = async () => {
    let dayWeekData = [];

    setHookReset();
    setLoading(true);
    setTotalLoading(true);

    if (typeValue === "store" && strCode === "") {
      alert("상점을 선택해주세요.");
      return false;
    }

    await getStatInfo(typeValue, guCode, areaCode, strCode,  startDate, endDate, dateType, yearDate, monthDate, halfDate, halfSelect, quarterDate).then(resp => {
      if (resp.data['result'] === "success") {
        searchStartDate = resp.data["startDate"];
        searchEndDate = resp.data["endDate"];
        setStartDate(searchStartDate);
        setEndDate(searchEndDate);

        // 상점일 경우
        if (typeValue === "store") {
          if (resp.data["strInfo"] !== null) {
            strName = resp.data["strInfo"]["strName"];
            strTel = resp.data["strInfo"]["strTel"];
            strOwnTel = resp.data["strInfo"]["strOwnTel"];
            setPropStrName(resp.data["strInfo"]["strName"]);
            snsrCnt = resp.data["strInfo"]["snsrCnt"];
          }
        }

        if (resp.data["infoStat"].length > 1) {
          let compList = [];
          resp.data["infoStat"].map(item => {
            compList.push(areaStatusComponent(item.areaName, searchStartDate, searchEndDate, item.areaAddr));
          });

          setAreaState(compList);
        } else {
          const temp = resp.data["infoStat"];

          setAreaName(temp.areaName);
          areaNameTitle = temp.areaName;
          setAreaState(areaStatusComponent(temp, searchStartDate, searchEndDate, typeValue, strName, snsrCnt, strTel, strOwnTel));

          if (resp.data["weekMonthStat"] !== null) {
            setStoreYearWarning(storeYearWarningComp(resp.data["weekMonthStat"], strName, temp.areaName, temp.strCnt));
            setStoreChart(storeChartComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"], resp.data["weekMonthStat"]));
            setPrintChartComp(storePrintChartComp(resp.data["weekMonthStat"]));
          }
        }

        if (typeValue === "areaCode") {
          setAreaTotalWarning(areaTotalWarningComp(areaNameTitle, resp.data["weekMonthStat"]));
          setAreaHourlyStat(areaTotalChartStatComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"], resp.data["weekMonthStat"]));
          setAreaHourlyStat2(areaTotalChartStatComp2(resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));

          if (resp.data["levelAreaStat"].length > 0)
            setLevelAreaStat(levelAreaStatComp(areaNameTitle, resp.data["levelAreaStat"]));
          else
            setLevelAreaStat("");

          if (resp.data["levelStrStat"] !== null)
            if (resp.data["levelStrStat"].length > 0)
              setLevelStrStat(levelStoreStatComp(areaNameTitle, resp.data["levelStrStat"]));
            else
              setLevelStrStat("");

          if (resp.data["weekMonthStat"] !== null)
            if (resp.data["weekMonthStat"].length > 0)
              setAreaKwhYearStat(areaKwhStatYearComp(resp.data["weekMonthStat"], resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));
            else
              setAreaKwhYearStat("");

          dayWeekData = resp.data["dayOfWeekStat"];
        }
        setLoading(false);
      } else {
        alert("서버 통신에 오류가 발생했습니다.");
      }
    });

    if (typeValue !== "store") {
      await getStatInfoList(typeValue, guCode, areaCode, strCode,  startDate, endDate, dateType, yearDate, monthDate, halfDate, halfSelect, quarterDate).then(resp => {
        if (resp.data['result'] === "success") {
          if (resp.data["areaKwhStat"] !== null)
            setAreaKwhStat(areaKwhStatComp(areaNameTitle, resp.data["areaKwhStat"]));
          else
            setAreaKwhStat("");

          if (resp.data["areaStrKwhStat"] !== null) {
            setStrKwhStat(strKwhStatComp(areaNameTitle, dayWeekData));
            setStrKwhList(strKwhListComp(resp.data["areaStrKwhStat"]));
          } else {
            setStrKwhStat("");
            setStrKwhList("");
          }
        } else {
          alert("서버 통신에 오류가 발생했습니다.");
        }
      });

      setTotalLoading(false);
    } else {
      setTotalLoading(false);
    }
  };

  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef();

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handleAfterPrint = React.useCallback(() => {
    setPrintLoading(false);
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setPrintLoading(true);
      setTimeout(() => resolve(), 2000);
    });
  }, [setLoading]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: handleAfterPrint,
    documentTitle: "통계보고서"
  });

  return (
    <>
      <CCol md={"12"}>
        <CCard>
          <CCardHeader>
            <div className={'d-flex justify-content-between'}>
              <h5 className={"mb-0 ml-0 d-flex justify-content-center align-items-center"}>통계 보고서</h5>
              <div className={'d-flex'}>
                <CButtonGroup className="mr-3">
                  {[{type: 'guCode', name : '구청보고'}, {type: 'areaCode', name : '시장보고'}, {type: 'store', name : '상점주보고'}].map((item, idx) => (
                    <CButton color="outline-info" key={item.name} className="mx-0" active={item.name === topBtnValue} disabled={item.name === '구청보고'}
                             onClick={e => {
                               setTopBtnValue(e.target.innerHTML);
                               handleClickBtnGroup(item.type);
                             }}>
                      {item.name}
                    </CButton>
                  ))}
                </CButtonGroup>
                <div className={"d-flex justify-content-center mb-0 align-items-center mt-1 mr-2"}>
                  <CSelect style={{width: "185px"}} id={"selectGroup"} onChange={handleChangeGroup}>
                    <option>전체(시장)</option>
                  </CSelect>
                  <input className="form-control" id={"strSelect"} type={"text"} onClick={e => setOnStrModal(true)} readOnly={true} />
                </div>
                <div className={"d-flex justify-content-center mb-0 align-items-center mt-1 mr-2"}>
                  <CSelect style={{width: "185px"}} id={"selectDateGroup"} onChange={handleChangeDateGroup}>
                    <option>년</option>
                    <option>월</option>
                    <option>반기</option>
                    <option>분기</option>
                  </CSelect>
                </div>
                <div id={"year"}>
                  <DatePicker locale={ko} className={"form-control mt-1"}  selected={yearDate} dateFormat="yyyy" onChange={date => setYearDate(date)}
                              maxDate={new Date()} showYearPicker />
                </div>
                <div id={"month"} className={"display-none"}>
                  <DatePicker locale={ko} className={"form-control mt-1"} selected={monthDate} dateFormat="yyyy-MM" onChange={date => setMonthDate(date)}
                              maxDate={new Date()} showMonthYearPicker />
                </div>
                <div className={"d-flex justify-content-center mb-0 align-items-center mt-1 mr-2 display-none"} id={"halfItem"}>
                  <DatePicker locale={ko} className={"form-control"} selected={halfDate} dateFormat="yyyy" onChange={date => setHalfDate(date)}
                              maxDate={new Date()} showYearPicker />
                  <CSelect style={{width: "130px"}} id={"halfSelect"} onChange={e => setHalfSelect(e.target.value)}>
                    <option>상반기</option>
                    <option>하반기</option>
                  </CSelect>
                </div>
                <div id={"quarter"} className={"display-none"}>
                  <DatePicker locale={ko} className={"form-control mt-1"} selected={quarterDate} dateFormat="yyyy, QQQ" onChange={date => {setQuarterDate(date)}}
                              maxDate={new Date()} showQuarterYearPicker />
                </div>
                {/*<span className={'ml-1 mt-2'}>~</span>*/}
                {/*<DatePicker className={'ml-1 form-control mt-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>*/}
                <CButton color="info" className={"ml-2"} onClick={handleClickSearchStat}>검색</CButton>
                {/*<CButton color="secondary" className={"ml-1"} onClick={() => handlePrint}><CIcon name="cil-print"/></CButton>*/}
                <button className={"btn btn-secondary ml-2"} onClick={handlePrint} disabled={totalLoading}>
                  <CIcon name="cil-print" />
                </button>
              </div>
            </div>
          </CCardHeader>
          <CCardBody style={{padding : "2rem"}}>
            {loading &&
            <CRow id={"loading"}>
              <CCol md={"12"}>
                <div className={"d-flex justify-content-center"} style={{height: "300px"}}>
                  <div className={"d-flex align-content-center align-items-center"}>
                    <Spinner name="three-bounce" color="steelblue" />
                  </div>
                </div>
              </CCol>
            </CRow>}
            {(typeValue !== "store") ? areaState : areaState}
            {(typeValue !== "store") ? areaTotalWarning : storeYearWarning}
            {(typeValue !== "store") ? areaHourlyStat : storeChart}
            {(typeValue !== "store") ? areaHourlyStat2 : ""}
            {(typeValue !== "store") ? levelAreaStat : ""}
            {(typeValue !== "store") ? levelStrStat : ""}
            {(typeValue !== "store") ? areaKwhStat : ""}
            {(typeValue !== "store") ? areaKwhYearStat : ""}
            {(typeValue !== "store") ? strKwhStat : ""}
            {(typeValue !== "store") ? strKwhList : ""}
          </CCardBody>
        </CCard>
      </CCol>
      <PageStrTableModalWidget onStrModal={onStrModal} setOnStrModal={setOnStrModal} clickStrRow={clickStrRow} initStrCode={initStrCode} areaId={"areaSelect"} />
      {printLoading && typeValue !== "store" &&
      <ComponentToPrint ref={componentRef} areaState={areaState} areaTotalWarning={areaTotalWarning} areaHourlyStat={areaHourlyStat}
                        levelAreaStat={levelAreaStat} levelStrStat={levelStrStat} areaKwhStat={areaKwhStat} areaKwhYearStat={areaKwhYearStat}
                        typeName={typeValue} areaKwhHourlyStat={areaKwhHourlyStat} areaHourlyStat2={areaHourlyStat2} strKwhStat={strKwhStat} strKwhList={strKwhList}
                        areaTitle={areaName} type={topBtnValue} startDate={startDate} endDate={endDate} />}
      {printLoading && typeValue === "store" &&
      <ComponentToPrint2 ref={componentRef} areaState={areaState} storeYearWarning={storeYearWarning} storeChart={printChartComp}
                         type={topBtnValue} areaTitle={areaName} strName={propStrName} startDate={startDate} endDate={endDate} />}
    </>
  );
};

export default StatMgr;
