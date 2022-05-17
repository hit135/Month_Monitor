package kr.fscom.firsens.mng.challenge.repository;

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
public interface MCMainRepo {

    List<HashMap<String, Object>> LIST_MCM_TODAY_TOTAL_STATE() throws Exception;                                    // 오늘 종합 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MCM_TODAY_GRP_AREA_STATE() throws Exception;                                  // 오늘 구별, 시장별 현황 (상점, 센서, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MCM_CHECK_SENSOR() throws Exception;                                         // 점검내역 목록
    List<HashMap<String, Object>> LIST_MCM_TODAY_ABNORMAL_SENSOR() throws Exception;                                // 오늘 상태이상 센서 목록

    List<HashMap<String, Object>> LIST_MCM_2DAYS_AREA_DATA_CHART(Map<String, Object> param) throws Exception;       // 시장별 어제/오늘 데이터 추이
    List<HashMap<String, Object>> LIST_MCM_2DAYS_AREA_LOG_CHART(Map<String, Object> param) throws Exception;        // 시장별 어제/오늘 경보 발생 추이

    List<HashMap<String, Object>> LIST_MCM_2WEEKS_AREA_DATA_CHART(Map<String, Object> param) throws Exception;      // 시장별 주간 데이터 추이
    List<HashMap<String, Object>> LIST_MCM_2WEEKS_AREA_LOG_CHART(Map<String, Object> param) throws Exception;       // 시장별 주간 경보 발생 추이
    List<HashMap<String, Object>> LIST_MCM_AREA_MAP_SENSOR(Map<String, Object> param) throws Exception;             // 시장 지도 정보

}