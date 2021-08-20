package kr.fscom.firsens.common.cookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * 쿠키 공통 처리
 *
 * @FileName : CommonCookie.java
 * @author : uhm
 * @since : 2021-04-28
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-04-28    uhm        최초 생성
 *
 * </pre>
 */

public class CommonCookie {

    /**
     * @Method Name : createLoginCookie
     * @작성일 : 2021-04-28
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 로그인 cookie 생성
     * @return
     */
    public void createLoginCookie(String key, String val, HttpServletResponse resp) {
        Cookie cookie = new Cookie(key, val);
        cookie.setMaxAge(2147483647);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        resp.addCookie(cookie);
    }

    /**
     * @Method Name : deleteAllLoginCookie
     * @작성일 : 2021-04-28
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 모든 로그인 cookie 제거
     * @return
     */
    public void deleteAllLoginCookie(HttpServletRequest req, HttpServletResponse resp, String paramName) {
        Cookie[] cookies = req.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                if (paramName.equals(cookies[i].getName())) {
                    cookies[i].setMaxAge(0);
                    cookies[i].setPath("/");
                    resp.addCookie(cookies[i]);
                    break;
                }
            }
        }
    }

    /**
     * @Method Name : deleteCookie
     * @작성일 : 2021-04-28
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 단일 cookie 제거
     * @return
     */
    public void deleteCookie(Cookie cookie, HttpServletResponse resp) {
        cookie.setMaxAge(0);
        cookie.setPath("/");
        resp.addCookie(cookie);
    }

}
