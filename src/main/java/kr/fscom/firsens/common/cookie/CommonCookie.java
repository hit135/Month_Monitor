package kr.fscom.firsens.common.cookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

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
    public void createLoginCookie(String key, String val, int maxAge, HttpServletResponse resp) {
        Cookie cookie = new Cookie(key, val);

        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

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
            for (Cookie cookie : cookies) {
                if (paramName.equals(cookie.getName())) {
                    Cookie delCookie = new Cookie(paramName, null);
                    delCookie.setMaxAge(0);
                    delCookie.setPath("/");
                    delCookie.setSecure(true);
                    resp.addCookie(delCookie);

                    break;
                }
            }
        }
    }

    /**
     * @Method Name : selectCookieMap
     * @작성일 : 2021-04-30
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : 로그인 계정의 정보 반환(token 제외)
     * @return String
     */
    public HashMap<String, Object> selectCookieMap(HttpServletRequest req, String paramName) {
        HashMap<String, Object> rtn = new HashMap<>();
        Cookie[] cookies = req.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (paramName.equals(cookie.getName())) {
                    String cookieValue = cookie.getValue();
                    if (StringUtils.isNotBlank(cookieValue))
                        cookieValue = cookieValue.replaceAll("\r", "").replaceAll("\n", "");

                    String[] StringArr = cookieValue.split("&");

                    for (String arr : StringArr) {
                        String key = arr.split(":")[0];
                        String val = arr.split(":")[1];

                        if (key.indexOf("Jwt") == -1)
                            rtn.put(key, val);
                    }
                }
            }
        }

        return rtn;
    }

}
