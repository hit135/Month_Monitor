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
 * @FileName : MSyncRepo
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-20   jjm       최초 생성
 *
 * </pre>
 * @since : 2021-07-20
 */
@Mapper
@Repository
public interface MSyncRepo {
    List<HashMap<String, Object>> SELECT_DATA_CNT_LIST(Map<String, Object> param) throws Exception;
    List<HashMap<String, Object>> SELECT_SENSOR_DATA_CNT_LIST(Map<String, Object> param) throws Exception;
    void INSERT_SENSOR_CHECK(Map<String, Object> param) throws Exception;
}
