package kr.fscom.firsens.mng.incheon.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/mng/incheon/mobile")
public class MIMainMobileController {

    /**
     * @Method Name : mimMobilePage
     * @작성일 : 2021-11-30
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 인천 종합비즈니스센터 모바일 관제화면 이동
     * @return ModelAndView
     */
    @RequestMapping(value = "/main")
    public ModelAndView mimMobilePage(HttpServletRequest req) throws Exception {
        return new ModelAndView("mng/incheon/mi_mobile_main");
    }

}
