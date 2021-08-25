import {API_ROOT, formatDate, numCommaFormat} from "../commonIndex";
import {CButton, CCol, CRow} from "@coreui/react";
import { ResponsiveBar  } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import React from "react";
const axios = require('axios');

export const getSelectGroup = (type) =>
  axios.get( `${API_ROOT}/selectGroup?type=${type}`)

export const getStatInfo = (type, guCode, areaCode, startDate, endDate, strCode) =>
  axios.get([
      `${API_ROOT}/statInfo?type=${type}`
    , `guCode=${guCode}`
    , `areaCode=${areaCode}`
    , `strCode=${strCode}`
    , `startDate=${formatDate(startDate)}`
    , `endDate=${formatDate(endDate)}`
    ].join('&'));

export const getStatInfoList = (type, guCode, areaCode, startDate, endDate) =>
  axios.get([
    `${API_ROOT}/statInfoList?type=${type}`
    , `guCode=${guCode}`
    , `areaCode=${areaCode}`
    , `startDate=${formatDate(startDate)}`
    , `endDate=${formatDate(endDate)}`
  ].join('&'));

// 전기안전현황 컴포넌트
export const areaStatusComponent = (areaName, startDate, endDate, areaAddr, strName) => {
  return (
    <div>
      <h5 className={"title"}>{areaName} {strName} 전기안전 현황</h5>
      <table className="table table-sm table-bordered mb-0 printTable">
        <tbody>
        <tr>
          <td className="wme_table_td_title">대상</td>
          <td>{areaName} {strName}</td>
          <td className="wme_table_td_title">설치일자</td>
          <td>2020년 10월 12일</td>
        </tr>
        <tr>
          <td className="wme_table_td_title">운영기간</td>
          <td>2020년 10월 13일 ~ 현재</td>
          <td className="wme_table_td_title">조회기간</td>
          <td>{formatDate(startDate)} ~ {formatDate(endDate)}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title">주소</td>
          <td colSpan="3">{areaAddr}</td>
        </tr>
        </tbody>
      </table>
    </div>
    )
}

