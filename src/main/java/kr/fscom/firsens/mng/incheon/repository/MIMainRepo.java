package kr.fscom.firsens.mng.incheon.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MIMainRepo {

    List<HashMap<String, Object>> LIST_MIM_TODAY_TOTAL(Map<String, Object> param) throws Exception;                  // 종합 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MIM_TODAY_GU_AREA(Map<String, Object> param) throws Exception;                // 구별, 시장별 현황 (상점, 센서, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MIM_TODAY_CHK_SNSR(Map<String, Object> param) throws Exception;               // 점검내역 목록
    List<HashMap<String, Object>> LIST_MIM_TODAY_ABNOMAL_SNSR(Map<String, Object> param) throws Exception;           // 상태이상 센서 목록

    // List<HashMap<String, Object>> LIST_MIM_TODAY_AREA(Map<String, Object> param) throws Exception;                // 시장 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MIM_AREA_DATA_CHART(Map<String, Object> param) throws Exception;              // 시장별 어제/오늘 데이터 추이
    List<HashMap<String, Object>> LIST_MIM_AREA_LOG_CHART(Map<String, Object> param) throws Exception;               // 시장별 어제/오늘 경보 발생 추이

    List<HashMap<String, Object>> LIST_MIM_CURR_SNSR_STATE(Map<String, Object> param) throws Exception;              // 분전반 현황
    List<HashMap<String, Object>> LIST_MIM_CURR_SNSR_RST_DATA(Map<String, Object> param) throws Exception;           // 분전반 심상별 최근 데이터
    List<HashMap<String, Object>> LIST_MIM_CURR_SNSR_DATA(Map<String, Object> param) throws Exception;               // 분전반 분기별 최근 데이터

}
