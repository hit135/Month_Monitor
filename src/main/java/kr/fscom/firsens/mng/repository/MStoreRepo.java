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
 * @FileName : MStoreRepo
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-07   jjm       최초 생성
 *
 * </pre>
 * @since : 2021-07-07
 */
@Mapper
@Repository
public interface MStoreRepo {
    HashMap<String, Object> SELECT_EVENT_TABLE_INFO(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_STORE_INFO(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_LIST_STORE_SENSOR(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_STORE_SENSOR_DATA(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_LIST_SENSOR(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_STORE_IMG(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_DATA_LOG_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_LOG_WEEK_STAT(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_SENSOR_USEKWH_MONTH(Map<String, Object> param) throws Exception;
}
