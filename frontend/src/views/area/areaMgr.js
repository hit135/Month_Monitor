import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { CCard, CCardBody, CCardHeader, CCol, CInput, CRow } from '@coreui/react'
import { getAreaList, generateList, getParentKey, dataList, insertAreaItem, deleteAreaItem, selectAreaItem, updateAreaItem } from "../../agent/area";
import AreaUpdateMgr from "./areaUpdateMgr";

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

  const filterTreeNode = node => (node.title.props.children.indexOf(searchValue) !== -1);

  useEffect(() => {
    handleInitTree().then(() => {
      generateList(gData);
      clickSearchTree();
    });
  }, []);

  // 초기 테이블 셋팅
  const handleInitTree = async (page = 1, sizePerPage = 10) =>
    await getAreaList(page, sizePerPage).then(resp => gData = resp.data["resultList"]);

  const clickSearchTree = () => {
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

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  // 노드 선택 이벤트
  const nodeClick = async (e, node) => {
    setNodeLv2Btn(node.selected);                       // 하위 레벨 버튼 disabled
    setNodeUpCode(node.key);                            // 상위 코드 set
    setNodeLevel(node.areaLevel + 1);            // 노드 레벨 set
    setNodeArray(node);

    await selectAreaItem(node.key)
      .then(resp => {
        (resp.data["result"] === "success") ? setAreaContent(resp.data["content"]) : alert("상세 조회에 오류가 발생했습니다.");
        console.log(resp.data);
      });
  };

  // 검색 후 이벤트
  const loop = data => data.map(item => {
    const index = item.title.indexOf(searchValue);

    const title = (index > -1) ?
      <span>{item.title.substr(0, index)}<span className={"site-tree-search-value"}>{searchValue}</span>{item.title.substr(index + searchValue.length)}</span> :
      <span>{item.title}</span>;

    return (item.children) ?
      { title, key: item.key, areaLevel: item.areaLevel, children: loop(item.children) } : { title, key: item.key };
  });

  // 구역 삭제 이벤트
  const deleteNode = () => {
    if (window.confirm("구역을 삭제하시겠습니까?")) {
      if (nodeArray.children.length > 0) {
        alert("하위 구역을 먼저 삭제하셔야 합니다.");
        return false;
      } else {
        deleteAreaItem(nodeArray.key).then(resp => {
          if (resp.data["result"] === "success") {
            handleInitTree().then(() => {
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
  };

  // 구역 등록 이벤트
  const handleClickRegisterItem = async (type, upAreaCode, areaLevel) =>
    await insertAreaItem(type, upAreaCode, areaLevel).then(resp => {
      if (resp.data["result"] === "success")
        handleInitTree().then(() => {
          alert("구역 등록을 완료했습니다.");
          generateList(gData);
          clickSearchTree();
          setNodeLv2Btn(true);
        });
      else if (resp.data["result"] === "duplicate")
        alert("중복되는 구역코드가 존재합니다. 잠시 후 다시 시도해주세요.")
      else
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    });

  // 구역 수정 이벤트
  const handleClickUpdateItem = data => updateAreaItem(data).then(resp => {
    if (resp.data["result"] === "duplicate") {
      alert("중복되는 구역코드가 존재합니다. 잠시 후 다시 시도해주세요.");
    } else if (resp.data["result"] === "success") {
      handleInitTree().then(() => {
        alert("구역 수정을 완료했습니다.");
        generateList(gData);
        clickSearchTree();
      });
    } else {
      alert("구역 수정에 오류가 발생했습니다.");
      return false;
    }
  });

  return (
    <CRow>
      <CCol md={5}>
        <CCard>
          <CCardHeader>
            <CCol md={"12"} xl={"12"} className={"pl-0 pr-0"}>
              <div className={"d-flex align-item-center"}>
                <div className={"mr-auto"}>
                  <h5 className={"mb-0 ml-0"}>전체 시장 목록</h5>
                </div>
                <div>
                  <button className={"btn btn-danger float-right mt-0 ml-2"} disabled={nodeLv2Btn} onClick={deleteNode}>삭제</button>
                  <button className={"btn btn-custom float-right mt-0 ml-2"} id={"lv2Node"} disabled={nodeLv2Btn}
                          onClick={e => handleClickRegisterItem(e.target.id, nodeUpcode, nodeLevel)}>하위 레벨 등록</button>
                  <button className={"btn btn-custom float-right mt-0"} id={"lv1Node"}
                          onClick={e => handleClickRegisterItem(e.target.id, '0', 1)}>상위 레벨 등록</button>
                </div>
              </div>
            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <CCol className={"pl-0"}>
              <CCol sm={"4"} className={"float-left pl-0"}>
                <CInput placeholder={"검색어 입력"} onChange={e => setInputSearchValue(e.target.value) }
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

      <AreaUpdateMgr areaContent={areaContent} nodeLv2Btn={nodeLv2Btn} handleClickUpdateItem={handleClickUpdateItem} />
    </CRow>
  );
};

export default AreaMgr;
