package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.mng.challenge.repository.MCToolRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/tool")
public class MCToolController {

    private static final Logger LOG = LoggerFactory.getLogger(MCToolController.class);
    private final MCToolRepo mcToolRepo;
    
    @Autowired
    public MCToolController(MCToolRepo mcToolRepo) {
        this.mcToolRepo = mcToolRepo;
    }

    @RequestMapping(value = "/tagging")
    public ModelAndView tagging(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/tool/tool_data_tagging");

        try {

        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    @RequestMapping(value = "/dataYearAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataYearAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            return mcToolRepo.LIST_DATA_YEAR(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/dataMonthAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataMonthAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            prm.put("year", req.getParameter("year"));
            return mcToolRepo.LIST_DATA_MONTH(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/dataDateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataDateAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            prm.put("year", req.getParameter("year"));
            prm.put("month", req.getParameter("month"));
            return mcToolRepo.LIST_DATA_DATE(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/dataSensorAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataSensorAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            prm.put("sdate", req.getParameter("sdate"));
            return mcToolRepo.LIST_DATA_SENSOR(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

    //    20230317WJH
    @RequestMapping(value = "/Analysis_ListEvtChart")
    @ResponseBody
    public List<HashMap<String, Object>> Analysis_ListEvtChart(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            prm.put("snsrId", req.getParameter("snsrId"));
            prm.put("date", req.getParameter("getDate"));
            return mcToolRepo.ANALYSIS_LIST_SNSR_EVT_CHART(prm);                   // 이미지 AREA 목록
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : tag_ListElectricityData
     * @작성일 : 2023-03-22
     * @작성자 : Wang Ji Hyong
     * @변경이력 :
     * @Method 설명 : mcstListStoreSensorData 기간 내 센서 측정 평균 데이터 조회의 쿼리를 카피함.
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/listElectricityData")
    @ResponseBody
    public List<HashMap<String, Object>> tag_ListElectricityData(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String termtype = ("m".equals(req.getParameter("termtype"))) ? "m" : "d";
            String datatype = req.getParameter("datatype");
            String strcode = req.getParameter("strcode");
            String regdt = req.getParameter("regdt");
            String snsrid = req.getParameter("snsrid");
            String order = req.getParameter("order");
            String dtsize = req.getParameter("dtsize");

            if (regdt != null && regdt.length() == 7)
                regdt += "-01";

            prm.put("order", "desc".equals(order) ? "DESC" : "ASC");

            if (dtsize == null)
                dtsize = "1";

            prm.put("regdt", regdt);

            HashMap<String, Object> tbl_info = mcToolRepo.TAG_SELECT_F_SENSOR_DATA_INFO(prm);
            prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            prm.put("termtype", termtype);
            prm.put("datatype", datatype);
            prm.put("strcode", strcode);

            snsrid = ("TOTAL".equals(snsrid)) ? null : snsrid;
            prm.put("snsrid", snsrid);
            prm.put("dtsize", dtsize);

            return mcToolRepo.TAG_LIST_STORE_SENSOR_DATA(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }


    /**
     * @Method Name : TaggingDataSaveAjax
     * @작성일 : 2023-03-21
     * @작성자 : Wang Ji Hyeong
     * @변경이력 :
     * @Method 설명 : 태킹 데이터 저장
     * @return String
     */
    @RequestMapping(value = "/taggingDataSaveAjax")
    @ResponseBody
    public String TaggingDataSaveAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            mcToolRepo.TAG_INSERT_TAGGING_DATA_SAVE(prm);
            return "success";
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : TaggingDataLoadAjax
     * @작성일 : 2023-03-22
     * @작성자 : Wang Ji Hyeong
     * @변경이력 :
     * @Method 설명 : 태킹 데이터 리스트 불러오기
     * @return String
     */
    @RequestMapping(value = "/dataTaggingAjax")
    @ResponseBody
    public List<HashMap<String, Object>> TaggingDataLoadAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();
        try {
            return mcToolRepo.TAG_SELECT_LIST_DATA(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
        return null;
    }

}
