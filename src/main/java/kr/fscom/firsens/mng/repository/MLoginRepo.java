package kr.fscom.firsens.mng.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Mapper
@Repository
public interface MLoginRepo {

    HashMap<String, Object> SELECT_SYS_LOGIN(Map<String, Object> param) throws Exception;
    int UPDATE_SYS_MEMRSNTDATE(Map<String, Object> param) throws Exception;

}
