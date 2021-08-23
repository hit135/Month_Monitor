package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSPushRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSPushController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSPushController.class);
    private final SYSPushRepo sysPushRepo;

    @Autowired
    public SYSPushController(SYSPushRepo sysPushRepo) {
        this.sysPushRepo = sysPushRepo;
    }

    @GetMapping("/pushs")
    public HashMap<String, Object> listPagePush(
            String type, int page, int size, String startDate, String endDate, String searchWrd, String isSuccess) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 발송 이력 목록 조회 시작 : (type : {}, page : {}, size : {}, startDate : {}, endDate : {}, searchWrd : {}, isSuccess : {})"
                , type, page, size, startDate, endDate, searchWrd, isSuccess);

        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> resultList = new ArrayList<>();
        int resultCnt = 0;
        boolean result = false;

        try {
            HashMap<String, Object> param = new HashMap() {{
                put("sizePerPage", size);
                put("page", (page - 1) * size);
                put("startDate", startDate);
                put("endDate", endDate);
                put("searchWrd", searchWrd);
                put("isSuccess", isSuccess);
            }};

            if ("push".equals(type)) {
                resultList = sysPushRepo.LIST_SYS_PUSH(param);
                resultCnt = sysPushRepo.CNT_SYS_PUSH(param);
            } else if ("sms".equals(type)) {
                resultList = sysPushRepo.LIST_SYS_SMS(param);
                resultCnt = sysPushRepo.CNT_SYS_SMS(param);
            }

            result = true;
        }  catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 발송 이력 목록 조회 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 발송 이력 목록 조회 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultList", resultList);
            rtn.put("totalElements", resultCnt);
        }

        return rtn;
    }

}
