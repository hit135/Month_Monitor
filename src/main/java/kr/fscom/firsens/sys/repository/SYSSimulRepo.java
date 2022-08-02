package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSSimulRepo {

    /*
    int SELECT_SYS_MONTHLY_EVT_GRADE(HashMap<String, Object> param) throws Exception;
    HashMap<String, Object> SELECT_SYS_MONTHLY_RPT(HashMap<String, Object> param) throws Exception;

    List<HashMap<String, Object>> LIST_SYS_AREA_PUSH() throws Exception;
    */
    List<HashMap<String, Object>> LIST_SYS_RPT_PUSH() throws Exception;
    List<HashMap<String, Object>> LIST_SYS_IGREVT_PUSH() throws Exception;          // 상점주

    List<HashMap<String, Object>> LIST_SYS_IGREVT_DAILY_PUSH() throws Exception;    // 상인회 일별
    List<HashMap<String, Object>> LIST_SYS_IGREVT_WEEK_PUSH() throws Exception;     // 상인회 주별

    int INSERT_SYS_PUSH(HashMap<String, Object> param) throws Exception;

}
