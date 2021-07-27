package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.mng.repository.MMainRepo;
import kr.fscom.firsens.mng.repository.MStoreRepo;
import kr.fscom.firsens.mng.repository.MSyncRepo;
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
public class MSyncController {

    private static final Logger LOG = LoggerFactory.getLogger(MSyncController.class);
    private final MStoreRepo storeRepo;
    private final MSyncRepo syncRepo;

    @Autowired
    public MSyncController(MStoreRepo storerepo, MSyncRepo syncrepo) {
        this.storeRepo = storerepo;
        this.syncRepo = syncrepo;
    }

    @RequestMapping(value="/sync")
    public ModelAndView sync(HttpServletRequest req) {
        ModelAndView mav = new ModelAndView("mng/m_sync");
        return mav;
    }

    @RequestMapping(value="/dataCntListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataCntListAjax(HttpServletRequest req) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("regdt", regdt);
            if(!StringUtils.isEmpty(regdt)) {
                HashMap<String, Object> tbl_info = storeRepo.SELECT_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            }
            return syncRepo.SELECT_DATA_CNT_LIST(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value="/sensorDataCntListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> sensorDataCntListAjax(HttpServletRequest req) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("regdt", regdt);
            if(!StringUtils.isEmpty(regdt)) {
                HashMap<String, Object> tbl_info = storeRepo.SELECT_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            }
            return syncRepo.SELECT_SENSOR_DATA_CNT_LIST(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }

    @RequestMapping(value = "/requestSyncAjax")
    @ResponseBody
    public String requestSyncAjax(
        HttpServletRequest req
    ) {
        HashMap<String, Object> prm = new HashMap<String, Object>();
        try {
            prm.put("snsrid", req.getParameter("snsrid"));
            prm.put("reqcont", req.getParameter("reqcont"));
            syncRepo.INSERT_SENSOR_CHECK(prm);
            return "success";
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }
        return null;
    }
}