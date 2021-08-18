package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSInsprRepo {

    List<HashMap<String, Object>> LIST_SYS_INSPRAREA() throws Exception;
    List<HashMap<String, Object>> LIST_SYS_INSPECTORS(HashMap<String, Object> map) throws Exception;
    int CNT_SYS_INSPECTORS(HashMap<String, Object> map) throws Exception;
    int CNT_SYS_DUPCHK_INSPID(HashMap<String, Object> map) throws Exception;
    int INSERT_SYS_INSPECTOR(HashMap<String, Object> map) throws Exception;
    HashMap<String, Object> SELECT_SYS_INSPECTOR(String param) throws Exception;
    int UPDATE_SYS_INSPECTOR(HashMap<String, Object> map) throws Exception;

}
