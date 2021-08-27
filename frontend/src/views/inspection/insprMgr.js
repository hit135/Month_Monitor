import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CInput, CSelect, CFormGroup, CLabel, CSwitch } from '@coreui/react';

import PageTableWidget from "../../widget/pageTableWidget";
import { getInsprAreaList, getInspectorList, getInspector } from "../../agent/inspection";
import InsprInsertModal from "./insprInsertModal";
import InsprUpdateModal from "./insprUpdateModal";
import { numCommaFormat, getInputValue } from "../../agent/commonIndex";

const columns = [
    { dataField: 'rowNo', text: 'NO.', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right', height: '42px' }, formatter: (cell) => numCommaFormat(cell) }
  , { dataField: 'inspId', text: '점검자 ID', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspName', text: '점검자 이름', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspEmail', text: '점검자 이메일', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspTel', text: '점검자 연락처', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center', height: '42px' } }
  , { dataField: 'inspMobile', text: '점검자 휴대폰', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center', height: '42px' } }
  , { dataField: 'inspAreaName', text: '점검자 소속 시장', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspShopName', text: '점검자 업체', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'regDate', text: '등록일', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspRsntDate', text: '최근접속일', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
];

const InsprMgr = () => {
  const [repo, setRepo] = useState([]);
  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 });
  const [searchItem, setSearchItem] = useState({ searchWrd: "", useYn: "Y", alarmUse: "Y", loginLock: "N", inspAreaCode: "" });
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [insprContent, setInsprContent] = useState({});

  useEffect(() => {
    handleInitListInsprArea();
    handleInitTable();
  }, []);

  const handleInitListInsprArea = () => {
    getInsprAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("inspAreaCode").innerHTML += html;
      }
    });
  };

  const handleInitTable = () => {
    getInspectorList(pageItem.page, pageItem.sizePerPage, searchItem).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });
  };

  const handleChangeSearchType = (e) => {
    searchItem[e.target.id] = getInputValue(e);
    handleInitTable();
  };

  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => getInspector(row.inspId).then(resp => {
      if (resp.data["result"]) {
        setInsprContent(resp.data["resultData"]);
        setUpdateModal(true);
      } else {
        alert("통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    })
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5 className={"mb-0"}>전체 점검자 목록</h5>
        </CCardHeader>
        <CCardBody className={'pt-3'}>
          <div className={"mb-3 d-flex justify-content-between"}>
            <div className={"d-flex"}>
              <div><CInput placeholder="검색어 입력" /></div>
              <button className={"btn btn-custom-info"}>검색</button>

              <CFormGroup className={"d-flex align-items-center mb-0 pl-4"}>
                <CLabel htmlFor={"useYn"} className={"mb-0 pr-1"}>사용 여부</CLabel>
                <CSwitch className={'mx-1'} color={'info'} labelOn={'예'} labelOff={'아니오'} id={"useYn"} onChange={handleChangeSearchType} defaultChecked />
              </CFormGroup>
              <CFormGroup className={"d-flex align-items-center mb-0 pl-3"}>
                <CLabel htmlFor={"alarmUse"} className={"mb-0 pr-1"}>알림 여부</CLabel>
                <CSwitch className={'mx-1'} color={'info'} labelOn={'예'} labelOff={'아니오'} id={"alarmUse"} onChange={handleChangeSearchType} defaultChecked />
              </CFormGroup>
              <CFormGroup className={"d-flex align-items-center mb-0 pl-3"}>
                <CLabel htmlFor={"loginLock"} className={"mb-0 pr-1"}>로그인 제한 여부</CLabel>
                <CSwitch className={'mx-1'} color={'info'} labelOn={'예'} labelOff={'아니오'} id={"loginLock"} onChange={handleChangeSearchType} />
              </CFormGroup>

              <div className={"ml-4 d-flex align-items-center"}>
                <span>소속</span>
                <div className={'ml-2'}>
                  <CSelect id={'inspAreaCode'} onChange={handleChangeSearchType}>
                    <option value={''}>시장 전체</option>
                  </CSelect>
                </div>
              </div>
            </div>
            <div>
              <CButton className={"btn btn-custom float-right mt-0"} onClick={e => setInsertModal(true)}>등록</CButton>
            </div>
          </div>

          <PageTableWidget keyField={"inspId"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                           onTableChange={handleTableChange} viewColumns={columns} rowEvents={rowEvents} />
        </CCardBody>
      </CCard>

      <InsprInsertModal modal={insertModal} setModal={setInsertModal} handleInitTable={handleInitTable} />
      <InsprUpdateModal modal={updateModal} setModal={setUpdateModal} insprContent={insprContent} handleInitTable={handleInitTable} />
    </>
  );
};

export default InsprMgr;
