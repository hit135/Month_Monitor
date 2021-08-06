package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSSnsrDomain;
import kr.fscom.firsens.sys.repository.SYSSnsrRepo;
import org.apache.ibatis.jdbc.SQL;
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
public class SYSSnsrController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSSnsrController.class);
    private final SYSSnsrRepo sysSnsrRepo;

    @Autowired
    public SYSSnsrController(SYSSnsrRepo sysSnsrRepo) { this.sysSnsrRepo = sysSnsrRepo; }

    @GetMapping("/snsrs")
    public HashMap<String, Object> listPageSnsrs(SYSSnsrDomain domain, int page, int size, String searchWrd, String delYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 시작");
        List<HashMap<String, Object>> sensorList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());
            domain.setSearchWrd(searchWrd);
            if(domain.getAreaCode().equals("none")) {
                domain.setAreaCode("0");
                domain.setLevelAreaCode("0");
            }

            int resultCnt = sysSnsrRepo.SELECT_CNT_SYS_SNSR(domain);
            sensorList = sysSnsrRepo.SELECT_LIST_SYS_SNSR(domain);

            rtn.put("resultList", sensorList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }

    @PostMapping("/insertSnsr")
    public HashMap<String, Object> insertSnsr(@RequestBody SYSSnsrDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            if(!domain.getSnsrId().equals("")) {
                domain.setKeyFied("STORE_ID");
                sysSnsrRepo.GENERATE_SNSR_CODE(domain);

                int result = sysSnsrRepo.INSERT_SYS_SNSR(domain);
                if(result > 0)
                    rtn.put("result", "success");
                else
                    rtn.put("result", "fail");
            }
        } catch(SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 SQL 오류 : {}", ex.getMessage());
        }
        catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 오류 : {}", ex.getMessage());
        }

        return rtn;
    }
}