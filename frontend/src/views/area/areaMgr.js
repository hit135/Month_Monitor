import React, {useEffect, useState} from 'react'
import {getAreaList, getData} from "../../agent/area";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from  '@coreui/react'
import PageTableWidget from "../../widget/pageTableWidget";
function AreaMgr() {
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

  const [repo, setRepo] = useState([]);
  const page = 1;
  useEffect(() => {
    getAreaList().then(function(resp){
      console.log(resp);
        setRepo(resp.data["resultList"]);
      }
    );

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
                page={page}
                // sizePerPage={sizePerPage}
                // totalSize={totalElementsCount}
                // onTableChange={this.handleTableChange}
                // onSizePerPageChange={this.handleSizePerPageChange}
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
