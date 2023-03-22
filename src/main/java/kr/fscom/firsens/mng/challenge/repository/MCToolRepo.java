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
    // LOG 테이블 질의

    // TAGGING
    void TAG_INSERT_TAGGING_DATA_SAVE(Map<String, Object> param) throws Exception;
    HashMap<String, Object> TAG_SELECT_F_SENSOR_DATA_INFO(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> TAG_SELECT_LIST_DATA(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> TAG_LIST_STORE_SENSOR_DATA(Map<String, Object> param) throws Exception;

    // ANALYSIS
    List<HashMap<String, Object>> ANALYSIS_LIST_SNSR_EVT_CHART(Map<String, Object> param) throws Exception;


}