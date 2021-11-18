package kr.fscom.firsens.mng.challenge.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Mapper
@Repository
public interface MCLoginRepo {

    HashMap<String, Object> SELECT_MCL_LOGIN(Map<String, Object> param) throws Exception;
    int UPDATE_MCL_MEMRSNTDATE(Map<String, Object> param) throws Exception;

}
