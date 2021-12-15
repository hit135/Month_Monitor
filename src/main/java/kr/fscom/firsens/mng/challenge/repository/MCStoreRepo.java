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
public interface MCStoreRepo {

    List<HashMap<String, Object>> LIST_MCST_STORE_INFO(Map<String, Object> param) throws Exception;          // 상점 정보
    List<HashMap<String, Object>> LIST_MCST_SENSOR_EVT_CNT(Map<String, Object> param) throws Exception;      // 상점 로그 정보

    HashMap<String, Object> SELECT_MCST_STORE_INFO(Map<String, Object> param) throws Exception;              // 상점 기본 정보
    List<HashMap<String, Object>> LIST_MCST_SENSOR_STATE(Map<String, Object> param) throws Exception;        // 상점 내 센서 상태 목록

    HashMap<String, Object> SELECT_MCST_EVENT_TABLE_INFO(Map<String, Object> param) throws Exception;        // LOG 테이블 질의
    List<HashMap<String, Object>> LIST_MCST_STORE_SENSOR_DATA(Map<String, Object> param) throws Exception;   // 센서 데이터 (수신시간, 조회기간 내 측정 데이터 평균치)
    List<HashMap<String, Object>> LIST_MCST_DATA_LOG(Map<String, Object> param) throws Exception;            // 센서 데이터 및 경보 목록
    float SELECT_MCST_SENSOR_USEKWH_MONTH(Map<String, Object> param) throws Exception;                       // 센서 사용전력량

    int CNT_DATA_LOG_TOTAL(Map<String, Object> param) throws Exception;                                      // 센서 데이터 및 모든 이벤트 목록 갯수
    List<HashMap<String, Object>> LIST_MCST_DATA_LOG_TOTAL(Map<String, Object> param) throws Exception;      // 센서 데이터 및 모든 이벤트 목록
    int CNT_DATA_LOG_EVENT(Map<String, Object> param) throws Exception;                                      // 센서 데이터 및 경보 목록 갯수
    List<HashMap<String, Object>> LIST_MCST_DATA_LOG_EVENT(Map<String, Object> param) throws Exception;      // 센서 데이터 및 경보 목록

    List<HashMap<String, Object>> LIST_MCST_LOG_3DAYS_STAT(Map<String, Object> param) throws Exception;      // 3일간 센서 경보 발생 추이 조회
    List<HashMap<String, Object>> LIST_MCST_LOG_WEEK_STAT(Map<String, Object> param) throws Exception;       // 주간 센서 경보 발생 추이 조회

    void INSERT_MCST_SENSOR_CHECK(Map<String, Object> param) throws Exception;                               // 점검 등록
    void UPDATE_MCST_SENSOR_CHECK(Map<String, Object> param) throws Exception;                               // 점검 갱신

}
