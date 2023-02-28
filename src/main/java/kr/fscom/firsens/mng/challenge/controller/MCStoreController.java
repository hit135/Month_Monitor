package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.common.paging.PaginationInfo;
import kr.fscom.firsens.mng.challenge.repository.MCStoreRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.thymeleaf.util.StringUtils;
import java.text.SimpleDateFormat;
import java.util.*;
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
public class MCStoreController {

    private static final Logger LOG = LoggerFactory.getLogger(MCStoreController.class);
    private final MCStoreRepo mcStoreRepo;

    @Autowired
    public MCStoreController(MCStoreRepo mcStoreRepo) {
        this.mcStoreRepo = mcStoreRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;

    // 센서 타깃 영역코드와 상점코드 조회
    private String[] getAreaStoreCode(String snsrid) throws Exception {
        String[] ret = new String[2];

        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("snsrid", snsrid);

            HashMap<String, Object> store = mcStoreRepo.SELECT_ONE_MCST_STORE_INFO(prm);
            ret[0] = (String) store.get("AREACODE");
            ret[1] = (String) store.get("STRCODE");
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
    private String getSensorCode(String areacode, String strcode) throws Exception {
        try {
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("areacode", areacode);
            prm.put("strcode", strcode);

            return (String) mcStoreRepo.SELECT_ONE_MCST_SENSOR_EVT_CNT(prm).get("SNSRID");
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
     * @Method Name : mcstStoreInfoPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeInfo")
    public ModelAndView mcstStoreInfoPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mc_store_info");

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
     * @Method Name : mcstTodayAreaState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 현황 조회 (전체, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcstTodayAreaState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return mcStoreRepo.LIST_MCST_TODAY_AREA_STATE(prm);
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
     * @Method Name : mcstTodayAreaStoreState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 내 상점 현황 조회 (경고, 주의, 끊김, 센서)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaStoreStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcstTodayAreaStoreState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return mcStoreRepo.LIST_MCST_TODAY_AREA_STORE_STATE(prm);
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
     * @Method Name : mcstTodayAreaSensorState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 시장 내 센서 현황 조회 (경고, 주의, 끊김, 점검)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayAreaSensorStateAjax")
    @ResponseBody
    public List<HashMap<String,Object>> mcstTodayAreaSensorState(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return mcStoreRepo.LIST_MCST_TODAY_AREA_SENSOR_STATE(prm);
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
     * @Method Name : mcstStoreSearch
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 검색 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/storeSearchAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcstStoreSearch(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            return mcStoreRepo.LIST_MCST_STORE_SEARCH(prm);
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
     * @Method Name : mcstStoreInfoAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 정보 (기본 정보, 이미지, 센서 상태)
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/storeInfoAjax")
    @ResponseBody
    public HashMap<String, Object> mcstStoreInfoAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("store", mcStoreRepo.SELECT_MCST_STORE_INFO(prm));
            rtn.put("sensor", mcStoreRepo.LIST_MCST_SENSOR_STATE(prm));
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
     * @Method Name : mcstStoreLogPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 경보 발생 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeLog")
    public ModelAndView mcstStoreLogPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mc_store_log");

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
     * @Method Name : mcstStoreChartPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 상점 차트 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/storeChart")
    public ModelAndView mcstStoreChartPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mc_store_chart");

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

            return mcStoreRepo.SELECT_MCST_LIST_MCST_STORE_SENSOR(prm);
        } catch (Exception e) {
            System.out.print(e.getMessage());
            LOG.debug(e.getMessage());
        }

        return null;
    }
    */

    /**
     * @Method Name : mcstListStoreSensorData
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 기간 내 센서 측정 평균 데이터 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/listStoreSensorData")
    @ResponseBody
    public List<HashMap<String, Object>> mcstListStoreSensorData(HttpServletRequest req) throws Exception {
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

            HashMap<String, Object> tbl_info = mcStoreRepo.SELECT_MCST_EVENT_TABLE_INFO(prm);
            prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
            prm.put("termtype", termtype);
            prm.put("datatype", datatype);
            prm.put("strcode", strcode);

            snsrid = ("TOTAL".equals(snsrid)) ? null : snsrid;
            prm.put("snsrid", snsrid);
            prm.put("dtsize", dtsize);

            return mcStoreRepo.LIST_MCST_STORE_SENSOR_DATA(prm);
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
     * @Method Name : mcstDataLogListAjax
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 센서 데이터 및 경보 목록
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogListAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcstDataLogListAjax(HttpServletRequest req) throws Exception {
        HashMap<String, Object> prm = new HashMap<>();

        try {
            String regdt = req.getParameter("regdt");
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = mcStoreRepo.SELECT_MCST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("areacode", req.getParameter("areacode"));
            prm.put("strcode", req.getParameter("strcode"));
            prm.put("snsrid", req.getParameter("snsrid"));
            prm.put("regdt", req.getParameter("regdt"));

            return mcStoreRepo.LIST_MCST_DATA_LOG(prm);
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
     * @Method Name : mcstLatestSnsrInfo
     * @작성일 : 2022-01-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 최근 기본정보 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/latestSnsrInfoAjax")
    @ResponseBody
    public HashMap<String, Object> mcstLatestSnsrInfo(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {      
        try {
            return mcStoreRepo.SELECT_MCST_LATEST_DATA(prm);
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
     * @Method Name : mcstSensorUsekwhMonthAjax
     * @작성일 : 2021-07-13
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 월별 전력사용량 조회
     * @return float
     */
    @RequestMapping(value = "/sensorUsekwhMonthAjax")
    @ResponseBody
    public float mcstSensorUsekwhMonthAjax(HttpServletRequest req) throws Exception {
        try {
            String regdt = req.getParameter("regdt");
            HashMap<String, Object> prm = new HashMap<>();
            prm.put("tblSensorData", "F_SENSOR_DATA");
            prm.put("tblSensorLog", "F_SENSOR_LOG");

            if (!StringUtils.isEmpty(regdt)) {
                prm.put("regdt", regdt);

                HashMap<String, Object> tbl_info = mcStoreRepo.SELECT_MCST_EVENT_TABLE_INFO(prm);
                prm.put("tblSensorData", "F_SENSOR_DATA" + tbl_info.get("BACKUPYEAR"));
                prm.put("tblSensorLog", "F_SENSOR_LOG" + tbl_info.get("BACKUPYEAR"));
            }

            prm.put("snsrid", req.getParameter("snsrid"));

            return mcStoreRepo.SELECT_MCST_SENSOR_USEKWH_MONTH(prm);
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
     * @Method Name : mcstDataLogList2Ajax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 센서 경보 페이징 목록 조회
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/dataLogList2Ajax", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseBody
    public HashMap<String, Object> mcstDataLogList2Ajax(HttpServletRequest req, @RequestParam HashMap<String, Object> paramMap) throws Exception {
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

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            Date now = new Date();
            String nowDate=sdf.format(now);
            String nowDateY=nowDate.substring(0,4);
            String nowDateM=nowDate.substring(5,7);
            String nowDateYM=nowDateY+nowDateM;

            String regDate=(String)paramMap.get("regdt");
            String regDateY=regDate.substring(0,4);
            String regDateM=regDate.substring(5,7);
            String regDateYM=regDateY+regDateM;

            /* 1. 현재 날짜에서의 한달전 날짜 */
            Calendar cal1=Calendar.getInstance();
            Date getDate1=sdf.parse(nowDate);
            cal1.setTime(getDate1);
            cal1.add(Calendar.MONTH,-1);

            /* 2. 사용자가 지정한 날짜 */
            Calendar cal2=Calendar.getInstance();
            Date getDate2=sdf.parse(regDate);
            cal2.setTime(getDate2);

            /* 1, 2번 날짜를 비교하여 정수값으로 저장*/
            int cmpResult=cal1.getTime().compareTo(cal2.getTime());

            if(nowDateYM.equals(regDateYM) || cmpResult<0 || cmpResult==0){
                param.put("tables","F_SENSOR_LOG");
            }else if(nowDateY.equals(regDateY) && !nowDateM.equals(regDateM)){
                param.put("tables","F_SENSOR_LOG".concat("_").concat(nowDateY));
            }else if(!nowDateY.equals(regDateY)){
                param.put("tables","F_SENSOR_LOG".concat("_").concat(regDateY));
            }

            if ("check-total".equals(paramMap.get("type"))) {
                resultCnt = mcStoreRepo.CNT_DATA_LOG_TOTAL(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = mcStoreRepo.LIST_MCST_DATA_LOG_TOTAL(param);
                }
            } else {
                resultCnt = mcStoreRepo.CNT_DATA_LOG_EVENT(param);
                if (resultCnt > 0) {
                    pagingPrm.put("totalRecordCount", resultCnt);
                    rtn.put("pInfo", new PaginationInfo().getPaginationInfo(pagingPrm));

                    resultList = mcStoreRepo.LIST_MCST_DATA_LOG_EVENT(param);
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
     * @Method Name : mcstLog3daysAndWeekStatAjax
     * @작성일 : 2021-10-14
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 3일간 및 주간 센서 경보 발생 추이 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/logStatAjax")
    @ResponseBody
    public HashMap<String, Object> mcstLog3daysAndWeekStatAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("threedays", mcStoreRepo.LIST_MCST_LOG_3DAYS_STAT(prm));
            rtn.put("week", mcStoreRepo.LIST_MCST_LOG_WEEK_STAT(prm));
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
     * @Method Name : mcstStartCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 등록
     * @return String
     */
    @RequestMapping(value = "/startCheckAjax")
    @ResponseBody
    public String mcstStartCheckAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            mcStoreRepo.INSERT_MCST_SENSOR_CHECK(prm);
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
     * @Method Name : mcstEndCheckAjax
     * @작성일 : 2021-07-15
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 점검센서 정보 갱신
     * @return String
     */
    @RequestMapping(value = "/endCheckAjax")
    @ResponseBody
    public String mcstEndCheckAjax(
            HttpServletRequest req, @RequestParam HashMap<String, Object> prm) throws Exception {
        try {
            mcStoreRepo.UPDATE_MCST_SENSOR_CHECK(prm);
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
