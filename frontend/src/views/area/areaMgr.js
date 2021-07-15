import React, {Component, useEffect, useState} from 'react'
import {getAreaList, getData} from "../../agent/area";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from  '@coreui/react'
import PageTableWidget from "../../widget/pageTableWidget";

const columns = [
  { dataField: 'areaOrder', text: '출력순서', headerStyle: {textAlign: 'center'} },
  { dataField: 'areaName', text: '구역명', headerStyle: {textAlign: 'center'},  },
  { dataField: 'areaCode', text: '구역코드', headerStyle: {textAlign: 'center'}, },
  { dataField: 'storeCnt', text: '소속상점수', headerStyle: {textAlign: 'center'}, },
  { dataField: 'areaManager', text: '구역관리자', headerStyle: {textAlign: 'center'}, },
  { dataField: 'areaTel', text: '전화번호', headerStyle: {textAlign: 'center'}, },
  { dataField: 'useYn', text: '사용유무', headerStyle: {textAlign: 'center'}, },
  { dataField: 'delYn', text: '삭제유무', headerStyle: {textAlign: 'center'}, },
  { dataField: 'regDate', text: '등록일자', headerStyle: {textAlign: 'center'},},
];

const AreaMgr = () => {
  const [repo, setRepo] = useState([]);
  const [pageItem, setPageItem] = useState({});

  const handleInitTable = (page = 1, sizePerPage = 5) => {
    getAreaList(page, sizePerPage).then(function(resp) {
      setRepo(resp.data["resultList"]);
      setPageItem({page: page, sizePerPage: sizePerPage, totalElementsCount: resp.data["totalElements"]})
    });
  }

  const handleTableChange = (pageNation, param) => {
    let page = param.page;
    let sizePerPage = param.sizePerPage;

    handleInitTable(page, sizePerPage);
  };

  useEffect(() => {
    handleInitTable()
  }, []);


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12">
                <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <PageTableWidget
                keyField={"areaCode"}
                data={repo}
                page={pageItem.page}
                sizePerPage={pageItem.sizePerPage}
                totalSize={pageItem.totalElementsCount}
                onTableChange={handleTableChange}
                // onSizePerPageChange={handleChangeSizePerPage}
                viewColumns={columns}
                // selectRow={selectRowProp}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )

}

export default AreaMgr
