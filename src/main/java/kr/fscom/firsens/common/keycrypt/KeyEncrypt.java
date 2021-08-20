package kr.fscom.firsens.common.keycrypt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class KeyEncrypt {

    private static final Logger LOG = LoggerFactory.getLogger(KeyEncrypt.class);

    public String sha256Encryption(String passWd, String salt) {
        String sha = "";

        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(salt.getBytes());
            
            StringBuffer sb = new StringBuffer();
            for (byte i : sh.digest(passWd.getBytes(Charset.forName("UTf-8")))) {
                String hex = Integer.toString((i & 0xff) + 0x100, 16);
                String ap = hex.substring(1);
                sb.append(ap);
            }

            sha = sb.toString();
        } catch (NoSuchAlgorithmException | NullPointerException e) {
            LOG.debug(e.getMessage());
            sha = "";
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            sha = "";
        }

        return sha;
    }

    public String getSalt() throws NoSuchAlgorithmException {
        byte[] salt = new byte[16];

        try {
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.nextBytes(salt);
        } catch (NoSuchAlgorithmException e) {
            LOG.debug(e.getMessage());
            salt = new byte[0];
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            salt = new byte[0];
        }

        return salt.toString();
    }

}
