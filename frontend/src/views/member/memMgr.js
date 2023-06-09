import React, {useEffect, useState} from 'react';
import {CBadge, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch} from "@coreui/react";

import PageTableWidget from "../../widget/pageTableWidget";
import MemInsertModal from "../member/memInsertModal";
import MemUpdateModal from "./memUpdateModal";
import {getMem, getMemList} from "../../agent/member";
import {numCommaFormat, getInputValue} from "../../agent/commonIndex";

const authStyleFormatter = cell => {
  let cellStr = "";
  switch (cell) {
    case 0: cellStr = "전체관리자"; break;
    case 1: cellStr = "시스템관리자"; break;
    case 3: cellStr = "전체 모니터링담당자"; break;
    case 5: cellStr = "구역별 모니터링담당자"; break;
    case 7: cellStr = "상점주"; break;
    default: cellStr = "";
  }

  return <h5 className={"mr-0 mb-0"}><CBadge color={"primary"}>{cellStr}</CBadge></h5>;
};

const memUseStyleFormatter = cell =>
  <h5 className={"mr-0 mb-0"}><CBadge color={(cell === "Y") ? 'primary' : 'danger'}>{(cell === "Y") ? '사용' : '미사용'}</CBadge></h5>;

const memLeaveStyleFormatter = cell =>
  <h5 className={"mr-0 mb-0"}><CBadge color={(cell === "Y") ? 'danger' : 'primary'}>{(cell === "N") ? '미탈퇴' : '탈퇴'}</CBadge></h5>;

const memDeleteStyleFormatter = cell =>
  <h5 className={"mr-0 mb-0"}><CBadge color={(cell === "Y") ? 'danger' : 'primary'}>{(cell === "N") ? '미삭제' : '삭제'}</CBadge></h5>;

const storeCountStyleFormatter = cell =>
  <h5 className={"mr-0 mb-0"}><CBadge color={(cell > 0) ? 'danger' : 'primary'}>{cell}</CBadge></h5>;

const columns = [
  {dataField: 'rowNum', text: '순번', headerStyle: {textAlign: 'center', height: '42px', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'right', height: '42px', width: '5rem'}
   , formatter: numCommaFormat }
  , {dataField: 'userId', text: 'ID', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'left'}}
  , {dataField: 'memName', text: '이름', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'left'}}
  , {dataField: 'memLevel', text: '권한', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}, formatter: authStyleFormatter}
  , {dataField: 'memTel', text: '전화번호', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}}
  , {dataField: 'memMobile', text: '휴대폰번호', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}}
  , {dataField: 'strCnt', text: '상점수', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'right'}, formatter: storeCountStyleFormatter}
  , {dataField: 'useYn', text: '사용유무', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}, formatter: memUseStyleFormatter}
  , {dataField: 'delYn', text: '삭제유무', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}, formatter: memDeleteStyleFormatter}
  , {dataField: 'memIsLeave', text: '탈퇴유무', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}, formatter: memLeaveStyleFormatter}
  , {dataField: 'memRsntDate', text: '최근접속일', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}}
];

const MemMgr = () => {
  const [repo, setRepo] = useState([]);               // 리스트 hook
  const [pageItem, setPageItem] = useState({page: 1, sizePerPage: 10}); // 페이징 hook
  const [searchItem, setSearchItem] = useState({searchWrd: "", useYn: "Y", delYn: "N", leaveYn: "N", smsYn: "Y"});
  const [userContent, setUserContent] = useState({});
  const [actionModal, setActionModal] = useState(false);            // Modal hook
  const [modifyModal, setModifyModal] = useState(false);            // Modal hook

  let switchCmmHtml = (id, txt, color, labelOn, labelOff, defaultChecked) =>
    <CFormGroup className={id === "useYn" ? "pr-3 d-inline-flex mb-0 ct-mt pl-3": "pr-3 d-inline-flex mb-0 ct-mt"}>
      <CLabel htmlFor={id} className={"pr-1"}>{txt}</CLabel>
      <CSwitch className={'mx-1'} id={id} color={color} labelOn={labelOn} labelOff={labelOff} onChange={handleClickSearchType}
               defaultChecked={defaultChecked} />
    </CFormGroup>;

  useEffect(() => handleInitTable(), []);

  // 초기 테이블 셋팅
  const handleInitTable = () => getMemList(pageItem.page, pageItem.sizePerPage, searchItem).then(resp => {
    if (resp.data['result']) {
      setRepo(resp.data["resultList"]);
      setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
    }
  });

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  const handleSearchWrd = e => {
    searchItem.searchWrd = e.target.value;
    if (e.key === "Enter")
      handleClickSearchBtn();
  };

  // 검색 버튼 이벤트
  const handleClickSearchBtn = () => {
    pageItem.page = 1;
    handleInitTable();
  };

  const handleClickSearchType = e => {
    searchItem[e.target.id] = getInputValue(e);
    handleInitTable();
  };

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => getMem(row.userId).then(resp => {
      if (resp.data["result"] === "success") {
        setUserContent(resp.data["content"]);
        setModifyModal(true);
      } else {
        alert("통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    })
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol className={"pl-0"} md={"12"} xl={"12"}>
                <h5 className={"mb-0 ml-0 float-left"}>전체 회원 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CRow className={"mb-3"}>
                <CCol md="12" xl="12">
                  <CCol sm="2" className={"float-left pl-0"}>
                    <CInput placeholder={"검색어 입력"} onKeyUp={handleSearchWrd} />
                  </CCol>
                  <button className={"btn btn-custom-info mt-0"} onClick={handleClickSearchBtn}>검색</button>
                  {switchCmmHtml("useYn", "사용유무", "info", "사용", "미사용", true)}
                  {switchCmmHtml("leaveYn", "탈퇴유무", "danger", "탈퇴", "미탈퇴", false)}
                  {switchCmmHtml("delYn", "삭제유무", "danger", "삭제", "미삭제", false)}
                  {switchCmmHtml("smsYn", "SMS수신여부", "info", "사용", "미사용", true)}
                  <button className={"btn btn-custom float-right mt-0"} onClick={e => setActionModal(true)}>등록</button>
                </CCol>
              </CRow>

              <PageTableWidget keyField={"userId"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                               onTableChange={handleTableChange} viewColumns={columns} rowEvents={rowEvents} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <MemInsertModal modal={actionModal} setModal={setActionModal} handleInitTable={handleInitTable} />
      <MemUpdateModal modal={modifyModal} setModal={setModifyModal} userContent={userContent} handleInitTable={handleInitTable} />
    </>
  );
};

export default MemMgr;
