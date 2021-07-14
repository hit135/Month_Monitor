import React, {useEffect, useState} from 'react'
import {getData} from "../../agent/area";
function AreaMgr() {

  const [repo, setRepo] = useState([]);
  useEffect(() => {
    getData().then(function(data){
        setRepo(data["data"].str)
      }
    );

  }, []);
  return (
    <>
      {repo}
    </>
  )
}

export default AreaMgr
