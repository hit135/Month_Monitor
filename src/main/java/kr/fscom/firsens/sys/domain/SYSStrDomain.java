package kr.fscom.firsens.sys.domain;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.nio.file.Files;
import java.util.*;

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
public class SYSStrDomain implements Serializable {

    @JsonProperty("rowNum")         private int rowNum = 0;                                     // 순번
    @JsonProperty("strCode")        private String strCode = "";                                // 상점 코드
    @JsonProperty("modifyStrCode")  private String modifyStrCode = "";                          // 수정 상점 코드
    @JsonProperty("strName")        private String strName = "";                                // 상점명
    @JsonProperty("strAddr")        private String strAddr = "";                                // 상점 주소
    @JsonProperty("strOrder")       private int strOrder = 0;                                   // 상점 순서
    @JsonProperty("strOwnName")     private String strOwnName = "";                             // 상점주
    @JsonProperty("strTel")         private String strTel = "";                                 // 상점 전화
    @JsonProperty("strOwnTel")      private String strOwnTel = "";                              // 상점주 전화
    @JsonProperty("userId")         private String userId = "";                                 // 상점주 아이디
    @JsonProperty("strPosLat")      private Double strPosLat;                                   // 상점 좌표 위도
    @JsonProperty("strPosLon")      private Double strPosLon;                                   // 상점 좌표 경도
    @JsonProperty("regDate")        private String RegDate = "";                                // 상점 등록 일자
    @JsonProperty("useYn")          private String useYn = "";                                  // 사용 여부
    @JsonProperty("delYn")          private String delYn = "N";                                 // 삭제여부
    @JsonProperty("areaCode")       private String areaCode = "";                               // 구역 코드
    @JsonProperty("levelAreaCode")  private String levelAreaCode = "";                          // 자식 구역 코드
    @JsonProperty("areaName")       private String areaName = "";                               // 구역명
    @JsonProperty("grpCode")        private String grpCode = "";                                // 지역 코드
    @JsonProperty("grpName")        private String grpName = "";                                // 지역명
    @JsonProperty("strCodeKey")     private String strCodeKey = "";                             // 상점 코드 KEY
    @JsonProperty("files")          private MultipartFile[] files;                              // 첨부파일 리스트
    @JsonProperty("deleteFileList") private String[] deleteFileList;                    // 첨부파일 삭제 리스트
    @JsonProperty("snsrCnt")        private int snsrCnt;                                        // 설치 센서 카운트
    @JsonProperty("snsrFireCnt")    private int snsrFireCnt;                                    // 설치 화재 수신기 카운트

    private int generateKey = 0;        // 상점코드 생성을 위한 순번
    private String keyFied = "";        // 구역코드 생성을 위한 조회 ID
    private int page;
    private int sizePerPage;
    private String searchWrd = "";
    private String isUse = "";

}