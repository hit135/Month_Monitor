package kr.fscom.firsens.mng.incheon.controller;

import kr.fscom.firsens.mng.challenge.repository.MCMainRepo;

import kr.fscom.firsens.mng.incheon.repository.MIMainRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mng/incheon")
public class MIMainController {

    private static final Logger LOG = LoggerFactory.getLogger(MIMainController.class);
    private final MIMainRepo miMainRepo;

    @Autowired
    public MIMainController(MIMainRepo miMainRepo) {
        this.miMainRepo = miMainRepo;
    }

    @Value("${globals.naver.clientId}")
    private String naverClientId;

}
