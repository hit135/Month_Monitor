package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public SYSAreaController(SYSAreaRepo sysAreaRepo) { this.sysAreaRepo = sysAreaRepo; }

    @GetMapping("/areas")
    public HashMap<String, Object> listPageArea(SYSAreaDomain domain, int page, int size, String searchWrd, String isUse,
                                                String delYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            JSONArray jsonList = JSONArray.fromObject( getAreaListTree( sysAreaRepo.SELECT_LIST_SYS_AREA(domain), "0") );
            rtn.put("resultList", jsonList);
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

    @PostMapping("/insertLvAreaItem")
    public HashMap<String, Object> insertLvAreaItem(@RequestBody SYSAreaDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            int insertLevelArea = sysAreaRepo.INSERT_SYS_LEVEL_AREA_ITEM(domain);
            if(insertLevelArea > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @GetMapping("/selectAreaItem")
    public HashMap<String, Object> selectAreaItem(SYSAreaDomain sysAreaDomain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            if(!sysAreaDomain.getAreaCode().equals("")) {
                rtn.put("content", sysAreaRepo.SELECT_ONE_SYS_AREA_ITEM(sysAreaDomain.getAreaCode()));
                rtn.put("result", "success");
            } else {
                rtn.put("result", "fail");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @PostMapping("/deleteAreaItem")
    public HashMap<String, Object> deleteAreaItem(@RequestBody SYSAreaDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            int deleteLevelArea = sysAreaRepo.DELETE_SYS_LEVEL_AREA_ITEM(domain);
            if(deleteLevelArea > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @PostMapping
    public HashMap<String, Object> checkDuplicateAreaCode() throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {

        } catch (Exception ex) {
            ex.printStackTrace();
            rtn.put("result", "fail");
        }

        return rtn;
    }

    // 트리구조 형태 파싱
    public List<SYSAreaDomain> getAreaListTree(List<SYSAreaDomain> models, String parentCode ) throws MalformedURLException {
        List<SYSAreaDomain> list = new ArrayList<>();

        for( SYSAreaDomain model : models ) {
            if( model.getUpAreaCode().equals( parentCode )) {
                List<SYSAreaDomain> children = getAreaListTree( models, model.getAreaCode());
                if( children.size() > 0 ) {
                    model.setChildren( children );
                }

                list.add( model );
            }
        }

        return list;
    }
}