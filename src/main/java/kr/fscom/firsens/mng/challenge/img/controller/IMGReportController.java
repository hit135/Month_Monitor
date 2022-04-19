package kr.fscom.firsens.mng.challenge.img.controller;

import kr.fscom.firsens.mng.challenge.img.repository.IMGReportRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.HashMap;

@RestController
@RequestMapping("/img")
public class IMGReportController {

    private static final Logger LOG = LoggerFactory.getLogger(IMGReportController.class);
    private final IMGReportRepo imgReportRepo;

    @Autowired
    IMGReportController(IMGReportRepo imgReportRepo) { this.imgReportRepo = imgReportRepo; }

    @RequestMapping(value = "/reportInfo")
    public HashMap<String, Object> reportInfo(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> paramMap = new HashMap<>();

        try {
            paramMap.put("dateType", "year");
            paramMap.put("startDate", req.getParameter("startDate").split("-")[0]);
            rtn.put("startDate", req.getParameter("startDate").split("-")[0] + "년");

            paramMap.put("areaCode", req.getParameter("areaCode"));

            rtn.put("infoStat", imgReportRepo.SELECT_IMG_REPORT_AREA_INFO_STAT(req.getParameter("areaCode")));
            rtn.put("weekMonthStat", imgReportRepo.LIST_IMG_REPORT_AREA_MONTHLY_STAT(paramMap));
            rtn.put("hourlyStat", imgReportRepo.LIST_IMG_REPORT_AREA_HOURLY_STAT(paramMap));
            rtn.put("dayOfWeekStat", imgReportRepo.LIST_IMG_REPORT_AREA_DAYOFWEEK_STAT(paramMap));

            rtn.put("levelAreaStat", imgReportRepo.LIST_IMG_REPORT_LEVEL_AREA_STAT(paramMap));
            rtn.put("levelStrStat", imgReportRepo.LIST_IMG_REPORT_STR_EVENT_STAT(paramMap));

            rtn.put("result", "success");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
            rtn.put("result", "fail");
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            LOG.debug(ex.getMessage());
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @RequestMapping(value = "/reportInfoList")
    public HashMap<String, Object> reportInfoList(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> paramMap = new HashMap<>();

        try {
            paramMap.put("dateType", "year");
            paramMap.put("startDate", req.getParameter("startDate").split("-")[0]);
            rtn.put("startDate", req.getParameter("startDate").split("-")[0] + "년");

            paramMap.put("areaCode", req.getParameter("areaCode"));

            rtn.put("areaKwhStat", imgReportRepo.SELECT_IMG_REPORT_AREA_KWHIGO_STAT(paramMap));
            rtn.put("areaStrKwhStat", imgReportRepo.LIST_IMG_REPORT_STR_KWH_STAT(paramMap));

            rtn.put("result", "success");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
            rtn.put("result", "fail");
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            LOG.debug(ex.getMessage());
            rtn.put("result", "fail");
        }

        return rtn;
    }

}
