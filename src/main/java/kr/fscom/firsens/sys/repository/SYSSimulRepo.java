package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSSimulRepo {

    List<HashMap<String, Object>> LIST_SYS_SIMULRAREA() throws Exception;
    int CNT_SYS_SENSOR_LOG(HashMap<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_SENSOR_LOG(HashMap<String, Object> param) throws Exception;
    int CNT_SYS_STORE(HashMap<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_STORE(HashMap<String, Object> param) throws Exception;
    HashMap<String, Object> SELECT_SYS_PREVIEW_URGENT_ISSUE(HashMap<String, Object> param) throws Exception;
    HashMap<String, Object> SELECT_SYS_PREVIEW_NORMAL_ELEC_ISSUE(HashMap<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_PREVIEW_NORMAL_KWH_ISSUE(HashMap<String, Object> param) throws Exception;

}
