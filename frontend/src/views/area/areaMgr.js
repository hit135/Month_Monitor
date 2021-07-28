import React, {useEffect, useState} from 'react'
import {
  getAreaList,
  generateList,
  getParentKey,
  dataList,
  insertAreaItem,
  deleteAreaItem,
  selectAreaItem
} from "../../agent/area";
import 'antd/dist/antd.css';
import { Tree } from 'antd';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CInput,
  CRow,
} from '@coreui/react'
import AreaModifyMgr from "./areaModifyMgr";

let gData = [];

const AreaMgr = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [inPutSearchValue, setInputSearchValue] = useState("");
  const [nodeLv2Btn, setNodeLv2Btn] = useState(true);
  const [nodeUpcode, setNodeUpCode] = useState("0");
  const [nodeLevel, setNodeLevel] = useState();
  const [nodeArray, setNodeArray] = useState();
  const [areaContent, setAreaContent] = useState();

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
      gData = resp.data["resultList"];
    });
  }

  // 구역 등록 이벤트
  const handleClickRegisterItem = async (type, upAreaCode, areaLevel) => {
    await insertAreaItem(type, upAreaCode, areaLevel).then(function (resp) {
      if(resp.data["result"] === "success") {
        handleInitTree().then(r => {
          alert("구역 등록을 완료했습니다.");
          generateList(gData);
          clickSearchTree();
          setNodeLv2Btn(true);
        });
      } else if(resp.data["result"] === "duplicate") {
        alert("중복되는 구역코드가 있습니다. 잠시 후 다시 시도해주세요.")
      } else {
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  }

  // 노드 선택 이벤트
  const nodeClick = async (e, node) => {
    setNodeLv2Btn((node.selected));                     // 하위 레벨 버튼 disabled
    setNodeUpCode(node.key);                            // 상위 코드 set
    setNodeLevel(node.areaLevel + 1);            // 노드 레벨 set
    setNodeArray(node);

    await selectAreaItem(node.key).then(function(resp) {
      if(resp.data["result"] === "success") {
        setAreaContent(resp.data["content"]);
      } else {
        alert("상세 조회에 오류가 발생했습니다.");
      }
    });
  }

  // 구역 삭제 이벤트
  const deleteNode = () => {
    if(window.confirm("구역을 삭제하시겠습니까?")) {
      if(nodeArray.children.length > 0) {
        alert("하위 구역을 먼저 삭제하셔야합니다.");
        return false;
      } else {
        deleteAreaItem(nodeArray.key).then(function (resp) {
          if(resp.data["result"] === "success") {
            handleInitTree().then(r => {
              alert("구역 삭제를 완료했습니다.");
              generateList(gData);
              clickSearchTree();
              setNodeLv2Btn(true);
            });
          } else {
            alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
        });
      }
    }
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
        <CCol md={5}>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12" className={"pl-0 pr-0"}>
                <div className={"d-flex align-item-center"}>
                  <div className={"mr-auto"}>
                    <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                  </div>
                  <div>
                    <button className={"btn btn-danger float-right mt-0 ml-2"}  disabled={nodeLv2Btn}
                            onClick={(e) => deleteNode()}>삭제</button>
                    <button className={"btn btn-custom float-right mt-0 ml-2"} id={"lv2Node"} disabled={nodeLv2Btn}
                            onClick={(e) => handleClickRegisterItem(e.target.id, nodeUpcode, nodeLevel)}>하위 레벨 등록</button>
                    <button className={"btn btn-custom float-right mt-0"} id={"lv1Node"}
                            onClick={(e) => handleClickRegisterItem(e.target.id, '0', 1)}>상위 레벨 등록</button>
                  </div>
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CCol className={"pl-0"}>
                <CCol sm="4" className={"float-left pl-0"}>
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
        <AreaModifyMgr areaContent={areaContent} nodeLv2Btn={nodeLv2Btn}/>
      </CRow>
    </>
  )
}

export default AreaMgr
