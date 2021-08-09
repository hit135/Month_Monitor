import React, {useEffect, useState} from 'react'
import {CButton, CCol, CInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import {Tree} from "antd";
import {dataList, generateList, getAreaList, getParentKey} from "../agent/area";
import 'antd/dist/antd.css';
let gData = [];

function PageAreaTreeModalWidget(props) {
  const {onAreaModal, setOnAreaModal, nodeClick, initAreaCode} = props;
  const [initTree, setInitTree] = useState();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [inPutSearchValue, setInputSearchValue] = useState("");

  const initTreeData = () => {
    setInitTree(
      <Tree
        showLine={true}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onClick={nodeClick}
        treeData={loop(gData)}
        filterTreeNode={filterTreeNode}
      />
    )
  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const filterTreeNode = (node) => {
    const title = node.title.props.children;
    const result = title.indexOf(searchValue) !== -1;
    return result;
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

  useEffect(() => {
    if(onAreaModal) {
      initTreeData();
    } else {
      setInitTree("");
    }
  }, [onAreaModal])

  useEffect(() => {
    handleInitTree().then(r => {
      generateList(gData);
      clickSearchTree();
    });
  }, []);

  // 초기 테이블 셋팅
  const handleInitTree = async (page = 1, sizePerPage = 10) => {
    await getAreaList(page, sizePerPage).then(function (resp) {
      gData = resp.data["resultList"];
    });
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
      <CModal
        show={onAreaModal}
        onClose={() => setOnAreaModal(!onAreaModal)}
        size="sm"
        className={"mt-5 strModal"}
      >
        <CModalHeader closeButton>
          <CModalTitle>구역 선택</CModalTitle>
        </CModalHeader>
        <CModalBody>
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
          {initTree}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={initAreaCode}>초기화</CButton>
          <CButton color="secondary" onClick={() => setOnAreaModal(!onAreaModal)}>확인</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default PageAreaTreeModalWidget
