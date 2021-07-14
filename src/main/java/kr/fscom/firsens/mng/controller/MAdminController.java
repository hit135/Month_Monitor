package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.mng.domain.SYSAreaDomain;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class MAdminController {
    @PostMapping ("/hello")
    public HashMap<String, Object> axiosTest(@RequestBody SYSAreaDomain sysAreaDomain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        rtn.put("str", "000001");
        return rtn;
    }
}