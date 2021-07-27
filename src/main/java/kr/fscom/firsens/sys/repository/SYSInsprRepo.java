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

}
