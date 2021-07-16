package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.domain.SYSMemDomain;
import kr.fscom.firsens.sys.repository.SYSMemRepo;
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
public class SYSMemController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSMemController.class);
    private final SYSMemRepo sysMemRepo;

    @Autowired
    public SYSMemController(SYSMemRepo sysMemRepo) { this.sysMemRepo = sysMemRepo; }

    @GetMapping("/mems")
    public HashMap<String, Object> listPageMems(SYSMemDomain domain, int page, int size, String searchWrd, String useYn, String delYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> memberList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());
            domain.setSearchWrd(searchWrd);

            domain.setUseYn(useYn);
            domain.setDelYn(delYn);
            int resultCnt = sysMemRepo.SELECT_CNT_SYS_MEM(domain);
            memberList = sysMemRepo.SELECT_LIST_SYS_MEM(domain);

            rtn.put("resultList", memberList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 회원목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 회원목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }
}