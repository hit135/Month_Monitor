package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;
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
public class SYSAreaController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSAreaController.class);
    private final SYSAreaRepo sysAreaRepo;

    @Autowired
    public SYSAreaController(SYSAreaRepo sysAreaRepo) { this.sysAreaRepo = sysAreaRepo; }

    @GetMapping("/areas")
    public HashMap<String, Object> listPageArea(SYSAreaDomain domain, int page, int size, String searchWrd, String isUse,
                                                String delYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> areaList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page - 1) * domain.getSizePerPage());
            domain.setSearchWrd(searchWrd);
            domain.setIsUse(isUse);
            domain.setDelYn(delYn);

            int resultCnt = sysAreaRepo.SELECT_CNT_SYS_AREA(domain);            // 구역 목록 카운트
            areaList = sysAreaRepo.SELECT_LIST_SYS_AREA(domain);    // 구역 목록
            rtn.put("resultList", areaList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 구역목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }
}