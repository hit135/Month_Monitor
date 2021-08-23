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
    // 센서 중복체크
    int SELECT_CHK_SYS_SNSRID(SYSSnsrDomain domain) throws Exception;
    // 센서 조회
    SYSSnsrDomain SELECT_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    // 센서 수정
    int UPDATE_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    // 센서 삭제
    int DELETE_SYS_SNSR(SYSSnsrDomain domain) throws Exception;
    // 센서키
    int GENERATE_SNSR_CODE(SYSSnsrDomain domain) throws Exception;

    // 센서 갱신 목록
    List<HashMap<String, Object>> LIST_SYS_SNSRU(HashMap<String, Object> param) throws Exception;
    int CNT_SYS_SNSRU(HashMap<String, Object> param) throws Exception;
    int INSERT_SYS_SNSRU(HashMap<String, Object> param) throws Exception;
    int UPDATE_SYS_SNSRU(HashMap<String, Object> param) throws Exception;
    int DELETE_SYS_SNSRU(String param) throws Exception;

}
