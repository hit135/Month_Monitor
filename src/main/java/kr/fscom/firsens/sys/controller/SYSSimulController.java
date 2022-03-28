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
            ArrayList<Message> messageList = new ArrayList<>();

            for (int i = 0; i < 1; i++) {
                KakaoOption kakaoOption = new KakaoOption();
                kakaoOption.setPfId(env.getProp("smsInfo.pfId"));
                kakaoOption.setTemplateId(env.getProp("smsInfo.templateId"));

                HashMap<String, String> variables = new HashMap<>();
                variables.put("#{상점명}", "엄마손반찬");
                variables.put("#{보고기간년월}", "22년 3월");
                variables.put("#{보고기간}", "2022.03.01 ~ 2022.03.14");
                variables.put("#{전기위험현황}", "안전한 상태입니다. 그래도 전기화재에 주의하십시오.");
                variables.put("#{전기등급}", "5등급");
                variables.put("#{위험순위}", "태평시장 120위 / 130개 상점");
                variables.put("#{과전류발생}", "0회");
                variables.put("#{누전발생}", "0회");
                variables.put("#{전력사용순위}", "태평시장 23위 / 130개 상점");
                variables.put("#{일별평균전력사용량}", "12 kWh");
                variables.put("#{전력사용량총합}", "123 kWh");
                variables.put("#{전력사용상태}", "전주대비 전력소비가 많습니다.");
                variables.put("#{link}", "dev1.fscom.kr:30080/store/rpt?strCode=FS_STR_0000000001144");
                kakaoOption.setVariables(variables);

                Message message = new Message();
                message.setFrom("0424715215");
                message.setTo("01043833386");
                message.setKakaoOptions(kakaoOption);

                System.out.println("========================================================================");
                for (Map.Entry entry : message.getKakaoOptions().getVariables().entrySet())
                    System.out.println(entry);
                System.out.println("========================================================================");
                
                messageList.add(message);
            }

            MultipleMessageSendingRequest request = new MultipleMessageSendingRequest(messageList);
            MultipleMessageSentResponse response = this.messageService.sendMany(request);

            if (response != null 
                    && StringUtils.isNotBlank(response.getGroupId())
                    && StringUtils.isNotBlank(response.getAccountId())) 
                result = true;
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
