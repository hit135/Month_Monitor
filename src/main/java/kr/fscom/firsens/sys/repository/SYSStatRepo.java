package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSStatRepo {
    List<HashMap<String, Object>> SELECT_TYPE_GUCODE() throws Exception;
    List<HashMap<String, Object>> SELECT_TYPE_AREACODE() throws Exception;

    List<HashMap<String, Object>> SELECT_SYS_STAT_GU_INFO_STAT(String guCode) throws Exception;
    HashMap<String, Object> SELECT_SYS_STAT_AREA_INFO_STAT(String areaCode) throws Exception;

    HashMap<String, Object> SELECT_SYS_STAT_STR_INFO(HashMap<String, Object> map) throws Exception;
    HashMap<String, Object> SELECT_SYS_STAT_SNSR_INFO(HashMap<String, Object> map) throws Exception;

    List<HashMap<String, Object>> LIST_SYS_STAT_AREA_HOURLY_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_STAT_AREA_DAYOFWEEK_STAT(HashMap<String, Object> map) throws Exception;
    HashMap<String, Object> SELECT_SYS_STAT_AREA_KWHIGO_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_STAT_AREA_MONTHLY_STAT(HashMap<String, Object> map) throws Exception;

    List<HashMap<String, Object>> LIST_SYS_STAT_LEVEL_AREA_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_STAT_STR_EVENT_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_SYS_STAT_STR_KWH_STAT(HashMap<String, Object> map) throws Exception;

}
