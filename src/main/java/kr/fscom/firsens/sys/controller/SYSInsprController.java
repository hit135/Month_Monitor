package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.common.security.Sha256Encrypt;
import kr.fscom.firsens.sys.repository.SYSInsprRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSInsprController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSInsprController.class);
    Sha256Encrypt sha256Encrypt = new Sha256Encrypt();

    private final SYSInsprRepo sysInsprRepo;

    @Autowired
    public SYSInsprController(SYSInsprRepo sysInsprRepo) { this.sysInsprRepo = sysInsprRepo; }

    @PostMapping("/listInsprArea")
    public HashMap<String, Object> listPageInspectors() throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> resultList = new ArrayList<>();
        boolean result = false;

        try {
            resultList = sysInsprRepo.LIST_SYS_INSPRAREA();
            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
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
        } catch (Exception e) {
            LOG.debug(e.getMessage());
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
            String sha256InspPass = sha256Encrypt.getHex((String) param.get("inspPass"), (String) param.get("inspId"));
            param.put("inspPass", sha256InspPass);
            int ins = sysInsprRepo.INSERT_SYS_INSPECTOR(param);

            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return result;
    }

}
