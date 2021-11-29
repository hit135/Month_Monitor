package kr.fscom.firsens.mng.incheon.controller;

import kr.fscom.firsens.mng.incheon.repository.MIMainRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

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
     * @작성자 : uhm
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

    /**
     * @Method Name : mimTodayTotal
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 종합 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayTotalAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mimTodayTotal(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return miMainRepo.LIST_MIM_TODAY_TOTAL(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mimArea
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/mainArea")
    public ModelAndView mimArea(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/incheon/mi_main_area");

        try {
            mav.addObject("prm_panel_index", req.getParameter("panel_index"));
            mav.addObject("prm_areacode", req.getParameter("areacode"));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mimTodayGuArea
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 구별, 시장별 현황 조회 (상점, 센서, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayGuAreaAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mimTodayGuArea(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return miMainRepo.LIST_MIM_TODAY_GU_AREA(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmTodayChkSnsr
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검내역 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayChkSnsrAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmTodayChkSnsr(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return miMainRepo.LIST_MIM_TODAY_CHK_SNSR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mimTodayAbnormalSnsr
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 상태이상 센서 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAbnormalSnsrAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mimTodayAbnormalSnsr(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return miMainRepo.LIST_MIM_TODAY_ABNOMAL_SNSR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mimTodayArea
     * @작성일 : 2021-11-22
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/areaSensorCountAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mimTodayArea(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return miMainRepo.LIST_MIM_TODAY_AREA(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mimAreaDataAndLogChart
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 어제/오늘 데이터 및 경보 발생 추이
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mainAreaDataAndLogChartAjax")
    @ResponseBody
    public HashMap<String, Object> mimAreaDataAndLogChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            rtn.put("log", miMainRepo.LIST_MIM_AREA_LOG_CHART(prm));
            rtn.put("data", miMainRepo.LIST_MIM_AREA_DATA_CHART(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mimCurrSnsrState
     * @작성일 : 2021-11-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 분전반 센서 상태 현황
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/currSnsrStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mimCurrSnsrState(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return miMainRepo.LIST_MIM_CURR_SNSR_STATE(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mimCurrSnsrInfo
     * @작성일 : 2021-11-29
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 분전반 기본 정보 (심상별 및 분기별 기본 정보)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/currSnsrInfoAjax")
    @ResponseBody
    public HashMap<String, Object> mimCurrSnsrInfo(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        try {
            HashMap<String, Object> prm = new HashMap<>();
            rtn.put("resultRstList", miMainRepo.LIST_MIM_CURR_SNSR_RST_DATA(prm));
            rtn.put("resultSnsrList", miMainRepo.LIST_MIM_CURR_SNSR_DATA(prm));

            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }



}
