package kr.fscom.firsens.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.io.IOException;

/**
 * Spring Boot Mvc 설정
 *
 * @FileName : MvcConfig.java
 * @author : jjm
 * @since : 2021-07-06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-06    jjm   최초 생성
 *
 * </pre>
 */

@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/mng/main");
        registry.addViewController("/adm").setViewName("forward:/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/**")
                .addResourceLocations("file:src/main/resources/templates/");
        registry.addResourceHandler("/smartadmin/**")
                .addResourceLocations("classpath:/static/smartadmin/");
        registry.addResourceHandler("/fs/**")
                .addResourceLocations("classpath:/static/fs/");


        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/public/static/");
        registry.addResourceHandler("/*.js")
                .addResourceLocations("classpath:/public/");
        registry.addResourceHandler("/*.json")
                .addResourceLocations("classpath:/public/");
        registry.addResourceHandler("/*.ico")
                .addResourceLocations("classpath:/public/");
        registry.addResourceHandler("/index.html")
                .addResourceLocations("classpath:/public/");

    }
}
