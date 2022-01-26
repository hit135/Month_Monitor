package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Mapper
@Repository
public interface SYSSimulRepo {

    int SELECT_SYS_MONTHLY_EVT_GRADE(HashMap<String, Object> param) throws Exception;
    HashMap<String, Object> SELECT_SYS_MONTHLY_RPT(HashMap<String, Object> param) throws Exception;
    int INSERT_SYS_PUSH(HashMap<String, Object> param) throws Exception;

}
