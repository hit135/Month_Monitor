import React, {useEffect, useState} from 'react'
import {getData} from "../../agent/area";
function AreaMgr() {
  const columns = [
    { dataField: 'rowNum',     text: '번호',     headerStyle: {textAlign: 'center', width: '10%', height: '35px'} },
    { dataField: 'strCode',    text: '상점코드', headerStyle: {textAlign: 'center', width: '30%'} },
    { dataField: 'strName',    text: '상점명',   headerStyle: {textAlign: 'center'} },
  ];

  const [repo, setRepo] = useState([]);
  useEffect(() => {
    getData().then(function(data){
        setRepo(data["data"].str)
      }
    );

  }, []);
  return (
    <>

    </>
  )
}

export default AreaMgr
