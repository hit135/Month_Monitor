package kr.fscom.firsens.mng.challenge.img.controller;

import kr.fscom.firsens.common.paging.PaginationInfo;
import kr.fscom.firsens.mng.challenge.img.repository.IMGStoreRepo;
import kr.fscom.firsens.mng.challenge.repository.MCStoreRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
@RequestMapping("/img")
public class IMGStoreController {

    private static final Logger LOG = LoggerFactory.getLogger(IMGStoreController.class);
    private final IMGStoreRepo imgStoreRepo;

    @Autowired
    public IMGStoreController(IMGStoreRepo imgStoreRepo) {
        this.imgStoreRepo = imgStoreRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;

    // 센서 타깃 영역코드와 상점코드 조회
    private String[] getAreaStoreCode(String snsrid) throws Exception {
        String[] ret = new String[2];

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("snsrid", snsrid);

            HashMap<String, Object> store = imgStoreRepo.SELECT_ONE_MCIST_STORE_INFO(prm);
            ret[0] = (String) store.get("AREACODE");
            ret[1] = (String) store.get("GRPCODE");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return ret;
    }

    // 영역, 상점 첫번째 센서ID 조회
    private String[] getSensorCode(String areacode, String grpcode) throws Exception {
        String[] ret = new String[2];

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", areacode);
            prm.put("grpcode", grpcode);

            HashMap<String, Object> store = imgStoreRepo.SELECT_ONE_MCIST_SENSOR_EVT_CNT(prm);
            ret[0] = (String) store.get("SNSRID");
            ret[1] = (String) store.get("AREAMAP");
            return ret;
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @Method Name : mcistStoreInfoPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeInfo")
    public ModelAndView mcistStoreInfoPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/img/img_store_info");

        try {
            mav.addObject("naverMap", "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + naverClientId + "&submodules=visualization");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mcistTodayAreaState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcistTodayAreaState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return imgStoreRepo.LIST_MCIST_TODAY_AREA_STATE(prm);
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
     * @Method Name : mcistTodayAreaStoreState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 내 상점 현황 조회 (경고, 주의, 끊김, 센서)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaStoreStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcistTodayAreaStoreState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            List<HashMap<String, Object>> a = imgStoreRepo.LIST_MCIST_TODAY_AREA_STORE_STATE(prm);
            return a;
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
     * @Method Name : mcistTodayAreaSensorState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 내 센서 현황 조회 (경고, 주의, 끊김, 점검)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaSensorStateAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mcistTodayAreaSensorState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            List<HashMap<String,Object>> a = imgStoreRepo.LIST_MCIST_TODAY_AREA_SENSOR_STATE(prm);
            return a;
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
     * @Method Name : mcistStoreSearch
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 검색 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/storeSearchAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcistStoreSearch(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return imgStoreRepo.LIST_MCIST_STORE_SEARCH(prm);
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
     * @Method Name : mcistStoreInfoAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 정보 (기본 정보, 이미지, 센서 상태)
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/storeInfoAjax")
    @ResponseBody
    public HashMap<String, Object> mcistStoreInfoAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("store", imgStoreRepo.SELECT_MCIST_STORE_INFO(prm));
            rtn.put("sensor", imgStoreRepo.LIST_MCIST_SENSOR_STATE(prm));
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mcistStoreLogPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 경보 발생 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeLog")
    public ModelAndView mcistStoreLogPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/img/img_store_log");

        try {
            String areacode = req.getParameter("areaCode");
            String grpcode = req.getParameter("grpCode");
            String snsrid = req.getParameter("snsrid");
            String areamap = req.getParameter("areamap");

            if (StringUtils.isEmptyOrWhitespace(grpcode)) {
                String[] code = getAreaStoreCode(snsrid);
                if(areacode == null) areacode = code[0];
                if(grpcode == null) grpcode = code[1];
            }

            if (StringUtils.isEmptyOrWhitespace(snsrid) || StringUtils.isEmptyOrWhitespace(areamap) ){
                String[] code2 = getSensorCode(areacode, grpcode);
                snsrid = code2[0];
                areamap = code2[1];
            }

            mav.addObject("prm_areacode", areacode);
            mav.addObject("prm_grpcode", grpcode);
            mav.addObject("prm_areamap", areamap);
            mav.addObject("prm_snsrid", snsrid);
            mav.addObject("prm_regdate", req.getParameter("regdate"));
            mav.addObject("prm_checktype", req.getParameter("checktype"));
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mcistStoreChartPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 차트 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeChart")
    public ModelAndView mcistStoreChartPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/img/img_store_chart");

        try {
            String areacode = req.getParameter("areaCode");
            String grpcode = req.getParameter("grpCode");
            String snsrid = req.getParameter("snsrid");
            String areamap = req.getParameter("areamap");

            if (StringUtils.isEmptyOrWhitespace(grpcode) ) {
                String[] code = getAreaStoreCode(snsrid);
                if(areacode == null) areacode = code[0];
                if(grpcode == null) grpcode = code[1];
            }

            if (StringUtils.isEmptyOrWhitespace(snsrid) || StringUtils.isEmptyOrWhitespace(areamap) ){
                String[] code2 = getSensorCode(areacode, grpcode);
                snsrid = code2[0];
                areamap = code2[1];
            }



            mav.addObject("prm_areacode", areacode);
            mav.addObject("prm_grpcode", grpcode);
            mav.addObject("prm_areamap", areamap);
            mav.addObject("prm_snsrid", snsrid);
            mav.addObject("prm_regdate", req.getParameter("regdate"));
            mav.addObject("prm_almtype", req.getParameter("almtype"));
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
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

            return imgStoreRepo.SELECT_MCIST_LIST_MCIST_STORE_SENSOR(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mcistListStoreSensorData
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 기간 내 센서 측정 평균 데이터 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/listStoreSensorData")
    @ResponseBody
    public List<HashMap<String, Object>> mcistListStoreSensorData(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String termtype = ("m".equals(req.getParameter("termtype"))) ? "m" : "d";
            String datatype = req.getParameter("datatype");
            String grpCode = req.getParameter("grpCode");
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

            HashMap<String, Object> tbl_info = imgStoreRepo.SELECT_MCIST_EVENT_TABLE_INFO(prm);
            prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            prm.put("termtype", termtype);
            prm.put("datatype", datatype);
            prm.put("grpCode", grpCode);

            snsrid = ("TOTAL".equals(snsrid)) ? null : snsrid;
            prm.put("snsrid", snsrid);
            prm.put("dtsize", dtsize);

            return imgStoreRepo.LIST_MCIST_STORE_SENSOR_DATA(prm);
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
     * @Method Name : mcistDataLogListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 센서 데이터 및 경보 목록
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcistDataLogListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = imgStoreRepo.SELECT_MCIST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("areaCode", req.getParameter("areaCode"));
            prm.put("grpCode", req.getParameter("grpCode"));
            prm.put("snsrId", req.getParameter("snsrId"));
            prm.put("regdt", req.getParameter("regdt"));

            List<HashMap<String, Object>> a = imgStoreRepo.LIST_MCIST_DATA_LOG(prm);
            return a;
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
     * @Method Name : mcistLatestSnsrInfo
     * @작성일 : 2022-01-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 최근 기본정보 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/latestSnsrInfoAjax")
    @ResponseBody
    public HashMap<String, Object> mcistLatestSnsrInfo(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {      
        try {
            return imgStoreRepo.SELECT_MCIST_LATEST_DATA(prm);
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
     * @Method Name : mcistSensorUsekwhMonthAjax
     * @작성일 : 2021-07-13
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 월별 전력사용량 조회
     * @return float
     */
    @RequestMapping(value = "/sensorUsekwhMonthAjax")
    @ResponseBody
    public float mcistSensorUsekwhMonthAjax(HttpServletRequest req) throws Exception {
        try {
            String regdt = req.getParameter("regdt");
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = imgStoreRepo.SELECT_MCIST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("snsrId", req.getParameter("snsrId"));
            float a = imgStoreRepo.SELECT_MCIST_SENSOR_USEKWH_MONTH(prm);
            return a;
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return 0;
    }

    /**
     * @Method Name : mcistDataLogList2Ajax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 센서 경보 페이징 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogList2Ajax", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseBody
    public HashMap<String, Object> mcistDataLogList2Ajax(HttpServletRequest req, @RequestParam HashMap<String, Object> paramMap) throws Exception {
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
                resultCnt = imgStoreRepo.CNT_DATA_LOG_TOTAL(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = imgStoreRepo.LIST_MCIST_DATA_LOG_TOTAL(param);
                }
            } else {
                resultCnt = imgStoreRepo.CNT_DATA_LOG_EVENT(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = imgStoreRepo.LIST_MCIST_DATA_LOG_EVENT(param);
                }
            }

            result = true;
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
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
     * @Method Name : mcistLog3daysAndWeekStatAjax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 3일간 및 주간 센서 경보 발생 추이 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/logStatAjax")
    @ResponseBody
    public HashMap<String, Object> mcistLog3daysAndWeekStatAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("threedays", imgStoreRepo.LIST_MCIST_LOG_3DAYS_STAT(prm));
            rtn.put("week", imgStoreRepo.LIST_MCIST_LOG_WEEK_STAT(prm));
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (SQLException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : mcistStartCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 등록
     * @return String
     */
    @RequestMapping(value = "/startCheckAjax")
    @ResponseBody
    public String mcistStartCheckAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            imgStoreRepo.INSERT_MCIST_SENSOR_CHECK(prm);
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
     * @Method Name : mcistEndCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 갱신
     * @return String
     */
    @RequestMapping(value = "/endCheckAjax")
    @ResponseBody
    public String mcistEndCheckAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            imgStoreRepo.UPDATE_MCIST_SENSOR_CHECK(prm);
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
