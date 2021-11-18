package kr.fscom.firsens.mng.challenge.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface MCDistrictRepo {

    HashMap<String, Object> SELECT_MCD_YESTERDAY_EVENT_COMP_STAT() throws Exception;            // 어제-오늘 이벤트 현황 비교 전기안전현황
    HashMap<String, Object> SELECT_MCD_TODAY_EVENT_STAT() throws Exception;                     // 금일 위험현황 이벤트 실시간 현황
    List<HashMap<String, Object>> LIST_MCD_CURR_GU_MAP_EVENT_STAT() throws Exception;           // 지도 구별 설치 센서수와 이벤트 발생 건수
    List<HashMap<String, Object>> LIST_MCD_MONTHLY_GU_EVENT_COMP_STAT() throws Exception;       // 구별 전월대비 주의 경고 발생 건수
    List<HashMap<String, Object>> LIST_MCD_TODAY_GU_AREA_EVENT_COMP_RANK() throws Exception;    // 구별 시장별 금일 누적 경보 랭크
    List<HashMap<String, Object>> LIST_MCD_TODAY_GU_EVENT() throws Exception;                   // 구별 금일 누적 경보 랭크

    HashMap<String, Object> SELECT_MCD_KWH_STAT() throws Exception;                       // 어제 / 지난주 / 지난달 전기안전현황
    HashMap<String, Object> SELECT_MCD_CURR_KWH_STAT() throws Exception;                  // 전력사용량 실시간 현황
    List<HashMap<String, Object>> LIST_MCD_GU_MAP_KWH_STAT() throws Exception;            // 지도 지역별 주별대비 전력소모량 비교
    List<HashMap<String, Object>> LIST_MCD_GU_MONTH_KWH_STAT() throws Exception;          // 구별 전월대비 전력소모량 비교
    List<HashMap<String, Object>> LIST_MCD_GU_AREA_KWH_STAT() throws Exception;           // 구별 시장별 전력소모량 비교

}
