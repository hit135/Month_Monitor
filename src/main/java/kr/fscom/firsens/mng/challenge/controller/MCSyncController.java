package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.mng.challenge.repository.MCStoreRepo;
import kr.fscom.firsens.mng.challenge.repository.MCSyncRepo;

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

import org.thymeleaf.util.StringUtils;

/**
 * 설명
 *
 * @author : jjm
 * @version 1.0
 * @FileName : MSyncController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일                수정자            수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-20   jjm       최초 생성
 *
 * </pre>
 * @since : 2021-07-20
 */

@RestController
@RequestMapping("/mng")
public class MCSyncController {

    private static final Logger LOG = LoggerFactory.getLogger(MCSyncController.class);

    private final MCStoreRepo mcStoreRepo;
    private final MCSyncRepo mcSyncRepo;

    @Autowired
    public MCSyncController(MCStoreRepo mcStoreRepo, MCSyncRepo mcSyncRepo) {
        this.mcStoreRepo = mcStoreRepo;
        this.mcSyncRepo = mcSyncRepo;
    }

    @RequestMapping(value="/sync")
    public ModelAndView sync(HttpServletRequest req) {
        return new ModelAndView("mng/challenge/mc_sync");
    }

    @RequestMapping(value="/dataCntListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcsyDataCntListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("regdt", regdt);

            if (!StringUtils.isEmpty(regdt)) {
                HashMap<String, Object> tbl_info = mcStoreRepo.SELECT_MCST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            }

            return mcSyncRepo.LIST_MCSY_DATA_CNT(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value="/sensorDataCntListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcsySensorDataCntListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("regdt", regdt);

            if (!StringUtils.isEmpty(regdt)) {
                HashMap<String, Object> tbl_info = mcStoreRepo.SELECT_MCST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            }

            return mcSyncRepo.LIST_MCSY_SENSOR_DATA_CNT(prm);
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/requestSyncAjax")
    @ResponseBody
    public String mcsyRequestSyncAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("snsrid", req.getParameter("snsrid"));
            prm.put("reqcont", req.getParameter("reqcont"));
            mcSyncRepo.INSERT_MCSY_SENSOR_CHECK(prm);

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

}
