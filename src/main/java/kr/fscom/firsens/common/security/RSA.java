package kr.fscom.firsens.common.security;

import org.springframework.util.StringUtils;

import javax.crypto.Cipher;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;

/**
 * @Description RSA 보안
 * 
 * @author fs 엄현민
 * @since 2019.05.16.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------------------------------
 *
 * </pre>
 */

public class RSA {

    private String publicKeyModulus = "";       // 공개키 계수
    private String publicKeyExponent = "";      // 공개키 지수
    private PrivateKey privateKey = null;       // 개인키 

    // key값 얻기
    public static RSA getEncKey() throws Exception {
        KeyPairGenerator generator;
        try {
            generator = KeyPairGenerator.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }

        // RSA Key 제네레이터 생성
        generator.initialize(2048);

        KeyPair keyPair = generator.genKeyPair();
        KeyFactory keyFactory;
        try {
            keyFactory = KeyFactory.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }

        PublicKey publicKey = keyPair.getPublic();      // 공개키
        PrivateKey privateKey = keyPair.getPrivate();   // 개인키

        RSAPublicKeySpec publicSpec;
        try {
            publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
            return null;
        }

        String publicKeyModulus = publicSpec.getModulus().toString(16);
        String publicKeyExponent = publicSpec.getPublicExponent().toString(16);

        RSA rsa = new RSA();
        rsa.setPrivateKey(privateKey);
        rsa.setPublicKeyExponent(publicKeyExponent);
        rsa.setPublicKeyModulus(publicKeyModulus);

        return rsa;
    }

    // 복호화 수행
    public static boolean dec(PrivateKey privateKey, String encString) throws Exception {
        boolean result = false;

        if (privateKey == null) 
            throw new RuntimeException("암호화 비밀키 정보를 찾을 수 없습니다.");

        try {
            decryptRsa(privateKey, encString);
            result = true;
        } catch (NullPointerException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return result;
    }

    // 복호화값 얻기
    public static String decryptRsa(PrivateKey privateKey, String securedValue) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");

        byte[] encryptedBytes = hexToByteArray(securedValue);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);

        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        String decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.

        return decryptedValue;
    }

    public static byte[] hexToByteArray(String hex) {
        if (StringUtils.isEmpty(hex) || hex.length() % 2 != 0)
            return new byte[] {};

        byte[] bytes = new byte[hex.length() / 2];

        for (int i = 0; i < hex.length(); i += 2) {
            byte value = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
            bytes[(int) Math.floor((double) i / 2)] = value;
        }

        return bytes;
    }

    public String getPublicKeyModulus() {
        return publicKeyModulus;
    }
    public void setPublicKeyModulus(String publicKeyModulus) {
        this.publicKeyModulus = publicKeyModulus;
    }
    public String getPublicKeyExponent() {
        return publicKeyExponent;
    }
    public void setPublicKeyExponent(String publicKeyExponent) {
        this.publicKeyExponent = publicKeyExponent;
    }
    public PrivateKey getPrivateKey() {
        return privateKey;
    }
    public void setPrivateKey(PrivateKey privateKey) {
        this.privateKey = privateKey;
    }

}
