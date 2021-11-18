package kr.fscom.firsens.district.controller;

import kr.fscom.firsens.district.repository.DistrictRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/district")
public class DistrictController {

    private static final Logger LOG =  LoggerFactory.getLogger(DistrictController.class);
    private DistrictRepo districtRepo;

    @Autowired
    public DistrictController(DistrictRepo districtRepo) { this.districtRepo = districtRepo; }

    /**
     * @Method Name : districtSnsrMainPage
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 대전시 자치구별 전기위험현황
     * @return ModelAndView
     */
    @GetMapping(value = "/snsrMain")
    public ModelAndView districtSnsrMainPage() {
        return new ModelAndView("district/d_snsr_main");
    }

    /**
     * @Method Name : yesterdayEventCompStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 어제 오늘 비교 전기안전 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/yesterdayEventCompStatAjax")
    @ResponseBody
    public HashMap<String, Object> yesterdayEventCompStat(HttpServletRequest req) {
        try {
            return districtRepo.SELECT_D_YESTERDAY_EVENT_COMP_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : todayEventStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 위험현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayEventStatAjax")
    @ResponseBody
    public HashMap<String, Object> todayEventStat(HttpServletRequest req) {
        try {
            return districtRepo.SELECT_D_TODAY_EVENT_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/currGuMapEventStat")
    @ResponseBody
    public List<HashMap<String, Object>> currGuMapEventStatAjax(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_CURR_GU_MAP_EVENT_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : monthlyGuEventCompStat
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 지역별 전월대비 이벤트 발생 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/monthlyGuEventCompStatAjax")
    @ResponseBody
    public List<HashMap<String, Object>> monthlyGuEventCompStat(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_MONTHLY_GU_EVENT_COMP_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : todayGuAreaEventCompRank
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 시장별 금일 누적 위험 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayGuAreaEventCompRankAjax")
    @ResponseBody
    public List<HashMap<String, Object>> todayGuAreaEventCompRank(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_TODAY_GU_AREA_EVENT_COMP_RANK();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    /**
     * @Method Name : todayGuEvent
     * @작성일 : 2021-07-22
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 금일 시장별 금일 누적 위험 현황
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/todayGuEventAjax")
    @ResponseBody
    public List<HashMap<String, Object>> todayGuEvent(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_TODAY_GU_EVENT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @Method Name : districtKwhMainPage
     * @작성일 : 2021-08-20
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 대전시 자치구별 전력사용현황
     * @return ModelAndView
     */
    @GetMapping(value = "/kwhMain")
    public ModelAndView districtKwhMainPage() {
        return new ModelAndView("district/d_kwh_main");
    }

    @RequestMapping(value = "/yesterdayKwhStat")
    @ResponseBody
    public HashMap<String, Object> yesterdayKwhStatAjax(HttpServletRequest req) {
        try {
            return districtRepo.SELECT_D_KWH_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/currKwhStat")
    @ResponseBody
    public HashMap<String, Object> currKwhStatAjax(HttpServletRequest req) {
        try {
            return districtRepo.SELECT_D_CURR_KWH_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/GuMapKwhStat")
    @ResponseBody
    public List<HashMap<String, Object>> GuMapKwhStatAjax(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_GU_MAP_KWH_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/GuMonthKwhStat")
    @ResponseBody
    public List<HashMap<String, Object>> guMonthKwhStatAjax(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_GU_MONTH_KWH_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/guAreaKwhRank")
    @ResponseBody
    public List<HashMap<String, Object>> guAreaKwhRankAjax(HttpServletRequest req) {
        try {
            return districtRepo.LIST_D_GU_AREA_KWH_STAT();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return null;
    }

}
