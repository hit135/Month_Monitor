package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class SYSAreaController {
    @PostMapping ("/hello")
    public HashMap<String, Object> axiosTest(@RequestBody SYSAreaDomain sysAreaDomain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        rtn.put("str", "000001");
        return rtn;
    }
}