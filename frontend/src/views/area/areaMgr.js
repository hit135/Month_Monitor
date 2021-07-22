import React, {Component, useEffect, useState} from 'react'
import {getAreaList, generateList, getParentKey, dataList} from "../../agent/area";
import 'antd/dist/antd.css';
import { Tree, Input } from 'antd';
// import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CInput,
  CRow,
} from '@coreui/react'
import AreaActionModal from "./areaActionModal";
import AreaModifyMgr from "./areaModifyMgr";

let gData = [];
const AreaMgr = () => {
  const [info, setInfo] = useState(false)             // Modal state
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [inPutSearchValue, setInputSearchValue] = useState("");

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
    handleInitTable().then(r => {
      generateList(gData);
      clickSearchTree();
    });
  }, []);

  // 초기 테이블 셋팅
  const handleInitTable = async (page = 1, sizePerPage = 10) => {
    await getAreaList(page, sizePerPage).then(function (resp) {
      gData = resp.data["resultList"];
    });
  }

  const handleClickRegisterLv1Item = () => {

  }

  const nodeClick = (e, node) => {
    console.log(e);
    console.log(node);
  }

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
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key
      };
    });

  return (
    <>
      <CRow>
        <CCol md={5}>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12" className={"pl-0 pr-0"}>
                <div className={"d-flex align-item-center"}>
                  <div className={"mr-auto"}>
                    <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                  </div>
                  <div>
                    <button className={"btn btn-custom float-right mt-0 ml-2"} onClick={handleClickRegisterLv1Item}>하위 레벨 등록</button>
                    <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterLv1Item}>상위 레벨 등록</button>
                  </div>
                </div>

              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CCol className={"pl-0"}>
                <CCol sm="4" className={"float-left pl-0"}>
                  <CInput placeholder="검색어 입력" onChange={(e) => { setInputSearchValue(e.target.value);}} onKeyUp={(e) => {
                    if(e.key === "Enter")
                      clickSearchTree();
                  }}  />
                </CCol>
                <button className={"btn btn-custom-info mt-0"} onClick={clickSearchTree}>검색</button>
              </CCol>
              <CRow className={"mb-3"}>

              </CRow>
              {/*/>*/}
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
        <AreaModifyMgr />
      </CRow>
      <AreaActionModal info={info} setInfo={setInfo}/>
    </>
  )
}

export default AreaMgr
