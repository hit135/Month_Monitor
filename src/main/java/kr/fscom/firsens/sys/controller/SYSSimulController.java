package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.common.cookie.CommonCookie;
import kr.fscom.firsens.sys.repository.SYSSimulRepo;

import org.apache.commons.codec.binary.Hex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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

    CommonCookie commonCookie = new CommonCookie();

    @PostMapping("/listSimulArea")
    public HashMap<String, Object> listPageSimulArea() throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> resultList = new ArrayList<>();
        boolean result = false;

        try {
            resultList = sysSimulRepo.LIST_SYS_SIMULRAREA();
            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultList", resultList);
        }

        return rtn;
    }

    @GetMapping("/simulList")
    public HashMap<String, Object> listPageSimul(String simulType, int page, int size, String areaCode, String regDate) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 시뮬레이션 목록 요청 시작 : (simulType : {}, page : {}, size : {}, areaCode : {}, regDate : {})"
                , simulType, page, size, areaCode, regDate);

        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        int totalElements = 0;
        List<HashMap<String, Object>> resultList = new ArrayList<>();

        try {
            HashMap<String, Object> param = new HashMap() {{
                put("sizePerPage", size);
                put("page", (page - 1) * size);
                put("areaCode", areaCode);
                put("regDate", regDate);
            }};

            if ("simul1".equals(simulType)) {
                totalElements = sysSimulRepo.CNT_SYS_SENSOR_LOG(param);
                resultList = sysSimulRepo.LIST_SYS_SENSOR_LOG(param);
            } else if ("simul2".equals(simulType)) {
                totalElements = sysSimulRepo.CNT_SYS_STORE(param);
                resultList = sysSimulRepo.LIST_SYS_STORE(param);
            }

            rtn.put("totalElements", totalElements);
            rtn.put("resultList", resultList);

            result = true;
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 시뮬레이션 목록 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 시뮬레이션 목록 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @PostMapping("/simulPreview")
    public HashMap<String, Object> listPageSimul(@RequestBody HashMap<String, Object> param) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 시뮬레이션 미리보기 요청 시작");

        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> resultData = new HashMap<>();
        boolean result = false;

        try {
            if ("simul1".equals(param.get("simulType"))) {
                resultData = sysSimulRepo.SELECT_SYS_PREVIEW_URGENT_ISSUE(param);
                resultData.put("link", "http://1.223.40.19h:30080/mobile/store/issue?lSeq=" + resultData.get("lSeq"));
            } else if ("simul2".equals(param.get("simulType"))) {
                HashMap<String, Object> resultData1 = sysSimulRepo.SELECT_SYS_PREVIEW_NORMAL_ELEC_ISSUE(param);
                List<HashMap<String, Object>> resultData2 = sysSimulRepo.LIST_SYS_PREVIEW_NORMAL_KWH_ISSUE(param);

                resultData.put("areaCode", resultData1.get("areaCode"));
                resultData.put("strCode", resultData1.get("strCode"));
                resultData.put("areaName", resultData1.get("areaName"));
                resultData.put("strName", resultData1.get("strName"));
                resultData.put("snsrIgrAvg", resultData1.get("snsrIgrAvg"));
                resultData.put("snsrIgoGrade", resultData1.get("snsrIgoGrade"));
                resultData.put("snsrIgrRank", resultData1.get("snsrIgrRank"));
                resultData.put("oc", resultData1.get("oc"));
                resultData.put("ig", resultData1.get("ig"));
                resultData.put("startDate", resultData1.get("startDate"));
                resultData.put("endDate", resultData1.get("endDate"));
                resultData.put("strCnt", resultData1.get("strCnt"));

                resultData.put("snsrKwhDailyAvg", resultData2.get(0).get("snsrKwhDailyAvg"));
                resultData.put("snsrKwhWeeklyAvg", resultData2.get(0).get("snsrKwhWeeklyAvg"));
                resultData.put("snsrKwhRank", resultData2.get(0).get("snsrKwhRank"));
                resultData.put("snsrKwhCompare", (double) resultData2.get(0).get("snsrKwhDailyAvg") - (double) resultData2.get(1).get("snsrKwhDailyAvg"));

                resultData.put("link", "http://1.223.40.19h:30080/mobile/store/report?areaCode=" + resultData.get("areaCode") + "&strCode=" + resultData.get("strCode"));
            }

            rtn.put("resultData", resultData);

            result = true;
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 시뮬레이션 미리보기 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 시뮬레이션 미리보기 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @RequestMapping(value = "/sendSimulPush")
    @ResponseBody
    public HashMap<String, Object> sendSimulPush(HttpServletRequest req, @RequestBody HashMap<String, Object> param) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        HashMap<String, Object> ret = new HashMap<String, Object>();

        try {
            String apiKey = "NCS6IS9H8EY6IZ8Z";
            String apiSecret = "CERFHKFEXFGJPCJIKUD7XENTPXPKIW8N";
            String salt = UUID.randomUUID().toString().replaceAll("-", "");
            String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));
            String auth = "HMAC-SHA256 ApiKey=" + apiKey + ", Date=" + date + ", salt=" + salt + ", signature=" + signature;
            String targetUrl = "https://msg.purplebook.io/api/messages/v4/send";
            String msg_text = ((String) param.get("msgText")).replaceAll("\\n", "\\\\n");
            String userid = "admin";

            String toinfo = (String) param.get("toinfo");
            String frominfo = "01022787929";
//            String linkMo = (String) param.get("linkMo");
//            String linkPc = (String) param.get("linkPc");

            String parameters = "";
            if (msg_text.indexOf("시뮬레이션 - 전기안전 긴급이벤트") > -1) {
                parameters = "{\"message\":{" +
                             "\"to\":\"" + toinfo + "\"," +
                             "\"from\":\"" + frominfo + "\"," +
                             "\"text\":\"" + msg_text + "\"," +
                             "\"type\":\"ATA\"," +
                             "\"kakaoOptions\":{" +
                             "\"pfId\":\"KA01PF210610052835506nEjCd0OOvtA\"," +
                             "\"templateId\":\"KA01TP210823050028521KC5UGZeTLMz\"," +
                             "\"disableSms\":\"true\"" +
                             "}}}";
            } else {
                parameters = "{\"message\":{" +
                             "\"to\":\"" + toinfo + "\"," +
                             "\"from\":\"" + frominfo + "\"," +
                             "\"text\":\"" + msg_text + "\"," +
                             "\"type\":\"ATA\"," +
                             "\"kakaoOptions\":{" +
                             "\"pfId\":\"KA01PF210610052835506nEjCd0OOvtA\"," +
                             "\"templateId\":\"KA01TP210823050028521KC5UGZeTLMz\"," +
                             "\"disableSms\":\"true\"" +
                             "}}}";
            }

            URL url = new URL(targetUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("POST");

            con.setRequestProperty("Authorization", auth);
            con.setRequestProperty("Content-Type", "application/json;charset=utf-8");

            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            System.out.println("Parameters : " + parameters);
            OutputStreamWriter osw = new OutputStreamWriter(wr);
            osw.write(parameters, 0, parameters.length());
            //wr.writeBytes(parameters);
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

            //System.out.println("HTTP response code : " + responseCode);
            //System.out.println("HTTP body : " + response.toString());
            ret.put("result", response.toString());

            prm.put("snsrseq", req.getParameter("snsrseq"));
            prm.put("pushmsg", parameters);
            prm.put("userid", userid);
            prm.put("sendresult", responseCode + " " + response.toString());
            prm.put("toinfo", toinfo);
            prm.put("frominfo", frominfo);

            sysSimulRepo.INSERT_SYS_PUSH(prm);
        } catch (Exception e) {
            LOG.debug("sendPushAjax: " + e.getMessage());
        }

        return ret;
    }


}
