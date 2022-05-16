package kr.fscom.firsens.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix="ifiresens")
@Qualifier("serviceConfig")
public class ServiceConfig {
    private String aesKey;
}
