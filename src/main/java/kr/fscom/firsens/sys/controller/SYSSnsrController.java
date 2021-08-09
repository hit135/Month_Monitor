package kr.fscom.firsens.sys.controller;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.domain.SYSSnsrDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;
import kr.fscom.firsens.sys.repository.SYSSnsrRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSSnsrController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSSnsrController.class);
    private final SYSSnsrRepo sysSnsrRepo;
    private final SYSAreaRepo sysAreaRepo;

    @Autowired
    public SYSSnsrController(SYSSnsrRepo sysSnsrRepo, SYSAreaRepo sysAreaRepo) { this.sysSnsrRepo = sysSnsrRepo; this.sysAreaRepo = sysAreaRepo; }

    @GetMapping("/snsrs")
    public HashMap<String, Object> listPageSnsrs(SYSSnsrDomain domain, int page, int size, String searchWrd, String delYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 시작");
        List<HashMap<String, Object>> sensorList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());
            domain.setSearchWrd(searchWrd);
            if(domain.getAreaCode().equals("none")) {
                domain.setAreaCode("0");
                domain.setLevelAreaCode("0");
            }

            int resultCnt = sysSnsrRepo.SELECT_CNT_SYS_SNSR(domain);
            sensorList = sysSnsrRepo.SELECT_LIST_SYS_SNSR(domain);

            rtn.put("resultList", sensorList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }

    @PostMapping("/insertSnsr")
    public HashMap<String, Object> insertSnsr(@RequestBody SYSSnsrDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.error("■■■■■■■■■■■■■■■ 센서등록 요청 시작");
        try {
            if(!domain.getSnsrId().equals("")) {

                int duplicateCnt = sysSnsrRepo.SELECT_CHK_SYS_SNSRID(domain);           // 센서 아이디 중복 체크
                if(duplicateCnt > 0) {
                    rtn.put("result", "duplicate");
                    return rtn;
                } else {
                    domain.setKeyFied("SENSOR_ID");
                    sysSnsrRepo.GENERATE_SNSR_CODE(domain);
                    if(domain.getAreaCode().equals("")) {   // 구역코드 없을 경우 상위, 하위 "0"
                        domain.setAreaCode("0");
                        domain.setLevelAreaCode("0");
                    }
                    if(domain.getStrCode().equals("")) domain.setStrCode("0");      // 상점코드 없을 경우 "0"

                    if(!domain.getAreaCode().equals("0")) {
                        SYSAreaDomain vo = sysAreaRepo.SELECT_ONE_SYS_AREA_ITEM(domain.getAreaCode()); // 좌표값이 없을 경우 조회된 지역의 자표값으로 set
                        if(domain.getSnsrPosLat() == null || domain.getSnsrPosLat() == 0.0 && vo.getAreaPosLat() != null) {
                            domain.setSnsrPosLat(vo.getAreaPosLat());
                        }
                        if(domain.getSnsrPosLon() == null || domain.getSnsrPosLon() == 0.0 && vo.getAreaPosLon() != null) {
                            domain.setSnsrPosLon(vo.getAreaPosLon());
                        }

                        domain.setSnsrMGps(domain.getSnsrPosLat() + "," + domain.getSnsrPosLon());
                    }

                    int result = sysSnsrRepo.INSERT_SYS_SNSR(domain);
                    if(result > 0)
                        rtn.put("result", "success");
                    else
                        rtn.put("result", "fail");
                }
            }
        } catch(SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 SQL 오류 : {}", ex.getMessage());
        }
        catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서목록 요청 오류 : {}", ex.getMessage());
        }

        return rtn;
    }

    @PostMapping("/selectSnsr")
    public HashMap<String, Object> selectSnsr(@RequestBody SYSSnsrDomain domain) throws Exception {
        LOG.error("■■■■■■■■■■■■■■■ 센서조회 요청 시작");
        HashMap<String, Object> rtn = new HashMap<>();
        try {
            if(!domain.getSnsrId().equals("")) {
                SYSSnsrDomain vo = sysSnsrRepo.SELECT_SYS_SNSR(domain);
                if(!vo.getSnsrMGps().equals("")) {
                    vo.setSnsrPosLat(Double.valueOf(vo.getSnsrMGps().split(",")[0]));
                    vo.setSnsrPosLon(Double.valueOf(vo.getSnsrMGps().split(",")[1]));
                }
                rtn.put("content", vo);
                rtn.put("result", "success");
            } else {
                rtn.put("result", "fail");
            }
        } catch(SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서조회 요청 SQL 오류 : {}", ex.getMessage());
        }
        catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서조회 요청 오류 : {}", ex.getMessage());
        }

        return rtn;
    }

    @PostMapping("/updateSnsr")
    public HashMap<String, Object> updateSnsr(@RequestBody SYSSnsrDomain domain) throws Exception {
        LOG.error("■■■■■■■■■■■■■■■ 센서수정 요청 시작");
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            if(!domain.getSnsrId().equals(domain.getUpdSnsrId())) {
                int duplicateCnt = sysSnsrRepo.SELECT_CHK_SYS_SNSRID(domain);           // 센서 아이디 중복 체크
                if(duplicateCnt > 0)
                    rtn.put("result", "duplicate");
                return rtn;
            }

            if(!domain.getSnsrId().equals("")) {
                if(domain.getAreaCode().equals("")) {   // 구역코드 없을 경우 상위, 하위 "0"
                    domain.setAreaCode("0");
                    domain.setLevelAreaCode("0");
                }
                if(domain.getStrCode().equals("")) domain.setStrCode("0");      // 상점코드 없을 경우 "0"
                if(domain.getSnsrPosLat() != null && domain.getSnsrPosLon() != null)
                    domain.setSnsrMGps(domain.getSnsrPosLat() + "," + domain.getSnsrPosLon());
                else
                    domain.setSnsrMGps("");
                int result = sysSnsrRepo.UPDATE_SYS_SNSR(domain);
                if(result > 0)
                    rtn.put("result", "success");
                else
                    rtn.put("result", "fail");
            }


        } catch(SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서수정 요청 SQL 오류 : {}", ex.getMessage());
        }
        catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서수정 요청 오류 : {}", ex.getMessage());
        }

        return rtn;
    }

    @PostMapping("/deleteSnsr")
    public HashMap<String, Object> deleteSnsr(@RequestBody SYSSnsrDomain domain) throws Exception {
        LOG.error("■■■■■■■■■■■■■■■ 센서삭제 요청 시작");
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            if(!domain.getSnsrId().equals("")) {
                int result = sysSnsrRepo.DELETE_SYS_SNSR(domain);
                if(result > 0)
                    rtn.put("result", "success");
                else
                    rtn.put("result", "fail");
            } else {
                rtn.put("result", "fail");
            }
        } catch(SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서삭제 요청 SQL 오류 : {}", ex.getMessage());
        }
        catch (Exception ex) {
            LOG.error("■■■■■■■■■■■■■■■ 센서삭제 요청 오류 : {}", ex.getMessage());
        }

        return rtn;
    }


}