// 전기안전 경보 발생현황(종합) 컴포넌트
export const areaTotalWarningComp = (areaName, item, strName) => {
  let chartData = [];
  let totalWarning1stNum = item[12]["oc1st"] + item[12]["igo1st"] + item[12]["igr1st"];
  let totalWarning2ndNum = item[12]["oc2nd"] + item[12]["igo2nd"] + item[12]["igr2nd"];
  item.map((item, idx) => {
    if( idx !== 12) {
      chartData.push({
        "label" : (idx + 1) + "월",
        "과전류 1차 경보" : item["oc1st"],
        "과전류 2차 경보" : item["oc2nd"],
        "전체누설전류 1차 경보" : item["igo1st"],
        "전체누설전류 2차 경보" : item["igo2nd"],
        "저항누설전류 1차 경보" : item["igr1st"],
        "저항누설전류 2차 경보" : item["igr2nd"],
      })
    }
  });
  return (
    <div className={"mt-5"}>
      <h5 className={"title"}>{areaName} {strName} 전기안전 경보 발생 현황</h5>
      <span className={"mb-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>전기안전 경보 발생 현황(종합)</span>
      <table className="table table-sm table-bordered mb-0 printTable">
        <colgroup>
          <col width="25%"/>
          <col width="25%"/>
          <col width="25%"/>
          <col width="25%"/>
        </colgroup>
        <thead>
        <tr>
          <th className="text-center">경보 종류</th>
          <th className="text-center" colSpan="3">경보 구분</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>과전류 경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="wme_table_td_title text-center">계</td>
        </tr>
        <tr>
          <td id="wme_area_oc_warning_cnt_td" className="text-right">{item[12]["oc1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_oc_danger_cnt_td" className="text-right">{item[12]["oc2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_oc_cnt_td" className="text-right">{item[12]["ocEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>전체누설전류(IGO)
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="wme_table_td_title text-center">계</td>
        </tr>
        <tr>
          <td id="wme_area_igo_warning_cnt_td" className="text-right">{item[12]["igo1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igo_danger_cnt_td" className="text-right">{item[12]["igo2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igo_cnt_td" className="text-right">{item[12]["igoEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>저항성누설전류(IGR)
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="wme_table_td_title text-center">계</td>
        </tr>
        <tr>
          <td id="wme_area_igr_warning_cnt_td" className="text-right">{item[12]["igr1st"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igr_danger_cnt_td" className="text-right">{item[12]["igr2nd"]?.toLocaleString() || 0}</td>
          <td id="wme_area_igr_cnt_td" className="text-right">{item[12]["igrEvt"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">계</td>
          <td id="wme_area_warning_cnt_td" className="text-right">{isNaN(totalWarning1stNum) ? 0 : totalWarning1stNum?.toLocaleString() || 0}</td>
          <td id="wme_area_danger_cnt_td" className="text-right">{isNaN(totalWarning2ndNum) ? 0 : totalWarning2ndNum?.toLocaleString() || 0}</td>
          <td id="wme_area_event_cnt_td" className="text-right">{item[12]["monthlyEvt"]?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>

      <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>전기안전 경보 발생 현황(상세)</span>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_event_monthly_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" colSpan="2" style={{verticalAlign: "middle"}}>경보 종류</td>
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
          <td className="text-right">{item[0]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["oc1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["oc1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="text-right">{item[0]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["oc2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["oc2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>전체누설전류(IGO)
            경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="text-right">{item[0]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["igo1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["igo1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="text-right">{item[0]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["igo2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["igo2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" rowSpan="2" style={{verticalAlign: "middle"}}>저항성누설전류(IGR) 경보
          </td>
          <td className="wme_table_td_title text-center">주의(1차경보)</td>
          <td className="text-right">{item[0]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["igr1st"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["igr1st"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">경고(2차경보)</td>
          <td className="text-right">{item[0]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["igr2nd"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["igr2nd"]?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center" colSpan="2">계</td>
          <td className="text-right">{item[0]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[1]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[2]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[3]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[4]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[5]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[6]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[7]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[8]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[9]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[10]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[11]["monthlyEvt"]?.toLocaleString() || 0}</td>
          <td className="text-right">{item[12]["monthlyEvt"]?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>

      <CRow style={{ height: "600px"}}>
        <ResponsiveBar
          data={chartData}
          keys={[ '과전류 1차 경보', '과전류 2차 경보', '전체누설전류 1차 경보', '전체누설전류 2차 경보', '저항누설전류 1차 경보', '저항누설전류 2차 경보' ]}
          indexBy="label"
          margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
          padding={0.2}
          innerPadding={1}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          valueFormat={{ format: '', enabled: false }}
          colors={{ scheme: 'paired' }}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '월별 Event발생 건수',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40
          }}
          borderRadius={4}
          borderWidth={1}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 10,
              translateY: 85,
              itemsSpacing: 21,
              itemWidth: 130,
              itemHeight: 61,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </CRow>
    </div>
  );
}

const areaHourlDayStatChart = (key, data, color) => (
  <ResponsiveBar
    data={data}
    keys={key}
    indexBy="label"
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    padding={0.2}
    innerPadding={1}
    groupMode="grouped"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    valueFormat={{ format: '', enabled: false }}
    colors={{ scheme: color }}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -40
    }}
    borderRadius={4}
    borderWidth={1}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
)

export const areaTotalChartStatComp = (item1, item2) => {
  let hourOcChartData = [];
  let hourIgoChartData = [];
  let dayOcChartData = [];
  let dayIgoChartData = [];
  let keys = ["주의", "경고"];
  item1.map((item, idx) => {
    hourOcChartData.push({
      "label" : item["hour"],
      "주의" : item["ocWarningCnt"],
      "경고" : item["ocDangerCnt"],
    });
    hourIgoChartData.push({
      "label" : item["hour"],
      "주의" : item["igoWarningCnt"],
      "경고" : item["igoDangerCnt"],
    });
  });

  item2.map((items, idx)=> {
    dayOcChartData.push({
      "label" : items["dayName"],
      "주의" : items["oc1stCnt"],
      "경고" : items["oc2ndCnt"],
    });

    dayIgoChartData.push({
      "label" : items["dayName"],
      "주의" : items["igo1stCnt"],
      "경고" : items["igo2ndCnt"],
    });
  });

  return (
    <div>
      <div>
        <CRow>
          <CCol sm={"5"}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 시간대별 과전류 발생현황</span>
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
          <CCol sm={"7"} style={{ height: "450px"}}>
            {areaHourlDayStatChart(keys, hourOcChartData, "nivo")}
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={"5"}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 요일별 과전류 발생현황</span>
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
          <CCol sm={"7"} style={{ height: "480px"}}>
            {areaHourlDayStatChart(keys, dayOcChartData, "nivo")}
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={"5"}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 시간대별 전체누설전류(IGO) 발생현황</span>
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
          <CCol sm={"7"} style={{ height: "450px"}}>
            {areaHourlDayStatChart(keys, hourIgoChartData, 'nivo')}
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={"5"}>
            <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 요일별 전체누설전류(IGO) 발생현황</span>
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
          <CCol sm={"7"} style={{ height: "480px"}}>
            {areaHourlDayStatChart(keys, dayIgoChartData, "nivo")}
          </CCol>
        </CRow>
      </div>
    </div>
  );
}

export const areaTotalChartStatComp2 = (item1, item2) => {
  let hourIgrChartData = [];
  let dayIgrChartData = [];
  let keys = ["주의", "경고"];
  item1.map((item, idx) => {
    hourIgrChartData.push({
      "label" : item["hour"],
      "주의" : item["igrWarningCnt"],
      "경고" : item["igrDangerCnt"],
    });
  });

  item2.map((items, idx)=> {
    dayIgrChartData.push({
      "label" : items["dayName"],
      "주의" : items["igr1stCnt"],
      "경고" : items["igr2ndCnt"],
    });
  });

  return (
    <div>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 시간대별 전체누설전류(IGR) 발생현황</span>
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
        <CCol sm={"7"} style={{ height: "430px"}}>
          {areaHourlDayStatChart(keys, hourIgrChartData, "nivo")}
        </CCol>
      </CRow>

      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 요일별 전체누설전류(IGR) 발생현황</span>
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
        <CCol sm={"7"} style={{ height: "480px"}}>
          {areaHourlDayStatChart(keys, dayIgrChartData, "nivo")}
        </CCol>
      </CRow>
    </div>
  )
}

// 시장별 현황
export const levelAreaStatComp = (areaName, item) => {
  return (
    <div className={"mt-4"}>
      <h5 className={"title"}>{areaName} 내 시장별 현황</h5>
      <table className="table table-sm table-bordered mb-0 printTable" >
        <tbody id="wme_level_area_table">
        <tr>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>소시장명</td>
          <td colSpan="2" className="wme_table_td_title text-center">과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center">전체누설전류(IGO)</td>
          <td colSpan="2" className="wme_table_td_title text-center">저항성누설전류(IGR)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>끊김</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>소비전력</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
          <td className="wme_table_td_title text-center">1차</td>
          <td className="wme_table_td_title text-center">2차</td>
        </tr>
        {
          item.map((item2, idx) => (
            <tr className="wme_str_event_tr" key={idx}>
              <td className="text-center">{item2['areaName']}</td>
              <td className="text-right">{item2['oc1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['oc2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igo1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igo2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igr1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igr2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['disconn']?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item2['snsrKwh'])?.toLocaleString() || 0}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

// 내상점별 현황
export const levelStoreStatComp = (areaName, item) => {
  return (
    <div className={"mt-4"}>
      <h5 className={"title"}>{areaName} 내 상점별 현황</h5>
      <table className="table table-sm table-bordered mb-0 printTable" >
        <tbody id="wme_str_event_table">
        <tr>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>상점명</td>
          <td colSpan="2" className="wme_table_td_title text-center">과전류경보</td>
          <td colSpan="2" className="wme_table_td_title text-center">전체누설전류(IGO)</td>
          <td colSpan="2" className="wme_table_td_title text-center">저항성누설전류(IGR)</td>
          <td rowSpan="2" className="wme_table_td_title text-center" style={{verticalAlign: "middle"}}>끊김</td>
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
        {
          item.map((item2, idx) => (
            <tr className="wme_str_event_tr" key={idx}>
              <td className="text-center">{item2['strName']}</td>
              <td className="text-right">{item2['oc1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['oc2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igo1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igo2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igr1st']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['igr2nd']?.toLocaleString() || 0}</td>
              <td className="text-right">{item2['disconn']?.toLocaleString() || 0}</td>
              <td></td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

// 전기사용량 현황
export const areaKwhStatComp = (areaName, item) => {
  let pieChartData = [];
  pieChartData.push({
    "id" : "전기사용량",
    "label": "전기사용량",
    "value": Math.round(item["snsrKwh"]),
    "color": "hsl(171, 70%, 50%)"
  }, {
    "id" : "누설전력량",
    "label": "누설전력량",
    "value": Math.round(item["snsrIgo"]),
    "color": "hsl(175, 70%, 50%)"
  });
  return (
    <div className={"mt-4"}>
      <h5 className={"title"}>{areaName} 전기사용량 현황(종합)</h5>
      <CRow>
        <CCol sm={"6"}>
          <span className={"mb-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>전기사용량 현황(종합)</span>
          <table className="table table-sm table-bordered mb-0 printTable">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center"> </td>
              <td className="wme_table_td_title text-center">사용량(Kwh)</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">전기사용량</td>
              <td className="text-right">{Math.round(item['snsrKwh'])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item['snsrKwhPer'])?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">누설전력량</td>
              <td className="text-right">{Math.round(item['snsrIgo'])?.toLocaleString() || 0}</td>
              <td className="text-right">{Math.round(item['snsrIgoPer'])?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"6"} style={{ height: "300px"}}>
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            colors={{ scheme: 'set3' }}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
            defs={[
              {
                id: 'dots',
                // type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: '누설전력량'
                },
                id: 'dots'
              },
              {
                match: {
                  id: '전기사용량'
                },
                id: 'lines'
              }
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </CCol>
      </CRow>
    </div>
  );
}

// 전기사용량 상세 현황
export const areaKwhStatYearComp = item => {
  let chartData = [];
  item.map((item, idx) => {
    if( idx !== 12) {
      chartData.push({
        "label" : (idx + 1) + "월",
        "전력사용량" : Math.round(item["snsrKwh"]),
        "누설전력량" : Math.round(item["snsrIgo"]),
      })
    }
  });

  return (
    <div>
      <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>전기사용량 현황(상세)</span>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_kwh_monthly_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title"> </td>
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
          <td className="text-right">{Math.round(item[0]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[1]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[2]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[3]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[4]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[5]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[6]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[7]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[8]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[9]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[10]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[11]["snsrKwh"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[12]["snsrKwh"])?.toLocaleString() || 0}</td>
        </tr>
        <tr>
          <td className="wme_table_td_title text-center">누설전력량</td>
          <td className="text-right">{Math.round(item[0]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[1]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[2]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[3]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[4]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[5]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[6]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[7]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[8]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[9]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[10]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[11]["snsrIgo"])?.toLocaleString() || 0}</td>
          <td className="text-right">{Math.round(item[12]["snsrIgo"])?.toLocaleString() || 0}</td>
        </tr>
        </tbody>
      </table>
      <CRow>
        <CCol md={"12"} style={{ height: "400px"}}>
          <ResponsiveBar
            data={chartData}
            keys={[ "전력사용량", "누설전력량" ]}
            indexBy="label"
            margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
            padding={0.2}
            innerPadding={1}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            valueFormat={{ format: '', enabled: false }}
            colors={{ scheme: 'set3' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: 'middle',
              legendOffset: -40
            }}
            borderRadius={4}
            borderWidth={1}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: 85,
                itemsSpacing: 21,
                itemWidth: 130,
                itemHeight: 61,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </CCol>
      </CRow>
    </div>
  );
}

// 시간대별 전력사용량, 요일별 전력사용량
export const areaTotalKwhComp = (item, item2) => {
  console.log(item, item2);
  let hourKwhData = [];
  let dayKwhData = [];
  let keys = ["사용량(kWh)"];

  item.map((item, idx) => {
    hourKwhData.push({
      "label" : item["hour"],
      "사용량(kWh)" : Math.round(item["snsrKwh"])
    });
  });

  item2.map((items, idx)=> {
    dayKwhData.push({
      "label" : items["dayName"],
      "사용량(kWh)" : Math.round(items["snsrKwh"])
    });
  });

  return (
    <div>
      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 시간대별 전력사용량</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">사용량(kWh)</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">0 ~ 3</td>
              <td className="text-right">{item[0]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[0]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">4 ~ 7</td>
              <td className="text-right">{item[1]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[1]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">8 ~ 11</td>
              <td className="text-right">{item[2]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[2]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">12 ~ 15</td>
              <td className="text-right">{item[3]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[3]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">16 ~ 19</td>
              <td className="text-right">{item[4]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[4]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">20 ~ 23</td>
              <td className="text-right">{item[5]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item[5]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{ height: "430px"}}>
          {areaHourlDayStatChart(keys, hourKwhData, "set3")}
        </CCol>
      </CRow>

      <CRow>
        <CCol sm={"5"}>
          <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>* 요일별 전력사용량</span>
          <table className="table table-sm table-bordered mb-0 printTable" id="wme_area_oc_warning_hourly_table">
            <tbody>
            <tr>
              <td className="wme_table_td_title text-center">시간대</td>
              <td className="wme_table_td_title text-center">사용량(kWh)</td>
              <td className="wme_table_td_title text-center">비율(%)</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">일요일</td>
              <td className="text-right">{item2[0]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[0]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">월요일</td>
              <td className="text-right">{item2[1]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[1]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">화요일</td>
              <td className="text-right">{item2[2]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[2]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">수요일</td>
              <td className="text-right">{item2[3]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[3]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">목요일</td>
              <td className="text-right">{item2[4]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[4]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">금요일</td>
              <td className="text-right">{item2[5]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[5]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            <tr>
              <td className="wme_table_td_title text-center">토요일</td>
              <td className="text-right">{item2[6]["snsrKwh"]?.toLocaleString() || 0}</td>
              <td className="text-right">{item2[6]["snsrKwhPer"]?.toLocaleString() || 0}</td>
            </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm={"7"} style={{ height: "480px"}}>
          {areaHourlDayStatChart(keys, dayKwhData, "set3")}
        </CCol>
      </CRow>
    </div>
  );
}

export const strKwhStatComp = (areaName, item) => {
  return (
    <div>
      <span className={"mb-2 mt-2 subTitle"} style={{fontSize: "1rem", display: "block"}}>상점별 전력사용량</span>
      <table className="table table-sm table-bordered mb-0 printTable" id="wme_str_kwh_table">
        <tbody>
        <tr>
          <td className="wme_table_td_title text-center">상점명</td>
          <td className="wme_table_td_title text-center">소비전력(kWh)</td>
          <td className="wme_table_td_title text-center">누설전류(kWh)</td>
          <td className="wme_table_td_title text-center">비고</td>
        </tr>
        {
          item.map((item2, idx) => (
            <tr className="wme_str_kwh_tr" key={idx}>
            <td className="text-center">{item2["strName"]}</td>
            <td className="text-right">{item2["snsrKwh"]?.toLocaleString() || 0}</td>
            <td className="text-right">{item2["snsrIgo"]?.toLocaleString() || 0}</td>
            <td> </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
