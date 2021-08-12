import React, { lazy, useEffect, useState } from 'react'
import { Tree } from "antd";
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch } from "@coreui/react";

import { dataList, generateList, getAreaList, getParentKey } from "../../agent/area";
import PageTableWidget from "../../widget/pageTableWidget";
import SnsrInsertModal from "./snsrInsertModal";
import SnsrUpdateModal from "./snsrUpdateModal";
import { getSnsr, getSnsrList } from "../../agent/sensor";
import { getInputValue, numCommaFormat } from "../../agent/commonIndex";

let gData = [];

const columns = [
    { dataField: 'rowNum', text: '번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'snsrSeq', text: '센서코드', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } }
  , { dataField: 'snsrId', text: '센서아이디', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } }
  , { dataField: 'strName', text: '상점명', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } }
  , { dataField: 'snsrNick', text: '센서명', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } }
  , { dataField: 'regDate', text: '등록일자', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' } }
];

const SnsrMgr = () => {
  const [insertModal, setInsertModal] = useState(false);            // Modal hook
  const [updateModal, setUpdateModal] = useState(false);            // Modal hook
  const [snsrContent, setSnsrContent] = useState({});
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [inPutSearchValue, setInputSearchValue] = useState("");
  const [repo, setRepo] = useState([]);               // 리스트 hook

  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 }); // 페이징 hook
  const [searchItem, setSearchItem] = useState({ searchWrd: "", delYn: "N", areaCode: "all", levelAreaCode: "all" });

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const clickSearchTree = e => {
    const value = inPutSearchValue;

    const expandedKeys = dataList
      .map(item => (item.title.indexOf(value) > -1) ? getParentKey(item.key, gData) : null)
      .filter((item, i, self) => item && self.indexOf(item) === i);

    if (value) {
      setExpandedKeys(expandedKeys);
      setSearchValue(value);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys([]);
      setSearchValue("");
      setAutoExpandParent(false);
    }
  };

  const filterTreeNode = node => (node.title.props.children.indexOf(searchValue) !== -1);

  useEffect(() => {
    handleInitTree().then(() => {
      generateList(gData);
      clickSearchTree();
      handleInitTable();
    });
  }, []);

  // 초기 테이블 셋팅
  const handleInitTree = async (page = 1, sizePerPage = 10) =>
    await getAreaList(page, sizePerPage).then(resp => {
      if (resp.data["result"] === "success") {
        const data = [{ title : "전체", children: [], key: "all" }];
        // data.push();

        resp.data["resultList"].map((item, idx) => data.push(item));
        data.push({ title : "알수없음", children: [], key: "none" });
        gData = data;
      }
    });

  // 노드 선택 이벤트
  const nodeClick = async (e, node) => {
    pageItem.page = 1;
    const parentKey = getParentKey(node.key, gData);

    searchItem.levelAreaCode = node["key"];
    searchItem.areaCode = (typeof parentKey !== 'undefined') ? parentKey : node["key"];

    await handleInitTable();
  };

  // 검색 후 이벤트
  const loop = data => data.map((item) => {
    const index = item.title.indexOf(searchValue);

    const title = (index > -1) ?
      <span>{item.title.substr(0, index)}<span className={"site-tree-search-value"}>{searchValue}</span>{item.title.substr(index + searchValue.length)}</span> :
      <span>{item.title}</span>;

    return (item.children) ?
      { title, key: item.key, areaLevel: item.areaLevel, children: loop(item.children) } : { title, key: item.key };
  });

  // 초기 테이블 셋팅
  const handleInitTable = () => getSnsrList(pageItem.page, pageItem.sizePerPage, searchItem).then(resp => {
    setRepo(resp.data["resultList"]);
    setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
  });

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  // 검색어 입력
  const handleSearchWrd = e => {
    searchItem.searchWrd = e.target.value;
    if (e.key === "Enter")
      handleClickSearchBtn();
  };

  // 검색 버튼 이벤트
  const handleClickSearchBtn = () => {
    pageItem.page = 1;
    handleInitTable();
  };

  const handleClickSearchType = e => {
    searchItem[e.target.id] = getInputValue(e);
    handleInitTable();
  };

  // 행 클릭 시
  const rowEvents = {
    onClick: (e, row, rowIndex) => getSnsr(row.snsrId).then(resp => {
      if (resp.data["result"] === "success") {
        setSnsrContent(resp.data["content"]);
        setUpdateModal(true);
      } else {
        alert("통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    })
  };

  return (
    <CRow>
      <CCol md={"3"}>
        <CCard>
          <CCardHeader>
            <CCol md={"12"} xl={"12"} className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                </div>
              </div>
            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <CCol className={"pl-0"}>
              <CCol sm={"8"} className={"float-left pl-0"}>
                <CInput placeholder="검색어 입력" onChange={e => setInputSearchValue(e.target.value)}
                        onKeyUp={e => { if (e.key === "Enter") clickSearchTree(); }} />
              </CCol>
              <button className={"btn btn-custom-info mt-0"} onClick={clickSearchTree}>검색</button>
            </CCol>
            <CRow className={"mb-3"}></CRow>
            <Tree showLine={true} onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onClick={nodeClick}
                  treeData={loop(gData)} filterTreeNode={filterTreeNode} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={9}>
        <CCard>
          <CCardHeader>
            <CCol md={"12"} xl={"12"} className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>센서 목록</h5>
                </div>
              </div>
            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <CCol md={"12"} xl={"12"} className={"pl-0 pr-0 mb-2"}>
              <CCol sm={"2"} className={"float-left pl-0"}>
                <CInput placeholder="검색어 입력" onKeyUp={handleSearchWrd} />
              </CCol>
              <button className={"btn btn-custom-info mt-0"} onClick={handleClickSearchBtn}>검색</button>
              <CFormGroup className={"pl-3 pr-3 d-inline-flex mb-0 ct-mt"}>
                <CLabel htmlFor={"delYn"} className={"pr-1"}>삭제유무</CLabel>
                <CSwitch className={'mx-1'} id={"delYn"} color={'danger'} labelOn={'삭제'} labelOff={'미삭제'} onChange={handleClickSearchType} />
              </CFormGroup>
              <button className={"btn btn-custom float-right mt-0"} onClick={e => setInsertModal(true)}>등록</button>
            </CCol>

            <PageTableWidget keyField={"snsrId"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                             onTableChange={handleTableChange} viewColumns={columns} rowEvents={rowEvents} />
          </CCardBody>
        </CCard>
      </CCol>

      <SnsrInsertModal modal={insertModal} setModal={setInsertModal} handleInitTable={handleInitTable} />
      <SnsrUpdateModal modal={updateModal} setModal={setUpdateModal} snsrContent={snsrContent} handleInitTable={handleInitTable} />
    </CRow>
  );
};

export default SnsrMgr;
