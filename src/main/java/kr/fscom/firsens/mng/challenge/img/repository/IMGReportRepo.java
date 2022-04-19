package kr.fscom.firsens.mng.challenge.img.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface IMGReportRepo {

    HashMap<String, Object> SELECT_IMG_REPORT_AREA_INFO_STAT(String areaCode) throws Exception;

    List<HashMap<String, Object>> LIST_IMG_REPORT_AREA_HOURLY_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_IMG_REPORT_AREA_DAYOFWEEK_STAT(HashMap<String, Object> map) throws Exception;
    HashMap<String, Object> SELECT_IMG_REPORT_AREA_KWHIGO_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_IMG_REPORT_AREA_MONTHLY_STAT(HashMap<String, Object> map) throws Exception;

    List<HashMap<String, Object>> LIST_IMG_REPORT_LEVEL_AREA_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_IMG_REPORT_STR_EVENT_STAT(HashMap<String, Object> map) throws Exception;
    List<HashMap<String, Object>> LIST_IMG_REPORT_STR_KWH_STAT(HashMap<String, Object> map) throws Exception;

}
