import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch } from "@coreui/react";

import { getSnsruList } from "../../agent/sensor";
import { numCommaFormat } from "../../agent/commonIndex";

const column = [
    { dataField: 'seq', text: '번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'datetime', text: '날짜', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'content', text: '내용', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const SnsruMgr = () => {

  return (
    <>
    </>
  );
};

export default SnsruMgr;
