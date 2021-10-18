package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.repository.SYSStatRepo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class SYSStatController {
    private final SYSStatRepo sysStatRepo;

    @Autowired
    SYSStatController(SYSStatRepo sysStatRepo) { this.sysStatRepo = sysStatRepo; }

    @GetMapping("/selectGroup")
    public HashMap<String, Object> selectGroup(String type) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            if(type.equals("guCode")) {
                rtn.put("resultList", sysStatRepo.SELECT_TYPE_GUCODE());
            } else {
                rtn.put("resultList", sysStatRepo.SELECT_TYPE_AREACODE());
            }
            rtn.put("result", "success");
        } catch (Exception ex) {
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @GetMapping(value = "/statInfo")
    public HashMap<String, Object> statInfo(String type, String guCode, String areaCode, String startDate, String endDate, String strCode
            , String dateType, String yearDate, String monthDate, String halfDate, String halfSelect, String quarterDate) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> paramMap = new HashMap<>();
        try {
            if(dateType.equals("년")) {
                paramMap.put("dateType", "year");
                paramMap.put("startDate", yearDate.split("-")[0]);
                rtn.put("startDate", yearDate.split("-")[0]);
            } else if(dateType.equals("월")) {
                paramMap.put("dateType", "month");
                paramMap.put("startDate", monthDate.split("-")[0] + "-" + monthDate.split("-")[1]);
                rtn.put("startDate", monthDate.split("-")[0] + "-" + monthDate.split("-")[1]);
            } else if(dateType.equals("반기")) {
                String halfDate1;
                String halfDate2;
                paramMap.put("dateType", "half");
                if(halfSelect.equals("상반기")) {
                    halfDate1 = halfDate.split("-")[0] + "-01";
                    halfDate2 = halfDate.split("-")[0] + "-06";
                } else {
                    halfDate1 = halfDate.split("-")[0] + "-07";
                    halfDate2 = halfDate.split("-")[0] + "-12";
                }
                paramMap.put("startDate", halfDate1);
                paramMap.put("endDate", halfDate2);
                rtn.put("startDate", halfDate1);
                rtn.put("endDate", halfDate2);
            } else if(dateType.equals("분기")) {
                paramMap.put("dateType", "quarter");
                String[] quarter = quarterDate.split("-");
                if(quarter[1].equals("01")) {
                    paramMap.put("startDate", quarter[0] + "-01");
                    paramMap.put("endDate", quarter[0] + "-03");
                    rtn.put("startDate", quarter[0] + "-01");
                    rtn.put("endDate", quarter[0] + "-03");
                } else if(quarter[1].equals("04")) {
                    paramMap.put("startDate", quarter[0] + "-04");
                    paramMap.put("endDate", quarter[0] + "-06");
                    rtn.put("startDate", quarter[0] + "-04");
                    rtn.put("endDate", quarter[0] + "-06");
                } else if(quarter[1].equals("07")) {
                    paramMap.put("startDate", quarter[0] + "-07");
                    paramMap.put("endDate", quarter[0] + "-09");
                    rtn.put("startDate", quarter[0] + "-07");
                    rtn.put("endDate", quarter[0] + "-09");
                } else if(quarter[1].equals("10")) {
                    paramMap.put("startDate", quarter[0] + "-10");
                    paramMap.put("endDate", quarter[0] + "-12");
                    rtn.put("startDate", quarter[0] + "-10");
                    rtn.put("endDate", quarter[0] + "-12");
                }
            }
            paramMap.put("type", type);
            paramMap.put("areaCode", areaCode);
            paramMap.put("strCode", strCode);
            rtn.put("infoStat", sysStatRepo.SELECT_SYS_STAT_AREA_INFO_STAT(areaCode));
            rtn.put("weekMonthStat", sysStatRepo.LIST_SYS_STAT_AREA_MONTHLY_STAT(paramMap));
            rtn.put("hourlyStat", sysStatRepo.LIST_SYS_STAT_AREA_HOURLY_STAT(paramMap));
            rtn.put("dayOfWeekStat", sysStatRepo.LIST_SYS_STAT_AREA_DAYOFWEEK_STAT(paramMap));

            if(type.equals("guCode")) {
                paramMap.put("guCode", guCode);
                rtn.put("infoStat", sysStatRepo.SELECT_SYS_STAT_GU_INFO_STAT(guCode));
            } else if(type.equals("areaCode")){
                rtn.put("levelAreaStat", sysStatRepo.LIST_SYS_STAT_LEVEL_AREA_STAT(paramMap));
                rtn.put("levelStrStat", sysStatRepo.LIST_SYS_STAT_STR_EVENT_STAT(paramMap));
            } else {
                rtn.put("strInfo", sysStatRepo.SELECT_SYS_STAT_STR_INFO(paramMap));
//                rtn.put("areaKwhStat", sysStatRepo.SELECT_SYS_STAT_AREA_KWHIGO_STAT(paramMap));
            }

            rtn.put("result", "success");
        } catch (Exception e) {
            rtn.put("result", "fail");
        }

        return rtn;
    }

    @GetMapping(value = "/statInfoList")
    public HashMap<String, Object> statInfoList(String type, String guCode, String areaCode, String startDate, String endDate,
            String dateType, String yearDate, String monthDate, String halfDate, String halfSelect, String quarterDate) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        HashMap<String, Object> paramMap = new HashMap<>();
        try {
            if(dateType.equals("년")) {
                paramMap.put("dateType", "year");
                paramMap.put("startDate", yearDate.split("-")[0]);
                rtn.put("startDate", yearDate.split("-")[0]);
            } else if(dateType.equals("월")) {
                paramMap.put("dateType", "month");
                paramMap.put("startDate", monthDate.split("-")[0] + "-" + monthDate.split("-")[1]);
                rtn.put("startDate", monthDate.split("-")[0] + "-" + monthDate.split("-")[1]);
            } else if(dateType.equals("반기")) {
                String halfDate1;
                String halfDate2;
                paramMap.put("dateType", "half");
                if(halfSelect.equals("상반기")) {
                    halfDate1 = halfDate.split("-")[0] + "-01";
                    halfDate2 = halfDate.split("-")[0] + "-06";
                } else {
                    halfDate1 = halfDate.split("-")[0] + "-07";
                    halfDate2 = halfDate.split("-")[0] + "-12";
                }
                paramMap.put("startDate", halfDate1);
                paramMap.put("endDate", halfDate2);
                rtn.put("startDate", halfDate1);
                rtn.put("endDate", halfDate2);
            } else if(dateType.equals("분기")) {
                paramMap.put("dateType", "quarter");
                String[] quarter = quarterDate.split("-");
                if(quarter[1].equals("01")) {
                    paramMap.put("startDate", quarter[0] + "-01");
                    paramMap.put("endDate", quarter[0] + "-03");
                    rtn.put("startDate", quarter[0] + "-01");
                    rtn.put("endDate", quarter[0] + "-03");
                } else if(quarter[1].equals("04")) {
                    paramMap.put("startDate", quarter[0] + "-04");
                    paramMap.put("endDate", quarter[0] + "-06");
                    rtn.put("startDate", quarter[0] + "-04");
                    rtn.put("endDate", quarter[0] + "-06");
                } else if(quarter[1].equals("07")) {
                    paramMap.put("startDate", quarter[0] + "-07");
                    paramMap.put("endDate", quarter[0] + "-09");
                    rtn.put("startDate", quarter[0] + "-07");
                    rtn.put("endDate", quarter[0] + "-09");
                } else if(quarter[1].equals("10")) {
                    paramMap.put("startDate", quarter[0] + "-10");
                    paramMap.put("endDate", quarter[0] + "-12");
                    rtn.put("startDate", quarter[0] + "-10");
                    rtn.put("endDate", quarter[0] + "-12");
                }
            }

            paramMap.put("type", type);
            paramMap.put("startDate", startDate);
            paramMap.put("endDate", endDate);
            if(type.equals("guCode")) {
                paramMap.put("guCode", guCode);
                rtn.put("infoStat", sysStatRepo.SELECT_SYS_STAT_GU_INFO_STAT(guCode));
            } else if(type.equals("areaCode")){
                paramMap.put("areaCode", areaCode);
                rtn.put("areaKwhStat", sysStatRepo.SELECT_SYS_STAT_AREA_KWHIGO_STAT(paramMap));
                rtn.put("areaStrKwhStat", sysStatRepo.LIST_SYS_STAT_STR_KWH_STAT(paramMap));
            }

            rtn.put("result", "success");
        } catch (Exception e) {
            rtn.put("result", "fail");
        }

        return rtn;
    }
}
