package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.common.keycrypt.KeyEncrypt;
import kr.fscom.firsens.sys.repository.SYSInsprRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSInsprController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSInsprController.class);

    private final SYSInsprRepo sysInsprRepo;

    @Autowired
    public SYSInsprController(SYSInsprRepo sysInsprRepo) { this.sysInsprRepo = sysInsprRepo; }

    @PostMapping("/listInsprArea")
    public HashMap<String, Object> listPageInsprArea() throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 점검자 소속 시장 조회 시작");

        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> resultList = new ArrayList<>();
        boolean result = false;

        try {
            resultList = sysInsprRepo.LIST_SYS_INSPRAREA();
            result = true;
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 점검자 소속 시장 조회 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 점검자 소속 시장 조회 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultList", resultList);
        }

        return rtn;
    }

    @GetMapping("/insprs")
    public HashMap<String, Object> listPageInspectors(
        int page, int size, String searchWrd, String useYn, String alarmUse, String loginLock, String inspAreaCode
    ) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 점검자 목록 조회 시작 : (page : {}, size : {}, searchWrd : {}, useYn : {}, alarmUse : {}, loginLock : {}, inspAreaCode : {})"
                , page, size, searchWrd, useYn, alarmUse, loginLock, inspAreaCode);

        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> resultList = new ArrayList<>();
        int resultCnt = 0;
        boolean result = false;

        try {
            HashMap<String, Object> param = new HashMap() {{
                put("sizePerPage", size);
                put("page", (page - 1) * size);
                put("searchWrd", searchWrd);
                put("useYn", useYn);
                put("alarmUse", alarmUse);
                put("loginLock", loginLock);
                put("inspAreaCode", inspAreaCode);
            }};

            resultList = sysInsprRepo.LIST_SYS_INSPECTORS(param);
            resultCnt = sysInsprRepo.CNT_SYS_INSPECTORS(param);
            result = true;
        }  catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 점검자 목록 조회 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 점검자 목록 조회 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultList", resultList);
            rtn.put("totalElements", resultCnt);
        }

        return rtn;
    }

    @PostMapping(value = "/selectDupChkInspId")
    public HashMap<String, Object> selectDupChkInspId(@RequestBody HashMap<String, Object> param) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean dupChk = false;
        boolean result = false;

        try {
            dupChk = sysInsprRepo.CNT_SYS_DUPCHK_INSPID(param) > 0;
            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("dupChk", dupChk);
        }

        return rtn;
    }

    @PostMapping(value = "/insertInspector")
    public boolean insertInspector(@RequestBody HashMap<String, Object> param) throws Exception {
        boolean result = false;

        try {
            String sha256InspPass = new KeyEncrypt().sha256Encryption((String) param.get("inspPass"), (String) param.get("inspId"));
            param.put("inspPass", sha256InspPass);
            int ins = sysInsprRepo.INSERT_SYS_INSPECTOR(param);

            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return result;
    }

    @PostMapping(value = "/selectInspector")
    public HashMap<String, Object> selectInspector(@RequestBody String inspId) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> resultData = new HashMap<>();
        boolean result = false;

        try {
            inspId = inspId.replaceFirst(".$","");
            resultData = sysInsprRepo.SELECT_SYS_INSPECTOR(inspId);
            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultData", resultData);
        }

        return rtn;
    }

    @PostMapping(value = "/updateInspector")
    public boolean updateInspector(@RequestBody HashMap<String, Object> param) throws Exception {
        boolean result = false;

        try {
            if (!StringUtils.isEmptyOrWhitespace((String) param.get("inspPass"))) {
                String sha256InspPass = new KeyEncrypt().sha256Encryption((String) param.get("inspPass"), (String) param.get("inspId"));
                param.put("inspPass", sha256InspPass);
            }

            int upd = sysInsprRepo.UPDATE_SYS_INSPECTOR(param);
            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return result;
    }

}
