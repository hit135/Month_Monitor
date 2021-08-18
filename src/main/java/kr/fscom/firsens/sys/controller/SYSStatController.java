package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSStatRepo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class SYSStatController {
    private final SYSStatRepo sysStatRepo;

    @Autowired
    SYSStatController(SYSStatRepo sysStatRepo) { this.sysStatRepo = sysStatRepo; }

    @GetMapping("/selectGroup")
    public HashMap<String, Object> selectGroup(String type) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            if(type.equals("guCode")) {
                rtn.put("resultList", sysStatRepo.SELECT_TYPE_GUCODE());
            } else {
                rtn.put("resultList", sysStatRepo.SELECT_TYPE_AREACODE());
            }
            rtn.put("result", "success");
        } catch (Exception ex) {
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @GetMapping(value = "/statInfo")
    public HashMap<String, Object> statInfo(String type, String guCode, String areaCode) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            if(type.equals("guCode"))
                rtn.put("resultList", sysStatRepo.SELECT_SYS_STAT_GU_INFO_STAT(guCode));
            else
                rtn.put("resultList", sysStatRepo.SELECT_SYS_STAT_AREA_INFO_STAT(areaCode));
            rtn.put("result", "success");
        } catch (Exception e) {
            rtn.put("result", "fail");
        }

        return rtn;
    }



}
