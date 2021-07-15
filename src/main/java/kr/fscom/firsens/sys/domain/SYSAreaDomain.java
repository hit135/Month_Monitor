package kr.fscom.firsens.sys.domain;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Class Name : SYSAreaDomain.java
 * @Description : 구역관리
 * @Modification Information
 *
 *   수정일         수정자      수정내용
 *   -----------    --------    -------------------
 *   2021.07.15.    zerojun      최초생성
 *
 * @author 김영준
 * @since 2021. 07. 14.
 * @version  0.1
 * @see
 *
 */

@Data
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
        setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility= JsonAutoDetect.Visibility.NONE)
public class SYSAreaDomain {
    @JsonProperty("areaCode")       private String areaCode = "";                   // 구역코드
    @JsonProperty("areaName")       private String areaName = "";                   // 구역명
    @JsonProperty("areaOrder")      private String areaOrder = "";                  // 구역 순서
    @JsonProperty("areaManager")     private String areaManager = "";                // 구역 담당자
    @JsonProperty("areaTel")         private String areaTel = "";                    // 구역 비상연락
    @JsonProperty("userId")         private String userId = "";                     // 담당자 아이디
    @JsonProperty("useYn")          private String useYn = "";                      // 사용 유무
    @JsonProperty("delYn")          private String delYn = "N";                       // 삭제여부
    @JsonProperty("regDate")        private String regDate = "";                    // 등록일시
    @JsonProperty("storeCnt")       private int storeCnt = 0;                       // 소속 상점 수

    private int page;
    private int sizePerPage;
    private String searchWrd = "";
    private String isUse = "";
}
