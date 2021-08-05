package kr.fscom.firsens.sys.controller;
import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.domain.SYSFileDomain;
import kr.fscom.firsens.sys.domain.SYSStrDomain;
import kr.fscom.firsens.sys.repository.SYSAreaRepo;
import kr.fscom.firsens.sys.repository.SYSFileRepo;
import kr.fscom.firsens.sys.repository.SYSStrRepo;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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
//    private final String filePathValue = "D:/home/apps/img/imgstore/";
    static String filePathValue = "/home/apps/img/imgstore/";

    @Autowired
    SYSStrController(SYSStrRepo sysStrRepo, SYSAreaRepo sysAreaRepo, SYSFileRepo sysFileRepo) { this.sysStrRepo = sysStrRepo; this.sysAreaRepo = sysAreaRepo; this.sysFileRepo = sysFileRepo; }


    @GetMapping("/strs")
    public HashMap<String, Object> listPageStrs(SYSStrDomain domain, int page, int size, String searchWrd, String useYn) throws Exception {
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
            if(!domain.getAreaCode().equals("")) {
                domain.setKeyFied("STORE_ID");
                sysStrRepo.GENERATE_STORE_CODE(domain);
                domain.setStrCode("FS_STR_"+String.format("%013d", domain.getGenerateKey()));
                domain.setModifyStrCode(domain.getStrCode());
                duplicateCnt = sysStrRepo.SELECT_CHK_SYS_STRCODE(domain);           // 상점코드 중복 체크

                if(duplicateCnt > 0) {
                    rtn.put("result", "duplicate");
                } else {
                    SYSAreaDomain vo = sysAreaRepo.SELECT_ONE_SYS_AREA_ITEM(domain.getAreaCode());
                    if(domain.getStrPosLat() == null || domain.getStrPosLat() == 0.0 && vo.getAreaPosLat() != null) {
                        domain.setStrPosLat(vo.getAreaPosLat());
                    }
                    if(domain.getStrPosLon() == null || domain.getStrPosLon() == 0.0 && vo.getAreaPosLon() != null) {
                        domain.setStrPosLon(vo.getAreaPosLon());
                    }

                    result = sysStrRepo.INSERT_SYS_STR(domain);

                    if(result > 0) {
                        int imgNum = 0;
                        rtn.put("result", "success");
                        if(domain.getFiles() != null) {
                            String filePath =  filePathValue + domain.getAreaCode() + "/" + domain.getStrCode() + "/";
                            File newFile = new File(filePath);
                            if(newFile.mkdirs()) {
                                for(MultipartFile file : domain.getFiles()) {
                                    imgNum ++;
                                    try {
                                        fileUpload(file, filePath, domain, imgNum);
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
            } else
                rtn.put("result", "fail");
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

    @PostMapping("/selectStr")
    public HashMap<String, Object> selectStr(@RequestBody SYSStrDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.info("■■■■■■■■■■■■■■■ 상점 상세 요청 시작 ");
        try {
            if (!domain.getStrCode().equals("")) {
                rtn.put("content", sysStrRepo.SELECT_SYS_ONE_STR(domain));
                SYSFileDomain fvo = new SYSFileDomain();
                fvo.setAreaCode(domain.getAreaCode());
                fvo.setStrCode(domain.getStrCode());
                rtn.put("fileContent", sysFileRepo.SELECT_SYS_FILE(fvo));
                rtn.put("result", "success");
            } else {
                rtn.put("result", "fail");
            }
        } catch (SQLException e) {
            LOG.error("■■■■■■■■■■■■■■■ 상점 상세 요청 SQL 오류 : {}", e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점 상세 오류 : {}", e.getMessage());
        }

        return rtn;
    }

    @PostMapping("/updateStr")
    public HashMap<String, Object> updateStr(@ModelAttribute SYSStrDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.info("■■■■■■■■■■■■■■■ 상점 수정 요청 시작 ");
        try {
            int updateCnt = 0;
            if(!domain.getStrCode().equals("") && !domain.getAreaCode().equals("")) {
                if(!domain.getStrCode().equals(domain.getModifyStrCode())) {                // 상점 코드 수정 체크
                    int duplicateCnt = sysStrRepo.SELECT_CHK_SYS_STRCODE(domain);           // 상점코드 중복 체크
                    if(duplicateCnt > 0) {
                        rtn.put("result", "duplicate");
                        return rtn;
                    } else {
                        updateCnt = sysStrRepo.UPDATE_SYS_STR(domain);
                    }
                } else {
                    updateCnt = sysStrRepo.UPDATE_SYS_STR(domain);
                }

                SYSFileDomain fvo = new SYSFileDomain();
                if(updateCnt > 0) {
                    rtn.put("result", "success");
                    String filePath = filePathValue + domain.getAreaCode() + "/" + domain.getStrCode() + "/";
                    // 첨부파일 삭제
                    if(domain.getDeleteFileList() != null) {
                        fvo.setAreaCode(domain.getAreaCode());
                        fvo.setStrCode(domain.getStrCode());
                        try {
                            for(String fileName : domain.getDeleteFileList()) {
                                fvo.setImgName(fileName.replace(".png", ""));
                                File file = new File(filePath);
                                if(file.isDirectory()) {
                                    file = new File(filePath + fileName);
                                    if(file.isFile()) {
                                        file.delete();
                                        sysFileRepo.DELETE_SYS_FILE(fvo);
                                    }
                                } else {
                                    LOG.debug("■■■■■■■■■■■■■■■ 파일이나 디렉토리가 존재하지 않습니다");
                                }
                            }
                        } catch (IOException ex) {
                            LOG.info("■■■■■■■■■■■■■■■ 첨부파일 삭제 오류 : " + ex);
                        } catch (SQLException ex) {
                            LOG.info("■■■■■■■■■■■■■■■ 파일 디비 삭제 오류 : " + ex);
                        }
                    }

                    // 첨부파일 등록
                    if(domain.getFiles() != null) {
                        try {
                            File newFile = new File(filePath);
                            if(!newFile.isDirectory()) {        // 첨부파일 경로 폴더 없을 때 생성
                                newFile.mkdirs();
                            }

                            for(MultipartFile file : domain.getFiles()) {
                                File files = new File(filePath + file.getOriginalFilename());
                                if(!files.isFile()) {
                                    fileUpload(file, filePath, domain, 0);
                                }
                            }

                        } catch (IOException ex) {
                            LOG.info("■■■■■■■■■■■■■■■ 첨부파일 수정 오류 : " + ex);
                        } catch (SQLException ex) {
                            LOG.info("■■■■■■■■■■■■■■■ 파일 디비 수정 오류 : " + ex);
                        }
                    }

                    if(domain.getFiles() != null || domain.getDeleteFileList() != null) {
                        sysFileRepo.UPDATE_SYS_FILE_ORDER(fvo);
                    }
                }
                else
                    rtn.put("result", "fail");
            } else {
                rtn.put("result", "fail");
            }
        } catch (SQLException e) {
            LOG.error("■■■■■■■■■■■■■■■ 상점 수정 요청 SQL 오류 : {}", e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점 수정 오류 : {}", e.getMessage());
        }

        return rtn;
    }

    @PostMapping("/deleteStr")
    public HashMap<String, Object> deleteStr(@ModelAttribute SYSStrDomain domain) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        LOG.info("■■■■■■■■■■■■■■■ 상점 삭제 요청 시작 ");
        try {
            if (!domain.getStrCode().equals("") && !domain.getAreaCode().equals("")) {
                String filePath = filePathValue + domain.getAreaCode() + "/" + domain.getStrCode() + "/";
                int deleteCnt = sysStrRepo.DELETE_SYS_STR(domain);

                if(deleteCnt > 0) {
                    rtn.put("result", "success");

                    // 첨부파일 삭제
                    if(domain.getFiles() != null) {
                        SYSFileDomain fvo = new SYSFileDomain();
                        fvo.setAreaCode(domain.getAreaCode());
                        fvo.setStrCode(domain.getStrCode());

                        for(MultipartFile file : domain.getFiles()) {
                            fvo.setImgName(file.getOriginalFilename().replace(".png", ""));
                            File files = new File(filePath);
                            if(files.isDirectory()) {
                                files = new File(filePath + file.getOriginalFilename());
                                if(files.isFile()) {
                                    files.delete();
                                    sysFileRepo.DELETE_SYS_FILE(fvo);
                                }
                            } else {
                                LOG.debug("■■■■■■■■■■■■■■■ 파일이나 디렉토리가 존재하지 않습니다");
                            }
                        }

                        sysFileRepo.UPDATE_SYS_FILE_ORDER(fvo);
                    }
                } else
                    rtn.put("result", "fail");
            } else {
                rtn.put("result", "fail");
            }
        } catch (SQLException e) {
            LOG.error("■■■■■■■■■■■■■■■ 상점 삭제 요청 SQL 오류 : {}", e.getMessage());
            rtn.put("result", "fail");
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점 삭제 오류 : {}", e.getMessage());
            rtn.put("result", "fail");
        }

        return rtn;
    }

    public void fileUpload(MultipartFile file, String filePath, SYSStrDomain domain, int imgNum) throws Exception {
        try {
            SYSFileDomain fvo = new SYSFileDomain();
            String fileName = String.valueOf(System.currentTimeMillis());

            BASE64Encoder base64Encoder =new BASE64Encoder();
            String base64EncoderImg = base64Encoder.encode(file.getBytes());
            byte[] data = Base64.decodeBase64(base64EncoderImg);
            try (OutputStream stream = new FileOutputStream(filePath + fileName + ".png")) {
                stream.write(data);
            }

            byte[] imgBytes = file.getBytes();
            int imgSize = imgBytes.length;

            fvo.setImgName(fileName);
            fvo.setStrCode(domain.getStrCode());
            fvo.setImgSize(imgSize);
            fvo.setImgPath("/imgstore/");
            fvo.setOriName("imgfile");
            fvo.setImgNum(imgNum);
            fvo.setAreaCode(domain.getAreaCode());

            sysFileRepo.INSERT_SYS_FILE(fvo);
        } catch (IOException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 첨부파일 생성 오류 : {}", ex.getMessage());
        } catch (SQLException ex) {
            LOG.error("■■■■■■■■■■■■■■■ 첨부파일 디비 생성 오류 : {}", ex.getMessage());
        }
    }
}
