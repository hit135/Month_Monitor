package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.mng.repository.MMainRepo;

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
public class MMainController {

    private static final Logger LOG = LoggerFactory.getLogger(MMainController.class);
    private final MMainRepo mainRepo;
    
    @Autowired
    public MMainController(MMainRepo repo) {
        this.mainRepo = repo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;
    
    /**
     * @Method Name : main
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 메인 화면 이동
     * @return ModelAndView
     */
    @RequestMapping(value = "/main")
    public ModelAndView main(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_main");

        try {
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mainArea
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/mainArea")
    public ModelAndView mainArea(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_main_area");

        try {
            mav.addObject("prm_panel_index", req.getParameter("panel_index"));
            mav.addObject("prm_areacode", req.getParameter("areacode"));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : sensorCountAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 종합 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/sensorCountAjax")
    @ResponseBody
    public List<HashMap<String, Object>> sensorCountAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.LIST_MM_SENSOR_CNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : areaListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 구별, 시장별 센서 현황 조회 (상점, 센서, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> areaListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.LIST_MM_AREA(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : sensorListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상태이상 센서 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/sensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> sensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.LIST_MM_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : areaSensorCountAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaSensorCountAjax")
    @ResponseBody
    public List<HashMap<String, Object>> areaSensorCountAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.LIST_MM_AREA_SENSOR_CNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : areaStoreListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 내 상점 현황 조회 (경고, 주의, 끊김, 센서)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaStoreListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> areaStoreListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.LIST_MM_AREA_STORE(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : areaSensorListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 내 센서 현황 조회 (경고, 주의, 끊김, 점검)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/areaSensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> areaSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));

            return mainRepo.LIST_MM_AREA_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : storeSearchAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 검색 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/storeSearchAjax")
    @ResponseBody
    public List<HashMap<String, Object>> storeSearchAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("search", req.getParameter("search"));
            return mainRepo.LIST_MM_STORE_SEARCH(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : checkSensorListAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검내역 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/checkSensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> checkSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.LIST_MM_CHECK_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : mainAreaDataChartAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mainRepo.LIST_MM_AREA_DATA_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaLogChartAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 경보 발생 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaLogChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaLogChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mainRepo.LIST_MM_AREA_LOG_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaDataChartAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 어제와 오늘 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            return mainRepo.LIST_MM_AREA_DATA_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaDataAndLogChartAjax
     * @작성일 : 2021-11-17
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 어제/오늘 데이터 및 경보 발생 추이
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mainAreaDataAndLogChartAjax")
    @ResponseBody
    public HashMap<String, Object> mainAreaDataAndLogChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("day", new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());

            rtn.put("log", mainRepo.LIST_MM_AREA_LOG_CHART(prm));
            rtn.put("data", mainRepo.LIST_MM_AREA_DATA_CHART(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mainAreaDataChartWeekAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 데이터 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaDataChartWeekAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaDataChartWeekAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.LIST_MM_AREA_DATA_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaLogChartWeekAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 이벤트 경보 발생 추이
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/mainAreaLogChartWeekAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaLogChartWeekAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.LIST_MM_AREA_LOG_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mainAreaDataAndLogChartWeekAjax
     * @작성일 : 2021-11-17
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 시장별 주간 데이터 및 경보 발생 추이
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mainAreaDataAndLogChartWeekAjax")
    @ResponseBody
    public HashMap<String,Object> mainAreaDataAndLogChartWeekAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));

            rtn.put("log", mainRepo.LIST_MM_AREA_LOG_CHART_WEEK(prm));
            rtn.put("data", mainRepo.LIST_MM_AREA_DATA_CHART_WEEK(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mainAreaMapSensorListAjax
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 지도 정보
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/mainAreaMapSensorListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mainAreaMapSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.LIST_MM_AREA_MAP_SENSOR(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

}
