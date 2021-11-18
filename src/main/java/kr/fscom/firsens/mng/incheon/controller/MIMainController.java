package kr.fscom.firsens.mng.incheon.controller;

import kr.fscom.firsens.mng.incheon.repository.MIMainRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/mng/incheon")
public class MIMainController {

    private static final Logger LOG = LoggerFactory.getLogger(MIMainController.class);
    private final MIMainRepo miMainRepo;

    @Autowired
    public MIMainController(MIMainRepo miMainRepo) {
        this.miMainRepo = miMainRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;

    /**
     * @Method Name : mimPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 인천 종합비즈니스센터 관제화면 이동
     * @return ModelAndView
     */
    @RequestMapping(value = "/main")
    public ModelAndView mimPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/incheon/mi_main");

        try {
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

}
