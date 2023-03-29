package kr.fscom.firsens;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FirsensApplication extends SpringBootServletInitializer {
    
    private static final Logger LOG = LoggerFactory.getLogger(FirsensApplication.class);

    // 외부 tomcat 사용
    // @Override
    // protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    //     return application.sources(FirsensApplication.class);
    // }

    public static void main(String[] args) {
        try {
            SpringApplication.run(FirsensApplication.class, args);
            LOG.info("▶▶▶▶▶▶▶▶▶▶ 챌린지 자치구별 매월 관리현황");
        } catch (NullPointerException e) {
            LOG.debug(e.getMessage());
        } catch (InternalError e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }
    }

}
