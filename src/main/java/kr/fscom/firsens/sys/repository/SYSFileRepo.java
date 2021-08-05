package kr.fscom.firsens.sys.repository;

import kr.fscom.firsens.sys.domain.SYSFileDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSFileRepo {
    List<HashMap<String, Object>> SELECT_SYS_FILE(SYSFileDomain domain) throws Exception;
    int INSERT_SYS_FILE(SYSFileDomain domain) throws Exception;
    int UPDATE_SYS_FILE_ORDER(SYSFileDomain domain) throws Exception;
    int DELETE_SYS_FILE(SYSFileDomain domain) throws Exception;
}
