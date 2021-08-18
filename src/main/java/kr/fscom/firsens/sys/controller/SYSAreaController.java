package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;

import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.net.MalformedURLException;
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
    public SYSAreaController(SYSAreaRepo sysAreaRepo) {
        this.sysAreaRepo = sysAreaRepo;
    }

    @GetMapping("/areas")
    public HashMap<String, Object> listPageArea(SYSAreaDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역 목록 요청 시작 : (SYSAreaDomain : {})", domain);

        HashMap<String, Object> rtn = new HashMap<>();
        String result = "fail";

        try {
            JSONArray jsonList = JSONArray.fromObject(getAreaListTree(sysAreaRepo.SELECT_LIST_SYS_AREA(domain), "0"));
            rtn.put("resultList", jsonList);
            result = "success";
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 목록 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 목록 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @PostMapping("/insertLvAreaItem")
    public HashMap<String, Object> insertLvAreaItem(@RequestBody SYSAreaDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역 등록 요청 시작");

        HashMap<String, Object> rtn = new HashMap<>();
        String result = "fail";

        try {
            if (sysAreaRepo.CHECK_SYS_AREA_CODE(domain.getAreaCode()) > 0)
                result = "duplicate";
            else if (sysAreaRepo.INSERT_SYS_LEVEL_AREA_ITEM(domain) > 0)
                result = "success";
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 등록 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 등록 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @GetMapping("/selectAreaItem")
    public HashMap<String, Object> selectAreaItem(SYSAreaDomain sysAreaDomain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역 조회 요청 시작 : (SYSAreaDomain : {})", sysAreaDomain);

        HashMap<String, Object> rtn = new HashMap<>();
        String result = "fail";

        try {
            if (!StringUtils.isEmptyOrWhitespace(sysAreaDomain.getAreaCode())) {
                rtn.put("content", sysAreaRepo.SELECT_ONE_SYS_AREA_ITEM(sysAreaDomain.getAreaCode()));
                result = "success";
            }
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 조회 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 조회 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @PostMapping("/updateAreaItem")
    public HashMap<String, Object> updateAreaItem(@RequestBody SYSAreaDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역 수정 요청 시작 : (aareaCode : {})", domain.getAreaCode());

        HashMap<String, Object> rtn = new HashMap<>();
        String result = "fail";

        try {
            int dupCnt = 0;
            if (!domain.getPrevAreaCode().equals(domain.getAreaCode()))
               dupCnt = sysAreaRepo.CHECK_SYS_AREA_CODE(domain.getAreaCode());

            if (dupCnt > 0) {
                result = "duplicate";
            } else {
                int updateLevelArea = sysAreaRepo.UPDATE_SYS_LEVEL_AREA_ITEM(domain);
                if (domain.getAreaOrderUpdate())
                    sysAreaRepo.UPDATE_SYS_AREA_ORDER(domain);   // area 재정렬
                if (updateLevelArea > 0)
                    result = "success";
            }
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 수정 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 수정 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @PostMapping("/deleteAreaItem")
    public HashMap<String, Object> deleteAreaItem(@RequestBody SYSAreaDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역 삭제 요청 시작 : (aareaCode : {})", domain.getAreaCode());

        HashMap<String, Object> rtn = new HashMap<>();
        String result = "fail";

        try {
            if (sysAreaRepo.DELETE_SYS_LEVEL_AREA_ITEM(domain) > 0)
                result = "success";
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 삭제 요청 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역 삭제 요청 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    @GetMapping("/dupAreaChk")
    public HashMap<String, Object> checkDuplicateAreaCode(SYSAreaDomain domain) throws Exception {
        LOG.info("■■■■■■■■■■■■■■■ 구역코드 중복검사 시작 : (areaCode : {})", domain.getAreaCode());

        HashMap<String, Object> rtn = new HashMap<>();
        int result = 0;

        try {
            result = sysAreaRepo.CHECK_SYS_AREA_CODE(domain.getAreaCode());
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역코드 중복검사 SQL 오류 : {}", ex.getMessage());
        } catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 구역코드 중복검사 오류 : {}", ex.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    // 트리구조 형태 파싱
    public List<SYSAreaDomain> getAreaListTree(List<SYSAreaDomain> models, String parentCode) throws MalformedURLException {
        List<SYSAreaDomain> list = new ArrayList<>();

        for (SYSAreaDomain model : models) {
            if (model.getUpAreaCode().equals(parentCode)) {
                List<SYSAreaDomain> children = getAreaListTree(models, model.getAreaCode());
                if (children.size() > 0)
                    model.setChildren(children);

                list.add(model);
            }
        }

        return list;
    }

}