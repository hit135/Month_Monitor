package kr.fscom.firsens.common.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Configuration;
// import javax.servlet.annotation.WebListener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Configuration
public class WasSessionListener implements HttpSessionListener {

    private static final Logger LOG = LoggerFactory.getLogger(WasSessionListener.class);

    private int sessionCount = 0;

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        LOG.info("========== Session Created : " + event.getSession() + ", Session Count : " + ++sessionCount + " ==========");
        event.getSession().setMaxInactiveInterval(86400);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        LOG.info("========== Session Destroyed : " + event.getSession() + ", Session Count : " + --sessionCount + " ==========");
    }

}