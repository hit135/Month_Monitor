package kr.fscom.firsens.sys.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Class Name : SYSFileDomain.java
 * @Description : 파일관리
 * @Modification Information
 *
 *   수정일         수정자      수정내용
 *   -----------    --------    -------------------
 *   2021.08.04.    zerojun      최초생성
 *
 * @author 김영준
 * @since 2021. 08. 04.
 * @version  0.1
 * @see
 *
 */

@Data
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
        setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility= JsonAutoDetect.Visibility.NONE)
public class SYSFileDomain {

    @JsonProperty("seq")           private int seq;                               // 이미지 SEQ
    @JsonProperty("strCode")       private String strCode;                        // 상점코드
    @JsonProperty("areaCode")      private String areaCode;                       // 구역코드
    @JsonProperty("imgName")       private String imgName;                        // 이미지 저장명
    @JsonProperty("imgPath")       private String imgPath;                        // 이미지 경로
    @JsonProperty("imgSize")       private int imgSize;                          // 이미지 용량
    @JsonProperty("imgNum")        private int imgNum;                            // 이미지 순번
    @JsonProperty("oriName")       private String oriName;                        // 이미지 원본명
    @JsonProperty("regDate")       private String regDate;                        // 이미지 업로드 일자

}
