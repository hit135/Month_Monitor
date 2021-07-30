package kr.fscom.firsens.sys.repository;
import kr.fscom.firsens.sys.domain.SYSStrDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

/**
 * 설명
 *
 * @author : zerojun
 * @version 1.0
 * @FileName : SYSStrRepo
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
public interface SYSStrRepo {
    // 상점 카운트
    int SELECT_CNT_SYS_STR(SYSStrDomain domain) throws Exception;

    // 상점 목록
    List<HashMap<String, Object>> SELECT_LIST_SYS_STR(SYSStrDomain domain) throws Exception;
}