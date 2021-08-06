import React, { lazy, useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CInput, CSelect, CFormGroup, CLabel, CSwitch } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

import PageTableWidget from "../../widget/pageTableWidget";
import { getInsprAreaList, getInspectorList } from "../../agent/inspection";
import InsprInsertModal from "./insprInsertModal";
import InsprUpdateModal from "./insprUpdateModal";

const columns = [
    { dataField: 'inspId', text: '점검자 ID', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspName', text: '점검자 이름', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspEmail', text: '점검자 이메일', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspTel', text: '점검자 연락처', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center', height: '42px' } }
  , { dataField: 'inspMobile', text: '점검자 휴대폰', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center', height: '42px' } }
  , { dataField: 'inspAreaName', text: '점검자 소속', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
  , { dataField: 'inspShopName', text: '점검자 업체', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left', height: '42px' } }
];

const InsprMgr = () => {
  const [repo, setRepo] = useState([]);
  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 });
  const [searchItem, setSearchItem] = useState({ searchWrd: "", useYn: "Y", alarmUse: "Y", loginLock: "N", inspAreaCode: "" });
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

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
  }

  const handleInitTable = () => {
    getInspectorList(pageItem.page, pageItem.sizePerPage, searchItem).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });
  };

  const handleChangeSearchType = (e) => {
    const value = (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value;
    searchItem[e.target.id] = value;
    handleInitTable();
  };

  const handleClickShowInsertModal = () => { setInsertModal(true); }
  const handleClickShowUpdateModal = () => { setUpdateModal(true); }

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
                <CSwitch className={'mx-1'} color={'info'} labelOn={'예'} labelOff={'아니오'} id={"useYn"}  onChange={handleChangeSearchType} defaultChecked/>
              </CFormGroup>
              <CFormGroup className={"d-flex align-items-center mb-0 pl-3"}>
                <CLabel htmlFor={"alarmUse"} className={"mb-0 pr-1"}>알림 여부</CLabel>
                <CSwitch className={'mx-1'} color={'info'} labelOn={'예'} labelOff={'아니오'} id={"alarmUse"} onChange={handleChangeSearchType} defaultChecked/>
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
              <CButton className={"btn btn-custom float-right mt-0"} onClick={handleClickShowInsertModal}>등록</CButton>
            </div>
          </div>

          <PageTableWidget
            keyField={"inspId"} data={repo} viewColumns={columns}
            page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount} />
        </CCardBody>
      </CCard>
      <InsprInsertModal modal={insertModal} setModal={setInsertModal} handleInitTable={handleInitTable}/>
      <InsprUpdateModal modal={updateModal} setModal={setUpdateModal} handleInitTable={handleInitTable} />
    </>
  );
};

export default InsprMgr;
