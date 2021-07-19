package kr.fscom.firsens.common.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
// import java.security.SecureRandom;

/**
 * @Description SHA-256 암호화
 *
 * @author mono
 * @since 2019.05.15.
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

public class Sha256Encrypt {

    public String getHex(String pwd, String salt) {
        StringBuilder sb = new StringBuilder();

        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(salt.getBytes());

            byte[] input = sh.digest(pwd.getBytes("UTF-8"));
            // byte array to hex string
            for (byte i : input) {
                String hex = Integer.toString((i & 0xff) + 0x100, 16);
                String ap = hex.substring(1);
                sb.append(ap);
            }
        } catch (NoSuchAlgorithmException | NullPointerException e) {
            e.printStackTrace();
            sb.setLength(0);
        } catch (Exception e) {
            e.printStackTrace();
            sb.setLength(0);
        }

        return sb.toString();
    }

    /*
    public String getSalt() throws NoSuchAlgorithmException {
        SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");

        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);

        return salt.toString();
    }
    */

}
