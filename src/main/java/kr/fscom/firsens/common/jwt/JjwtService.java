package kr.fscom.firsens.common.jwt;

import java.util.HashMap;

/**
 * JJWT 처리 interface
 *
 * @FileName : JjwtService.java
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

public interface JjwtService {

    <T> String createToken(String key, T data, String subject);
    HashMap<String, Object> getJwtContent(String jwt);
    String getUserId(String jwt);
    boolean isUsable(String jwt);

}
