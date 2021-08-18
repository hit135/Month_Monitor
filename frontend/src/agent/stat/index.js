import {API_ROOT, formatDate} from "../commonIndex";

const axios = require('axios');

export const getSelectGroup = (type) =>
  axios.get( `${API_ROOT}/selectGroup?type=${type}`)

export const getStatInfo = (type, guCode, areaCode) =>
  axios.get( `${API_ROOT}/statInfo?type=${type}&guCode=${guCode}&areaCode=${areaCode}` )

export const areaStatusComponent = (areaName, startDate, endDate, areaAddr) => {
  return (
    <div>
      <h5>{areaName} 전기안전 현황</h5>
      <table className="table table-sm table-bordered mb-0">
        <tbody>
        <tr>
          <td className="wme_table_td_title">대상</td>
          <td>{areaName}</td>
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
