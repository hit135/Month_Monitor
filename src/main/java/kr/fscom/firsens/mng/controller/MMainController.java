package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.mng.repository.MMainRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

/**
 * 설명
 *
 * @author : jjm
 * @version 1.0
 * @FileName : MMainController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-06   jjm       최초 생성
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

    @RequestMapping(value="/main")
    public ModelAndView main(HttpServletRequest req) {
        ModelAndView mav = new ModelAndView("mng/m_main");
        return mav;
    }

    @RequestMapping(value="/mainArea")
    public ModelAndView mainArea(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_main_area");

        try {
            String panel_index = req.getParameter("panel_index");
            String areacode = req.getParameter("areacode");
            mav.addObject("prm_panel_index", panel_index);
            mav.addObject("prm_areacode", areacode);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    @RequestMapping(value="/sensorCountAjax")
    @ResponseBody
    public List<HashMap<String,Object>> sensorCountAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.SELECT_SENSOR_COUNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/areaListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> areaListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.SELECT_AREA_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/sensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> sensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.SELECT_SENSOR_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/areaSensorCountAjax")
    @ResponseBody
    public List<HashMap<String,Object>> areaSensorCountAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_AREA_SENSOR_COUNT(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/areaStoreListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> areaStoreListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_AREA_STORE_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/areaSensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> areaSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            return mainRepo.SELECT_AREA_SENSOR_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/storeSearchAjax")
    @ResponseBody
    public List<HashMap<String,Object>> storeSearchAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("search", req.getParameter("search"));
            return mainRepo.SELECT_STORE_SEARCH(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/checkSensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> checkSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            return mainRepo.SELECT_CHECK_SENSOR_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/mainAreaDataChartAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaDataChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_MAIN_AREA_DATA_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/mainAreaLogChartAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaLogChartAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_MAIN_AREA_LOG_CHART(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/mainAreaDataChartWeekAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaDataChartWeekAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_MAIN_AREA_DATA_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/mainAreaLogChartWeekAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaLogChartWeekAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_MAIN_AREA_LOG_CHART_WEEK(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/mainAreaMapSensorListAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mainAreaMapSensorListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            return mainRepo.SELECT_MAIN_AREA_MAP_SENSOR_LIST(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

}
