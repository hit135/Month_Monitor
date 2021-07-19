package kr.fscom.firsens.sys.domain;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

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
public class SYSMemDomain {
    @JsonProperty("rowNum")         private String rowNum;
    @JsonProperty("userId")         private String userId = "";             /* 사용자 ID */
    @JsonProperty("userIdKey")      private String userIdKey = "";          /* 사용자 ID 키값용 */
    @JsonProperty("memPwd")         private String memPwd = "";             /* 비밀번호 */
    @JsonProperty("memName")        private String memName = "";            /* 사용자 이름*/
    @JsonProperty("memEmail")       private String memEmail = "";           /* 사용자 이메일 */
    @JsonProperty("memTel")         private String memTel = "";             /* 전화번호 */
    @JsonProperty("memMobile")      private String memMobile = "";          /* 휴대폰번호 */
    @JsonProperty("grpCode")        private String grpCode = "";            /* 지역코드 */
    @JsonProperty("areaCode")       private String areaCode = "";           /* 구역코드 */
    @JsonProperty("strCode")        private String strCode = "";            /* 상점코드 */
    @JsonProperty("grpName")        private String grpName = "";            /* 지역명 */
    @JsonProperty("areaName")       private String areaName = "";           /* 구역명 */
    @JsonProperty("strName")        private String strName = "";            /* 상점명 */
    @JsonProperty("memLevel")       private int memLevel = -1;              /* 권한레벨  0 : 전체관리자, 1 : 시스템 관리자, 3 : 시장관리자, 7 : 상점이용자 */
    @JsonProperty("memRcvSms")      private String memRcvSms = "Y";         /* SMS수신여부 */
    @JsonProperty("memRcvPush")     private String memRcvPush = "N";        /* PUSH수신여부 */
    @JsonProperty("regDate")        private String regDate = "";            /* 등록일시 */
    @JsonProperty("memRsntDate")    private String memRsntDate = "";        /* 최근접속일시 */
    @JsonProperty("memIsLeave")     private String memIsLeave = "N";        /* 탈퇴여부 */
    @JsonProperty("useYn")          private String useYn = "Y";             /* 사용여부 */
//    @JsonProperty("delYn")          private String delYn = "N";             /* 삭제여부 */
    @JsonProperty("memMemo")        private String memMemo = "";            /* 메모 */
    @JsonProperty("memToken")       private String memToken = "";           /* FIREBASE token */
    @JsonProperty("searchSelect")   private int searchSelect = 0;           /* 검색조건선택 */
    @JsonProperty("loginFailCnt")   private int loginFailCnt = 0;           /* 로그인 실패 푓수 */
    @JsonProperty("pwChange")       private String pwChange = "";           /* 최초 로그인 비밀번호 변경 여부 */
    @JsonProperty("groupUse")       private String groupUse = "";           /* 구역사용여부 (기존:그룹 사용 여부) */
    @JsonProperty("arrStrCode")     private String[] arrStrCode = null;     // 그룹코드배열
    @JsonProperty("authCode")       private String authCode = null;         // 권한 코드
    @JsonProperty("strCnt")         private int strCnt = 0;                 // 소유한 상점 수

    private List<HashMap<String, String>> storeList;

    private int page;
    private int strPage;
    private int sizePerPage;
    private int sizePerStrPage;
    private String searchWrd = "";
    private String disconYn = "";
}
