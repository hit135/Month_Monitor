package kr.fscom.firsens.common.config;

import kr.fscom.firsens.common.cookie.CommonCookie;
import kr.fscom.firsens.common.jwt.JjwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 관리웹 로그인 여부 Interceptor
 *
 * @author : uhm
 * @version 1.0
 * @FileName : MMConnInterceptor.java
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

@Component
public class MNGNotConInterceptor implements HandlerInterceptor {

    @Autowired
    private JjwtService jjwtService;

    CommonCookie commonCookie = new CommonCookie();

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
        Cookie[] cookies = req.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                if ("firssChalMNGLogin".equals(cookies[i].getName())) {
                    Map<String, String> checkMap = new HashMap<>();
                    String[] StringArr = cookies[i].getValue().split("&");

                    for (String arr : StringArr)
                        checkMap.put(arr.split(":")[0], arr.split(":")[1]);

                    if (checkMap.get("firssChalMNGJwt") != null && jjwtService.isUsable(checkMap.get("firssChalMNGJwt"))) {
                        resp.sendRedirect("/mng/main");
                        return false;
                    } else {    // 로그인 정보 없음
                        commonCookie.deleteCookie(cookies[i], resp);
                        return true;
                    }
                }
            }
        }

        return true;
    }

}
