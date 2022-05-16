package kr.fscom.firsens.sys.repository;

import kr.fscom.firsens.sys.domain.SYSAreaDomain;
import kr.fscom.firsens.sys.domain.SYSMemDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

/**
 * 설명
 *
 * @author : zerojun
 * @version 1.0
 * @FileName : SYSAreaRepo
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------
 *   2021-07-15   zerojun       최초 생성
 *
 * </pre>
 * @since : 2021-07-15
 */
@Mapper
@Repository
public interface SYSMemRepo {

    int CNT_SYS_MEM(SYSMemDomain domain) throws Exception;                                      // 회원목록 카운트
    List<SYSMemDomain> LIST_SYS_MEM(SYSMemDomain domain) throws Exception;           // 회원 목록
    List<SYSMemDomain> LIST_MODAL_SYS_MEM(String searchWrd) throws Exception;        // 모달 회원 목록
    int CHK_MEM_ID(SYSMemDomain domain) throws Exception;                                       // 중복 체크
    int INSERT_SYS_MEM(SYSMemDomain domain) throws Exception;                                   // 회원 등록
    SYSMemDomain SELECT_SYS_MEM(SYSMemDomain domain) throws Exception;                          // 회원 선택
    int UPDATE_SYS_MEM(SYSMemDomain domain) throws Exception;                                   // 회원 수정
    int DELETE_SYS_MEM(SYSMemDomain domain) throws Exception;                                   // 회원 삭제

}
