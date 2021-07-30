import React, {lazy, useEffect} from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch} from "@coreui/react";
import PageTableWidget from "../../widget/pageTableWidget";
const StrMgr = () => {

  useEffect(() => {

  });
  return (
    <>
      {/*<DropzoneArea*/}
      {/*  acceptedFiles={['image/*']}*/}
      {/*  dropzoneText={"Drag and drop an image here or click"}*/}
      {/*  onChange={(files) => console.log('Files:', files)}*/}
      {/*/>*/}


      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol className={"pl-0"} md="12" xl="12">
                <h5 className={"mb-0 ml-0 float-left"}>전체 상점 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CRow className={"mb-3"}>
                <CCol md="12" xl="12">
                  <CCol sm="2" className={"float-left pl-0"}>
                    <CInput placeholder="검색어 입력" onKeyUp={(e) => {
                      // searchItem.searchWrd = e.target.value;
                      // if(e.key === "Enter") {}
                    }} />
                  </CCol>
                  <button className={"btn btn-custom-info mt-0"} onClick={""}>검색</button>

                  <CFormGroup className="pr-3 d-inline-flex mb-0 ct-mt pl-3">
                    <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                    <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"}  defaultChecked/>
                  </CFormGroup>
                  <CFormGroup className="pr-3 d-inline-flex mb-0 ct-mt">
                    <CLabel htmlFor="exampleInputName2" className="pr-1">삭제유무</CLabel>
                    <CSwitch className={'mx-1'} color={'danger'} labelOn={'삭제'} labelOff={'미삭제'}  id={"delYn"} />
                  </CFormGroup>

                  <button className={"btn btn-custom float-right mt-0"}>등록</button>
                </CCol>
              </CRow>
              {/*<PageTableWidget*/}
              {/*  keyField={"userId"}*/}
              {/*  data={repo}*/}
              {/*  page={pageItem.page}*/}
              {/*  sizePerPage={pageItem.sizePerPage}*/}
              {/*  totalSize={pageItem.totalElementsCount}*/}
              {/*  onTableChange={handleTableChange}*/}
              {/*  viewColumns={columns}*/}
              {/*  rowEvents={rowEvents}*/}
              {/*/>*/}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StrMgr
