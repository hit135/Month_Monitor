import {API_ROOT, formatDate, numCommaFormat} from "../commonIndex";
import {CButton, CCol, CRow} from "@coreui/react";
import {ResponsiveBar} from '@nivo/bar'
import {ResponsivePie} from '@nivo/pie'
import React from "react";

const axios = require('axios');

export const getSelectGroup = (type) => axios.get(`${API_ROOT}/selectGroup?type=${type}`);

export const getStatInfo = (type, grpCode, areaCode, strCode, startDate, endDate, dateType, yearDate, monthDate, halfDate, halfSelect, quarterDate) =>
  axios.get([
    `${API_ROOT}/statInfo?type=${type}`
    , `grpCode=${grpCode}`
    , `areaCode=${areaCode}`
    , `strCode=${strCode}`
    , `startDate=${formatDate(startDate)}`
    , `endDate=${formatDate(endDate)}`
    , `dateType=${dateType}`
    , `yearDate=${formatDate(yearDate)}`
    , `monthDate=${formatDate(monthDate)}`
    , `halfDate=${formatDate(halfDate)}`
    , `halfSelect=${halfSelect}`
    , `quarterDate=${formatDate(quarterDate)}`
  ].join('&'));

export const getStatInfoList = (type, grpCode, areaCode, strCode, startDate, endDate, dateType, yearDate, monthDate, halfDate, halfSelect, quarterDate) =>
  axios.get([
    `${API_ROOT}/statInfoList?type=${type}`
    , `grpCode=${grpCode}`
    , `areaCode=${areaCode}`
    , `strCode=${strCode}`
    , `startDate=${formatDate(startDate)}`
    , `endDate=${formatDate(endDate)}`
    , `dateType=${dateType}`
    , `yearDate=${formatDate(yearDate)}`
    , `monthDate=${formatDate(monthDate)}`
    , `halfDate=${formatDate(halfDate)}`
    , `halfSelect=${halfSelect}`
    , `quarterDate=${formatDate(quarterDate)}`
  ].join('&'));

// 시장, 상점 전기안전현황 컴포넌트
export const areaStatusComponent = (param, startDate, endDate, type, strName, snsrCnt, strTel, strOwnTel, areaList) => {
  let today = new Date();
  let todayString = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일';
  let areaList1 = [];
  let areaList2 = [];
  if(param.areaName === "중구"){
    areaList1.push(areaList[0]);
    areaList1.push(areaList[2]);
    areaList1.push(areaList[4]);
    areaList2.push(areaList[1]);
    areaList2.push(areaList[3]);
    areaList2.push(areaList[5]);
  }
  return (
    <div>
      {type === "areaCode" ?
        <div className={"printMargin"}>
          <table className="table table-sm table-bordered mb-0 printTable">
            <tbody>
            <tr>
              <td className="wme_table_td_title table-title text-center" colSpan={2}>{param.areaName} {strName} 전기화재예방서비스 설치현황
              </td>
            </tr>
            <tr>
              <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>대상</td>
              <td>
                {type === "store"
                  ? "전기감지 센서 " + snsrCnt + "채널"
                  : param.areaName.includes('시장')
                      ? param.snsrCnt?.toLocaleString() + "채널 (상점수 " + param.strCnt?.toLocaleString() + "개)"
                      : param.snsrCnt?.toLocaleString() + "채널 (분전함수 " + param.strCnt?.toLocaleString() + "개)"
                }
              </td>
            </tr>
            <tr>
              <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>설치일자</td>
              <td>
                {type !== "store" ?
                  param.aRegDate.split("-")[0] + "년 " + param.aRegDate.split("-")[1] + "월 " + param.aRegDate.split("-")[2] + "일" :
                  param.sRegDate.split("-")[0] + "년 " + param.sRegDate.split("-")[1] + "월 " + param.sRegDate.split("-")[2] + "일"}
              </td>
            </tr>
            <tr>
              <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>운영기간</td>
              <td>
                {type !== "store" ?
                  param.aRegDate.split("-")[0] + "년 " + param.aRegDate.split("-")[1] + "월 " + param.aRegDate.split("-")[2] + "일 ~ 현재 (" + todayString + ")" :
                  param.sRegDate.split("-")[0] + "년 " + param.sRegDate.split("-")[1] + "월 " + param.sRegDate.split("-")[2] + "일 ~ 현재 (" + todayString + ")"}
              </td>
            </tr>
            <tr>
              <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>조회기간</td>
              <td>{startDate + ' ~ ' + endDate}</td>
            </tr>
            {type === "areaCode"
              ?
              <tr>
                <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>주소</td>
                <td>{param.areaAddr}</td>
              </tr>
              : null}
            </tbody>
          </table>
        </div>
        : (type === "store" ?
            <div className={"printMargin"}>
              <table className="table table-sm table-bordered mb-0 printTable">
                <tbody>
                <tr>
                  <td className="wme_table_td_title table-title text-center" colSpan={4}>{param.areaName} {strName} 전기위험
                    현황
                  </td>
                </tr>
                <tr>
                  <td className="wme_table_td_title">대상</td>
                  <td>
                    {type !== "store" ?
                      param.snsrCnt?.toLocaleString() + "채널 (상점수 " + param.strCnt?.toLocaleString() + "개)" : "전기감지 센서 " + snsrCnt + "대"}
                  </td>
                  <td className="wme_table_td_title">조회기간</td>
                  <td>{endDate === undefined ? startDate : startDate + " - " + endDate}</td>
                </tr>
                <tr>
                  <td className="wme_table_td_title">설치일자</td>
                  <td>{param.sRegDate.split("-")[0] + "년 " + param.sRegDate.split("-")[1] + "월 " + param.sRegDate.split("-")[2] + "일"}</td>
                  <td className="wme_table_td_title" style={{width: "15%"}}>상점주 연락처</td>
                  <td>{/*{strOwnTel}*/}</td>
                </tr>
                <tr>
                  <td className="wme_table_td_title">운영기간</td>
                  <td>{param.sRegDate.split("-")[0] + "년 " + param.sRegDate.split("-")[1] + "월 " + param.sRegDate.split("-")[2] + "일 ~ 현재"}</td>
                  <td className="wme_table_td_title" style={{width: "15%"}}>상점 연락처</td>
                  <td>{/*{strTel}*/}</td>
                </tr>
                <tr>
                  <td className="wme_table_td_title">주소</td>
                  <td colSpan="3">{param.areaAddr}</td>
                </tr>
                </tbody>
              </table>
            </div>
            :
            <div className={"printMargin"}>
              <table className="table table-sm table-bordered mb-0 printTable">
                <tbody>
                <tr>
                  <td className="wme_table_td_title table-title text-center" colSpan={4}>{param.areaName} {strName} 전기화재예방서비스 설치현황
                  </td>
                </tr>
                <tr>
                  <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>대상</td>
                  <td>
                    {param.snsrCnt?.toLocaleString() + "채널 ( 시장수 " + param.areaCnt?.toLocaleString() + "개, 상점수 " + param.strCnt?.toLocaleString() + "개)"}
                  </td>
                  <td className="wme_table_td_title" style={{width: "15%", paddingLeft: "1.5%"}}>조회기간</td>
                  <td>{startDate + ' ~ ' + endDate}</td>
                </tr>
                {param.areaName === "중구" ?
                  (areaList1.map((item, idx) => (
                      <tr>
                        <td className="wme_table_td_title"
                            style={{width: "15%", paddingLeft: "1.5%"}}>{item['areaName']}</td>
                        <td>
                          {item['snsrCnt'] + "채널 (상점수 : " + item["strCnt"] + "개, 설치일자 : " +
                          item["sRegDate"].split("-")[0] + "년 " + item["sRegDate"].split("-")[1] + "월 " + item["sRegDate"].split("-")[2] + "일" + " )"}
                        </td>
                        <td className="wme_table_td_title"
                            style={{width: "15%", paddingLeft: "1.5%"}}>{areaList2[idx]['areaName']}</td>
                        <td>
                          {areaList2[idx]['snsrCnt'] + "채널 (상점수 : " + areaList2[idx]["strCnt"] + "개, 설치일자 : " +
                          areaList2[idx]["sRegDate"].split("-")[0] + "년 " + areaList2[idx]["sRegDate"].split("-")[1] + "월 " + areaList2[idx]["sRegDate"].split("-")[2] + "일" + " )"}
                        </td>

                      </tr>))
                  )

                  :
                  (areaList.map((item, idx) => (
                      <tr>
                        <td className="wme_table_td_title"
                            style={{width: "15%", paddingLeft: "1.5%"}}>{item['areaName']}</td>
                        <td colSpan={3}>
                          {item['snsrCnt'] + "채널 (상점수 : " + item["strCnt"] + "개, 설치일자 : " +
                          item["sRegDate"].split("-")[0] + "년 " + item["sRegDate"].split("-")[1] + "월 " + item["sRegDate"].split("-")[2] + "일" + " )"}
                        </td>

                      </tr>))
                  )

                }
                </tbody>
              </table>
            </div>
        )}
    </div>
  );
}

