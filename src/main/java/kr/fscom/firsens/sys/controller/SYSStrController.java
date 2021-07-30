package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSStrDomain;
import kr.fscom.firsens.sys.repository.SYSStrRepo;
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
public class SYSStrController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSStrController.class);
    private final SYSStrRepo sysStrRepo;

    @Autowired
    SYSStrController(SYSStrRepo sysStrRepo) { this.sysStrRepo = sysStrRepo; }


    @GetMapping("/strs")
    public HashMap<String, Object> listPageMems(SYSStrDomain domain, int page, int size, String searchWrd, String useYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> strList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());

            int resultCnt = sysStrRepo.SELECT_CNT_SYS_STR(domain);
            strList = sysStrRepo.SELECT_LIST_SYS_STR(domain);

            rtn.put("resultList", strList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 상점목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }
}
