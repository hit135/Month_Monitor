package kr.fscom.firsens.common.config;

import org.apache.commons.collections.MapUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;

import kr.fscom.firsens.common.jwt.JjwtService;
import kr.fscom.firsens.common.session.IPCheck;

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

    private static final Logger LOG = LoggerFactory.getLogger(MNGNotConInterceptor.class);

    IPCheck ipCheck = new IPCheck();

    @Autowired
    private JjwtService jjwtService;

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
        HashMap<String, Object> sessionMap = new HashMap<>();

        try {
            sessionMap = (HashMap<String, Object>) req.getSession().getAttribute(ipCheck.getUserIp());
            if (MapUtils.isNotEmpty(sessionMap)) {
                if ("firssChalMNGLogin".equals(sessionMap.get("loginType")) && jjwtService.isUsable((String) sessionMap.get("jwt"))) {
                    return false;
                } else {
                    req.getSession().removeAttribute(ipCheck.getUserIp());
                    return true;
                } 
            } else {
                return true;
            }
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return false;
    }

}
