package kr.fscom.firsens.common.jwt;

import io.jsonwebtoken.*;

import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;

/**
 * JJWT 처리 imple
 *
 * @FileName : JjwtServiceImpl.java
 * @author : uhm
 * @since : 2021-04-06
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

@Slf4j
@Service("jjwtService")
public class JjwtServiceImpl implements JjwtService {

    private static final Logger LOG = LoggerFactory.getLogger(JjwtServiceImpl.class);
    private static final String SALT = "firesensSecret";

    /**
     * @Method Name : createToken
     * @작성일 : 2021-04-06
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : jjwt token 생성
     * @return <T> String
     */
    @Override
    public <T> String createToken(String key, T data, String subject) {
        String rtn = "";

        try {
            rtn = Jwts.builder()
                      .setHeaderParam("typ", "JWT")
                      .setHeaderParam("regDate", System.currentTimeMillis())
                      .setSubject(subject).claim(key, data)
                      .signWith(SignatureAlgorithm.HS256, this.generateKey())
                      .compact();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : getJwtContent
     * @작성일 : 2021-04-07
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : jjwt에 저장된 member 정보 반환
     * @return HashMap<String, Object>
     */
    @Override
    public HashMap<String, Object> getJwtContent(String jwt) {
        HashMap<String, Object> rtn = new HashMap<>();

        try {
            rtn = (HashMap<String, Object>) Jwts.parser()
                                                .setSigningKey(this.generateKey())
                                                .parseClaimsJws(jwt)
                                                .getBody()
                                                .get("member");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return rtn;
    }

    /**
     * @Method Name : getUserId
     * @작성일 : 2021-04-07
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : jjwt에 저장된 userId 정보 반환
     * @return String
     */
    @Override
    public String getUserId(String jwt) {
        String userId = "";

        try {
            userId = (String) getJwtContent(jwt).get("userId");
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return userId;
    }

    /**
     * @Method Name : isUsable
     * @작성일 : 2021-04-07
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : jjwt에 저장된 token 유효성 검증
     * @return boolean
     */
    @Override
    public boolean isUsable(String jwt) {
        try {
            Claims claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt).getBody();
            return true;
        } catch (ExpiredJwtException e) {   // Token이 만료된 경우 Exception이 발생한다.
            log.error("Token Expired");
            return false;
        } catch (JwtException e) {          // Token이 변조된 경우 Exception이 발생한다.
            log.error("Token Error");
            return false;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    /**
     * @Method Name : generateKey
     * @작성일 : 2021-04-07
     * @작성자 : uhm
     * @변경이력 :
     * @Method 설명 : token key generate
     * @return byte[]
     */
    private byte[] generateKey() {
        byte[] key = null;

        try {
            key = SALT.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            if (log.isInfoEnabled()) {
                e.printStackTrace();
            } else {
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }

        return key;
    }

}
