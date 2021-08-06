package kr.fscom.firsens.sys.domain;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

/**
 * @Class Name : SYSSnsrDomain.java
 * @Description : 센서관리
 * @Modification Information
 *
 *   수정일         수정자      수정내용
 *   -----------    --------    -------------------
 *   2021.07.15.    zerojun      최초생성
 *
 * @author 김영준
 * @since 2021. 08. 05.
 * @version  0.1
 * @see
 *
 */

@Data
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
        setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility= JsonAutoDetect.Visibility.NONE)
public class SYSSnsrDomain {
    @JsonProperty("rowNum")          private int rowNum = 0;                     // 순번
    @JsonProperty("snsrSeq")         private String snsrSeq = "";                // 센서 SEQ
    @JsonProperty("snsrId")          private String snsrId = "";                 // 센서 ID
    @JsonProperty("strCode")         private String strCode = "";                // 상점 코드
    @JsonProperty("strName")         private String strName = "";                // 상점명
    @JsonProperty("snsrMacAddr")     private String snsrMacAddr = "";            // 맥어드레스
    @JsonProperty("snsrNick")        private String snsrNick = "";               // 닉네임
    @JsonProperty("regDate")         private String regDate = "";                // 등록일시
    @JsonProperty("updDate")         private String updDate = "";                // 수정일시
    @JsonProperty("snsrAddr")        private String snsrAddr = "";               // 설치주소
    @JsonProperty("snsrMGps")        private String snsrMGps = "";               // GPS좌표(위도, 경도)
    @JsonProperty("snsrMGpsLat")     private String snsrMGpsLat = "";            // GPS좌표(위도)
    @JsonProperty("snsrMGpsLon")     private String snsrMGpsLon = "";            // GPS좌표(경도)
    @JsonProperty("snsrMPos")        private String snsrMPos = "";               // 0 : 주소 사용, 1 : GPS좌표 사용
    @JsonProperty("snsrMNuse")       private int snsrMNuse = 0;                  // 0 : 닉네임 사용 안 함, 1 : 닉네임 사용
    @JsonProperty("snsrMInit")       private int snsrMInit = 0;                  // 0 : 초기상태, 1 : 데이터 수신
    @JsonProperty("snsrSTime")       private String snsrSTime = "";              // 설정 데이터 수신 년월일-시분초
    @JsonProperty("sVol")            private int sVol = 0;                       // 차단기 용량
    @JsonProperty("sOc1V1")          private int sOc1V1 = 0;                     // 1차 전류 경보 임계값 #1
    @JsonProperty("sOc1V2")          private int sOc1V2 = 0;                     // 1차 전류 경보 임계값 #2
    @JsonProperty("sOc1T1")          private int sOc1T1 = 0;                     // 1차 전류 경보 임계시간 #1
    @JsonProperty("sOc1T2")          private int sOc1T2 = 0;                     // 1차 전류 경보 임계시간 #2
    @JsonProperty("sOc2V1")          private int sOc2V1 = 0;                     // 2차 전류 경보 임계값 #1
    @JsonProperty("sOc2V2")          private int sOc2V2 = 0;                     // 2차 전류 경보 임계값 #2
    @JsonProperty("sOc2T1")          private int sOc2T1 = 0;                     // 2차 전류 경보 임계시간 #1
    @JsonProperty("sOc2T2")          private int sOc2T2 = 0;                     // 2차 전류 경보 임계시간 #2
    @JsonProperty("sIgo1V")          private int sIgo1V = 0;                     // 1차 igo(누전 전체) 임계값
    @JsonProperty("sIgo2V")          private int sIgo2V = 0;                     // 2차 igo(누전 전체) 임계값
    @JsonProperty("sIgo1T")          private int sIgo1T = 0;                     // 1차 igo(누전 전체) 임계시간
    @JsonProperty("sIgo2T")          private int sIgo2T = 0;                     // 2차 igo(누전 전체) 임계시간
    @JsonProperty("sIgr1V")          private int sIgr1V = 0;                     // 1차 igr(누전 저항성) 임계값
    @JsonProperty("sIgr2V")          private int sIgr2V = 0;                     // 1차 igr(누전 저항성) 임계시간
    @JsonProperty("sIgr1T")          private int sIgr1T = 0;                     // 2차 igr(누전 저항성) 임계값
    @JsonProperty("sIgr2T")          private int sIgr2T = 0;                     // 2차 igr(누전 저항성) 임계시간
    @JsonProperty("sSec")            private int sSec = 0;                       // 전송주기(초)
    @JsonProperty("sVer")            private int sVer = 0;                       // WRPS버전
    @JsonProperty("sType")           private int sType = 0;                      // WRPS타입(LoRa, WiFi, none)
    @JsonProperty("upFlag")          private int upFlag = 0;                     // 데이터 전송(Uploading) Flag(0:요청중, 1:완료)
    @JsonProperty("downFlag")        private int downFlag = 0;                   // 데이터 수신(Downloading) Flag(0:요청중, 1:완료)
    @JsonProperty("eOcCopy")         private int eOcCopy = 0;                    // 과전류 이벤트 플래그
    @JsonProperty("eOcNot")          private int eOcNot = 0;                     // 과전류 이벤트 해제 플래그
    @JsonProperty("eOcCount")        private int eOcCount = 0;                   // 과전류 발생 카운트
    @JsonProperty("eOcLog")          private int eOcLog = 0;                     // 과전류 발생 전체 카운트
    @JsonProperty("eLcCopy")         private int eLcCopy = 0;                    // 누전 이벤트 플래그
    @JsonProperty("eLcNot")          private int eLcNot = 0;                     // 누전 이벤트 해제 플래그
    @JsonProperty("eLcCount")        private int eLcCount = 0;                   // 누전 발생 카운트
    @JsonProperty("eLcLog")          private int eLcLog = 0;                     // 누전 발생 전체 카운트
    @JsonProperty("eTime")           private String eTime = "";
    @JsonProperty("rMenergy")        private int rMenergy = 0;                   // 해당월의 마지막 전력량
    @JsonProperty("rTime")           private String rTime = "";                  // 수신시간 년월일-시분초
    @JsonProperty("rEnergy")         private int rEnergy = 0;                    // 전력량
    @JsonProperty("rPower")          private int rPower = 0;                     // 전력
    @JsonProperty("rVoltage")        private int rVoltage = 0;                   // 전압
    @JsonProperty("rHz")             private int rHz = 0;                        // 주파수
    @JsonProperty("rPf")             private int rPf = 0;                        // PF
    @JsonProperty("rCurrent")        private int rCurrent = 0;                   // 전류
    @JsonProperty("rIgo")            private int rIgo = 0;                       // igo
    @JsonProperty("rIgr")            private int rIgr = 0;                       // igr
    @JsonProperty("rIgc")            private int rIgc = 0;                       // igc
    @JsonProperty("rReg")            private int rReg = 0;                       // 절연저항
    @JsonProperty("rTick")           private int rTick = 0;                      // 틱타임
    @JsonProperty("rEventOc")        private int rEventOc = 0;                   // 전류 경보 플래그
    @JsonProperty("rEventOl")        private int rEventOl = 0;                   // 누전 경보 플래그
    @JsonProperty("rRev1")           private int rRev1 = 0;                      // 예비#1
    @JsonProperty("rRev2")           private int rRev2 = 0;                      // 예비#2
    @JsonProperty("rRssi")           private int rRssi = 0;                      // 수신감도
    @JsonProperty("snsrIdKey")       private String snsrIdKey = "";              // 센서 ID KEY
    @JsonProperty("channel")         private int channel = 1;                    // 센서 채널
    @JsonProperty("delYn")           private char delYn = 'N';                   // 삭제여부

    @JsonProperty("areaCode")        private String areaCode = "";               // 구역코드
    @JsonProperty("levelAreaCode")   private String levelAreaCode = "";          // 하위구역코드

    private int generateKey = 0;        // 센서코드 생성을 위한 순번
    private String keyFied = "";        // 센서코드 생성을 위한 조회 ID
    private int page;
    private int strPage;
    private int sizePerPage;
    private int sizePerStrPage;
    private String searchWrd = "";
}
