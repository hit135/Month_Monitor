package kr.fscom.firsens.mng.challenge.img.repository;

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
public interface IMGMainRepo {
  List<HashMap<String, Object>> LIST_MCI_TODAY_TOTAL_STATE() throws Exception;                                    // 오늘 종합 현황 (전체, 경고, 주의, 끊김)
  List<HashMap<String, Object>> LIST_MCI_TODAY_GRP_AREA_STATE() throws Exception;                                  // 오늘 구별, 시장별 현황 (상점, 센서, 경고, 주의, 끊김)
  List<HashMap<String, Object>> LIST_MCI_CHECK_SENSOR() throws Exception;                                         // 점검내역 목록
  List<HashMap<String, Object>> LIST_MCI_TODAY_ABNORMAL_SENSOR() throws Exception;                                // 오늘 상태이상 센서 목록
  List<HashMap<String, Object>> LIST_MCI_LIST_AREA_BUTTON(Map<String, Object> param) throws Exception;            // 버튼 목록 불러오기
  List<HashMap<String, Object>> LIST_MCI_LIST_IMAGE_AREA(Map<String, Object> param) throws Exception;             // 이미지 Area 목록 불러오기
  List<HashMap<String, Object>> LIST_MCI_GRP_USEKWH(Map<String, Object> param) throws Exception;                  // GROUP 사용전력량 불러오기
  List<HashMap<String, Object>> LIST_MCI_SNSR_USEKWH(Map<String, Object> param) throws Exception;                 // 센서 사용전력량 불러오기
  List<HashMap<String, Object>> LIST_MCI_SNSR_KWH_CHART(Map<String, Object> param) throws Exception;              // 센서 사용전력량 불러오기
  List<HashMap<String, Object>> LIST_MCI_SNSR_EVT_CHART(Map<String, Object> param) throws Exception;              // 센서 이벤트 불러오기

}