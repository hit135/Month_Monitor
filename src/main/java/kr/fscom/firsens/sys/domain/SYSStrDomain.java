package kr.fscom.firsens.sys.domain;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @Class Name : SYSStrDomain.java
 * @Description : 상점관리
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
public class SYSStrDomain {

    @JsonProperty("rowNum")         private int rowNum = 0;                         // 순번
    @JsonProperty("strCode")        private String strCode = "";                    // 상점 코드
    @JsonProperty("strName")        private String strName = "";                    // 상점명
    @JsonProperty("strAddr")        private String strAddr = "";                    // 상점 주소
    @JsonProperty("strOrder")       private int strOrder = 0;                       // 상점 순서
    @JsonProperty("strOwnName")     private String strOwnName = "";                 // 상점주
    @JsonProperty("strTel")         private String strTel = "";                     // 상점 전화
    @JsonProperty("strOwnTel")      private String strOwnTel = "";                  // 상점주 전화
    @JsonProperty("userId")         private String userId = "";                     // 상점주 아이디
    @JsonProperty("strPosLat")      private String strPosLat = "";                  // 상점 좌표 위도
    @JsonProperty("strPosLon")      private String strPosLon = "";                  // 상점 좌표 경도
    @JsonProperty("regDate")        private String RegDate = "";                    // 상점 등록 일자
    @JsonProperty("useYn")          private String useYn = "";                      // 사용 여부
    @JsonProperty("delYn")          private String delYn = "N";                       // 삭제여부
    @JsonProperty("areaCode")       private String areaCode = "";                   // 구역 코드
    @JsonProperty("areaName")       private String areaName = "";                   // 구역명
    @JsonProperty("grpCode")        private String grpCode = "";                    // 지역 코드
    @JsonProperty("grpName")        private String grpName = "";                    // 지역명
    @JsonProperty("strCodeKey")     private String strCodeKey = "";                 // 상점 코드 KEY
    @JsonProperty("imgFile1")       private String[] imgFile1;                      // 설치사진 File1
    @JsonProperty("imgFile2")       private String[] imgFile2;                      // 설치사진 File2
    @JsonProperty("imgFile3")       private String[] imgFile3;                      // 설치사진 File3
    @JsonProperty("imgFile4")       private String[] imgFile4;                      // 설치사진 File4
    @JsonProperty("snsrCnt")        private int snsrCnt;                            // 설치 센서 카운트
    @JsonProperty("snsrFireCnt")    private int snsrFireCnt;                        // 설치 화재 수신기 카운트

    private int page;
    private int sizePerPage;
    private String searchWrd = "";
    private String isUse = "";
}
