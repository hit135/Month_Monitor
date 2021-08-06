package kr.fscom.firsens.sys.repository;

import kr.fscom.firsens.sys.domain.SYSSnsrDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface SYSSnsrRepo {
    // 센서목록 카운트
    int SELECT_CNT_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    // 센서목록
    List<HashMap<String, Object>> SELECT_LIST_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    // 센서등록
    int INSERT_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    int GENERATE_SNSR_CODE(SYSSnsrDomain domain) throws Exception;
}
