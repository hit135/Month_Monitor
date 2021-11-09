import React, {useEffect, useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {getModalMemList} from "../agent/member";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCol} from "@coreui/react";

function PageUserTableModalWidget(props) {
  const {SearchBar} = Search;

  const viewColumns = [
    {dataField: 'userId', text: '아이디 ', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}}
    , {dataField: 'memName', text: '사용자 이름', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color: '#fff'}, style: {textAlign: 'center'}}
  ];

  const {keyField, onTableChange, rowEvents, onMemModal, setOnMemModal, memClickEvent, initUserId} = props;

  const [data, setData] = useState([]);
  const [searchWrd, setSearchWrd] = useState("");

  useEffect(() => {
    getModalMemList(searchWrd).then(resp => setData(resp.data["resultList"]));
  }, []);

  return (
    <>
      <CModal show={onMemModal} onClose={() => setOnMemModal(!onMemModal)} size="sm">
        <CModalHeader closeButton>
          <CModalTitle>회원 선택</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ToolkitProvider keyField={"userId"} data={data.slice()} columns={viewColumns} search>
            {props =>
              <div>
                <SearchBar {...props.searchProps} />
                <div className={'custom-bootstrap-table'}>
                  <BootstrapTable {...props.baseProps} remote striped hover condensed rowEvents={memClickEvent}
                                  noDataIndication={() => <div style={{textAlign: 'center'}}>목록이 없습니다.</div>} />
                </div>
              </div>}
          </ToolkitProvider>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={initUserId}>초기화</CButton>
          <CButton color="secondary" onClick={() => setOnMemModal(!onMemModal)}>확인</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PageUserTableModalWidget;
