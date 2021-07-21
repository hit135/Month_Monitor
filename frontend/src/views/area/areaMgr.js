import React, {Component, useEffect, useState} from 'react'
import {getAreaList} from "../../agent/area";
import 'antd/dist/antd.css';
import { Tree, Input } from 'antd';
// import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import AreaActionModal from "./areaActionModal";
// import Search from "antd/es/input/Search";

const { Search } = Input;
let gData = [];
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children);
    }
  }
};

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const AreaMgr = () => {
  const [info, setInfo] = useState(false)             // Modal state
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
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
    handleInitTable().then(r => generateList(gData));
  }, []);

  // 초기 테이블 셋팅
  const handleInitTable = async (page = 1, sizePerPage = 10) => {
    await getAreaList(page, sizePerPage).then(function (resp) {
      // setTreeData(resp.data["resultList"]);
      gData = resp.data["resultList"];
    });
  }

  const handleClickRegisterLv1Item = () => {

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
        <CCol md={3}>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12" className={"pl-0 pr-0"}>
                <div className={"d-flex align-item-center"}>
                  <div className={"mr-auto"}>
                    <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                  </div>
                  <div>
                    <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterLv1Item}>상위 레벨 등록</button>
                  </div>
                </div>

              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CCol>
                <Search className={"mb-0"} placeholder="시장명 검색" onClick={onChange}/>
              </CCol>
              <CRow className={"mb-3"}>
                {/*<CCol md="12" xl="12">*/}
                {/*  */}
                {/*</CCol>*/}
              </CRow>
              {/*/>*/}
              <Tree
                showLine={true}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
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
                    <h5 className={"mb-0 ml-0"}>시장 상세 및 수정</h5>
                  </div>
                  {/*<div>*/}
                  {/*  <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterLv1Item}>상위 레벨 등록</button>*/}
                  {/*</div>*/}
                </div>

              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AreaActionModal info={info} setInfo={setInfo}/>
    </>
  )
}

export default AreaMgr
