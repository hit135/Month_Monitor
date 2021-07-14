package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.mng.repository.MStoreRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
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
 * @FileName : MStoreController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-07   jjm       최초 생성
 *
 * </pre>
 * @since : 2021-07-07
 */
@RestController
@RequestMapping("/mng")
public class MStoreController {

    private static final Logger LOG = LoggerFactory.getLogger(MStoreController.class);
    private final MStoreRepo storeRepo;

    @Autowired
    public MStoreController(MStoreRepo repo) {
        this.storeRepo = repo;
    }

    @RequestMapping(value="/storeInfo")
    public ModelAndView storeInfo(HttpServletRequest req) {
        ModelAndView mav = new ModelAndView("mng/m_store_info");
        String areacode = req.getParameter("areacode");
        String strcode = req.getParameter("strcode");
        String snsrid = req.getParameter("snsrid");
        if(StringUtils.isEmpty(strcode)) {
            String[] code = getAreaStoreCode(snsrid);
            areacode = code[0];
            strcode = code[1];
        }
        if(StringUtils.isEmpty(snsrid)) {
            String[] code = getAreaSensorCode(strcode);
            areacode = code[0];
            snsrid = code[1];
        }
        mav.addObject("prm_areacode", areacode);
        mav.addObject("prm_strcode", strcode);
        mav.addObject("prm_snsrid", snsrid);
        return mav;
    }

    @RequestMapping(value="/storeInfoAjax")
    @ResponseBody
    public List<HashMap<String,Object>> storeInfoAjax(HttpServletRequest req) {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            prm.put("snsrid", req.getParameter("snsrid"));
            return storeRepo.SELECT_STORE_INFO(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value="/storeLog")
    public ModelAndView storeLog(HttpServletRequest req) {
        ModelAndView mav = new ModelAndView("mng/m_store_log");
        String areacode = req.getParameter("areacode");
        String strcode = req.getParameter("strcode");
        String snsrid = req.getParameter("snsrid");
        if(StringUtils.isEmpty(strcode)) {
            String[] code = getAreaStoreCode(snsrid);
            areacode = code[0];
            strcode = code[1];
        }
        mav.addObject("prm_areacode", areacode);
        mav.addObject("prm_strcode", strcode);
        mav.addObject("prm_snsrid", snsrid);
        mav.addObject("prm_regdate", req.getParameter("regdate"));
        mav.addObject("prm_checktype", req.getParameter("checktype"));
        return mav;
    }

    @RequestMapping(value="/storeChart")
    public ModelAndView storeChart(HttpServletRequest req) {
        ModelAndView mav = new ModelAndView("mng/m_store_chart");
        String areacode = req.getParameter("areacode");
        String strcode = req.getParameter("strcode");
        String snsrid = req.getParameter("snsrid");
        if(StringUtils.isEmpty(strcode)) {
            String[] code = getAreaStoreCode(snsrid);
            areacode = code[0];
            strcode = code[1];
        }
        if(StringUtils.isEmpty(snsrid)) {
            String[] code = getAreaSensorCode(strcode);
            areacode = code[0];
            snsrid = code[1];
        }
        mav.addObject("prm_areacode", areacode);
        mav.addObject("prm_strcode", strcode);
        mav.addObject("prm_snsrid", snsrid);
        mav.addObject("prm_regdate", req.getParameter("regdate"));
        mav.addObject("prm_almtype", req.getParameter("almtype"));
        return mav;
    }

    @RequestMapping(value = "/listStoreSensor")
    @ResponseBody
    public List<HashMap<String, Object>> listStoreSensor(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            return storeRepo.SELECT_LIST_STORE_SENSOR(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/listStoreSensorData")
    @ResponseBody
    public List<HashMap<String, Object>> listStoreSensorData(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            String termtype = ("m".equals(req.getParameter("termtype"))) ? "m" : "d";
            String datatype = req.getParameter("datatype");
            String strcode = req.getParameter("strcode");
            String regdt = req.getParameter("regdt");
            String snsrid = req.getParameter("snsrid");
            String order = req.getParameter("order");
            String dtsize = req.getParameter("dtsize");
            if (regdt.length() == 7) regdt += "-01";
            if ("desc".equals(order)) prm.put("order", "DESC");
            else prm.put("order", "ASC");
            if (dtsize == null) dtsize = "1";
            prm.put("regdt", regdt);
            HashMap<String, Object> tbl_info = storeRepo.SELECT_EVENT_TABLE_INFO(prm);
            prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            snsrid = ("TOTAL".equals(snsrid)) ? null : snsrid;
            prm.put("termtype", termtype);
            prm.put("datatype", datatype);
            prm.put("strcode", strcode);
            prm.put("snsrid", snsrid);
            prm.put("dtsize", dtsize);
            return storeRepo.SELECT_STORE_SENSOR_DATA(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/listSensorAjax")
    @ResponseBody
    public List<HashMap<String, Object>> listSensorAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            return storeRepo.SELECT_LIST_SENSOR(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/storeImgAjax")
    @ResponseBody
    public List<HashMap<String, Object>> storeImgAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            prm.put("strcode", req.getParameter("strcode"));
            return storeRepo.SELECT_STORE_IMG(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/dataLogListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataLogListAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");
            if(!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);
                HashMap<String, Object> tbl_info = storeRepo.SELECT_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }
            prm.put("strcode", req.getParameter("strcode"));
            return storeRepo.SELECT_DATA_LOG_LIST(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/sensorUsekwhMonthAjax")
    @ResponseBody
    public List<HashMap<String, Object>> sensorUsekwhMonthAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");
            if(!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);
                HashMap<String, Object> tbl_info = storeRepo.SELECT_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }
            prm.put("snsrid", req.getParameter("snsrid"));
            return storeRepo.SELECT_SENSOR_USEKWH_MONTH(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }
    @RequestMapping(value = "/logWeekStatAjax")
    @ResponseBody
    public List<HashMap<String, Object>> logWeekStatAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            prm.put("strcode", req.getParameter("strcode"));
            return storeRepo.SELECT_LOG_WEEK_STAT(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    private String[] getAreaStoreCode(String snsrid) {
        String[] ret = new String[2];
        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("snsrid", snsrid);
            List<HashMap<String, Object>> store = storeRepo.SELECT_STORE_INFO(prm);
            ret[0] = (String) store.get(0).get("AREACODE");
            ret[1] = (String) store.get(0).get("STRCODE");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return ret;
    }

    private String[] getAreaSensorCode(String strcode) {
        String[] ret = new String[2];
        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("strcode", strcode);
            List<HashMap<String, Object>> sensor = storeRepo.SELECT_SENSOR_INFO(prm);
            ret[0] = (String) sensor.get(0).get("AREACODE");
            ret[1] = (String) sensor.get(0).get("SNSRID");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return ret;
    }
}
