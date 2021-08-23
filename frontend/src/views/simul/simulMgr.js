import React, { lazy, useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSelect, CSwitch } from "@coreui/react";

import PageTableWidget from "../../widget/pageTableWidget";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

import { getSimulAreaList, getSimulList, getSimulPreview, sendSimulPush } from "../../agent/simul";
import { numCommaFormat } from "../../agent/commonIndex";

const columns1 = [
    { dataField: 'lSeq', text: 'Log no.', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right', height: '42px', width: '5rem' }
      , formatter: numCommaFormat }
  , { dataField: 'areaCode', text: '시장코드', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'areaName', text: '시장', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'strCode', text: '상점코드', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'strName', text: '상점', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'snsrNick', text: '센서', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'regDate', text: '등록날짜', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'lCause', text: '원인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const columns2 = [
   { dataField: 'rowNum', text: 'No.', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right', height: '42px', width: '5rem' }
    , formatter: numCommaFormat }
  , { dataField: 'areaCode', text: '시장코드', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'areaName', text: '시장', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'strCode', text: '상점코드', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'strName', text: '상점', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'regDate', text: '등록일', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
];

const SimulMgr = () => {
  const [repo, setRepo] = useState([]);   // 리스트 hook
  const [simulType, setSimulType] = useState('simul1');
  const [phoneNum, setPhoneNum] = useState('');
  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 }); // 페이징 hook
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [preview, setPreview] = useState({});

  const simulRadioHtml = (className, id, value, txt) =>
    <span className={className}>
      <input type={"radio"} id={id} value={value} checked={simulType === id} onChange={e => setSimulType(e.target.id)} />
      <label className={'ml-1'} style={{ fontSize: '15px' }} htmlFor={id}>{txt}</label>
    </span>;

  useEffect(() => {
    handleInitListSimulArea();
    handleInitTable();
  }, []);

  useEffect(() => {
    changeSimulType();
    handleInitTable();
  }, [simulType]);

  useEffect(() => handleInitTable(), [selectedAreaCode]);
  useEffect(() => handleInitTable(), [selectedDate]);

  useEffect(() => {
    let txt = '';

    if (Object.keys(preview).length > 0) {
      if (simulType === 'simul1') {
        txt += '<p>[시뮬레이션 - 전기안전 긴급이벤트]</p>';
        txt += `<p>■ ${preview['areaName']} ${preview['strName']}<br/>금일 누설전류 위험발생 (${preview['regDate']})</p>`;

        if (preview['lCause'].indexOf("과전류") > -1)
          txt += `<p>과전류 수치가 ${preview['snsrAmpere']} mA 이상으로 전기위험 상황이 발생했습니다.<br/>(과전류 수치가 ${preview['soc1V1']} mA 이하가 정상상태입니다.)</p>`;

        if (preview['lCause'].indexOf("Igo") > -1)
          txt += `<p>IGO 수치가 ${preview['snsrIgo']} mA 이상으로 전기위험 상황이 발생했습니다.<br/>(IGO 수치가 ${preview['sigo1V']} mA 이하가 정상상태입니다.)</p>`;

        if (preview['lCause'].indexOf("Igr") > -1)
          txt += `<p>IGR 수치가 ${preview['snsrIgr']} mA 이상으로 전기위험 상황이 발생했습니다.<br/>(IGR 수치가 ${preview['sigr1V']} mA 이하가 정상상태입니다.)</p>`;

        let areaCode = document.getElementById("selectedAreaCode").innerText;
        let strCode = document.getElementById("selectedStrCode").innerText;
        let lSeq = document.getElementById("selectedLSeq").innerText;

        txt += `<p>링크 : http://1.223.40.19:30080/mobile/store/issue?areaCode=${areaCode}&strCode=${strCode}&lSeq=${lSeq}</p>`;
      } else if (simulType === 'simul2') {
        txt += '<p>[전기안전 정기보고]</p>';
        txt += `<p>■ ${preview['areaName']} ${preview['strName']}</p>`;

        txt += `<p>`
            + `[전기안전]<br/>`
            + `전기안전<br/>등급 : ${preview['snsrIgoGrade']} 등급<br/>순위 : ${numCommaFormat(preview['snsrIgrRank'])} 위 / ${numCommaFormat(preview['strCnt'])} 상점<br/>`
            + `과전류발생 : ${numCommaFormat(preview['oc'])} 회<br/>누전발생 : ${numCommaFormat(preview['ig'])} 회<br/>`
            + `기간 : ${preview['startDate']} ~ ${preview['endDate']}`
            + `</p>`;

        if (preview['snsrIgoGrade'] <= 2)
          txt += `<p>※ 매우 안전한 상태입니다. 그래도 누전을 조심하십시오.</p>`;
        else if (preview['snsrIgoGrade'] <= 4)
          txt += `<p>※ 누전의 위험이 있으니 조심하십시오.</p>`;
        else
          txt += `<p>※ 각별한 주의가 필요한 상태입니다.</p>`;

        txt += `<p>`
            + `[전력사용]<br/>`
            + `순위 : ${numCommaFormat(preview['snsrKwhRank'])} 위 / ${numCommaFormat(preview['strCnt'])} 상점<br/>`
            + `일별평균전력사용량 : ${numCommaFormat(preview['snsrKwhDailyAvg'])} Kwh<br/>`
            + `주별전력사용량 : ${numCommaFormat(preview['snsrKwhWeeklyAvg'])} Kwh<br/>`
            + `기간 : ${preview['startDate']} ~ ${preview['endDate']}`
            + `</p>`;

        if (preview['snsrKwhCompare'] > 0)
          txt += `<p>※ 전주대비 전력소비가 많습니다.</p>`;
        else if (preview['snsrKwhCompare'] < 0)
          txt += `<p>※ 전주대비 전력소비가 적습니다.</p>`;
        else
          txt += `<p>※ 전주대비 전력소비가 동일합니다.</p>`;
      }
    } else {
      txt += '<p>항목을 선택하세요.</p>';
    }

    document.getElementById("sendPreview").innerHTML = txt;
  }, [preview]);

  const handleInitListSimulArea = () => {
    getSimulAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("simulAreaCode").innerHTML += html;
      }
    });
  };

  const handleInitTable = () => {
    let date = selectedDate.getFullYear() + '.' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '.' + ('0' + selectedDate.getDate()).slice(-2);

    getSimulList(simulType, pageItem['page'], pageItem['sizePerPage'], selectedAreaCode, date).then(resp => {
      if (resp.data["result"]) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });
  }

  const changeSimulType = () => {
    let labels = document.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++)
      if (labels[i].htmlFor === simulType)
        document.getElementById('simulTitle').innerText = labels[i].innerText;
  };

  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      let map = {};
      map['simulType'] = simulType;
      map['areaCode'] = row['areaCode'];
      map['strCode'] = row['strCode'];
      document.getElementById("selectedAreaCode").innerText = row['areaCode'];
      document.getElementById("selectedStrCode").innerText = row['strCode'];

      if (simulType === 'simul1') {
        map['lSeq'] = row['lSeq'];
        document.getElementById("selectedLSeq").innerText = row['lSeq'];
      } else if (simulType === 'simul2') {
        map['areaName'] = row['areaName'];
        map['strName'] = row['strName'];
      }

      getSimulPreview(map).then(resp => setPreview((resp.data['result']) ? resp.data['resultData'] : []));
    }
  };

  const clickSendSimulPush = () => {
    let map = {};
    map['toinfo'] = phoneNum;
    map['msgText'] = document.getElementById("sendPreview").innerText;

    // let areaCode = document.getElementById("selectedAreaCode").innerText;
    // let strCode = document.getElementById("selectedStrCode").innerText;
    //
    // if (simulType == 'simul1') {
    //   let lSeq = document.getElementById("selectedLSeq").innerText;
    //
    //   map['linkMo'] = "http://1.223.40.19:30080/mobile/store/issue?areaCode=" + areaCode + "&strCode=" + strCode + "&lSeq=" + lSeq;
    //   map['linkPc'] = "http://1.223.40.19:30080/mobile/store/issue?areaCode=" + areaCode + "&strCode=" + strCode + "&lSeq=" + lSeq;
    // } else if (simulType == 'simul2') {
    //   map['linkMo'] = "http://1.223.40.19:30080/mobile/store/report?areaCode=" + areaCode + "&strCode=" + strCode;
    //   map['linkPc'] = "http://1.223.40.19:30080/mobile/store/report?areaCode=" + areaCode + "&strCode=" + strCode;
    // }

    sendSimulPush(map).then(resp => {
      if (resp.data['result'])
        alert("발송되었습니다.");
      else
        alert("발송중 오류가 발생했습니다.");
    });
  };

  return (
    <CCard>
      <CCardHeader className={'d-flex justify-content-between'}>
        <h5 id="simulTitle" className={"mb-0 ml-0"}></h5>
        <span>
          <CSelect id={'simulAreaCode'} onChange={e => setSelectedAreaCode(e.target.value)}>
            <option value={''}>시장 전체</option>
          </CSelect>
        </span>
        <span>
          {simulRadioHtml('', 'simul1', '1', '긴급전송 (실시간 센서로그)')}
          <DatePicker className="ml-3" id="simulDatetime" locale={ko} selected={selectedDate} dateFormat="yyyy-MM-dd" onChange={date => setSelectedDate(date)} />
          {simulRadioHtml('ml-3', 'simul2', '2', '일반전송 (상점별 주별보고)')}
        </span>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={'9'}>
            <h5>결과 목록</h5>
            {
              (simulType === 'simul1') ?
                <PageTableWidget keyField={"lSeq"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                                 onTableChange={handleTableChange} viewColumns={columns1} rowEvents={rowEvents} /> :
                <PageTableWidget keyField={"rowNum"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                                 onTableChange={handleTableChange} viewColumns={columns2} rowEvents={rowEvents} />
            }
          </CCol>
          <CCol md={'3'}>
            <h5>메시지 전송 연락처 입력</h5>
            <input type={"text"} style={{ width: '100%' }} onChange={e => setPhoneNum(e.target.value)} />
            <button className={'mt-1 btn btn-custom-info'} id={"sendBtn"} onClick={clickSendSimulPush}>전송</button>

            <h5 className={'mt-4'}>미리보기</h5>
            <div id={"selectedAreaCode"}></div>
            <div id={"selectedStrCode"}></div>
            <div id={"selectedLSeq"}></div>
            <div className={'p-1'} id={'sendPreview'} style={{ border: '1px solid black' }}>
              <p>항목을 선택하세요</p>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default SimulMgr;
