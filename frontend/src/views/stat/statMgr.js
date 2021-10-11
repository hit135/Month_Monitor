import React, { useState, useEffect, useRef} from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSelect,
} from "@coreui/react";
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
  areaTotalKwhComp,
  areaTotalChartStatComp,
  levelAreaStatComp,
  levelStoreStatComp, areaKwhStatComp, areaKwhStatYearComp, strKwhStatComp, getStatInfoList,
} from "../../agent/stat";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {ComponentToPrint} from "./printStatMgr";
import PageStrTableModalWidget from "../../widget/pageStrTableModalWidget";
import {formatDate} from "../../agent/commonIndex";
import '../../scss/react-datepicker.css';

const StatMgr = () => {
  let Spinner = require('react-spinkit');
  let areaNameTitle = "";
  let strName = "";
  let snsrCnt = 0;
  const [onStrModal, setOnStrModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
  const [printLoading, setPrintLoading] = useState(false);
  const [typeValue, setTypeValue] = useState("areaCode");
  const [strCode, setStrCode] = useState("");
  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [topBtnValue, setTopBtnValue] = useState("시장보고");
  const [guCode, setGuCode] = useState("30110");
  const [areaName, setAreaName] = useState("");
  const [areaCode, setAreaCode] = useState("AREA_000003");
  const [areaState, setAreaState] = useState();
  const [areaTotalWarning, setAreaTotalWarning] = useState();     // 시장
  const [areaKwhHourlyStat, setAreaKwhHourlyStat] = useState();
  const [areaHourlyStat, setAreaHourlyStat] = useState();
  const [levelAreaStat, setLevelAreaStat] = useState();
  const [levelStrStat, setLevelStrStat] = useState();
  const [areaKwhStat, setAreaKwhStat] = useState();
  const [areaKwhYearStat, setAreaKwhYearStat] = useState();
  const [strKwhStat, setStrKwhStat] = useState();

  const [storeYearWarning, setStoreYearWarning] = useState();     // 상점
  const [storeChart, setStoreChart] = useState();                 // 상점


  useEffect(async () => {
    await handleClickBtnGroup("areaCode");
    handleClickSearchStat();
  }, []);

  const setHookReset = () => {
   setAreaState("");
   setStoreYearWarning("");
   setStoreChart("");
   setAreaTotalWarning("");
   setAreaHourlyStat("");
   setLevelAreaStat("");

   setLevelStrStat("");
   setAreaKwhStat("");
   setAreaKwhYearStat("");
   setAreaKwhHourlyStat("");
   setStrKwhStat("");
  }

  const initStrCode = () => {
    document.getElementById("strSelect").value = "";
    setStrCode("");
    setAreaCode("");
  }

  const clickStrRow = e => {
    document.getElementById("strSelect").value = e.strCode;
    setStrCode(e.strCode);
    setAreaCode(e.areaCode);
  };

  const handleClickBtnGroup = type => {
    if(type !== "store") {
      document.getElementById("strSelect").style.display = "none";
      document.getElementById("strSelect").value = "";
      setStrCode("");
      setAreaCode("AREA_000003");

      getSelectGroup(type).then(resp => {
        setTypeValue(type);
        document.getElementById("selectGroup").innerHTML = '';
        document.getElementById("selectGroup").style.display = "block";
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
    } else {
      setTypeValue(type);
      document.getElementById("strSelect").style.display = "block";
      document.getElementById("selectGroup").style.display = "none";
    }
  }

  const handleChangeGroup = e => {
    if(typeValue === "guCode") setGuCode(e.target.value);
    else setAreaCode(e.target.value);
  }

  const handleClickSearchStat = async () => {
    let dayHourData = [];
    let dayWeekData = [];
    setHookReset();
    setLoading(true);
    setTotalLoading(true);
    if(typeValue === "store" && strCode === "") {
      alert("상점을 선택해주세요.");
      return false;
    }

    await getStatInfo(typeValue, guCode, areaCode, startDate, endDate, strCode).then(resp => {
      if (resp.data['result'] === "success") {
        // 상점일 경우
        if(typeValue === "store") {
          if(resp.data["strInfo"] !== null) {
            strName = resp.data["strInfo"]["strName"];
            snsrCnt = resp.data["strInfo"]["snsrCnt"];
          }

          if(resp.data["weekMonthStat"] !== null) {
            setStoreYearWarning(storeYearWarningComp(resp.data["weekMonthStat"]));
            setStoreChart(storeChartComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"], resp.data["weekMonthStat"]));
          }
        }

        if(resp.data["infoStat"].length > 1) {
          let compList = [];
          resp.data["infoStat"].map((item, idx) => {
            compList.push(areaStatusComponent(item.areaName, startDate, endDate, item.areaAddr));
          })
          setAreaState(compList);
        } else {
          const temp = resp.data["infoStat"];
          setAreaName(temp.areaName);
          areaNameTitle = temp.areaName;
          setAreaState(areaStatusComponent(temp, startDate, endDate, typeValue, strName, snsrCnt));
        }

        if(typeValue === "areaCode") {
          setAreaTotalWarning(areaTotalWarningComp(areaNameTitle, resp.data["weekMonthStat"]));
          setAreaHourlyStat(areaTotalChartStatComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));

          // setAreaKwhHourlyStat(areaTotalKwhComp(resp.data["hourlyStat"], resp.data["dayOfWeekStat"]));
          if(resp.data["levelAreaStat"].length > 0)
            setLevelAreaStat(levelAreaStatComp(areaNameTitle, resp.data["levelAreaStat"]));
          else
            setLevelAreaStat("");
          if(resp.data["levelStrStat"] !== null)
            if(resp.data["levelStrStat"].length > 0)
              setLevelStrStat(levelStoreStatComp(areaNameTitle, resp.data["levelStrStat"]));
            else
              setLevelStrStat("");

          if(resp.data["weekMonthStat"] !== null)
            if(resp.data["weekMonthStat"].length > 0)
              setAreaKwhYearStat(areaKwhStatYearComp(resp.data["weekMonthStat"]));
            else
              setAreaKwhYearStat("");

          dayHourData = resp.data["hourlyStat"]
          dayWeekData = resp.data["dayOfWeekStat"];
        }
        setLoading(false);
      } else {
        alert("서버 통신에 오류가 발생했습니다.");
      }
    });

    if(typeValue !== "store") {
      await getStatInfoList(typeValue, guCode, areaCode, startDate, endDate).then(resp => {
        if (resp.data['result'] === "success") {
          if(resp.data["areaKwhStat"] !== null)
            setAreaKwhStat(areaKwhStatComp(areaNameTitle, resp.data["areaKwhStat"]));
          else
            setAreaKwhStat("");

          if(resp.data["areaStrKwhStat"] !== null)
            if(resp.data["areaStrKwhStat"].length > 0)
              setStrKwhStat(strKwhStatComp(areaNameTitle, resp.data["areaStrKwhStat"], dayHourData, dayWeekData))
            else
              setStrKwhStat("");

        } else {
          alert("서버 통신에 오류가 발생했습니다.");
        }
      });
      setTotalLoading(false);
    } else {
      setTotalLoading(false);
    }

  }
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
      setTimeout(() => {
        resolve();
      }, 2000);
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
      <CCol md={"12"} style={{ paddingLeft: "150px", paddingRight: "150px"}}>
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

                <div className={"d-flex justify-content-center mb-0 align-items-center mt-1 mr-2"}>
                  <CSelect style={{ width: "185px" }} id={"selectGroup"} onChange={handleChangeGroup}>
                    <option>전체(시장)</option>
                  </CSelect>
                  <input className="form-control" id={"strSelect"} type={"text"} onClick={e => setOnStrModal(true)} readOnly={true}/>
                </div>

                <DatePicker locale={ko} className={"form-control mt-1"} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)}/>
                <span className={'ml-1 mt-2'}>~</span>
                <DatePicker className={'ml-1 form-control mt-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>
                <CButton color="info" className={"ml-2"} onClick={handleClickSearchStat}>
                  검색
                </CButton>
                {/*<CButton color="secondary" className={"ml-1"} onClick={() => handlePrint}><CIcon name="cil-print"/></CButton>*/}
                <button className={"btn btn-secondary ml-2"} onClick={handlePrint} disabled={totalLoading}>
                  <CIcon name="cil-print"/>
                </button>
              </div>
            </div>
          </CCardHeader>
          <CCardBody style={{padding : "2rem"}}>
            {
              loading && <CRow id={"loading"}>
                <CCol md={"12"}>
                  <div className={"d-flex justify-content-center"} style={{height: "300px"}}>
                    <div className={"d-flex align-content-center align-items-center "}>
                      <Spinner name="three-bounce" color="steelblue"/>
                    </div>
                  </div>
                </CCol>
              </CRow>
            }

            {areaState}
            {
              typeValue !== "store" ?
                areaTotalWarning :
                storeYearWarning
            }
            {
              typeValue !== "store" ?
                areaHourlyStat:
                storeChart
            }
            {
              typeValue !== "store" ?
                levelAreaStat :
                ""
            }
            {
              typeValue !== "store" ?
                levelStrStat :
                ""
            }
            {
              typeValue !== "store" ?
                areaKwhStat :
                ""
            }
            {
              typeValue !== "store" ?
                areaKwhYearStat :
                ""
            }
            {
              typeValue !== "store" ?
                strKwhStat :
                ""
            }
          </CCardBody>
        </CCard>
      </CCol>
      <PageStrTableModalWidget onStrModal={onStrModal} setOnStrModal={setOnStrModal} clickStrRow={clickStrRow} initStrCode={initStrCode} areaId={"areaSelect"} />

      {/*{printLoading &&*/}

      {/*         <ComponentToPrint ref={componentRef} areaState={areaState} areaTotalWarning={areaTotalWarning} areaHourlyStat={areaHourlyStat} areaHourlyStat2={areaHourlyStat2}*/}
      {/*                           levelAreaStat={levelAreaStat} levelStrStat={levelStrStat} areaKwhStat={areaKwhStat} areaKwhYearStat={areaKwhYearStat} typeName={typeValue}*/}
      {/*                           areaKwhHourlyStat={areaKwhHourlyStat} strKwhStat={strKwhStat} areaTitle={areaName} type={topBtnValue} startDate={formatDate(startDate)}*/}
      {/*                           endDate={formatDate(endDate)} />*/}
      {/*}*/}
    </>
  )
};

export default StatMgr;
