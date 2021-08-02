package kr.fscom.firsens.sys.controller;
import kr.fscom.firsens.common.Base64ToImgDecoder;
import kr.fscom.firsens.sys.domain.SYSStrDomain;
import kr.fscom.firsens.sys.repository.SYSStrRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import sun.misc.BASE64Encoder;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SYSStrController {
    private static final Logger LOG = LoggerFactory.getLogger(SYSStrController.class);
    private final SYSStrRepo sysStrRepo;

    @Autowired
    SYSStrController(SYSStrRepo sysStrRepo) { this.sysStrRepo = sysStrRepo; }


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
    public HashMap<String, Object> insertStr(@ModelAttribute SYSStrDomain domain) throws Exception {

        LOG.info("■■■■■■■■■■■■■■■ 상점 등록 시작 ");
        HashMap<String, Object> rtn = new HashMap<String, Object>();

        try {
            int result = 0;

            if(domain.getFiles().length > 0) {
                String fileName = System.currentTimeMillis() + ".png";
                String filePath = "D:/filepath/";
                Base64ToImgDecoder imgDecoder = new Base64ToImgDecoder();
                //file is MultipartFile
                BASE64Encoder base64Encoder =new BASE64Encoder();
                String base64EncoderImg = base64Encoder.encode(domain.getFiles()[0].getBytes());
                imgDecoder.decoder(base64EncoderImg, filePath + fileName);
            }




            if(result > 0)
                rtn.put("result", "success");
            else
                rtn.put("result", "fail");

        }

//        catch (SQLException e) {
//            LOG.error("■■■■■■■■■■■■■■■ 상점 등록 요청 SQL 오류 : {}", e.getMessage());
//        }

        catch (Exception e) {
            e.printStackTrace();
            LOG.error("■■■■■■■■■■■■■■■ 상점 등록 오류 : {}", e.getMessage());
        }

        return rtn;
    }
}
