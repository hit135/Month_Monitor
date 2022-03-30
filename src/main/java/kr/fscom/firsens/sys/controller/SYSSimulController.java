package kr.fscom.firsens.sys.controller;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.*;
import net.nurigo.sdk.message.request.MultipleMessageSendingRequest;
import net.nurigo.sdk.message.response.MultipleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.fscom.firsens.common.config.MNGSmsEnvironment;
import kr.fscom.firsens.sys.repository.SYSSimulRepo;

/**
 * SMS 시뮬레이션
 *
 * @author : uhm
 * @version 1.0
 * @FileName : SYSSimulController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-08-17    uhm        최초 생성
 *
 * </pre>
 * @since : 2021-09-17
 */

@RestController
@RequestMapping("/api")
public class SYSSimulController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSSimulController.class);

    private final SYSSimulRepo sysSimulRepo;
    private final DefaultMessageService messageService;

    @Autowired
    public MNGSmsEnvironment env;

    @Autowired
    public SYSSimulController(SYSSimulRepo sysSimulRepo) {
        this.sysSimulRepo = sysSimulRepo;

        this.messageService = 
            NurigoApp.INSTANCE.initialize(env.getProp("smsInfo.apiKey"), env.getProp("smsInfo.apiSecret"), env.getProp("smsInfo.targetUrl"));
    }

    /**
     * @Method Name : sendSimulPush
     * @작성일 : 2022-03-28
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시물레이션 SMS 보내기
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/sendSimulPush")
    @ResponseBody
    public HashMap<String, Object> sendSimulPush(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        try {
            List<HashMap<String, Object>> smsList = this.sysSimulRepo.LIST_SYS_AREA_MONTHLY_PRT();

            ArrayList<Message> messageList = new ArrayList<>();

            for (int i = 0; i < smsList.size(); i++) {
                HashMap<String, Object> item = smsList.get(i);

                KakaoOption kakaoOption = new KakaoOption();
                kakaoOption.setPfId(env.getProp("smsInfo.pfId"));
                kakaoOption.setTemplateId(env.getProp("smsInfo.templateId"));

                HashMap<String, String> variables = new HashMap<>();
                variables.put("#{상점명}", (String) item.get("strCode"));
                variables.put("#{보고기간년월}", "22년 3월");
                variables.put("#{보고기간}", (String) item.get("rcvTime"));
                variables.put("#{전기위험현황}", (String) item.get("evtMemo"));
                variables.put("#{전기등급}", String.valueOf(item.get("evtGrade")) + "등급");
                variables.put("#{위험순위}", (String) item.get("areaName") + " " + String.valueOf(item.get("evtRank")) + "위 / " + smsList.size() + "개 상점");
                variables.put("#{과전류발생}", String.valueOf(item.get("ocAlm")) + "회");
                variables.put("#{누전발생}", String.valueOf(item.get("igAlm")) + "회");
                variables.put("#{전력사용순위}", (String) item.get("areaName") + " " + String.valueOf(item.get("snsrKwhRank")) + "위 / " + smsList.size() + "개 상점");
                variables.put("#{일별평균전력사용량}", String.valueOf(item.get("snsrKwhAvg")) + " kWh");
                variables.put("#{전력사용량총합}", String.valueOf(item.get("snsrKwhSum")) + " kWh");
                variables.put("#{전력사용상태}", (String) item.get("snsrKwhMemo"));
                variables.put("#{link}", "dev1.fscom.kr:30080/store/rpt?strCode=" + (String) item.get("strCode"));
                kakaoOption.setVariables(variables);

                Message message = new Message();
                message.setFrom("0424715215");
                message.setTo(((String) item.get("strOwnTel")).replaceAll("-", ""));
                message.setKakaoOptions(kakaoOption);

                System.out.println("========================================================================");
                System.out.println("(" + (i+1) + ")");
                for (Map.Entry entry : message.getKakaoOptions().getVariables().entrySet())
                    System.out.println(entry);
                System.out.println("========================================================================");

                messageList.add(message);
            }

            //MultipleMessageSendingRequest request = new MultipleMessageSendingRequest(messageList);
            //MultipleMessageSentResponse response = this.messageService.sendMany(request);

            //if (response != null 
            //        && StringUtils.isNotBlank(response.getGroupId())
            //        && StringUtils.isNotBlank(response.getAccountId()))
            //    result = true;
        } catch (NullPointerException | IllegalArgumentException e) {
            LOG.debug("sendSimulPush : " + e.getMessage());
        } catch (Exception e) {
            LOG.debug("sendSimulPush : " + e.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

}
