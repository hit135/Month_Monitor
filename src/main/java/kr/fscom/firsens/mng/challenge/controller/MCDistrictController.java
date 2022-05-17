package kr.fscom.firsens.mng.challenge.controller;

import kr.fscom.firsens.mng.challenge.repository.MCDistrictRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/district")
public class MCDistrictController {

    private static final Logger LOG =  LoggerFactory.getLogger(MCDistrictController.class);
    private MCDistrictRepo mcDistrictRepo;

    @Autowired
    public MCDistrictController(MCDistrictRepo mcDistrictRepo) {
        this.mcDistrictRepo = mcDistrictRepo;
    }

    /**
     * @Method Name : mcdMainPage
     * @작성일 : 2022-05-17
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 대전시 자치구별 전기위험현황
     * @return ModelAndView
     */
    @GetMapping(value = "/main")
    public ModelAndView mcdMainPage() throws Exception {
        return new ModelAndView("mng/challenge/mc_district");
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @Method Name : mcdSnsrMainPage
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 대전시 자치구별 전기위험현황
     * @return ModelAndView
     */
    @GetMapping(value = "/snsrMain")
    public ModelAndView mcdSnsrMainPage() throws Exception {
        return new ModelAndView("mng/challenge/mc_district_snsr");
    }

    /**
     * @Method Name : mcdYesterdayEventCompStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 어제 오늘 비교 전기안전 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/yesterdayEventCompStatAjax")
    @ResponseBody
    public HashMap<String, Object> mcdYesterdayEventCompStat(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.SELECT_MCD_YESTERDAY_EVENT_COMP_STAT();
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
     * @Method Name : mcdTodayEventStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 위험현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayEventStatAjax")
    @ResponseBody
    public HashMap<String, Object> mcdTodayEventStat(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.SELECT_MCD_TODAY_EVENT_STAT();
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
     * @Method Name : mcdCurrGuMapEventStatAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 지도 구별 설치 센서수와 이벤트 발생 건수
     * @return List<HashMap<String, Object>
     */
    @RequestMapping(value = "/currGuMapEventStat")
    @ResponseBody
    public List<HashMap<String, Object>> mcdCurrGuMapEventStatAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_CURR_GU_MAP_EVENT_STAT();
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
     * @Method Name : mcdMonthlyGuEventCompStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 지역별 전월대비 이벤트 발생 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/monthlyGuEventCompStatAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcdMonthlyGuEventCompStat(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_MONTHLY_GU_EVENT_COMP_STAT();
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
     * @Method Name : mcdTodayGuAreaEventCompRank
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 시장별 금일 누적 위험 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayGuAreaEventCompRankAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcdTodayGuAreaEventCompRank(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_TODAY_GU_AREA_EVENT_COMP_RANK();
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
     * @Method Name : mcdTodayGuEvent
     * @작성일 : 2021-07-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 시장별 금일 누적 위험 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayGuEventAjax")
    @ResponseBody
    public List<HashMap<String, Object>> mcdTodayGuEvent(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_TODAY_GU_EVENT();
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
     * @Method Name : mcdKwhMainPage
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 대전시 자치구별 전력사용현황
     * @return ModelAndView
     */
    @GetMapping(value = "/kwhMain")
    public ModelAndView mcdKwhMainPage() throws Exception {
        return new ModelAndView("mng/challenge/mc_district_kwh");
    }

    /**
     * @Method Name : mcdYesterdayKwhStatAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 어제 / 지난주 / 지난달 전기안전현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/yesterdayKwhStat")
    @ResponseBody
    public HashMap<String, Object> mcdYesterdayKwhStatAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.SELECT_MCD_KWH_STAT();
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
     * @Method Name : mcdCurrKwhStatAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 전력사용량 실시간 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/currKwhStat")
    @ResponseBody
    public HashMap<String, Object> mcdCurrKwhStatAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.SELECT_MCD_CURR_KWH_STAT();
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
     * @Method Name : mcdGuMapKwhStatAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 지도 지역별 주별대비 전력소모량 비교
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/guMapKwhStat")
    @ResponseBody
    public List<HashMap<String, Object>> mcdGuMapKwhStatAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_GU_MAP_KWH_STAT();
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
     * @Method Name : mcdGuMonthKwhStatAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 구별 전월대비 전력소모량 비교
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/guMonthKwhStat")
    @ResponseBody
    public List<HashMap<String, Object>> mcdGuMonthKwhStatAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_GU_MONTH_KWH_STAT();
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
     * @Method Name : mcdGuAreaKwhRankAjax
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 구별 시장별 전력소모량 비교
     * @return List<HashMap<String, Object>>
     */
    @RequestMapping(value = "/guAreaKwhRank")
    @ResponseBody
    public List<HashMap<String, Object>> mcdGuAreaKwhRankAjax(HttpServletRequest req) throws Exception {
        try {
            return mcDistrictRepo.LIST_MCD_GU_AREA_KWH_STAT();
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
