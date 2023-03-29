package kr.fscom.firsens.month.controller;

import kr.fscom.firsens.month.repository.MONmonitorRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/mon")
public class MONmonitorController {

    private static final Logger LOG = LoggerFactory.getLogger(MONmonitorController.class);

    @Autowired
    private MONmonitorRepo monMonitorRepo;

    @RequestMapping("/monitor")
    public ModelAndView monitor() throws Exception {
        ModelAndView mav = new ModelAndView("mng/challenge/mon/monitor");
        return mav;
    }

    @RequestMapping("/getData")
    @ResponseBody
    public HashMap<String, Object> getData(HttpServletRequest req) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        // 구역정보들 가져와서 쿼리문 돌리기
        String[] arrList = req.getParameterValues("addArr");
        String year = req.getParameter("year");
        String month = req.getParameter("month");

        if(arrList != null && arrList.length != 0){
            // 배열들 반복문 돌리기
            for(int i = 0; i < arrList.length; i++){
                HashMap<String, Object> tempMap = new HashMap<>();
                try {
                    // 비엠시스는 구내식당과 나눠져 있음
                    if(arrList[i].equals("비엠시스")){
                        tempMap = monMonitorRepo.getDataBMSis(arrList[i], year, month);
                    } else if(arrList[i].equals("비엠시스_구내식당")) {
                        tempMap = monMonitorRepo.getDataBMSisRes(arrList[i], year, month);
                    } else if(arrList[i].equals("중앙시장(예비)")){
                        tempMap = monMonitorRepo.getDataJungSpare(year, month);
                    } else if(arrList[i].equals("중앙시장(1,2차)")){
                        tempMap = monMonitorRepo.getDataJungUse(year, month);
                    } else {
                        tempMap = monMonitorRepo.getData(arrList[i], year, month);
                    }
                    if(tempMap == null){
                        tempMap = monMonitorRepo.getNullData(arrList[i]);
                    }

                    rtn.put(arrList[i], tempMap);
                } catch (NullPointerException e) {
                    LOG.debug(e.getMessage());
                } catch (Exception e) {
                    LOG.debug(e.getMessage());
                }
            }
        }
        return rtn;
    }


}
