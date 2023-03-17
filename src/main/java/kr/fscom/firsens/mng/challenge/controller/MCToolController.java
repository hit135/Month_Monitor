package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.mng.challenge.repository.MCToolRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
