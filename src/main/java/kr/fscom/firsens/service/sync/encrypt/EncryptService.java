package kr.fscom.firsens.service.sync.encrypt;

import kr.fscom.firsens.service.ServiceConfig;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class EncryptService {

    private static ServiceConfig serviceConfig;

    protected static final Log LOG = LogFactory.getLog(EncryptService.class);
    private static String IV = "";

    @Autowired
    public EncryptService(ServiceConfig serviceConfig) {
        EncryptService.serviceConfig = serviceConfig;
        IV = serviceConfig.getAesKey().substring(0, 16);
    }

    public static String Encryption(String orgDataStr) throws java.io.UnsupportedEncodingException,
            NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException,
            IllegalBlockSizeException, BadPaddingException {
        if (orgDataStr.isEmpty()) {
            return "";
        } else {
//            byte[] keyData = serviceConfig.getAesKey().getBytes("UTF-8");
//            SecretKey secureKey = new SecretKeySpec(keyData, "AES");

            Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
//            c.init(Cipher.ENCRYPT_MODE, secureKey);
            c.init(Cipher.ENCRYPT_MODE, generateAES128Key(serviceConfig.getAesKey(),"UTF-8"));
            byte[] encrypted = c.doFinal(orgDataStr.getBytes("UTF-8"));

            return new String(Base64.encodeBase64(encrypted));
        }
    }

    private static SecretKeySpec generateAES128Key(final String key, final String encoding) {
        try {
            final byte[] finalKey = new byte[16];
            int i = 0;
            for(byte b : key.getBytes(encoding)) {
                finalKey[i++ % 16] ^= b;
            }
            return new SecretKeySpec(finalKey, "AES");
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
    }


}