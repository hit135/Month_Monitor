package kr.fscom.firsens.sys.repository;

import kr.fscom.firsens.sys.domain.SYSFileDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SYSFileRepo {
    int INSERT_SYS_FILE(SYSFileDomain domain) throws Exception;
    int DELETE_SYS_FILE(SYSFileDomain domain) throws Exception;
}
