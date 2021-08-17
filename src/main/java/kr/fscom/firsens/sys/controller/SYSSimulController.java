package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSSimulRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSSimulController {

    private static final Logger LOG = LoggerFactory.getLogger(SYSSimulController.class);
    private final SYSSimulRepo sysSimulRepo;

    @Autowired
    public SYSSimulController(SYSSimulRepo sysSimulRepo) {
        this.sysSimulRepo = sysSimulRepo;
    }

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

}
