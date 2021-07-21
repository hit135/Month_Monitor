package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.common.security.Sha256Encrypt;
import kr.fscom.firsens.sys.domain.SYSMemDomain;
import kr.fscom.firsens.sys.repository.SYSMemRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSMemController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSMemController.class);
    private final SYSMemRepo sysMemRepo;
    Sha256Encrypt sha256Encrypt = new Sha256Encrypt();

    @Autowired
    public SYSMemController(SYSMemRepo sysMemRepo) { this.sysMemRepo = sysMemRepo; }

    @GetMapping("/mems")
    public HashMap<String, Object> listPageMems(SYSMemDomain domain, int page, int size, String searchWrd, String useYn, String delYn, String smsYn, String leaveYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> memberList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());
            domain.setSearchWrd(searchWrd);
            domain.setMemIsLeave(leaveYn);
            domain.setUseYn(useYn);
            domain.setMemRcvSms(smsYn);
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

    // 회원 중복 체크 (userId)
    @GetMapping(value = "/dupMemChk")
    public HashMap<String, Object> dupMemChk(SYSMemDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 회원ID 중복검사 시작 : domain(userId : {})", domain.getUserId());

        HashMap<String, Object> rtn = new HashMap<>();
        int result = 0;
        try {
            result = sysMemRepo.SELECT_CHK_MEM_ID(domain);
            rtn.put("result", result);
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 회원ID 중복검사 오류 : {}", e.getMessage());
        }

        LOG.info("▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶ 회원ID 중복검사 완료 : (result : {})", result);
        return rtn;
    }

    /* 회원등록 */
    @Transactional
    @PostMapping(value = "/insertMem")
    public HashMap<String, Object> insertMem(@RequestBody SYSMemDomain domain, HttpSession session) throws Exception {

        LOG.info("■■■■■■■■■■■■■■■ 회원 등록 시작 ");
        HashMap<String, Object> rtn = new HashMap<String, Object>();

        try {
            String sha256MemPwd = sha256Encrypt.getHex(domain.getMemPwd(), domain.getUserId());
            domain.setMemPwd(sha256MemPwd);
            int result = 0;
            if(domain.getUserId() != null || domain.getMemPwd() != null) {
                result = sysMemRepo.INSERT_SYS_MEM(domain);
            }

            if(result > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");
//
//            if (domain.getUserId() != null && domain.getUserId().length() > 0) {
//                // 회원이 소유한 모든 상점 공백 처리
//                sysMemRepo.UPDATE_SYS_STORE_RESET_OWNER(domain.getUserId());
//
//                // 신규로 등록한 상점으로 업데이트
//                if (domain.getStoreList() != null) {
//                    for (Map<String, String> m : domain.getStoreList()) {
//                        Map<String, String> map = new HashMap<>();
//                        map.put("userId", domain.getUserId());
//                        map.put("storeCode", m.get("storeCode").toString());
//                        sysMemRepo.UPDATE_SYS_MEM_WITH_STORE(map);
//                    }
//                }
//            }
        } catch (SQLException e) {
            LOG.error("■■■■■■■■■■■■■■■ 회원 등록 요청 SQL 오류 : {}", e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 회원 등록 오류 : {}", e.getMessage());
        }

        return rtn;
    }

    /* 회원상세조회 */
    @PostMapping("/selectMem")
    public HashMap<String, Object> selectMem(@RequestBody SYSMemDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 회원 상세목록 요청 시작 : domain(userId : {})", domain.getUserId());
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("content", sysMemRepo.SELECT_SYS_MEM(domain));
            rtn.put("result", "success");
        } catch (Exception e){
            LOG.error("■■■■■■■■■■■■■■■ 회원 목록 요청 오류 : {}", e.getMessage());
            rtn.put("result", "fail");
            e.printStackTrace();
        }

        LOG.info("▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶ 회원 상세목록 요청 완료");
        return rtn;
    }
    
    /* 회원 수정 */
    @PostMapping("/updateMem")
    public HashMap<String, Object> updateMem(@RequestBody SYSMemDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 회원 수정 요청 시작 : domain(userId : {})", domain.getUserId());
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            if (!StringUtils.isEmpty(domain.getMemPwd())) {
                String sha256MemPwd = sha256Encrypt.getHex(domain.getMemPwd(), domain.getUserId());
                domain.setMemPwd(sha256MemPwd);
            }

            int result = sysMemRepo.UPDATE_SYS_MEM(domain);
            if(result > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");

        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 회원 수정 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
            ex.printStackTrace();
        }

        return rtn;
    }

    @PostMapping("/deleteMem")
    public HashMap<String, Object> deleteMem(@RequestBody SYSMemDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 회원 영구 삭제 요청 시작 : domain(userId : {})", domain.getUserId());
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            int result = 0;
            if(domain.getUserId() != null) {
                result = sysMemRepo.DELETE_SYS_MEM(domain);
            }

            if(result > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 회원 영구 삭제 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
            ex.printStackTrace();
        }

        return rtn;
    }
}