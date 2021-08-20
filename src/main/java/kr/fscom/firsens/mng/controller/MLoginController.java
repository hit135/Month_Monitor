package kr.fscom.firsens.mng.controller;

import kr.fscom.firsens.common.keycrypt.KeyEncrypt;
import kr.fscom.firsens.common.keycrypt.RSA;
import kr.fscom.firsens.mng.repository.MLoginRepo;

import kr.fscom.firsens.common.cookie.CommonCookie;
import kr.fscom.firsens.common.jwt.JjwtService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.PrivateKey;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 로그인
 *
 * @author : uhm
 * @version 1.0
 * @FileName : MLoginController
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-08-20    uhm        최초 생성
 *
 * </pre>
 * @since : 2021-08-20
 */

@RestController
@RequestMapping("/mng")
public class MLoginController {

    private static final Logger LOG = LoggerFactory.getLogger(MLoginController.class);
    private final MLoginRepo mLoginRepo;

    CommonCookie commonCookie = new CommonCookie();

    @Autowired
    public MLoginController(MLoginRepo mLoginRepo) {
        this.mLoginRepo = mLoginRepo;
    }

    @Autowired
    private JjwtService jjwtService;

    /**
     * @Method Name : mngPage
     * @작성일 : 2021-04-06
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 로그인 화면 이동
     * @return ModelAndView
     */
    @GetMapping("/loginPage")
    public ModelAndView mngPage() throws Exception {
        return new ModelAndView("mng/m_login");
    }

    /**
     * @Method Name : mngSelectRsaKey
     * @작성일 : 2021-04-06
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : rsa ajax
     * @return HashMap
     */
    @PostMapping("/selectRsaKeyAjax")
    @ResponseBody
    public HashMap<String, Object> mngSelectRsaKey(HttpSession session) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        try {
            RSA rsa = RSA.getEncKey();

            rtn.put("rsaPublicKeyModulus", rsa.getPublicKeyModulus());
            rtn.put("rsaPublicKeyExponent", rsa.getPublicKeyExponent());
            session.setAttribute("__rsaPrivateKey__", rsa.getPrivateKey());

            result = true;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    /**
     * @Method Name : mngLogin
     * @작성일 : 2021-04-05
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 로그인 처리
     * @return HashMap<String, Object>
     */
    @PostMapping("/loginAjax")
    @ResponseBody
    public HashMap<String, Object> mngLogin(
            @RequestBody HashMap<String, Object> paramMap, HttpSession session, HttpServletResponse resp) throws Exception {
        HashMap<String, Object> rtn = new HashMap<>();
        boolean result = false;

        try {
            PrivateKey privateKey = (PrivateKey) session.getAttribute("__rsaPrivateKey__");
            String userId = RSA.decryptRsa(privateKey, (String) paramMap.get("userId"));
            String memPwd = RSA.decryptRsa(privateKey, (String) paramMap.get("memPwd"));
            String sha256MemPwd = new KeyEncrypt().sha256Encryption(memPwd, userId);
            session.removeAttribute("__rsaPrivateKey__");

            HashMap<String, Object> loginResult =
                mLoginRepo.SELECT_SYS_LOGIN(new HashMap<String, Object>() {{ put("userId", userId); put("memPwd", sha256MemPwd); }});

            if (loginResult != null) {
                int upd = mLoginRepo.UPDATE_SYS_MEMRSNTDATE(new HashMap<String, Object>() {{ put("userId", userId); }});

                Map<String, String> cookieMap = new HashMap<String, String>() {{
                    put("userId", userId);
                    put("firssChalMNGJwt", jjwtService.createToken("member", loginResult, "user"));
                }};

                String cookieMapString = cookieMap
                    .keySet()
                    .stream()
                    .map(key -> key + ":" + cookieMap.get(key)).collect(Collectors.joining("&"));

                commonCookie.createLoginCookie("firssChalMNGLogin", cookieMapString, resp);
                result = true;
            }
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        } finally {
            rtn.put("result", result);
        }

        return rtn;
    }

    /**
     * @Method Name : mngLogout
     * @작성일 : 2021-04-07
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 로그아웃 처리
     * @return ModelAndView
     */
    @GetMapping("/logout")
    public ModelAndView mngLogout(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        commonCookie.deleteAllLoginCookie(req, resp, "firssChalMNGLogin");
        return new ModelAndView("redirect:/mng/main");
    }


}
