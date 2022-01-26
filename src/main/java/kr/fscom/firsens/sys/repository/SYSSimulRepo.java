package kr.fscom.firsens.sys.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSSimulRepo {

    int INSERT_SYS_PUSH(HashMap<String, Object> param) throws Exception;

}
