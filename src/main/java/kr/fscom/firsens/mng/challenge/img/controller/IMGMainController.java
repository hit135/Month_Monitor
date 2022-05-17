package kr.fscom.firsens.mng.challenge.img.controller;

import kr.fscom.firsens.mng.challenge.img.repository.IMGMainRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author : jjm
 * @version 1.0
 * @FileName : MCIainController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-06    jjm        최초 생성
 *
 * </pre>
 * @since : 2021-07-06
 */

@RestController
@RequestMapping("/img")
public class IMGMainController {

    private static final Logger LOG = LoggerFactory.getLogger(IMGMainController.class);
    private final IMGMainRepo imgMainRepo;

    @Autowired
    public IMGMainController(IMGMainRepo imgMainRepo) {
        this.imgMainRepo = imgMainRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;
    
    /**
     * @Method Name : mciPage
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 메인 화면 이동
     * @return ModelAndView
     */
    @RequestMapping(value = "/main")
    public ModelAndView mciPage(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/img/img_main");

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
     * @Method Name : mciTodayTotalState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 종합 현황 조회 (전체, 경고, 주의, 끊김)
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayTotalStateAjax")
    @ResponseBody
    public HashMap<String, Object> mciTodayTotalState(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn.put("total", imgMainRepo.LIST_MCI_TODAY_TOTAL_STATE());           // 오늘 센서 현황 조회 (전체, 경고, 주의, 끊김)
            rtn.put("check", imgMainRepo.LIST_MCI_CHECK_SENSOR());                // 점검내역 목록
            rtn.put("abnormal", imgMainRepo.LIST_MCI_TODAY_ABNORMAL_SENSOR());    // 오늘 상태이상 센서 목록
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
     * @Method Name : mciTodayGuAreaState
     * @작성일 : 2021-07-09
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 오늘 구별, 시장별 센서 현황 조회 (상점, 센서, 경고, 주의, 끊김)
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/todayGuAreaStateAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mciTodayGuAreaState(HttpServletRequest req) throws Exception {
        try {
            return imgMainRepo.LIST_MCI_TODAY_GRP_AREA_STATE();
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
     * @Method Name : mciArea
     * @작성일 : 2021-07-29
     * @작성자 : jjm
     * @변경이력 :
     * @Method 설명 : 시장 현황 동적 화면
     * @return ModelAndView
     */
    @RequestMapping(value = "/mainArea")
    public ModelAndView mciArea(HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/img/img_main");

        try {
            mav.addObject("prm_areacode", req.getParameter("areacode"));
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return mav;
    }

    /**
     * @Method Name : mciTodayTotalState
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 구역별 이미지 선택 버튼 생성
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListAreaButton")
    @ResponseBody
    public List<HashMap<String, Object>> mciListAreaButton(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("areaCode", req.getParameter("areaCode"));
            List<HashMap<String, Object>> a = imgMainRepo.LIST_MCI_LIST_AREA_BUTTON(param);                // 버튼 목록
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
     * @Method Name : mciListImageArea
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 이미지별 Area 데이터 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListImageArea")
    @ResponseBody
    public List<HashMap<String, Object>> mciListImageArea(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("areaCode", req.getParameter("areaCode"));
            param.put("areaMap", req.getParameter("areaMap"));
            return imgMainRepo.LIST_MCI_LIST_IMAGE_AREA(param);                   // 이미지 AREA 목록
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
     * @Method Name : mciListGrpUseKwh
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 이미지별 Area 데이터 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListGrpUseKwh")
    @ResponseBody
    public List<HashMap<String, Object>> mciListGrpUseKwh(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("areaCode", req.getParameter("areaCode"));
            param.put("areaMap", req.getParameter("areaMap"));
            return imgMainRepo.LIST_MCI_GRP_USEKWH(param);                   // 이미지 AREA 목록
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
     * @Method Name : mciListSnsrUseKwh
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 이미지별 Area 데이터 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListSnsrUseKwh")
    @ResponseBody
    public List<HashMap<String, Object>> mciListSnsrUseKwh(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("grpCode", req.getParameter("grpCode"));
            return imgMainRepo.LIST_MCI_SNSR_USEKWH(param);                   // 이미지 AREA 목록
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
     * @Method Name : mciListSnsrKwhChart
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 이미지별 Area 데이터 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListSnsrKwhChart")
    @ResponseBody
    public List<HashMap<String, Object>> mciListSnsrKwhChart(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("snsrId", req.getParameter("snsrId"));
            return imgMainRepo.LIST_MCI_SNSR_KWH_CHART(param);                   // 이미지 AREA 목록
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
     * @Method Name : mciListSnsrEvtChart
     * @작성일 : 2022-04-13
     * @작성자 : ljh
     * @변경이력 :
     * @Method 설명 : 이미지별 Area 데이터 조회
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/mciListSnsrEvtChart")
    @ResponseBody
    public List<HashMap<String, Object>> mciListSnsrEvtChart(HttpServletRequest req) throws Exception {
        Map<String, Object> param = new HashMap<>();
        try {
            param.put("snsrId", req.getParameter("snsrId"));
            return imgMainRepo.LIST_MCI_SNSR_EVT_CHART(param);                   // 이미지 AREA 목록
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
