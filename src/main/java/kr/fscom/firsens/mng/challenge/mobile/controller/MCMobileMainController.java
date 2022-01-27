package kr.fscom.firsens.mng.challenge.mobile.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * @author : uhm
 * @version 1.0
 * @FileName : MCMMainController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2022-01-27    uhm        최초 생성
 *
 * </pre>
 * @since : 2022-01-27
 */

@RestController
@RequestMapping("/mng/mobile")
public class MCMobileMainController {

    private static final Logger LOG = LoggerFactory.getLogger(MCMobileMainController.class);

    @Autowired
    public MCMobileMainController() { }

    @Value("${globals.naver.clientId}")
    private String naverClientId;

    @RequestMapping(value = "/main")
    public ModelAndView mcmmPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mobile/mc_mobile_main");

        try {
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    
}
