package kr.fscom.firsens.common.config;

import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;

import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;

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

    @Autowired
    private MNGConInterceptor mngConInterceptor;

    @Autowired
    private MNGNotConInterceptor mngNotConInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(mngConInterceptor)
                .addPathPatterns("/mng/**")
                .excludePathPatterns("/mng/loginPage", "/mng/selectRsaKeyAjax", "/mng/loginAjax", "/mng/logout", "/mng/incheon/**");

        registry.addInterceptor(mngConInterceptor).addPathPatterns("/adm/**");

        registry.addInterceptor(mngNotConInterceptor)
                .addPathPatterns("/mng/loginPage", "/mng/selectRsaKeyAjax", "/mng/loginAjax");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/mng/main");
        registry.addViewController("/mng/incheon").setViewName("redirect:/mng/incheon/main");
        registry.addViewController("/incheon").setViewName("redirect:/mng/incheon/main");
        registry.addViewController("/incheon/mobile").setViewName("redirect:/mng/incheon/mobile/main");
        registry.addViewController("/adm").setViewName("forward:/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
    }

    // 로컬 파일 테스트 추후 삭제예정
    private final String uploadImagesPath;
    public MvcConfig(@Value("${custom.path.upload-images}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("file:src/main/resources/templates/");
        registry.addResourceHandler("/index.html").addResourceLocations("classpath:/public/");

        registry.addResourceHandler("/smartadmin/**", "/fs/**", "/static/**")
                .addResourceLocations("classpath:/static/smartadmin/", "classpath:/static/fs/", "classpath:/public/static/");

        registry.addResourceHandler("/*.js", "/*.json", "/*.ico")
                .addResourceLocations("classpath:/public/", "classpath:/public/", "classpath:/public/");

        registry.addResourceHandler("/imgstore/**", "/imgarea/**")
                .addResourceLocations("file:/home/apps/img/imgstore/", "file:/home/apps/img/imgarea/");

        registry.addResourceHandler("/localImgstore/**", "/localImgarea/**")
                .addResourceLocations("file:///" + uploadImagesPath + "/")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }

}