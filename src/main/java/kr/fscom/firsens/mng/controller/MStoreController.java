package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.common.paging.PaginationInfo;
import kr.fscom.firsens.mng.repository.MStoreRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.thymeleaf.util.StringUtils;

/**
 * @author : jjm
 * @version 1.0
 * @FileName : MStoreController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-07    jjm        최초 생성
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

    @Value("${globals.naver.clientId}")
    private String naverClientId;
    
    /**
     * @Method Name : storeInfo
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeInfo")
    public ModelAndView storeInfo(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_store_info");

        try {
            String areacode = req.getParameter("areacode");
            String strcode = req.getParameter("strcode");
            String snsrid = req.getParameter("snsrid");

            if (StringUtils.isEmptyOrWhitespace(strcode)) {
                String[] code = getAreaStoreCode(snsrid);
                areacode = code[0];
                strcode = code[1];
            }

            if (StringUtils.isEmptyOrWhitespace(snsrid))
                snsrid = getSensorCode(areacode, strcode);

            mav.addObject("prm_areacode", areacode);
            mav.addObject("prm_strcode", strcode);
            mav.addObject("prm_snsrid", snsrid);
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : storeInfo
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 이미지 목록 및 상점 내 센서 상태 목록 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/storeInfoAjax")
    @ResponseBody
    public HashMap<String, Object> storeInfoAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));

            rtn.put("store", storeRepo.SELECT_MST_STORE_INFO(prm));
            rtn.put("img", storeRepo.LIST_MST_STORE_IMG(prm));
            rtn.put("sensor", storeRepo.LIST_MST_SENSOR_STATE(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : storeLog
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 경보 발생 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeLog")
    public ModelAndView storeLog(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_store_log");

        try {
            String areacode = req.getParameter("areacode");
            String strcode = req.getParameter("strcode");
            String snsrid = req.getParameter("snsrid");

            if (StringUtils.isEmptyOrWhitespace(strcode)) {
                String[] code = getAreaStoreCode(snsrid);
                areacode = code[0];
                strcode = code[1];
            }

            mav.addObject("prm_areacode", areacode);
            mav.addObject("prm_strcode", strcode);
            mav.addObject("prm_snsrid", snsrid);
            mav.addObject("prm_regdate", req.getParameter("regdate"));
            mav.addObject("prm_checktype", req.getParameter("checktype"));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : storeChart
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 차트 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeChart")
    public ModelAndView storeChart(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/m_store_chart");

        try {
            String areacode = req.getParameter("areacode");
            String strcode = req.getParameter("strcode");
            String snsrid = req.getParameter("snsrid");

            if (StringUtils.isEmptyOrWhitespace(strcode)) {
                String[] code = getAreaStoreCode(snsrid);
                areacode = code[0];
                strcode = code[1];
            }

            if (StringUtils.isEmptyOrWhitespace(snsrid))
                snsrid = getSensorCode(areacode, strcode);

            mav.addObject("prm_areacode", areacode);
            mav.addObject("prm_strcode", strcode);
            mav.addObject("prm_snsrid", snsrid);
            mav.addObject("prm_regdate", req.getParameter("regdate"));
            mav.addObject("prm_almtype", req.getParameter("almtype"));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : listStoreSensor
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 내 센서 목록 조회
     * @return List<HashMap<String, Object>>
     */
    /*
    @RequestMapping(value = "/listStoreSensor")
    @ResponseBody
    public List<HashMap<String, Object>> listStoreSensor(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));

            return storeRepo.SELECT_MST_LIST_MST_STORE_SENSOR(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : listStoreSensorData
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 기간 내 센서 측정 평균 데이터 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/listStoreSensorData")
    @ResponseBody
    public List<HashMap<String, Object>> listStoreSensorData(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String termtype = ("m".equals(req.getParameter("termtype"))) ? "m" : "d";
            String datatype = req.getParameter("datatype");
            String strcode = req.getParameter("strcode");
            String regdt = req.getParameter("regdt");
            String snsrid = req.getParameter("snsrid");
            String order = req.getParameter("order");
            String dtsize = req.getParameter("dtsize");

            if (regdt.length() == 7)
                regdt += "-01";

            prm.put("order", "desc".equals(order) ? "DESC" : "ASC");

            if (dtsize == null)
                dtsize = "1";

            prm.put("regdt", regdt);

            HashMap<String, Object> tbl_info = storeRepo.SELECT_MST_EVENT_TABLE_INFO(prm);
            prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            prm.put("termtype", termtype);
            prm.put("datatype", datatype);
            prm.put("strcode", strcode);

            snsrid = ("TOTAL".equals(snsrid)) ? null : snsrid;
            prm.put("snsrid", snsrid);
            prm.put("dtsize", dtsize);

            return storeRepo.LIST_MST_STORE_SENSOR_DATA(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : dataLogListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 기간 내 센서 경보 발생 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> dataLogListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = storeRepo.SELECT_MST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            prm.put("snsrid", req.getParameter("snsrid"));
            prm.put("regdt", req.getParameter("regdt"));

            return storeRepo.LIST_MST_DATA_LOG_TARGET(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : dataLogList2Ajax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 센서 경보 발생 페이징 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogList2Ajax", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseBody
    public HashMap<String, Object> dataLogList2Ajax(HttpServletRequest req, @RequestParam HashMap<String, Object> paramMap) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;
        int resultCnt = 0;
        List<HashMap<String, Object>> resultList = new ArrayList<>();

        try {
            HashMap<String, Object> param = new HashMap<>();
            param.put("snsrid", paramMap.get("snsrid"));
            param.put("regdt", paramMap.get("regdt"));
            param.put("type", paramMap.get("type"));
            param.put("pagelimit", Integer.parseInt((String) paramMap.get("pageindex")) * 1000);
            param.put("pagestart", (Integer.parseInt((String) paramMap.get("pageindex")) - 1) * 1000);

            HashMap<String, Object> pagingPrm = new HashMap<>();
            pagingPrm.put("pageSize", 5);
            pagingPrm.put("recordCountPerPage", 1000);
            pagingPrm.put("currentPageNo", Integer.parseInt((String) paramMap.get("pageindex")));

            if ("check-total".equals(paramMap.get("type"))) {
                resultCnt = storeRepo.CNT_DATA_LOG_TOTAL(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = storeRepo.LIST_MST_DATA_LOG_TOTAL(param);
                }
            } else {
                resultCnt = storeRepo.CNT_DATA_LOG_EVENT(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = storeRepo.LIST_MST_DATA_LOG_EVENT(param);
                }
            }

            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
            rtn.put("resultCnt", resultCnt);
            rtn.put("resultList", resultList);
        }

        return rtn;
    }

    /**
     * @Method Name : logWeekStatAjax
     * @작성일 : 2021-07-13
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 월별 전력사용량 조회
     * @return float
     */
    @RequestMapping(value = "/sensorUsekwhMonthAjax")
    @ResponseBody
    public float sensorUsekwhMonthAjax(HttpServletRequest req) throws Exception {
        try {
            String regdt = req.getParameter("regdt");
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = storeRepo.SELECT_MST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("snsrid", req.getParameter("snsrid"));

            return storeRepo.SELECT_MST_SENSOR_USEKWH_MONTH(prm);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return 0;
    }

    /**
     * @Method Name : logStatAjax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 3일간 및 주간 센서 경보 발생 추이 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/logStatAjax")
    @ResponseBody
    public HashMap<String, Object> log3daysAndWeekStatAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            prm.put("snsrid", req.getParameter("snsrid"));

            rtn.put("threedays", storeRepo.LIST_MST_LOG_3DAYS_STAT(prm));
            rtn.put("week", storeRepo.LIST_MST_LOG_WEEK_STAT(prm));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : startCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 등록
     * @return String
     */
    @RequestMapping(value = "/startCheckAjax")
    @ResponseBody
    public String startCheckAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("snsrid", req.getParameter("snsrid"));
            storeRepo.INSERT_SENSOR_CHECK(prm);
            return "success";
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : endCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 갱신
     * @return String
     */
    @RequestMapping(value = "/endCheckAjax")
    @ResponseBody
    public String endCheckAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            prm.put("snsrid", req.getParameter("snsrid"));
            storeRepo.UPDATE_SENSOR_CHECK(prm);
            return "success";
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    // 센서 타깃 영역코드와 상점코드 조회
    private String[] getAreaStoreCode(String snsrid) throws Exception {
        String[] ret = new String[2];

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("snsrid", snsrid);

            List<HashMap<String, Object>> store = storeRepo.LIST_MST_STORE_INFO(prm);
            ret[0] = (String) store.get(0).get("AREACODE");
            ret[1] = (String) store.get(0).get("STRCODE");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return ret;
    }

    // 영역, 상점 첫번째 센서ID 조회
    private String getSensorCode(String areacode, String strcode) throws Exception {
        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", areacode);
            prm.put("strcode", strcode);

            List<HashMap<String, Object>> sensor = storeRepo.LIST_MST_SENSOR_EVT_CNT(prm);
            return (String) sensor.get(0).get("SNSRID");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

}
