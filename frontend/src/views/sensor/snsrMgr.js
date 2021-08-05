import React, {lazy, useEffect, useState} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CInput, CRow} from "@coreui/react";
import {Tree} from "antd";
import {
  dataList,
  generateList,
  getAreaList,
  getParentKey,
} from "../../agent/area";

let gData = [];

const SnsrMgr = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [inPutSearchValue, setInputSearchValue] = useState("");
  const [nodeArray, setNodeArray] = useState();

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const clickSearchTree = (e) => {
    const value = inPutSearchValue;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
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

  const filterTreeNode = (node) => {
    const title = node.title.props.children;
    const result = title.indexOf(searchValue) !== -1;
    return result;
  };

  useEffect(() => {
    handleInitTree().then(r => {
      generateList(gData);
      clickSearchTree();
    });
  }, []);

  // 초기 테이블 셋팅
  const handleInitTree = async (page = 1, sizePerPage = 10) => {
    await getAreaList(page, sizePerPage).then(function (resp) {
      console.log(resp);
      if(resp.data["result"] === "success") {
        const data = [{title : "전체", children: [], key: "AREA_0000000"}];
        // data.push();
        resp.data["resultList"].map(function(item, idx) {
          data.push(item);
        });
        data.push({title : "알수없음", children: [], key: "AREA_111111"})

        gData = data;
      }

    });
  }

  // 노드 선택 이벤트
  const nodeClick = async (e, node) => {
    setNodeArray(node);
  }

  // 검색 후 이벤트
  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, areaLevel: item.areaLevel, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <>
      <CRow>
        <CCol md={3}>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12" className={"pl-0 pr-0"}>
                <div className={"d-flex align-item-center"}>
                  <div className={"mr-auto"}>
                    <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                  </div>
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CCol className={"pl-0"}>
                <CCol sm="8" className={"float-left pl-0"}>
                  <CInput placeholder="검색어 입력" onChange={(e) => { setInputSearchValue(e.target.value)} } onKeyUp={(e) => {
                    if(e.key === "Enter")
                      clickSearchTree();
                  }}  />
                </CCol>
                <button className={"btn btn-custom-info mt-0"} onClick={clickSearchTree}>검색</button>
              </CCol>
              <CRow className={"mb-3"}>

              </CRow>
              <Tree
                showLine={true}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onClick={nodeClick}
                treeData={loop(gData)}
                filterTreeNode={filterTreeNode}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={9}>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12" className={"pl-0 pr-0"}>
                <div className={"d-flex align-item-center"}>
                  <div className={"mr-auto"}>
                    <h5 className={"mb-0 ml-0"}>센서 목록</h5>
                  </div>
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>

            </CCardBody>
          </CCard>
        </CCol>


      </CRow>
    </>
  )
}

export default SnsrMgr
