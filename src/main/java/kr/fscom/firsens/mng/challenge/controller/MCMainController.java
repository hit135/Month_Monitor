package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.mng.challenge.repository.MCMainRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.time.ZoneId;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author : jjm
 * @version 1.0
 * @FileName : MMainController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-06    jjm        최초 생성
 *
 * </pre>
 * @since : 2021-07-06
 */

@RestController
@RequestMapping("/mng")
public class MCMainController {

    private static final Logger LOG = LoggerFactory.getLogger(MCMainController.class);
    private final MCMainRepo mcMainRepo;
    
    @Autowired
    public MCMainController(MCMainRepo mcMainRepo) {
        this.mcMainRepo = mcMainRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;
    
    /**
     * @Method Name : mcmPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 메인 화면 이동
     * @return ModelAndView
     */
    @RequestMapping(value = "/main")
    public ModelAndView mcmPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mc_main");

        try {
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mcmArea
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 현황 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/mainArea")
    public ModelAndView mcmArea(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mc_main_area");

        try {
            mav.addObject("prm_panel_index", req.getParameter("panel_index"));
            mav.addObject("prm_areacode", req.getParameter("areacode"));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mcmSensorCount
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 종합 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/sensorCountAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmSensorCount(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mcMainRepo.LIST_MCM_SENSOR_CNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmAreaList
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 구별, 시장별 센서 현황 조회 (상점, 센서, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmAreaList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mcMainRepo.LIST_MCM_AREA(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmSensorList
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상태이상 센서 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/sensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmSensorList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mcMainRepo.LIST_MCM_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmAreaSensorCount
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaSensorCountAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmAreaSensorCount(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mcMainRepo.LIST_MCM_AREA_SENSOR_CNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmAreaStoreList
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 내 상점 현황 조회 (경고, 주의, 끊김, 센서)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaStoreListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmAreaStoreList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mcMainRepo.LIST_MCM_AREA_STORE(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmAreaSensorList
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 내 센서 현황 조회 (경고, 주의, 끊김, 점검)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaSensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mcmAreaSensorList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));

            return mcMainRepo.LIST_MCM_AREA_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmStoreSearch
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 검색 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/storeSearchAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmStoreSearch(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("search", req.getParameter("search"));
            return mcMainRepo.LIST_MCM_STORE_SEARCH(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mcmCheckSensorList
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검내역 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/checkSensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmCheckSensorList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mcMainRepo.LIST_MCM_CHECK_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mainAreaDataChart
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mcMainRepo.LIST_MCM_AREA_DATA_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaLogChart
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 경보 발생 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaLogChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaLogChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mcMainRepo.LIST_MCM_AREA_LOG_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaDataChart
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mcMainRepo.LIST_MCM_AREA_DATA_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mcmAreaDataAndLogChart
     * @작성일 : 2021-11-17
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 어제/오늘 데이터 및 경보 발생 추이
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mainAreaDataAndLogChartAjax")
    @ResponseBody
    public HashMap<String, Object> mcmAreaDataAndLogChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            rtn.put("log", mcMainRepo.LIST_MCM_AREA_LOG_CHART(prm));
            rtn.put("data", mcMainRepo.LIST_MCM_AREA_DATA_CHART(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mainAreaDataChartWeek
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartWeekAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChartWeek(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mcMainRepo.LIST_MCM_AREA_DATA_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaLogChartWeek
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 이벤트 경보 발생 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaLogChartWeekAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaLogChartWeek(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mcMainRepo.LIST_MCM_AREA_LOG_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mcmAreaDataAndLogChartWeek
     * @작성일 : 2021-11-17
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 데이터 및 경보 발생 추이
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mainAreaDataAndLogChartWeekAjax")
    @ResponseBody
    public HashMap<String,Object> mcmAreaDataAndLogChartWeek(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));

            rtn.put("log", mcMainRepo.LIST_MCM_AREA_LOG_CHART_WEEK(prm));
            rtn.put("data", mcMainRepo.LIST_MCM_AREA_DATA_CHART_WEEK(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mcmAreaMapSensorList
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 지도 정보
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/mainAreaMapSensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcmAreaMapSensorList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mcMainRepo.LIST_MCM_AREA_MAP_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

}
