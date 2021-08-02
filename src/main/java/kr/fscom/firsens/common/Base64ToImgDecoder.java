package kr.fscom.firsens.common;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

/**
 * @Class Name : Base64ToImgDecoder.java
 * @Description : Base64 이미지 디코더
 * @Modification Information
 *
 *   수정일         수정자      수정내용
 *   -----------    --------    -------------------
 *   2019.06.21.    전홍구      최초생성
 *
 * @author 전홍구
 * @since 2019. 06. 21.
 * @version  0.1
 * @see
 *
 */

public class Base64ToImgDecoder {

    // docoder 를 호출할때 인자로 Base64 문자열과 저장될 경로와 파일명으로 전달 ex) D:/test/imgFile01.png
    // 변환에 성공하면 true를 리턴한다.
    public boolean decoder(String data, String target){

//        String data = base64.split(",")[1];

        byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);

        try {
            BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
            ImageIO.write(bufImg, "png", new File(target));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
