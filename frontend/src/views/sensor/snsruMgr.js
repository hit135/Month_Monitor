import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch } from "@coreui/react";

import { numCommaFormat } from "../../agent/commonIndex";
import PageTableWidget from "../../widget/pageTableWidget";
import { getSnsruList } from "../../agent/sensor";
import SnsruInsertModal from "./snsruInsertModal";
import SnsruUpdateModal from "./snsruUpdateModal";

const columns = [
    { dataField: 'seq', text: '번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'dateTime', text: '날짜', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'content', text: '내용', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const SnsruMgr = () => {
  const [repo, setRepo] = useState([]);               // 리스트 hook
  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 }); // 페이징 hook
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [snsruContent, setSnsruContent] = useState({});

  useEffect(() => handleInitTable(), []);

  const handleInitTable = () => {
    getSnsruList(pageItem.page, pageItem.sizePerPage).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });
  };

  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => {

    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5 className={"mb-0"}>센서 갱신 이력 목록</h5>
        </CCardHeader>
        <CCardBody className={'pt-3'}>
          <PageTableWidget keyField={"seq"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                           onTableChange={handleTableChange} viewColumns={columns} rowEvents={rowEvents} />
        </CCardBody>
      </CCard>

      <SnsruInsertModal modal={insertModal} setModal={setInsertModal} handleInitTable={handleInitTable} />
      <SnsruUpdateModal modal={updateModal} setModal={setUpdateModal} snsruContent={snsruContent} handleInitTable={handleInitTable} />
    </>
  );
};

export default SnsruMgr;
