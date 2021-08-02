package kr.fscom.firsens.sys.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SYSFileDomain {
    private String name = "";
    private String path = "";
    private int size = 0;
    private String type = "";
}
