package kr.fscom.firsens.mng.challenge.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MCToolRepo {
    List<HashMap<String, Object>> LIST_DATA_YEAR(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_DATA_MONTH(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_DATA_DATE(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> LIST_DATA_SENSOR(Map<String, Object> param) throws Exception;
}