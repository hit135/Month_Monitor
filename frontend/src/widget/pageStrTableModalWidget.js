import React, {useEffect, useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CSelect,
  CInput
} from "@coreui/react";
import {getModalStrList, getStr, getStrList} from "../agent/store";
import {getInsprAreaList} from "../agent/inspection";
import PageTableWidget from "./pageTableWidget";
import paginationFactory from "react-bootstrap-table2-paginator";

function PageStrTableModalWidget(props) {
  const viewColumns = [
    { dataField: 'areaName', text: '구역명 ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } },
    { dataField: 'strName', text: '상점명', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } },
  ]
  const {
    onStrModal, setOnStrModal, clickStrRow, initStrCode
  } = props;

  const [repo, setRepo] = useState([]);               // 리스트 hook
  const [pageItem, setPageItem] = useState({
    page : 1,
    sizePerPage: 10
  }); // 페이징 hook
  const [searchItem, setSearchItem] = useState({
    searchWrd : "",
    areaCode : "",
    useYn : "Y",
  });

  // 초기 테이블 셋팅
  const handleInitTable = () =>
    getStrList(pageItem.page, pageItem.sizePerPage, searchItem).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });

  useEffect(() => {
    handleInitTable();
    handleInitListStrArea();
  }, []);

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;

    handleInitTable();
  };

  // 검색 버튼 이벤트
  const handleClickSearchBtn = () => {
    pageItem.page = 1;
    handleInitTable();
  }

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      clickStrRow(row);
    }
  };

  const handleInitListStrArea = () => {
    getInsprAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("areaCode").innerHTML += html;
      }
    });
  }

  const handleChangeSearchType = (e) => {
    const value = (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    searchItem[e.target.id] = value;
    pageItem.page = 1;
    handleInitTable();
  };

  return (
    <>
      <CModal
        show={onStrModal}
        onClose={() => setOnStrModal(!onStrModal)}
        // size="sm"
        className={"mt-5"}
      >
        <CModalHeader closeButton>
          <CModalTitle>상점 선택</CModalTitle>
        </CModalHeader>
        <CModalBody className={"strModal"}>
          <CCol sm="5" className={"float-left pl-0"}>
            <CInput placeholder="검색어 입력" onKeyUp={(e) => {
              searchItem.searchWrd = e.target.value;
              if(e.key === "Enter") handleClickSearchBtn()
            }} />
          </CCol>
          <button className={"btn btn-custom-info mt-0 float-left"} onClick={handleClickSearchBtn}>검색</button>

          <CCol sm="5" className={"float-left pl-2 pr-0 mb-2"}>
            <CSelect id={'areaCode'} onChange={handleChangeSearchType}>
              <option value={''}>시장 전체</option>
            </CSelect>
          </CCol>
          <BootstrapTable
            keyField={"strCode"}
            data={repo.slice()}
            columns={viewColumns}
            onTableChange={handleTableChange}
            rowEvents={rowEvents}
            remote
            striped
            hover
            condensed
            pagination={paginationFactory({
              page : pageItem.page,
              sizePerPage : pageItem.sizePerPage,
              totalSize : pageItem.totalElementsCount,
              paginationSize: 5,
              showTotal: false,
              hidePageListOnlyOnePage: true,
              hideSizePerPage: true,
            })}
            noDataIndication={() => <div style={{textAlign: 'center'}}>목록이 없습니다.</div>} />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => initStrCode()}>초기화</CButton>
          <CButton color="secondary" onClick={() => setOnStrModal(!onStrModal)}>확인</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default PageStrTableModalWidget
