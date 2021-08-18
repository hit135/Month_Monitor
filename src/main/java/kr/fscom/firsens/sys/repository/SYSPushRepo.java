package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSPushRepo {

    int CNT_SYS_PUSH(HashMap<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_PUSH(HashMap<String, Object> param) throws Exception;

    int CNT_SYS_SMS(HashMap<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_SMS(HashMap<String, Object> param) throws Exception;

}
