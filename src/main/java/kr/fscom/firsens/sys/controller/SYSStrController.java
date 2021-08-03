package kr.fscom.firsens.sys.controller;
import kr.fscom.firsens.common.Base64ToImgDecoder;
import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.domain.SYSFileDomain;
import kr.fscom.firsens.sys.domain.SYSStrDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;
import kr.fscom.firsens.sys.repository.SYSFileRepo;
import kr.fscom.firsens.sys.repository.SYSStrRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSStrController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSStrController.class);
    private final SYSStrRepo sysStrRepo;
    private final SYSAreaRepo sysAreaRepo;
    private final SYSFileRepo sysFileRepo;

    @Autowired
    SYSStrController(SYSStrRepo sysStrRepo, SYSAreaRepo sysAreaRepo, SYSFileRepo sysFileRepo) { this.sysStrRepo = sysStrRepo; this.sysAreaRepo = sysAreaRepo; this.sysFileRepo = sysFileRepo; }


    @GetMapping("/strs")
    public HashMap<String, Object> listPageMems(SYSStrDomain domain, int page, int size, String searchWrd, String useYn) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        List<HashMap<String, Object>> strList = new ArrayList<>();
        try {
            domain.setSizePerPage(size);
            domain.setPage((page -1) * domain.getSizePerPage());

            int resultCnt = sysStrRepo.SELECT_CNT_SYS_STR(domain);
            strList = sysStrRepo.SELECT_LIST_SYS_STR(domain);

            rtn.put("resultList", strList);
            rtn.put("totalElements", resultCnt);
            rtn.put("result", "success");
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 상점목록 요청 SQL 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        } catch (Exception ex) {
            ex.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점목록 요청 오류 : {}", ex.getMessage());
            rtn.put("result", "fail");
        }
        return rtn;
    }

    @PostMapping(value = "/insertStr")
    public HashMap<String, Object> insertStr(@ModelAttribute SYSStrDomain domain) throws Exception, IOException {

        LOG.info("■■■■■■■■■■■■■■■ 상점 등록 시작 ");
        HashMap<String, Object> rtn = new HashMap<String, Object>();

        try {
            int result = 0;
            int duplicateCnt = 0;
            duplicateCnt = sysStrRepo.SELECT_CHK_SYS_STRCODE(domain);           // 상점코드 중복 체크

            if(duplicateCnt > 0) {
                rtn.put("result", "duplicate");
            } else {
                SYSAreaDomain vo = sysAreaRepo.SELECT_ONE_SYS_AREA_ITEM(domain.getAreaCode());
                if(domain.getStrPosLat() == null && vo.getAreaPosLat() != null) {
                    domain.setStrPosLat(vo.getAreaPosLat());
                }
                if(domain.getStrPosLon() == null && vo.getAreaPosLon() != null) {
                    domain.setStrPosLon(vo.getAreaPosLon());
                }

                result = sysStrRepo.INSERT_SYS_STR(domain);

                if(result > 0) {
                    rtn.put("result", "success");
                    if(domain.getFiles().length > 0) {
                        String filePath = "D:/home/apps/img/imgstore/" + domain.getAreaCode() + "/" + domain.getStrCode() + "/";
                        File newFile = new File(filePath);
                        if(newFile.mkdirs()) {
                            int imgNum = 0;
                            for(MultipartFile file : domain.getFiles()) {
                                try {
                                    imgNum++;
                                    SYSFileDomain fvo = new SYSFileDomain();
                                    String fileName = String.valueOf(System.currentTimeMillis());
                                    Base64ToImgDecoder imgDecoder = new Base64ToImgDecoder();
                                    BASE64Encoder base64Encoder =new BASE64Encoder();
                                    String base64EncoderImg = base64Encoder.encode(file.getBytes());
                                    imgDecoder.decoder(base64EncoderImg, filePath + fileName);

                                    fvo.setImgName(fileName);
                                    fvo.setStrCode(domain.getStrCode());
                                    fvo.setImgSize(file.getSize());
                                    fvo.setImgPath("/imgstore/");
                                    fvo.setOriName("imgfile");
                                    fvo.setImgNum(imgNum);
                                    fvo.setAreaCode(domain.getAreaCode());

                                    sysFileRepo.INSERT_SYS_FILE(fvo);
                                } catch (IOException ioEx) {
                                    LOG.info("■■■■■■■■■■■■■■■ 첨부파일 등록 오류 : " + ioEx);
                                } catch (SQLException e) {
                                LOG.error("■■■■■■■■■■■■■■■ 상점 첨부파일 등록 요청 SQL 오류 : {}", e.getMessage());
                               }
                            }
                        }
                    }
                } else
                    rtn.put("result", "fail");
            }
        }

        catch (SQLException e) {
            LOG.error("■■■■■■■■■■■■■■■ 상점 등록 요청 SQL 오류 : {}", e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점 등록 오류 : {}", e.getMessage());
        }

        return rtn;
    }
}
