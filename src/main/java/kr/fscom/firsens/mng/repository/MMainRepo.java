package kr.fscom.firsens.mng.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 설명
 *
 * @author : jjm
 * @version 1.0
 * @FileName : MMainRepo
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-06   jjm       최초 생성
 *
 * </pre>
 * @since : 2021-07-06
 */
@Mapper
@Repository
public interface MMainRepo {
    List<HashMap<String, Object>> SELECT_SENSOR_COUNT(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_AREA_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_SENSOR_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_AREA_SENSOR_COUNT(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_AREA_STORE_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_AREA_SENSOR_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_STORE_SEARCH(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_CHECK_SENSOR_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_MAIN_AREA_DATA_CHART(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_MAIN_AREA_LOG_CHART(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_MAIN_AREA_DATA_CHART_WEEK(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_MAIN_AREA_LOG_CHART_WEEK(Map<String, Object> param) throws Exception;
}