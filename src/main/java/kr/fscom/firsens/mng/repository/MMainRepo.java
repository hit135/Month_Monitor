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

    List<HashMap<String, Object>> LIST_MM_SENSOR_CNT(Map<String, Object> param) throws Exception;                   // 종합 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MM_AREA(Map<String, Object> param) throws Exception;                         // 구별, 시장별 센서 현황 (상점, 센서, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MM_SENSOR(Map<String, Object> param) throws Exception;                       // 상태이상 센서 목록

    List<HashMap<String, Object>> LIST_MM_AREA_SENSOR_CNT(Map<String, Object> param) throws Exception;              // 시장 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MM_AREA_STORE(Map<String, Object> param) throws Exception;                   // 시장 내 상점 현황 (경고, 주의, 끊김, 센서)
    List<HashMap<String, Object>> LIST_MM_AREA_SENSOR(Map<String, Object> param) throws Exception;                  // 시장 내 센서 현황 (경고, 주의, 끊김, 점검)
    
    List<HashMap<String, Object>> LIST_MM_STORE_SEARCH(Map<String, Object> param) throws Exception;                 // 상점 검색 목록
    List<HashMap<String, Object>> LIST_MM_CHECK_SENSOR(Map<String, Object> param) throws Exception;                 // 점검내역 목록

    List<HashMap<String, Object>> LIST_MM_MAIN_AREA_DATA_CHART(Map<String, Object> param) throws Exception;         // 시장별 어제/오늘 데이터 추이
    List<HashMap<String, Object>> LIST_MM_MAIN_AREA_LOG_CHART(Map<String, Object> param) throws Exception;          // 시장별 어제/오늘 경보 발생 추이
    List<HashMap<String, Object>> LIST_MM_MAIN_AREA_DATA_CHART_WEEK(Map<String, Object> param) throws Exception;    // 시장별 주간 데이터 추이
    List<HashMap<String, Object>> LIST_MM_MAIN_AREA_LOG_CHART_WEEK(Map<String, Object> param) throws Exception;     // 시장별 주간 경보 발생 추이

    List<HashMap<String, Object>> LIST_MM_MAIN_AREA_MAP_SENSOR(Map<String, Object> param) throws Exception;         // 시장 지도 정보

}