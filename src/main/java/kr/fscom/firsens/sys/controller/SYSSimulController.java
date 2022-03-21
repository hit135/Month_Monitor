package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSSimulRepo;

import org.apache.commons.codec.binary.Hex;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.ResourceUtils;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

import java.net.HttpURLConnection;
import java.net.URL;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class SYSSimulController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSSimulController.class);
    private final SYSSimulRepo sysSimulRepo;

    @Autowired
    public SYSSimulController(SYSSimulRepo sysSimulRepo) {
        this.sysSimulRepo = sysSimulRepo;
    }

    /*
    @PostMapping("/simulPreview")
    public HashMap<String, Object> listPageSimul(@RequestBody HashMap<String, Object> param) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 시뮬레이션 미리보기 요청 시작");

        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> resultData = new HashMap<>();
        boolean result = false;

        try {
            
            
            result = true;
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 시뮬레이션 미리보기 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @RequestMapping(value = "/sendSimulPush")
    @ResponseBody
    public HashMap<String, Object> sendSimulSpPush(HttpServletRequest req, @RequestBody HashMap<String, Object> param) {
        HashMap<String, Object> prm = new HashMap<>();
        HashMap<String, Object> ret = new HashMap<>();


        try {
            prm.put("strCode", (String) param.get("strCode"));

            LocalDate dt = LocalDate.now().minusDays(1);
            prm.put("rptEndDate", dt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

            dt = dt.minusMonths(1).plusDays(1);
            prm.put("rptStartDate", dt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

            

            
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////

            JSONObject obj = (JSONObject) new JSONParser().parse(
                new InputStreamReader(new FileInputStream(ResourceUtils.getFile("classpath:static/js/json/sms_info.json")), "UTF-8")
            );

            String messageText1 = "";
            JSONArray messageText1Arr = (JSONArray) obj.get("messageText1");
            for (int i = 0; i < messageText1Arr.size(); i++) 
                messageText1 += (String) messageText1Arr.get(i);

            String linkPc = ((String) obj.get("linkPc")).replace("#{strCode}", (String) param.get("strCode"));
            String linkMo = ((String) obj.get("linkMo")).replace("#{strCode}", (String) param.get("strCode"));

            messageText1 = messageText1
                .replace("#{상점명}", "엄마손반찬")
                .replace("#{보고기간년월}", "22년 1월")
                .replace("#{보고기간}", "2021.07.14 ~ 2021.07.28")
                .replace("#{전기위험현황}", "안전한 상태입니다 그래도 전기화재에 주의하십시오.")
                .replace("#{위험순위}", "120 위 / 130 개 상점")
                .replace("#{과전류발생}", "0 회")
                .replace("#{누전발생}", "0 회")
                .replace("#{전력사용순위}", "23 위 / 130 개 상점")
                .replace("#{일별평균전력사용량}", "12 kWh")
                .replace("#{주별전력사용량}", "123 kWh")
                .replace("#{전력사용상태}", "전주대비 전력소비가 많습니다.");

            String dataOutputStream = ((JSONObject) obj.get("dataOutputStream")).toString();
            dataOutputStream = dataOutputStream
                .replace("#{to}", (String) param.get("toinfo"))
                .replace("#{text}", messageText1)
                .replace("#{linkPc}", linkPc)
                .replace("#{linkMo}", linkMo);

            URL url = new URL((String) obj.get("targetUrl"));
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            String salt = UUID.randomUUID().toString().replaceAll("-", "");
            String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            sha256_HMAC.init(new SecretKeySpec(String.valueOf(param.get("apiSecret")).getBytes(StandardCharsets.UTF_8), "HmacSHA256"));

            String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));

            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "HMAC-SHA256 ApiKey=" + (String) obj.get("apiKey") + ", Date=" + date + ", salt=" + salt + ", signature=" + signature);
            con.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            con.setDoOutput(true);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            System.out.println("Parameters : " + dataOutputStream);

            OutputStreamWriter osw = new OutputStreamWriter(wr);
            osw.write(dataOutputStream, 0, dataOutputStream.length());
            osw.close();

            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

            String line;
            StringBuffer response = new StringBuffer();

            while ((line = in.readLine()) != null)
                response.append(line);

            in.close();

            ret.put("result", response.toString());
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            prm.put("snsrseq", req.getParameter("snsrseq"));
            prm.put("pushmsg", dataOutputStream);
            prm.put("userid", (String) obj.get("userid"));
            prm.put("sendresult", responseCode + " " + response.toString());
            prm.put("toinfo", (String) param.get("toinfo"));
            prm.put("frominfo", (String) obj.get("frominfo"));
            prm.put("pushRslt", "Y");

            sysSimulRepo.INSERT_SYS_PUSH(prm);
        } catch (NullPointerException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (NoSuchAlgorithmException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (SQLException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (Exception e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        }

        return ret;
    }*/

    @RequestMapping(value = "/sendAreaPush")
    @ResponseBody
    public void sendAreaPush(HttpServletRequest req) throws Exception {
        try {
            List<HashMap<String, Object>> listArea = new ArrayList<>();
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001052"); put("strName", "정순대"); put("toinfo", "01083471178"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 37.82); put("snsrKwh",605.199); put("snsrKwhRank",14); put("elecGrade", 5); put("elecRank", 5); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001073"); put("strName", "DC마트"); put("toinfo", "01033001449"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 68.23); put("snsrKwh",2183.4); put("snsrKwhRank",1); put("elecGrade", 5); put("elecRank", 29); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001074"); put("strName", "TRY"); put("toinfo", "01074220271"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.11); put("snsrKwh",35.5); put("snsrKwhRank",105); put("elecGrade", 5); put("elecRank", 95); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001075"); put("strName", "가마솥바베큐"); put("toinfo", "01040379631"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 24.36); put("snsrKwh",243.601); put("snsrKwhRank",59); put("elecGrade", 5); put("elecRank", 7); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001076"); put("strName", "가죽수제화"); put("toinfo", "01043389896"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 4.72); put("snsrKwh",80.2); put("snsrKwhRank",95); put("elecGrade", 5); put("elecRank", 79); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001077"); put("strName", "가평식당"); put("toinfo", "01040354258"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 7.58); put("snsrKwh",364); put("snsrKwhRank",39); put("elecGrade", 5); put("elecRank", 98); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001078"); put("strName", "강경젓갈"); put("toinfo", "01066946066"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 11.04); put("snsrKwh",176.7); put("snsrKwhRank",72); put("elecGrade", 5); put("elecRank", 71); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001079"); put("strName", "개성시대"); put("toinfo", "01067506670"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 17.14); put("snsrKwh",274.2); put("snsrKwhRank",51); put("elecGrade", 5); put("elecRank", 50); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001082"); put("strName", "과일나라"); put("toinfo", "01024848725"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 34.69); put("snsrKwh",555.1); put("snsrKwhRank",15); put("elecGrade", 5); put("elecRank", 24); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001083"); put("strName", "구제마켓"); put("toinfo", "01022096570"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.06); put("snsrKwh",145); put("snsrKwhRank",86); put("elecGrade", 5); put("elecRank", 18); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001084"); put("strName", "구제옷장"); put("toinfo", "01065284211"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.39); put("snsrKwh",150.2); put("snsrKwhRank",83); put("elecGrade", 5); put("elecRank", 23); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001085"); put("strName", "금빛통닭"); put("toinfo", "01076540233"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 2.69); put("snsrKwh",86); put("snsrKwhRank",94); put("elecGrade", 4); put("elecRank", 91); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001086"); put("strName", "금산인삼"); put("toinfo", "01066221148"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 15.5); put("snsrKwh",248); put("snsrKwhRank",56); put("elecGrade", 4); put("elecRank", 4); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001088"); put("strName", "남철수산"); put("toinfo", "01055447290"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 5.76); put("snsrKwh",334.1); put("snsrKwhRank",45); put("elecGrade", 5); put("elecRank", 101); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001089"); put("strName", "노인복지센타"); put("toinfo", "01063721145"); put("ig", 63); put("oc", 0); put("snsrKwhAvg", 4.55); put("snsrKwh",50); put("snsrKwhRank",101); put("elecGrade", 5); put("elecRank", 15); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001091"); put("strName", "늘푸른야채"); put("toinfo", "01044087934"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 7.68); put("snsrKwh",245.7); put("snsrKwhRank",58); put("elecGrade", 5); put("elecRank", 39); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001092"); put("strName", "늘푸른축산"); put("toinfo", "01094027934"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 14.29); put("snsrKwh",685.698); put("snsrKwhRank",11); put("elecGrade", 5); put("elecRank", 74); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001093"); put("strName", "다와떡케익"); put("toinfo", "01024323636"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 8.23); put("snsrKwh",395.1); put("snsrKwhRank",31); put("elecGrade", 5); put("elecRank", 55); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001094"); put("strName", "닭이랑삼이랑"); put("toinfo", "01041660909"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 12.83); put("snsrKwh",205.3); put("snsrKwhRank",66); put("elecGrade", 5); put("elecRank", 92); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001095"); put("strName", "당진기름집"); put("toinfo", "01020275634"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 3.7); put("snsrKwh",177.7); put("snsrKwhRank",71); put("elecGrade", 5); put("elecRank", 103); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001096"); put("strName", "대락수산"); put("toinfo", "01054289133"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 7.11); put("snsrKwh",682.399); put("snsrKwhRank",12); put("elecGrade", 5); put("elecRank", 106); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001097"); put("strName", "대양수산"); put("toinfo", "01074053890"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 11.93); put("snsrKwh",763.399); put("snsrKwhRank",8); put("elecGrade", 5); put("elecRank", 77); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001098"); put("strName", "대천수산"); put("toinfo", "01045945212"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 28.64); put("snsrKwh",458.199); put("snsrKwhRank",24); put("elecGrade", 5); put("elecRank", 16); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001100"); put("strName", "대한축산"); put("toinfo", "01024728436"); put("ig", 1); put("oc", 0); put("snsrKwhAvg", 44.68); put("snsrKwh",1429.7); put("snsrKwhRank",2); put("elecGrade", 5); put("elecRank", 13); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001101"); put("strName", "덕일약국"); put("toinfo", "01064170116"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 3.16); put("snsrKwh",151.5); put("snsrKwhRank",81); put("elecGrade", 5); put("elecRank", 83); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001103"); put("strName", "동면식당"); put("toinfo", "01059260557"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 0.36); put("snsrKwh",5.8); put("snsrKwhRank",110); put("elecGrade", 5); put("elecRank", 99); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001104"); put("strName", "동원축산"); put("toinfo", "01042438697"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.7); put("snsrKwh",49.2); put("snsrKwhRank",102); put("elecGrade", 5); put("elecRank", 107); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001105"); put("strName", "두건호텔리어"); put("toinfo", "01044507454"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 10.46); put("snsrKwh",334.6); put("snsrKwhRank",44); put("elecGrade", 5); put("elecRank", 104); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001106"); put("strName", "두부명가"); put("toinfo", "01088150285"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 7.27); put("snsrKwh",349.199); put("snsrKwhRank",42); put("elecGrade", 5); put("elecRank", 102); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001107"); put("strName", "땅스부대찌개"); put("toinfo", "01048770393"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 31.09); put("snsrKwh",497.501); put("snsrKwhRank",22); put("elecGrade", 4); put("elecRank", 1); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001108"); put("strName", "땡겨유왕족발"); put("toinfo", "01076487770"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 7.89); put("snsrKwh",378.7); put("snsrKwhRank",36); put("elecGrade", 5); put("elecRank", 100); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001109"); put("strName", "또순이네"); put("toinfo", "01088063628"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 15.37); put("snsrKwh",245.9); put("snsrKwhRank",57); put("elecGrade", 5); put("elecRank", 78); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001110"); put("strName", "똑똑한손만두"); put("toinfo", "01086831184"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 4.93); put("snsrKwh",236.7); put("snsrKwhRank",60); put("elecGrade", 5); put("elecRank", 105); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001111"); put("strName", "라이렌토탈팬시"); put("toinfo", "01096618321"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 16.39); put("snsrKwh",262.2); put("snsrKwhRank",54); put("elecGrade", 5); put("elecRank", 12); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001112"); put("strName", "리본"); put("toinfo", "01075782510"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.68); put("snsrKwh",154.8); put("snsrKwhRank",77); put("elecGrade", 5); put("elecRank", 31); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001113"); put("strName", "마님찜닭"); put("toinfo", "01044790994"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 6.34); put("snsrKwh",304.2); put("snsrKwhRank",48); put("elecGrade", 5); put("elecRank", 63); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001114"); put("strName", "매일반찬"); put("toinfo", "01054019159"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 13.31); put("snsrKwh",851.9); put("snsrKwhRank",6); put("elecGrade", 5); put("elecRank", 40); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001115"); put("strName", "메이구제"); put("toinfo", "01088922891"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.42); put("snsrKwh",301.3); put("snsrKwhRank",49); put("elecGrade", 5); put("elecRank", 21); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001116"); put("strName", "명품숙녀의류"); put("toinfo", "01034069386"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 6.88); put("snsrKwh",220.3); put("snsrKwhRank",62); put("elecGrade", 5); put("elecRank", 72); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001118"); put("strName", "문내과"); put("toinfo", "01034640364"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.64); put("snsrKwh",78.9); put("snsrKwhRank",97); put("elecGrade", 5); put("elecRank", 51); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001119"); put("strName", "미니걸"); put("toinfo", "01077379382"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 4.94); put("snsrKwh",79.1); put("snsrKwhRank",96); put("elecGrade", 5); put("elecRank", 65); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001120"); put("strName", "미트프라임"); put("toinfo", "01062533949"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 25.96); put("snsrKwh",830.8); put("snsrKwhRank",7); put("elecGrade", 5); put("elecRank", 48); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001121"); put("strName", "믿음야채"); put("toinfo", "01029247236"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.52); put("snsrKwh",152.3); put("snsrKwhRank",80); put("elecGrade", 5); put("elecRank", 11); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001122"); put("strName", "바느질세상"); put("toinfo", "01065153574"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 0.69); put("snsrKwh",22); put("snsrKwhRank",108); put("elecGrade", 5); put("elecRank", 93); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001123"); put("strName", "백하미용실"); put("toinfo", "01050554993"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 6.84); put("snsrKwh",218.8); put("snsrKwhRank",63); put("elecGrade", 5); put("elecRank", 53); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001124"); put("strName", "버섯직매장"); put("toinfo", "01053034951"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 6.35); put("snsrKwh",101.6); put("snsrKwhRank",92); put("elecGrade", 5); put("elecRank", 42); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001127"); put("strName", "삼부방앗간"); put("toinfo", "01055930090"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 3.4); put("snsrKwh",163); put("snsrKwhRank",75); put("elecGrade", 5); put("elecRank", 81); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001128"); put("strName", "생생쌀농원"); put("toinfo", "01067675657"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 10.28); put("snsrKwh",164.5); put("snsrKwhRank",74); put("elecGrade", 4); put("elecRank", 2); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001129"); put("strName", "세도상회"); put("toinfo", "01077081117"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 2.18); put("snsrKwh",104.8); put("snsrKwhRank",91); put("elecGrade", 5); put("elecRank", 75); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001130"); put("strName", "세웅약국"); put("toinfo", "01024249226"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 26.14); put("snsrKwh",418.2); put("snsrKwhRank",29); put("elecGrade", 5); put("elecRank", 56); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001131"); put("strName", "소비자클럽"); put("toinfo", "01058442390"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.99); put("snsrKwh",95.4); put("snsrKwhRank",93); put("elecGrade", 5); put("elecRank", 90); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001132"); put("strName", "수제돈가스"); put("toinfo", "01035453820"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 34.26); put("snsrKwh",548.1); put("snsrKwhRank",17); put("elecGrade", 5); put("elecRank", 89); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001133"); put("strName", "스타일"); put("toinfo", "01034027502"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.38); put("snsrKwh",150.1); put("snsrKwhRank",84); put("elecGrade", 5); put("elecRank", 35); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001134"); put("strName", "쌈지수제화"); put("toinfo", "01064860910"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 18.36); put("snsrKwh",293.799); put("snsrKwhRank",50); put("elecGrade", 5); put("elecRank", 38); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001135"); put("strName", "아가야까꿍"); put("toinfo", "01025570473"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 12.6); put("snsrKwh",201.6); put("snsrKwhRank",67); put("elecGrade", 5); put("elecRank", 57); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001136"); put("strName", "아름수선"); put("toinfo", "01085421507"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.69); put("snsrKwh",27); put("snsrKwhRank",106); put("elecGrade", 5); put("elecRank", 68); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001137"); put("strName", "아트홈패션"); put("toinfo", "01088501022"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 8.25); put("snsrKwh",132); put("snsrKwhRank",88); put("elecGrade", 5); put("elecRank", 84); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001138"); put("strName", "알곡떡집"); put("toinfo", "01094082351"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 33.3); put("snsrKwh",532.801); put("snsrKwhRank",20); put("elecGrade", 5); put("elecRank", 6); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001140"); put("strName", "야채"); put("toinfo", "01068752767"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.33); put("snsrKwh",20); put("snsrKwhRank",109); put("elecGrade", 5); put("elecRank", 26); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001141"); put("strName", "야호분식"); put("toinfo", "01064240550"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 3.72); put("snsrKwh",178.7); put("snsrKwhRank",70); put("elecGrade", 5); put("elecRank", 58); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001142"); put("strName", "양지정육점"); put("toinfo", "01054081760"); put("ig", 218); put("oc", 0); put("snsrKwhAvg", 13.82); put("snsrKwh",663.499); put("snsrKwhRank",13); put("elecGrade", 5); put("elecRank", 69); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001143"); put("strName", "어디야카페"); put("toinfo", "01032992817"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 0.06); put("snsrKwh",1); put("snsrKwhRank",111); put("elecGrade", 5); put("elecRank", 85); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001144"); put("strName", "엄마손반찬"); put("toinfo", "01099552389"); put("ig", 2); put("oc", 0); put("snsrKwhAvg", 23.84); put("snsrKwh",381.4); put("snsrKwhRank",35); put("elecGrade", 5); put("elecRank", 8); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001145"); put("strName", "엄마손순대"); put("toinfo", "01099088970"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 27.24); put("snsrKwh",435.8); put("snsrKwhRank",27); put("elecGrade", 5); put("elecRank", 10); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001147"); put("strName", "에이스악세사리"); put("toinfo", "01088207952"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.46); put("snsrKwh",151.4); put("snsrKwhRank",82); put("elecGrade", 5); put("elecRank", 59); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001148"); put("strName", "엠씨마트"); put("toinfo", "01029012368"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 16.47); put("snsrKwh",691.801); put("snsrKwhRank",10); put("elecGrade", 5); put("elecRank", 70); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001149"); put("strName", "여우미장"); put("toinfo", "01066604296"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 15.91); put("snsrKwh",254.5); put("snsrKwhRank",55); put("elecGrade", 5); put("elecRank", 49); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001150"); put("strName", "연산건강원"); put("toinfo", "01041568642"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.66); put("snsrKwh",154.6); put("snsrKwhRank",78); put("elecGrade", 5); put("elecRank", 17); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001152"); put("strName", "영동과일"); put("toinfo", "01054029304"); put("ig", 25); put("oc", 0); put("snsrKwhAvg", 46.53); put("snsrKwh",744.401); put("snsrKwhRank",9); put("elecGrade", 5); put("elecRank", 9); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001153"); put("strName", "영동닭집"); put("toinfo", "01055153985"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 13.13); put("snsrKwh",420.299); put("snsrKwhRank",28); put("elecGrade", 5); put("elecRank", 60); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001154"); put("strName", "영일회수산"); put("toinfo", "01077998895"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 17.05); put("snsrKwh",443.199); put("snsrKwhRank",26); put("elecGrade", 5); put("elecRank", 32); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001155"); put("strName", "예산쌀상회"); put("toinfo", "01085461134"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.65); put("snsrKwh",26.4); put("snsrKwhRank",107); put("elecGrade", 5); put("elecRank", 27); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001156"); put("strName", "옛날칼국수집"); put("toinfo", "01000000000"); put("ig", 368); put("oc", 0); put("snsrKwhAvg", 21.19); put("snsrKwh",1017.2); put("snsrKwhRank",4); put("elecGrade", 4); put("elecRank", 66); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001157"); put("strName", "오감만족"); put("toinfo", "01042453364"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 75.49); put("snsrKwh",1207.801); put("snsrKwhRank",3); put("elecGrade", 4); put("elecRank", 3); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001158"); put("strName", "와플나라"); put("toinfo", "01074000238"); put("ig", 4); put("oc", 0); put("snsrKwhAvg", 23.14); put("snsrKwh",370.201); put("snsrKwhRank",37); put("elecGrade", 5); put("elecRank", 45); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001159"); put("strName", "와플우리집반찬"); put("toinfo", "01045960590"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.48); put("snsrKwh",455.1); put("snsrKwhRank",25); put("elecGrade", 5); put("elecRank", 73); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001161"); put("strName", "외양간정육점"); put("toinfo", "01042994912"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 14.49); put("snsrKwh",463.801); put("snsrKwhRank",23); put("elecGrade", 5); put("elecRank", 54); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001162"); put("strName", "우리기물"); put("toinfo", "01023544388"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 33.64); put("snsrKwh",538.199); put("snsrKwhRank",19); put("elecGrade", 5); put("elecRank", 22); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001163"); put("strName", "유진건어물"); put("toinfo", "01075114437"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 11.52); put("snsrKwh",553.101); put("snsrKwhRank",16); put("elecGrade", 5); put("elecRank", 82); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001164"); put("strName", "은영헤어스케치"); put("toinfo", "01064096895"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 20.76); put("snsrKwh",332.2); put("snsrKwhRank",46); put("elecGrade", 5); put("elecRank", 34); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001165"); put("strName", "장씨야채"); put("toinfo", "01085552908"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 8.94); put("snsrKwh",143); put("snsrKwhRank",87); put("elecGrade", 5); put("elecRank", 76); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001166"); put("strName", "장터식품"); put("toinfo", "01054327019"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 17.01); put("snsrKwh",272.1); put("snsrKwhRank",52); put("elecGrade", 5); put("elecRank", 43); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001167"); put("strName", "전라도김치"); put("toinfo", "01044326644"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 12.19); put("snsrKwh",390.2); put("snsrKwhRank",32); put("elecGrade", 5); put("elecRank", 87); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001168"); put("strName", "정동닭집"); put("toinfo", "01029207675"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 6.76); put("snsrKwh",67.6); put("snsrKwhRank",100); put("elecGrade", 5); put("elecRank", 33); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001169"); put("strName", "정수선"); put("toinfo", "01080119478"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 4.91); put("snsrKwh",78.5); put("snsrKwhRank",98); put("elecGrade", 5); put("elecRank", 46); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001170"); put("strName", "중앙닭집"); put("toinfo", "01054319725"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 4.36); put("snsrKwh",209.2); put("snsrKwhRank",65); put("elecGrade", 5); put("elecRank", 108); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001171"); put("strName", "즉석두부"); put("toinfo", "01043314166"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 23.99); put("snsrKwh",383.8); put("snsrKwhRank",34); put("elecGrade", 5); put("elecRank", 19); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001172"); put("strName", "즉석수제어묵"); put("toinfo", "01022582338"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 21.85); put("snsrKwh",349.599); put("snsrKwhRank",41); put("elecGrade", 5); put("elecRank", 20); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001174"); put("strName", "찰떡궁합"); put("toinfo", "01088379087"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 8.47); put("snsrKwh",271); put("snsrKwhRank",53); put("elecGrade", 5); put("elecRank", 36); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001175"); put("strName", "채림이네야채"); put("toinfo", "01083900886"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.63); put("snsrKwh",154.1); put("snsrKwhRank",79); put("elecGrade", 5); put("elecRank", 62); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001176"); put("strName", "청양식당"); put("toinfo", "01020145512"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 11.51); put("snsrKwh",368.3); put("snsrKwhRank",38); put("elecGrade", 5); put("elecRank", 88); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001177"); put("strName", "카미노테"); put("toinfo", "01073420819"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 2.37); put("snsrKwh",113.9); put("snsrKwhRank",89); put("elecGrade", 5); put("elecRank", 97); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001178"); put("strName", "커먼프라자"); put("toinfo", "01024970117"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.94); put("snsrKwh",159); put("snsrKwhRank",76); put("elecGrade", 5); put("elecRank", 37); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001179"); put("strName", "코디가방"); put("toinfo", "01071834288"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 10.63); put("snsrKwh",170); put("snsrKwhRank",73); put("elecGrade", 5); put("elecRank", 86); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001180"); put("strName", "코스모네이처"); put("toinfo", "01023569491"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 25.95); put("snsrKwh",415.2); put("snsrKwhRank",30); put("elecGrade", 5); put("elecRank", 41); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001181"); put("strName", "태평닭집"); put("toinfo", "01041069000"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 13.51); put("snsrKwh",216.2); put("snsrKwhRank",64); put("elecGrade", 5); put("elecRank", 14); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001182"); put("strName", "태평선식"); put("toinfo", "01037659224"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 13.89); put("snsrKwh",222.2); put("snsrKwhRank",61); put("elecGrade", 5); put("elecRank", 28); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001183"); put("strName", "태평정육점"); put("toinfo", "01028005184"); put("ig", 186); put("oc", 0); put("snsrKwhAvg", 8.9); put("snsrKwh",347.201); put("snsrKwhRank",43); put("elecGrade", 5); put("elecRank", 110); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001184"); put("strName", "태평환경개발"); put("toinfo", "01054091116"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 9.16); put("snsrKwh",146.5); put("snsrKwhRank",85); put("elecGrade", 5); put("elecRank", 30); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001185"); put("strName", "한민순대"); put("toinfo", "01021708618"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 19.66); put("snsrKwh",314.599); put("snsrKwhRank",47); put("elecGrade", 5); put("elecRank", 64); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001186"); put("strName", "한밭과일"); put("toinfo", "01034076897"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 31.86); put("snsrKwh",509.801); put("snsrKwhRank",21); put("elecGrade", 5); put("elecRank", 44); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001187"); put("strName", "한밭도매유통"); put("toinfo", "01088926331"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 20.33); put("snsrKwh",935.3); put("snsrKwhRank",5); put("elecGrade", 5); put("elecRank", 25); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001189"); put("strName", "해성고추방앗간"); put("toinfo", "01063257675"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 2.54); put("snsrKwh",68.7); put("snsrKwhRank",99); put("elecGrade", 5); put("elecRank", 109); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001190"); put("strName", "해오름떡볶이"); put("toinfo", "01046587251"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 21.91); put("snsrKwh",350.5); put("snsrKwhRank",40); put("elecGrade", 5); put("elecRank", 52); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001191"); put("strName", "행복건강원"); put("toinfo", "01067300510"); put("ig", 3); put("oc", 0); put("snsrKwhAvg", 6.99); put("snsrKwh",111.9); put("snsrKwhRank",90); put("elecGrade", 5); put("elecRank", 47); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001192"); put("strName", "행복한낙지"); put("toinfo", "01054849898"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 2.37); put("snsrKwh",38); put("snsrKwhRank",104); put("elecGrade", 5); put("elecRank", 80); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001193"); put("strName", "호남상회"); put("toinfo", "01094109579"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 23.99); put("snsrKwh",383.9); put("snsrKwhRank",33); put("elecGrade", 5); put("elecRank", 61); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001194"); put("strName", "화이트화장품"); put("toinfo", "01028798908"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 16.91); put("snsrKwh",541.001); put("snsrKwhRank",18); put("elecGrade", 5); put("elecRank", 94); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001195"); put("strName", "황금떡볶이"); put("toinfo", "01025669176"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 0.96); put("snsrKwh",46.2); put("snsrKwhRank",103); put("elecGrade", 5); put("elecRank", 96); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001196"); put("strName", "희인기름고추집"); put("toinfo", "01048518133"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 5.63); put("snsrKwh",180.2); put("snsrKwhRank",69); put("elecGrade", 5); put("elecRank", 67); }} );
            listArea.add( new HashMap() {{ put("strCode", "FS_STR_0000000001973"); put("strName", "태평C1 (태평시장상인회)"); put("toinfo", "01042453364"); put("ig", 0); put("oc", 0); put("snsrKwhAvg", 1.5); put("snsrKwh",192.1); put("snsrKwhRank",68); put("elecGrade", 5); put("elecRank", 111); }} );

            for (int i = 0; i < listArea.size(); i++) {
                HashMap<String, Object> item = listArea.get(i);

                JSONObject obj = (JSONObject) new JSONParser().parse(
                    new InputStreamReader(new FileInputStream(ResourceUtils.getFile("classpath:static/fs/json/sms_info.json")), "UTF-8")
                );

                String messageText1 = "";
                JSONArray messageText1Arr = (JSONArray) obj.get("messageText1");
                for (int j = 0; j < messageText1Arr.size(); j++) 
                    messageText1 += (String) messageText1Arr.get(j);

                String linkPc = ((String) obj.get("linkPc")).replace("#{strCode}", (String) item.get("strCode"));
                String linkMo = ((String) obj.get("linkMo")).replace("#{strCode}", (String) item.get("strCode"));

                messageText1 = messageText1
                    .replace("#{상점명}", (String) item.get("strCode"))
                    .replace("#{보고기간년월}", "22년 3월")
                    .replace("#{보고기간}", "2022.03.01 ~ 2022.03.20")
                    .replace("#{전기위험현황}", (int) item.get("elecGrade") == 5 ? "안전한 상태입니다 그래도 전기화재에 주의하십시오." : ((int) item.get("elecGrade") == 4 ? "전기위험이 보통으로 전기화재에 주의하십시오." : "고위험으로 신속한 점검이 필요합니다."))
                    .replace("#{전기등급}", String.valueOf(item.get("elecGrade")))
                    .replace("#{위험순위}", String.valueOf(item.get("elecRank")) + " 위 / 111 개 상점")
                    .replace("#{과전류발생}", String.valueOf(item.get("oc")) + " 회")
                    .replace("#{누전발생}", String.valueOf(item.get("ig")) + " 회")
                    .replace("#{전력사용순위}", String.valueOf(item.get("snsrKwhRank")) + " 위 / 111 개 상점")
                    .replace("#{일별평균전력사용량}", String.valueOf(item.get("snsrKwhAvg")) + " kWh")
                    .replace("#{전력사용량총합}", String.valueOf(item.get("snsrKwh")) + " kWh")
                    .replace("#{전력사용상태}", "전월대비 전력소비가 적습니다.");

                String dataOutputStream = ((JSONObject) obj.get("dataOutputStream")).toString();
                dataOutputStream = dataOutputStream
                    .replace("#{to}", (String) item.get("toinfo"))
                    .replace("#{text}", messageText1)
                    .replace("#{linkPc}", linkPc)
                    .replace("#{linkMo}", linkMo);

                URL url = new URL((String) obj.get("targetUrl"));
                HttpURLConnection con = (HttpURLConnection) url.openConnection();

                String salt = UUID.randomUUID().toString().replaceAll("-", "");
                String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

                Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
                sha256_HMAC.init(new SecretKeySpec(String.valueOf(obj.get("apiSecret")).getBytes(StandardCharsets.UTF_8), "HmacSHA256"));

                String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));

                con.setRequestMethod("POST");
                con.setRequestProperty("Authorization", "HMAC-SHA256 ApiKey=" + (String) obj.get("apiKey") + ", Date=" + date + ", salt=" + salt + ", signature=" + signature);
                con.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                con.setDoOutput(true);

                DataOutputStream wr = new DataOutputStream(con.getOutputStream());
                System.out.println("Parameters : " + dataOutputStream);

                // OutputStreamWriter osw = new OutputStreamWriter(wr);
                // osw.write(dataOutputStream, 0, dataOutputStream.length());
                // osw.close();

                // wr.flush();
                // wr.close();

                // int responseCode = con.getResponseCode();
                // BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

                // String line;
                // StringBuffer response = new StringBuffer();

                // while ((line = in.readLine()) != null)
                //     response.append(line);

                // in.close();
                // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // HashMap<String, Object> prm = new HashMap<String, Object>();
                // prm.put("snsrseq", req.getParameter("snsrseq"));
                // prm.put("pushmsg", dataOutputStream);
                // prm.put("userid", (String) obj.get("userid"));
                // prm.put("sendresult", responseCode + " " + response.toString());
                // prm.put("toinfo", (String) item.get("toinfo"));
                // prm.put("frominfo", (String) obj.get("frominfo"));
                // prm.put("pushRslt", "Y");

                // sysSimulRepo.INSERT_SYS_PUSH(prm);
            }
        } catch (NullPointerException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (Exception e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        }
    }

}
