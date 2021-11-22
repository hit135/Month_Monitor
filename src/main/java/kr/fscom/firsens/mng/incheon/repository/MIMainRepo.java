package kr.fscom.firsens.mng.incheon.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MIMainRepo {

    List<HashMap<String, Object>> LIST_MIM_SENSOR_CNT(Map<String, Object> param) throws Exception;                   // 종합 현황 (전체, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MIM_AREA(Map<String, Object> param) throws Exception;                         // 시장별 센서 현황 (상점, 센서, 경고, 주의, 끊김)
    List<HashMap<String, Object>> LIST_MIM_SENSOR(Map<String, Object> param) throws Exception;                       // 상태이상 센서 목록
    List<HashMap<String, Object>> LIST_MIM_AREA_SENSOR_CNT(Map<String, Object> param) throws Exception;              // 시장 현황 (전체, 경고, 주의, 끊김)

}
