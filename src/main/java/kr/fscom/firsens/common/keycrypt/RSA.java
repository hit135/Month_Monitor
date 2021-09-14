package kr.fscom.firsens.common.keycrypt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;

import javax.crypto.Cipher;
import java.io.UnsupportedEncodingException;

import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;

/**
 * @author fs 엄현민
 * @version 1.0
 * @Description RSA 보안
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자     수정내용
 *   -----------   --------   ---------------------------------------------------
 *
 * </pre>
 * @since 2019.05.16.
 */

public class RSA {

    private static final Logger LOG = LoggerFactory.getLogger(RSA.class);

    private String publicKeyModulus = "";       // 공개키 계수
    private String publicKeyExponent = "";      // 공개키 지수
    private PrivateKey privateKey = null;       // 개인키

    // key값 얻기
    public static RSA getEncKey() throws Exception {
        RSA rsa = new RSA();

        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);

            KeyPair keyPair = generator.genKeyPair();
            rsa.setPrivateKey(keyPair.getPrivate());

            RSAPublicKeySpec publicSpec = KeyFactory.getInstance("RSA").getKeySpec(keyPair.getPublic(), RSAPublicKeySpec.class);

            rsa.setPublicKeyExponent(publicSpec.getPublicExponent().toString(16));
            rsa.setPublicKeyModulus(publicSpec.getModulus().toString(16));
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

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
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return result;
    }

    // 복호화값 얻기
    public static String decryptRsa(PrivateKey privateKey, String securedValue) throws Exception {
        String decryptedValue = "";

        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, privateKey);

            decryptedValue = new String(cipher.doFinal(hexToByteArray(securedValue)), "utf-8");       // 문자 인코딩 주의.
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            LOG.debug(e.getMessage());
        } catch (Exception e) {
            LOG.debug(e.getMessage());
        }

        return decryptedValue;
    }

    public static byte[] hexToByteArray(String hex) throws Exception {
        byte[] bytes;

        if (StringUtils.isEmpty(hex) || hex.length() % 2 != 0) {
            bytes = new byte[] {};
        } else {
            try {
                bytes = new byte[hex.length() / 2];

                for (int i = 0; i < hex.length(); i += 2)
                    bytes[(int) Math.floor((double) i / 2)] = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
            } catch (NumberFormatException e) {
                LOG.debug(e.getMessage());
                bytes = new byte[] {};
            } catch (Exception e) {
                LOG.debug(e.getMessage());
                bytes = new byte[] {};
            }
        }

        return bytes;
    }

    public String getPublicKeyModulus() { return publicKeyModulus; }
    public String getPublicKeyExponent() { return publicKeyExponent; }
    public PrivateKey getPrivateKey() { return privateKey; }

    public void setPublicKeyModulus(String publicKeyModulus) { this.publicKeyModulus = publicKeyModulus; }
    public void setPublicKeyExponent(String publicKeyExponent) { this.publicKeyExponent = publicKeyExponent; }
    public void setPrivateKey(PrivateKey privateKey) { this.privateKey = privateKey; }

}
