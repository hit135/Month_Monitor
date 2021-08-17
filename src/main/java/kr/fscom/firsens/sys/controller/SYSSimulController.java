package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSSimulRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public HashMap<String, Object> listPageSimul(String simulType, int page, int size, String areaCode, String searchWrd, String regDate) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 시뮬레이션 목록 요청 시작 : (simulType : {}, page : {}, size: {}, areaCode: {}, searchWrd:{}, regDate: {})"
                , simulType, page, size, areaCode, searchWrd, regDate);

        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        int totalElements = 0;
        List<HashMap<String, Object>> resultList = new ArrayList<>();

        try {
            HashMap<String, Object> param = new HashMap() {{
                put("sizePerPage", size);
                put("page", (page - 1) * size);
                put("areaCode", areaCode);
                put("searchWrd", searchWrd);
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

}
