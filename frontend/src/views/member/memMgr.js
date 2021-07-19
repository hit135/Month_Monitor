import React, {useEffect, useState} from 'react'
import {CBadge, CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import PageTableWidget from "../../widget/pageTableWidget";
import MemActionModal from "../member/memActionModal";
import {getMemList, rowEvents} from "../../agent/member";

export const numCommaFormat = value => (Math.abs(parseInt(value)) >= 1000) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : value;

const authStyleFormatter = (cell) => {
  let cellStr = "";
  switch (cell) {
    case 0: cellStr = "전체관리자"; break;
    case 1: cellStr = "시스템관리자"; break;
    case 3: cellStr = "전체 모니터링담당자"; break;
    case 5: cellStr = "구역별 모니터링담당자"; break;
    case 7: cellStr = "상점주"; break;
    default: cellStr = "";
  }

  return (
    <h5 className="mr-0 mb-0">
      <CBadge color="primary">{cellStr}</CBadge>
    </h5>
  );
};

const memUseStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "Y") ? 'primary' : 'danger'}>{(cell === "Y") ? '사용' : '미사용'}</CBadge>
  </h5>;

const memLeaveStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "Y") ? 'danger' : 'primary'}>{(cell === "N") ? '미탈퇴' : '탈퇴'}</CBadge>
  </h5>;

const memDeleteStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "Y") ? 'danger' : 'primary'}>{(cell === "N") ? '미삭제' : '삭제'}</CBadge>
  </h5>;

const memConditionStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell >= 5) ? 'danger' : 'primary'} key="1">{(cell >= 5) ? '해제하기' : '접속가능'}</CBadge>
  </h5>;

const storeCountStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell > 0) ? 'danger' : 'primary'}>{cell}</CBadge>
  </h5>;

const columns = [
  { dataField: 'rowNum', text: '순번', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'right', height: '42px' }, formatter: (cell) => numCommaFormat(cell) },
  { dataField: 'userId', text: 'ID', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'left' } },
  { dataField: 'memName', text: '이름', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'left' } },
  { dataField: 'memLevel', text: '권한', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, formatter: authStyleFormatter },
  { dataField: 'memTel', text: '전화번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } },
  { dataField: 'memMobile', text: '휴대폰번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } },
  { dataField: 'strCnt', text: '상점수', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'right' }, formatter: storeCountStyleFormatter },
  { dataField: 'useYn', text: '사용유무', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, formatter: memUseStyleFormatter },
  { dataField: 'memIsLeave', text: '탈퇴유무', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, formatter: memLeaveStyleFormatter },
  { dataField: 'memRsntDate', text: '최근접속일', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } },
];

const MemMgr = () => {
  const [repo, setRepo] = useState([]);               // 리스트 state
  const [pageItem, setPageItem] = useState({});       // 페이징 state
  const [info, setInfo] = useState(false)             // Modal state

  useEffect(() => {
    handleInitTable()
  }, []);

  // 초기 테이블 셋팅
  const handleInitTable = (page = 1, sizePerPage = 10) => {
    getMemList(page, sizePerPage).then(function (resp) {
      setRepo(resp.data["resultList"]);
      setPageItem({page: page, sizePerPage: sizePerPage, totalElementsCount: resp.data["totalElements"]})
    });
  }

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    let page = param.page;
    let sizePerPage = param.sizePerPage;

    handleInitTable(page, sizePerPage);
  };

  // 등록 버튼 이벤트
  const handleClickRegisterModal = () => {
    setInfo(true);
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12">
                <h5 className={"mb-0 ml-0 float-left"}>전체 회원 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CRow className={"mb-3"}>
                <CCol md="12" xl="12">
                  <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterModal}>등록</button>
                </CCol>
              </CRow>
              <PageTableWidget
                keyField={"userId"}
                data={repo}
                page={pageItem.page}
                sizePerPage={pageItem.sizePerPage}
                totalSize={pageItem.totalElementsCount}
                onTableChange={handleTableChange}
                viewColumns={columns}
                rowEvents={rowEvents}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <MemActionModal info={info} setInfo={setInfo} handleInitTable={handleInitTable} />
    </>
  )
}

export default MemMgr