// 시장
// 전기안전 경보 발생현황(종합) 컴포넌트
export const areaTotalWarningComp = (areaName, item, type) => {
  let chartData = [];
  let totalWarning1stNum = item[12]["oc1st"] + item[12]["igo1st"] + item[12]["igr1st"];
  let totalWarning2ndNum = item[12]["oc2nd"] + item[12]["igo2nd"] + item[12]["igr2nd"];

  item.map((item, idx) => {
    if (idx !== 12)
      chartData.push({"label": (idx + 1) + "월", "과전류 1차 경보": item["oc1st"], "과전류 2차 경보": item["oc2nd"]});
  });

  return (
    <div className={"mt-3 printMargin"}>
      <h5 className={"title"}>{areaName} 전기위험 경보 발생 현황</h5>
      <span className={"mb-2 subTitle"} style={{fontSize: "20px", display: "block"}}>전기위험 경보 발생 현황(종합)</span>
      <table className="table table-sm table-bordered mb-0 printTable">
        <colgroup>
          <col width="25%"/>
          <col width="25%"/>
          <col width="25%"/>
          <col width="25%"/>
        </colgroup>
        <thead>
        <tr>
          <th className="text-center wme_table_td_title" style={{paddingTop: "5px", paddingBottom: "5px"}}>경보 종류</th>
          <th className="text-center wme_table_td_title" colSpan="3"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>경보 구분
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2"
              style={{verticalAlign: "middle", width: "120px"}}>과전류 경보
          </td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>주의(1차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>경고(2차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>계</td>
        </tr>
        <tr>
          <td id="wme_area_oc_warning_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["oc1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_oc_danger_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["oc2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_oc_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["ocEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>저항성누설전류(IGR)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>주의(1차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>경고(2차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>계</td>
        </tr>
        <tr>
          <td id="wme_area_igr_warning_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igr1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igr_danger_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igr2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igr_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igrEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>전체누설전류(IGO)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>주의(1차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>경고(2차경보)</td>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>계</td>
        </tr>
        <tr>
          <td id="wme_area_igo_warning_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igo1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igo_danger_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igo2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igo_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["igoEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" style={{paddingTop: "5px", paddingBottom: "5px"}}>계</td>
          <td id="wme_area_warning_cnt_td" className="text-right" style={{
            paddingTop: "5px",
            paddingBottom: "5px"
          }}>{isNaN(totalWarning1stNum) ? 0 : totalWarning1stNum?.toLocaleString() || 0}</td>
          <td id="wme_area_danger_cnt_td" className="text-right" style={{
            paddingTop: "5px",
            paddingBottom: "5px"
          }}>{isNaN(totalWarning2ndNum) ? 0 : totalWarning2ndNum?.toLocaleString() || 0}</td>
          <td id="wme_area_event_cnt_td" className="text-right"
              style={{paddingTop: "5px", paddingBottom: "5px"}}>{item[12]["monthlyEvt"]?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>
      <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>전기위험 경보 발생 현황(상세)</span>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_event_monthly_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" colSpan="2" style={{verticalAlign: "middle"}}>경보
            종류
          </td>
          <td className="wme_table_td_title text-center" colSpan="13">월별 경보 발생 건수</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>1월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>2월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>3월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>4월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>5월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>6월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>7월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>8월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>9월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>10월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>11월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>12월</td>
          <td className="wme_table_td_title text-center" style={{width: "6.0%"}}>계</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle", width: "10%"}}>과전류
            경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차)</td>
          <td className="text-right">{getStatValue(item[0]["oc1st"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["oc1st"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["oc1st"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["oc1st"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["oc1st"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["oc1st"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["oc1st"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["oc1st"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["oc1st"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["oc1st"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["oc1st"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["oc1st"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["oc1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차)</td>
          <td className="text-right">{getStatValue(item[0]["oc2nd"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["oc2nd"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["oc2nd"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["oc2nd"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["oc2nd"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["oc2nd"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["oc2nd"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["oc2nd"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["oc2nd"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["oc2nd"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["oc2nd"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["oc2nd"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["oc2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>저항성누설전류(IGR) 경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차)</td>
          <td className="text-right">{getStatValue(item[0]["igr1st"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igr1st"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igr1st"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igr1st"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igr1st"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igr1st"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igr1st"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igr1st"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igr1st"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igr1st"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igr1st"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igr1st"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igr1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차)</td>
          <td className="text-right">{getStatValue(item[0]["igr2nd"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igr2nd"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igr2nd"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igr2nd"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igr2nd"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igr2nd"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igr2nd"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igr2nd"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igr2nd"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igr2nd"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igr2nd"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igr2nd"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igr2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>전체누설전류(IGO) 경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차)</td>
          <td className="text-right">{getStatValue(item[0]["igo1st"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igo1st"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igo1st"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igo1st"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igo1st"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igo1st"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igo1st"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igo1st"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igo1st"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igo1st"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igo1st"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igo1st"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igo1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차)</td>
          <td className="text-right">{getStatValue(item[0]["igo2nd"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igo2nd"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igo2nd"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igo2nd"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igo2nd"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igo2nd"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igo2nd"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igo2nd"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igo2nd"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igo2nd"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igo2nd"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igo2nd"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igo2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" colSpan="2">계</td>
          <td className="text-right">{getStatValue(item[0]["monthlyEvt"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["monthlyEvt"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["monthlyEvt"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["monthlyEvt"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["monthlyEvt"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["monthlyEvt"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["monthlyEvt"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["monthlyEvt"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["monthlyEvt"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["monthlyEvt"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["monthlyEvt"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["monthlyEvt"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["monthlyEvt"]?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>
      <div>
        <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 과전류 경보 발생 현황 차트</span>
          <div className={"d-flex align-items-center"}>
            <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
          </div>
        </div>
        <CRow style={{height: "500px"}}>
          {areaBarChart(['과전류 1차 경보', '과전류 2차 경보'], chartData, "paired")}
        </CRow>
      </div>
    </div>
  );
}

export const areaTotalChartStatComp = (item1, item2, item3, type) => {
  let hourOcChartData = [];
  let hourIgoChartData = [];
  let hourIgrChartData = [];
  let dayOcChartData = [];
  let dayIgoChartData = [];
  let dayIgrChartData = [];
  let keys = ["주의", "경고"];

  item1.map(item => {
    hourOcChartData.push({"label": item["hour"], "주의": item["ocWarningCnt"], "경고": item["ocDangerCnt"]});
    hourIgoChartData.push({"label": item["hour"], "주의": item["igoWarningCnt"], "경고": item["igoDangerCnt"]});
    hourIgrChartData.push({"label": item["hour"], "주의": item["igrWarningCnt"], "경고": item["igrDangerCnt"]});
  });

  item2.map(items => {
    dayOcChartData.push({"label": items["dayName"], "주의": items["oc1stCnt"], "경고": items["oc2ndCnt"]});
    dayIgoChartData.push({"label": items["dayName"], "주의": items["igo1stCnt"], "경고": items["igo2ndCnt"]});
    dayIgrChartData.push({"label": items["dayName"], "주의": items["igr1stCnt"], "경고": items["igr2ndCnt"]});
  });

  let chartData = [];
  item3.map((item, idx) => {
    if (idx !== 12) {
        chartData.push({
          "label": (idx + 1) + "월",
          "전체누설전류 1차 경보": item["igo1st"],
          "전체누설전류 2차 경보": item["igo2nd"],
          "저항성누설전류 1차 경보": item["igr1st"],
          "저항성누설전류 2차 경보": item["igr2nd"]
        });
    }
  });

  return (
    <div className={"printMargin"}>
      <div>
        <div>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
              <span className={"mb-2 mt-2 subTitle"}
                    style={{fontSize: "20px", display: "block"}}>* 전체누설 및 저항누설 전류차트</span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          <CRow style={{height: "500px"}}>
            {areaBarChart(["전체누설전류 1차 경보", "전체누설전류 2차 경보", "저항성누설전류 1차 경보", "저항성누설전류 2차 경보"], chartData, ["#bdf192", "#4e8124", "#e8c1a0", "#f47560"], false)}
          </CRow>
        </div>
      </div>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 시간대별 과전류 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">0 ~ 3</td>
              <td className="text-right">{item1[0]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">4 ~ 7</td>
              <td className="text-right">{item1[1]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">8 ~ 11</td>
              <td className="text-right">{item1[2]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">12 ~ 15</td>
              <td className="text-right">{item1[3]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">16 ~ 19</td>
              <td className="text-right">{item1[4]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">20 ~ 23</td>
              <td className="text-right">{item1[5]["ocWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["ocDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, hourOcChartData, "paired")}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 요일별 과전류 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_igo_danger_dayofweek_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">요일</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">일요일</td>
              <td className="text-right">{item2[0]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">월요일</td>
              <td className="text-right">{item2[1]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">화요일</td>
              <td className="text-right">{item2[2]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">수요일</td>
              <td className="text-right">{item2[3]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">목요일</td>
              <td className="text-right">{item2[4]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">금요일</td>
              <td className="text-right">{item2[5]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">토요일</td>
              <td className="text-right">{item2[6]["oc1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["oc2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["ocTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, dayOcChartData, "paired")}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"}
                style={{fontSize: "20px", display: "block"}}>* 시간대별 저항성누설전류(IGR) 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">0 ~ 3</td>
              <td className="text-right">{item1[0]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">4 ~ 7</td>
              <td className="text-right">{item1[1]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">8 ~ 11</td>
              <td className="text-right">{item1[2]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">12 ~ 15</td>
              <td className="text-right">{item1[3]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">16 ~ 19</td>
              <td className="text-right">{item1[4]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">20 ~ 23</td>
              <td className="text-right">{item1[5]["igrWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["igrDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, hourIgrChartData, 'nivo')}
        </CCol>
      </CRow>
    </div>
);
}

export const areaTotalChartStatComp2 = (item1, item2) => {
  let hourIgoChartData = [];
  let hourIgrChartData = [];
  let dayIgoChartData = [];
  let dayIgrChartData = [];
  let keys = ["주의", "경고"];

  item1.map(item => {
    hourIgoChartData.push({"label": item["hour"], "주의": item["igoWarningCnt"], "경고": item["igoDangerCnt"]});
    hourIgrChartData.push({"label": item["hour"], "주의": item["igrWarningCnt"], "경고": item["igrDangerCnt"]});
  });

  item2.map(items => {
    dayIgoChartData.push({"label": items["dayName"], "주의": items["igo1stCnt"], "경고": items["igo2ndCnt"]});
    dayIgrChartData.push({"label": items["dayName"], "주의": items["igr1stCnt"], "경고": items["igr2ndCnt"]});
  });

  return (
    <div className={"printRow printMargin"}>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"}
                style={{fontSize: "20px", display: "block"}}>* 요일별 저항성누설전류(IGR) 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_igo_danger_dayofweek_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">요일</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">일요일</td>
              <td className="text-right">{item2[0]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">월요일</td>
              <td className="text-right">{item2[1]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">화요일</td>
              <td className="text-right">{item2[2]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">수요일</td>
              <td className="text-right">{item2[3]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">목요일</td>
              <td className="text-right">{item2[4]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">금요일</td>
              <td className="text-right">{item2[5]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">토요일</td>
              <td className="text-right">{item2[6]["igr1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["igr2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["igrTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, dayIgrChartData, "nivo")}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"}
                style={{fontSize: "20px", display: "block"}}>* 시간대별 전체누설전류(IGO) 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">0 ~ 3</td>
              <td className="text-right">{item1[0]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[0]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">4 ~ 7</td>
              <td className="text-right">{item1[1]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[1]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">8 ~ 11</td>
              <td className="text-right">{item1[2]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[2]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">12 ~ 15</td>
              <td className="text-right">{item1[3]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[3]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">16 ~ 19</td>
              <td className="text-right">{item1[4]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[4]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">20 ~ 23</td>
              <td className="text-right">{item1[5]["igoWarningCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["igoDangerCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item1[5]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, hourIgoChartData, 'nivo')}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"}
                style={{fontSize: "20px", display: "block"}}>* 요일별 전체누설전류(IGO) 발생현황</span>
          <table className="table table-sm table-bordered mb-0 printTable">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">요일</td>
              <td className="wme_table_td_title text-center">주의</td>
              <td className="wme_table_td_title text-center">경고</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">일요일</td>
              <td className="text-right">{item2[0]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">월요일</td>
              <td className="text-right">{item2[1]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">화요일</td>
              <td className="text-right">{item2[2]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">수요일</td>
              <td className="text-right">{item2[3]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">목요일</td>
              <td className="text-right">{item2[4]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">금요일</td>
              <td className="text-right">{item2[5]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">토요일</td>
              <td className="text-right">{item2[6]["igo1stCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["igo2ndCnt"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["igoTotalPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}></span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaHourlDayStatChart(keys, dayIgoChartData, "nivo")}
        </CCol>
      </CRow>
    </div>
  );
}

// 시장별 현황
export const levelAreaStatComp = (areaName, item) => {
  let areaType = false;
  let chartData = [];
  let chartData2 = [];
  if (areaName === "대전중앙시장")
    areaType = true;
  if (areaType) {
    item.map(item => {
      // chartKey.push(item["areaName"]);
      chartData.push({"label": item["areaName"], "이벤트건수": item["totalCnt"]});
      chartData2.push({"label": item["areaName"], "전력사용량(kWh)": Math.round(item["snsrKwh"])});
    });
  }
  return (
    <div className={"mt-4 printMargin"}>
      {areaName.includes('시장')
      ? <h5 className={"title"}>{areaName} 내 시장별 현황</h5>
      : <h5 className={"title"}>{areaName} 전기 위험 발생 현황</h5>}
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody id="wme_level_area_table">
        <tr>
          {areaName.includes('시장')
          ? <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>소시장명</td>
          : <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>기관명</td>}
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>저항성누설전류(IGR)</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>전체누설전류(IGO)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>소비전력(kWh)</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
        {item.map((item2, idx) => (
          <tr className="wme_str_event_tr" key={idx}>
            <td className="text-center">{item2['areaName']}</td>
            <td className="text-right">{item2['oc1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['oc2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{Math.round(item2['snsrKwh'])?.toLocaleString() || 0}</td>
          </tr>))}
        </tbody>
      </table>
      {areaType &&
      <div>
        <CRow style={{height: "530px"}}>
          <CCol sm={12} style={{marginTop: "20px", marginBottom: "-30px"}}>
            <div className={"d-flex justify-content-between"}>
              <span className={"mb-2 mt-2 subTitle"}
                    style={{fontSize: "20px", display: "block"}}>* 단위시장별 전기위험 알림 발생현황</span>
              <div className={"d-flex align-items-center"}>
                <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
              </div>
            </div>
          </CCol>
          {areaBarChart(["이벤트건수"], chartData, 'paired')}
        </CRow>
        <CRow style={{height: "530px"}}>
          <CCol sm={12} style={{marginTop: "20px", marginBottom: "-30px"}}>
            <div className={"d-flex justify-content-between"}>
              <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 단위시장별 전력사용량</span>
              <div className={"d-flex align-items-center"}>
                <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : kWh)</span>
              </div>
            </div>
          </CCol>
          {areaBarChart(["전력사용량(kWh)"], chartData2, 'paired')}
        </CRow>
      </div>}
    </div>
  );
}

//
// 내상점별 현황
export const levelStoreStatComp = (type, areaName, item) =>
  <div className={"mt-5 printMargin"}>
    {areaName.includes('시장')
      ? <h5 className={"title"}>{areaName} 내 상점별 현황</h5>
      : <h5 className={"title"}>{areaName} 분전함별 전기 위험 발생 현황</h5>}
    {type === "grpCode" ?
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody id="wme_str_event_table">
        <tr>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>시장명</td>
          {areaName.includes('시장')
            ? <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>상점명</td>
            : <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>분전함명</td>}
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>저항성누설전류(IGR)</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>전체누설전류(IGO)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>비고</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
        {item.map((item2, idx) => (
          <tr className="wme_str_event_tr" key={idx}>
            <td className="text-center">{item2['areaName']}</td>
            <td className="text-center">{item2['strName']}</td>
            <td className="text-right">{item2['oc1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['oc2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo2nd']?.toLocaleString() || 0}</td>
            {/*<td className="text-right">{item2['disconn']?.toLocaleString() || 0}</td>*/}
            <td></td>
          </tr>))}
        </tbody>
      </table>
      :
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody id="wme_str_event_table">
        <tr>
          {areaName.includes('시장')
            ? <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>상점명</td>
            : <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>분전함명</td>}
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>저항성누설전류(IGR)</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>전체누설전류(IGO)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>비고</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
        {item.map((item2, idx) => (
          <tr className="wme_str_event_tr" key={idx}>
            <td className="text-center">{item2['strName']}</td>
            <td className="text-right">{item2['oc1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['oc2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igr2nd']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo1st']?.toLocaleString() || 0}</td>
            <td className="text-right">{item2['igo2nd']?.toLocaleString() || 0}</td>
            {/*<td className="text-right">{item2['disconn']?.toLocaleString() || 0}</td>*/}
            <td></td>
          </tr>))}
        </tbody>
      </table>
    }
  </div>;
// 데이터가 존재하지 않을 경우, 내상점별 현황에 [데이터없음] 표시
export const levelStoreStatNullComp = (type, areaName, item) =>
  <div className={"mt-5 printMargin"}>
    {areaName.includes('시장')
      ? <h5 className={"title"}>{areaName} 내 상점별 현황</h5>
      : <h5 className={"title"}>{areaName} 분전함별 전기 위험 발생 현황</h5>}
    {type === "grpCode" ?
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody id="wme_str_event_table">
        <tr>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>시장명</td>
          {areaName.includes('시장')
            ? <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>상점명</td>
            : <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>분전함명</td>}
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>저항성누설전류(IGR)</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>전체누설전류(IGO)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>비고</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
          <td colSpan="8" className="wme_str_event_tr text-center">
            데이터없음
          </td>
        </tbody>
      </table>
      :
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody id="wme_str_event_table">
        <tr>
          {areaName.includes('시장')
            ? <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>상점명</td>
            : <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>분전함명</td>}
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>저항성누설전류(IGR)</td>
          <td colSpan="2" className="wme_table_td_title text-center" style={{width: "20%"}}>전체누설전류(IGO)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>비고</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
        </tbody>
        <td colSpan="8" className="wme_str_event_tr text-center">
          데이터없음
        </td>
      </table>
    }
  </div>;
// 전기사용량 현황
export const areaKwhStatComp = (areaName, item) =>
  <div className={"mt-5 printMargin"}>
    <CRow>
      <CCol sm={"12"}>
        <h5 className={"title"}>{areaName} 전력사용량 현황(종합)</h5>
        <span className={"mb-2 subTitle"} style={{fontSize: "20px", display: "block"}}>전력사용량 현황(종합)</span>
        <table className="table table-sm table-bordered mb-0 printTable">
          <tbody>
          <tr>
            <td className="wme_table_td_title text-center"></td>
            <td className="wme_table_td_title text-center">사용량(Kwh)</td>
          </tr>
          <tr>
            <td className="wme_table_td_title text-center">전력사용량</td>
            <td className="text-right">{Math.round(item['snsrKwh'])?.toLocaleString() || 0}</td>
          </tr>
          </tbody>
        </table>
      </CCol>
    </CRow>
  </div>;
//
// 전기사용량 상세 현황
export const areaKwhStatYearComp = (item, item2, item3) => {
  console.log(item2);
  let chartData = [];
  item.map((item, idx) => {
    if (idx !== 12)
      chartData.push({"label": (idx + 1) + "월", "전력사용량": Math.round(item["snsrKwh"])});
  });
  let hourKwhData = [];
  item2.map(item => hourKwhData.push({"label": item["hour"], "사용량(kWh)": Math.round(item["snsrKwh"])}));
  let dayKWhData = [];
  item3.map(item => dayKWhData.push({"label": item["dayName"], "사용량(kWh)": Math.round(item["snsrKwh"])}));
  return (
    <div className={"printMargin"}>
      <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>전력사용량 현황(상세)</span>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_kwh_monthly_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title"></td>
          <td colSpan="13" className="wme_table_td_title text-center">월별 전력사용량(Kwh)</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">월</td>
          <td className="wme_table_td_title text-center">1월</td>
          <td className="wme_table_td_title text-center">2월</td>
          <td className="wme_table_td_title text-center">3월</td>
          <td className="wme_table_td_title text-center">4월</td>
          <td className="wme_table_td_title text-center">5월</td>
          <td className="wme_table_td_title text-center">6월</td>
          <td className="wme_table_td_title text-center">7월</td>
          <td className="wme_table_td_title text-center">8월</td>
          <td className="wme_table_td_title text-center">9월</td>
          <td className="wme_table_td_title text-center">10월</td>
          <td className="wme_table_td_title text-center">11월</td>
          <td className="wme_table_td_title text-center">12월</td>
          <td className="wme_table_td_title text-center">계</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">전력사용량</td>
          <td className="text-right">{getStatValue(Math.round(item[0]["snsrKwh"]), item[1]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[1]["snsrKwh"]), item[1]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[2]["snsrKwh"]), item[2]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[3]["snsrKwh"]), item[3]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[4]["snsrKwh"]), item[4]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[5]["snsrKwh"]), item[5]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[6]["snsrKwh"]), item[6]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[7]["snsrKwh"]), item[7]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[8]["snsrKwh"]), item[8]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[9]["snsrKwh"]), item[9]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[10]["snsrKwh"]), item[10]['sDate'])}</td>
          <td className="text-right">{getStatValue(Math.round(item[11]["snsrKwh"]), item[11]['sDate'])}</td>
          <td className="text-right">{Math.round(item[12]["snsrKwh"])?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>
      <CRow>
        <CCol md={"12"} style={{height: "500px"}}>
          {areaBarChart(["전력사용량"], chartData, "set3")}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 시간대별 전력사용량</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">사용량(kWh)</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">0 ~ 3</td>
              <td className="text-right">{Math.round(item2[0]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[0]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">4 ~ 7</td>
              <td className="text-right">{Math.round(item2[1]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[1]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">8 ~ 11</td>
              <td className="text-right">{Math.round(item2[2]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[2]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">12 ~ 15</td>
              <td className="text-right">{Math.round(item2[3]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[3]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">16 ~ 19</td>
              <td className="text-right">{Math.round(item2[4]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[4]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">20 ~ 23</td>
              <td className="text-right">{Math.round(item2[5]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2[5]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "450px"}}>
          {areaHourlDayStatChart(["사용량(kWh)"], hourKwhData, "set3")}
        </CCol>
      </CRow>
    </div>
  );
}

//
export const strKwhStatComp = (areaName, item) => {
  let dayKwhData = [];
  item.map(items => dayKwhData.push({"label": items["dayName"], "사용량(kWh)": Math.round(items["snsrKwh"])}));
  return (
    <div className={"printMargin"}>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 요일별 전력사용량</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">사용량(kWh)</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">일요일</td>
              <td className="text-right">{Math.round(item[0]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[0]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">월요일</td>
              <td className="text-right">{Math.round(item[1]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[1]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">화요일</td>
              <td className="text-right">{Math.round(item[2]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[2]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">수요일</td>
              <td className="text-right">{Math.round(item[3]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[3]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">목요일</td>
              <td className="text-right">{Math.round(item[4]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[4]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">금요일</td>
              <td className="text-right">{Math.round(item[5]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[5]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">토요일</td>
              <td className="text-right">{Math.round(item[6]["snsrKwh"])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item[6]["snsrKwhPer"])?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{height: "450px"}}>
          {areaHourlDayStatChart(["사용량(kWh)"], dayKwhData, "set3")}
        </CCol>
      </CRow>
    </div>
  );
}

export const strKwhAreaListComp = (areaName, item) => {
  return (
    <div className={"printMargin"}>
      <CRow>
        <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>시장별 전력사용량</span>
        <table className="table table-sm table-bordered mb-0 printTable" id="wme_str_kwh_table">
          <tbody>
          <tr>
            {areaName.includes('시장')
              ? <td className="wme_table_td_title text-center">시장명</td>
              : <td className="wme_table_td_title text-center">분전함명</td>}
            <td className="wme_table_td_title text-center">소비전력(kWh)</td>
            {/*<td className="wme_table_td_title text-center">누설전류(kWh)</td>*/}
            <td className="wme_table_td_title text-center">비고</td>
          </tr>
          {item.map((temp, idx) => (
            <tr className="wme_area_kwh_tr" key={idx}>
              <td className="text-center">{temp["areaName"]}</td>
              <td className="text-right">{Math.round(temp["snsrKwh"])?.toLocaleString() || 0}</td>
              {/*<td className="text-right">{Math.round(item2["snsrIgo"])?.toLocaleString() || 0}</td>*/}
              <td></td>
            </tr>))}
          </tbody>
        </table>
      </CRow>
    </div>
  )
}

export const strKwhListComp = (areaName ,type, item) => {
  return (
    <div className={"printMargin"}>
      {type === "grpCode"
        ?
        <CRow>
          {areaName.includes('시장')
            ? <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>상점별 전력사용량</span>
            : <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>분전함별 전력사용량</span>}
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_str_kwh_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시장명</td>
              {areaName.includes('시장')
                ? <td className="wme_table_td_title text-center">상점명</td>
                : <td className="wme_table_td_title text-center">분전함명</td>}
              <td className="wme_table_td_title text-center">소비전력(kWh)</td>
              {/*<td className="wme_table_td_title text-center">누설전류(kWh)</td>*/}
              <td className="wme_table_td_title text-center">비고</td>
            </tr>
            {item.map((temp, idx) => (
              <tr className="wme_str_kwh_tr" key={idx}>
                <td className="text-center">{temp["areaName"]}</td>
                <td className="text-center">{temp["strName"]}</td>
                <td className="text-right">{Math.round(temp["snsrKwh"])?.toLocaleString() || 0}</td>
                {/*<td className="text-right">{Math.round(item2["snsrIgo"])?.toLocaleString() || 0}</td>*/}
                <td></td>
              </tr>))}
            </tbody>
          </table>
        </CRow>
        :
        <CRow>
          {areaName.includes('시장')
            ? <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>상점별 전력사용량</span>
            : <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>분전함별 전력사용량</span>}
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_str_kwh_table">
            <tbody>
            <tr>
              {areaName.includes('시장')
                ? <td className="wme_table_td_title text-center">상점명</td>
                : <td className="wme_table_td_title text-center">분전함명</td>}
              <td className="wme_table_td_title text-center">소비전력(kWh)</td>
              {/*<td className="wme_table_td_title text-center">누설전류(kWh)</td>*/}
              <td className="wme_table_td_title text-center">비고</td>
            </tr>
            {item.map((temp, idx) => (
              <tr className="wme_str_kwh_tr" key={idx}>
                <td className="text-center">{temp["strName"]}</td>
                <td className="text-right">{Math.round(temp["snsrKwh"])?.toLocaleString() || 0}</td>
                {/*<td className="text-right">{Math.round(item2["snsrIgo"])?.toLocaleString() || 0}</td>*/}
                <td></td>
              </tr>))}
            </tbody>
          </table>
        </CRow>
      }
    </div>
  )
}

// 상점 =================================================================================================================
// 전기위험 경보 발생현황
export const storeYearWarningComp = (item, strName, areaName, strCnt) => {
  let chartData = [];
  item.map((item, idx) => {
    if (idx !== 12) {
      chartData.push({
        "label": (idx + 1) + "월",
        "과전류 1차 경보": item["oc1st"],
        "과전류 2차 경보": item["oc2nd"],
        "저항성누설전류 1차 경보": item["igr1st"],
        "저항성누설전류 2차 경보": item["igr2nd"]
      });
    }
  });
  return (
    <div className={"mt-5 printMargin"}>
      <CRow className={"mt-4"}>
        <CCol md={12}>
          <div className="card text-white bg-secondary">
            <div className="card-header" style={{color: "#333", fontSize: "23px"}}>{strName} 전기위험 종합평가</div>
            <div className="card-body" style={{color: "#333", fontSize: "23px"}}>
              {strName}은 {areaName}에서 전기위험순위는 {strCnt}개 상점 중 <span style={{color: "#0d9ad2"}}>12위</span> 입니다. <br/>
              전력사용량은 {strCnt}개 상점 중 <span style={{color: "#0d9ad2"}}>12위</span> 입니다.<br/>
              {/*전기위험 등급은 <span style={{color : "#0d9ad2"}}>3등급</span> 입니다.<br/>*/}
            </div>
          </div>
        </CCol>
      </CRow>
      <div className={"d-flex justify-content-between"}>
        <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>전기위험 경보 발생 현황(상세)</span>
        <div className={"d-flex align-items-center"}>
          <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}> </span>
        </div>
      </div>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_event_monthly_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" colSpan="2" style={{verticalAlign: "middle"}}>경보
            종류
          </td>
          <td className="wme_table_td_title text-center" colSpan="13">월별 경보 발생 건수</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1월</td>
          <td className="wme_table_td_title text-center">2월</td>
          <td className="wme_table_td_title text-center">3월</td>
          <td className="wme_table_td_title text-center">4월</td>
          <td className="wme_table_td_title text-center">5월</td>
          <td className="wme_table_td_title text-center">6월</td>
          <td className="wme_table_td_title text-center">7월</td>
          <td className="wme_table_td_title text-center">8월</td>
          <td className="wme_table_td_title text-center">9월</td>
          <td className="wme_table_td_title text-center">10월</td>
          <td className="wme_table_td_title text-center">11월</td>
          <td className="wme_table_td_title text-center">12월</td>
          <td className="wme_table_td_title text-center">계</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>과전류 경보</td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="text-right">{getStatValue(item[0]["oc1st"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["oc1st"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["oc1st"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["oc1st"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["oc1st"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["oc1st"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["oc1st"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["oc1st"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["oc1st"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["oc1st"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["oc1st"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["oc1st"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["oc1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="text-right">{getStatValue(item[0]["oc2nd"], item[0]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[1]["oc2nd"], item[1]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[2]["oc2nd"], item[2]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[3]["oc2nd"], item[3]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[4]["oc2nd"], item[4]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[5]["oc2nd"], item[5]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[6]["oc2nd"], item[6]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[7]["oc2nd"], item[7]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[8]["oc2nd"], item[8]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[9]["oc2nd"], item[9]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[10]["oc2nd"], item[10]['sDate'])}</td>
          <td className="text-right">{getStatValue(item[11]["oc2nd"], item[11]['sDate'])}</td>
          <td className="text-right">{item[12]["oc2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>저항성누설전류(IGR) 경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="text-right">{getStatValue(item[0]["igr1st"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igr1st"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igr1st"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igr1st"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igr1st"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igr1st"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igr1st"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igr1st"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igr1st"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igr1st"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igr1st"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igr1st"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igr1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="text-right">{getStatValue(item[0]["igr2nd"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["igr2nd"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["igr2nd"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["igr2nd"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["igr2nd"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["igr2nd"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["igr2nd"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["igr2nd"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["igr2nd"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["igr2nd"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["igr2nd"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["igr2nd"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["igr2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" colSpan="2">계</td>
          <td className="text-right">{getStatValue(item[0]["monthlyEvt"], item[0]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[1]["monthlyEvt"], item[1]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[2]["monthlyEvt"], item[2]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[3]["monthlyEvt"], item[3]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[4]["monthlyEvt"], item[4]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[5]["monthlyEvt"], item[5]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[6]["monthlyEvt"], item[6]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[7]["monthlyEvt"], item[7]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[8]["monthlyEvt"], item[8]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[9]["monthlyEvt"], item[9]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[10]["monthlyEvt"], item[10]["sDate"])}</td>
          <td className="text-right">{getStatValue(item[11]["monthlyEvt"], item[11]["sDate"])}</td>
          <td className="text-right">{item[12]["monthlyEvt"]?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>
      <CRow className={"mb-5 mt-5"}>
        <CCol md={"12"} style={{height: "400px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"}
                  style={{fontSize: "20px", display: "block"}}>* 전기위험 경보 발생 현황 차트</span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : 건)</span>
            </div>
          </div>
          {areaBarChart(['과전류 1차 경보', '과전류 2차 경보', '저항성누설전류 1차 경보', '저항성누설전류 2차 경보'], chartData, "paired")}
        </CCol>
      </CRow>
    </div>
  );
}

// 시간대별, 요일별 차트
export const storeChartComp = (item1, item2, item3) => {
  let chartData = [];
  let hourOcChartData = [];
  let hourIgrChartData = [];
  let hourSnsrChartData = [];
  let dayOcChartData = [];
  let dayIgrChartData = [];
  let daySnsrChartData = [];
  let keys = ["주의", "경고"];

  item1.map(item => {
    hourOcChartData.push({"label": item["hour"], "주의": item["ocWarningCnt"], "경고": item["ocDangerCnt"]});
    hourIgrChartData.push({"label": item["hour"], "주의": item["igrWarningCnt"], "경고": item["igrDangerCnt"]});
    hourSnsrChartData.push({"label": item["hour"], "전력사용량": item["snsrKwh"]});
  });

  item2.map(items => {
    dayOcChartData.push({"label": items["dayName"], "주의": items["oc1stCnt"], "경고": items["oc2ndCnt"]});
    dayIgrChartData.push({"label": items["dayName"], "주의": items["igr1stCnt"], "경고": items["igr2ndCnt"]});
    daySnsrChartData.push({"label": items["dayName"], "전력사용량": items["snsrKwh"]});
  });

  item3.map((item, idx) => {
    if (idx !== 12)
      chartData.push({"label": (idx + 1) + "월", "전력사용량": Math.round(item["snsrKwh"])});
  });

  return (
    <div className={"mt-5 printMargin"}>
      <CRow className={"mb-5"}>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 시간대별 과전류 발생현황</span>
          <div style={{height: "380px"}}>
            {areaHourlDayStatChart(keys, hourOcChartData, "nivo")}
          </div>
        </CCol>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 요일별 과전류 발생현황</span>
          <div style={{height: "380px"}}>
            {areaHourlDayStatChart(keys, dayOcChartData, "nivo")}
          </div>
        </CCol>
      </CRow>
      <CRow className={"mb-5"}>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 시간대별 IGR 발생현황</span>
          <div style={{height: "380px"}}>
            {areaHourlDayStatChart(keys, hourIgrChartData, "nivo")}
          </div>
        </CCol>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 요일별 IGR 발생현황</span>
          <div style={{height: "380px"}}>
            {areaHourlDayStatChart(keys, dayIgrChartData, "nivo")}
          </div>
        </CCol>
      </CRow>
      <CRow className={"mb-5"}>
        <CCol md={"12"} style={{height: "550px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 월별 전력소비량</span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : kWh)</span>
            </div>
          </div>
          {areaBarChart(["전력사용량"], chartData, "set3")}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 시간대별 IGR 발생현황</span>
          <div style={{height: "380px"}}>
            {areaHourlDayStatChart(["전력사용량"], hourSnsrChartData, "set3")}
          </div>
        </CCol>
        <CCol sm={"6"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 요일별 IGR 발생현황</span>
          <div className={"chartHeight"} style={{height: "380px"}}>
            {areaHourlDayStatChart(["전력사용량"], daySnsrChartData, "set3")}
          </div>
        </CCol>
      </CRow>
    </div>
  );
}

export const storePrintChartComp = (item1) => {
  let chartData = [];
  item1.map((item, idx) => {
    if (idx !== 12)
      chartData.push({"label": (idx + 1) + "월", "전력사용량": Math.round(item["snsrKwh"])});
  });
  return (
    <div className={"printMargin mt-5"}>
      <CRow>
        <CCol md={"12"} style={{height: "380px"}}>
          <div className={"d-flex justify-content-between"} style={{marginRight: "30px"}}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "20px", display: "block"}}>* 월별 전력소비량</span>
            <div className={"d-flex align-items-center"}>
              <span className={"subTitleType"} style={{fontSize: "18px", display: "block"}}>(단위 : kWh)</span>
            </div>
          </div>
          {areaBarChart(["전력사용량"], chartData, "set3")}
        </CCol>
      </CRow>
    </div>
  );
}

const areaBarChart = (key, data, color, colorType = true) => (
  <ResponsiveBar
    data={data}
    keys={key}
    indexBy="label"
    margin={{top: 50, right: 120, bottom: 100, left: 0}}
    padding={0.6}
    innerPadding={1}
    groupMode="grouped"
    valueScale={{type: 'linear'}}
    indexScale={{type: 'band', round: true}}
    valueFormat=" >-,"
    colors={colorType ? {scheme: color} : color}
    // colors={}
    // colorBy="nivo"
    enableLabel={false}
    theme={{
      axis: {ticks: {text: {fontSize: 20, fill: "#333"}}},
      legends: {text: {fontSize: 18, fill: "#333"}}
    }}
    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
    axisTop={null}
    axisRight={null}
    axisLeft={{tickSize: 5, tickPadding: 5, tickRotation: 0, legendPosition: 'middle', legendOffset: -40}}
    borderRadius={3}
    borderWidth={1}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 21,
        itemWidth: 250,
        itemHeight: 61,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [{on: 'hover', style: {itemOpacity: 1}}]
      }
    ]}
  />
)

const areaHourlDayStatChart = (key, data, color) => (
  <ResponsiveBar
    data={data}
    keys={key}
    indexBy="label"
    margin={{top: 50, right: 60, bottom: 100, left: 60}}
    padding={0.2}
    innerPadding={1}
    groupMode="grouped"
    valueScale={{type: 'linear'}}
    indexScale={{type: 'band', round: true}}
    valueFormat=" >-,"
    colors={{scheme: color}}
    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      // legendPosition: 'middle',
      // legendOffset: 32
    }}
    axisLeft={{tickSize: 5, tickPadding: 5, tickRotation: 0, legendPosition: 'middle', legendOffset: -40}}
    theme={{
      axis: {ticks: {text: {fontSize: 18, fill: "#333"}}},
      legends: {
        text: {fontSize: 16, fill: "#333"}
      },
      // labels: {
      //   text: {
      //     fontSize: 20,
      //   }
      // }
    }}
    borderRadius={4}
    borderWidth={1}
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="#333"
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 21,
        itemWidth: 180,
        itemHeight: 61,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [{on: 'hover', style: {itemOpacity: 1}}]
      }
    ]}
    // legends={[
    //   {
    //     dataFrom: 'keys',
    //     anchor: 'bottom-right',
    //     direction: 'column',
    //     justify: false,
    //     translateX: 120,
    //     translateY: 0,
    //     itemsSpacing: 2,
    //     itemWidth: 100,
    //     itemHeight: 20,
    //     itemDirection: 'left-to-right',
    //     itemOpacity: 0.85,
    //     symbolSize: 20,
    //     effects: [
    //       {
    //         on: 'hover',
    //         style: {
    //           itemOpacity: 1
    //         }
    //       }
    //     ]
    //   }
    // ]}
  />
);

function getStatValue(paramVal, paramMonth) {
  let selectDateGroup = document.getElementById("selectDateGroup").value;
  if (selectDateGroup == '년') {
    let year = document.getElementById("year").innerHTML.split('value="')[1].split('"')[0];

    if (new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
  } else if (selectDateGroup == '월') {
    let date = document.getElementById("month").innerHTML.split('value="')[1].split('"')[0];
    let month = date.split('-')[1];

    if (paramMonth > Number(month))
      return "-";
  } else if (selectDateGroup == '반기') {
    let year = document.getElementById("halfItem").innerHTML.split('value="')[1].split('"')[0];
    let halfSelect = document.getElementById("halfSelect").value;

    if (halfSelect == '상반기' && Number(paramMonth) > 6 || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
    if (halfSelect == '하반기' && Number(paramMonth) < 7 || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
  } else if (selectDateGroup == '분기') {
    let date = document.getElementById("quarter").innerHTML.split('value="')[1].split('"')[0];
    let year = date.split(", ")[0];
    let quarter = date.split(", ")[1];

    if (quarter == 'Q1' && Number(paramMonth) > 3 || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
    else if (quarter == 'Q2' && (Number(paramMonth) < 4 || Number(paramMonth) > 6) || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
    else if (quarter == 'Q3' && (Number(paramMonth) < 7 || Number(paramMonth) > 9) || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
    else if (quarter == 'Q4' && Number(paramMonth) < 10 || new Date().getFullYear() == Number(year) && Number(paramMonth) > (new Date().getMonth() + 1))
      return "-";
  } else if (typeof paramVal == 'undefined' || paramVal == null) {
    return 0;
  }

  return paramVal.toLocaleString();
}
