package kr.fscom.firsens.common.config;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 * SMS 환경변수 조회
 *
 * @author : uhm
 * @version 1.0
 * @FileName : MNGSmsEnvironment
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2022-03-28    uhm        최초 생성
 *
 * </pre>
 * @since : 2022-03-28
 */

@Configuration
@PropertySource(value = "classpath:static/fs/props/sms_info.properties")
public class MNGSmsEnvironment implements EnvironmentAware {
    
    private static Environment env;

    @Override
    public void setEnvironment(Environment environment) {
        this.env = environment;
    }

    public static String getProp(String key) {
        return env.getProperty(key);
    }

}
