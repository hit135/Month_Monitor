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
            /*
            JSONObject obj = (JSONObject) new JSONParser().parse(
                new InputStreamReader(new FileInputStream(ResourceUtils.getFile("classpath:static/fs/json/sms_info.json")), "UTF-8")
            );

            String apiKey = (String) obj.get("apiKey");
            String apiSecret = (String) obj.get("apiSecret");
            URL url = new URL((String) obj.get("targetUrl"));

            for (int i = 0; i < listArea.size(); i++) {
                if (i == 0) {
                HashMap<String, Object> item = listArea.get(i);

                String messageText1 = "";
                JSONArray messageText1Arr = (JSONArray) obj.get("messageText1");
                for (int j = 0; j < messageText1Arr.size(); j++) 
                    messageText1 += (String) messageText1Arr.get(j);

                String linkPc = ((String) obj.get("linkPc")).replace("#{strCode}", (String) item.get("strCode"));
                String linkMo = ((String) obj.get("linkMo")).replace("#{strCode}", (String) item.get("strCode"));

                messageText1 = messageText1
                    .replace("#{상점명}", (String) item.get("strName"))
                    .replace("#{보고기간년월}", "22년 3월")
                    .replace("#{보고기간}", "2022.03.01~2022.03.20")
                    .replace("#{전기위험현황}", (int) item.get("elecGrade") == 5 ? "안전한 상태입니다 그래도 전기화재에 주의하십시오." : ((int) item.get("elecGrade") == 4 ? "전기위험이 보통으로 전기화재에 주의하십시오." : "고위험으로 신속한 점검이 필요합니다."))
                    .replace("#{전기등급}", String.valueOf(item.get("elecGrade")) + "등급")
                    .replace("#{위험순위}", String.valueOf(item.get("elecRank")) + " 위 / 111 개 상점")
                    .replace("#{과전류발생}", String.valueOf(item.get("oc")) + " 회")
                    .replace("#{누전발생}", String.valueOf(item.get("ig")) + " 회")
                    .replace("#{전력사용순위}", String.valueOf(item.get("snsrKwhRank")) + " 위 / 111 개 상점")
                    .replace("#{일별평균전력사용량}", String.valueOf(item.get("snsrKwhAvg")) + " kWh")
                    .replace("#{전력사용량총합}", String.valueOf(item.get("snsrKwh")) + " kWh")
                    .replace("#{전력사용상태}", "전월대비 전력소비가 적습니다.");

                String dataOutputStream = ((JSONObject) obj.get("dataOutputStream")).toString();
                dataOutputStream = dataOutputStream
                    //.replace("#{to}", (String) item.get("toinfo"))
                    .replace("#{to}", "01043833386")
                    .replace("#{text}", messageText1)
                    .replace("#{linkPc}", linkPc)
                    .replace("#{linkMo}", linkMo);

                HttpURLConnection con = (HttpURLConnection) url.openConnection();

                String salt = UUID.randomUUID().toString().replaceAll("-", "");
                String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

                Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
                SecretKeySpec secret_key = new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
                sha256_HMAC.init(secret_key);

                String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));
                String auth = "HMAC-SHA256 ApiKey=" + apiKey + ", Date=" + date + ", salt=" + salt + ", signature=" + signature;

                con.setRequestMethod("POST");
                con.setRequestProperty("Authorization", auth);
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
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                
                HashMap<String, Object> prm = new HashMap<String, Object>();
                prm.put("snsrseq", req.getParameter("snsrseq"));
                prm.put("pushmsg", dataOutputStream);
                prm.put("userid", (String) obj.get("userid"));
                prm.put("sendresult", responseCode + " " + response.toString());
                prm.put("toinfo", (String) item.get("toinfo"));
                prm.put("frominfo", (String) obj.get("frominfo"));
                prm.put("pushRslt", "Y");

                sysSimulRepo.INSERT_SYS_PUSH(prm);
                
                }
            }
            */
        } catch (NullPointerException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        } catch (Exception e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        }
    }

}
