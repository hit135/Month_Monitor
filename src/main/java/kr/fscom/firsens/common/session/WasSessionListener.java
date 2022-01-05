package kr.fscom.firsens.common.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class WasSessionListener implements HttpSessionListener {

    private static final Logger LOG = LoggerFactory.getLogger(WasSessionListener.class);

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        event.getSession().setMaxInactiveInterval(86400);
        LOG.info("====== Session Created :" + event.getSession() + " ======");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        LOG.info("====== Session Destroyed : " + event.getSession() + " ======");
    }

}