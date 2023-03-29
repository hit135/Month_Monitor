package kr.fscom.firsens.month.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Mapper
@Repository
public interface MONmonitorRepo {

    /**
     * get area electrical hazard
     * @autor HGP
     * @param area(String)
     * @param year(String)
     * @param month(String)
     * @return Map
     */
    HashMap<String, Object> getData(String area, String year, String month);

    /**
     * get area electrical hazard at '비엠시스'
     * @autor HGP
     * @param area(String)
     * @param year(String)
     * @param month(String)
     * @return Map
     */
    HashMap<String, Object> getDataBMSis(String area, String year, String month);

    /**
     * get area electrical hazard at '비엠시스_구내식당'
     * @autor HGP
     * @param area(String)
     * @param year(String)
     * @param month(String)
     * @return Map
     */
    HashMap<String, Object> getDataBMSisRes(String area, String year, String month);

    /**
     * get area electrical hazard at '중앙시장(예비)'
     * @autor HGP
     * @param year(String)
     * @param month(String)*
     * @return Map
     */
    HashMap<String, Object> getDataJungSpare(String year, String month);

    /**
     * get area electrical hazard at '중앙시장(1차, 2차)'
     * @autor HGP
     * @param year(String)
     * @param month(String)
     * @return Map
     */
    HashMap<String, Object> getDataJungUse(String year, String month);

    /**
     * get area electrical hazard then null
     * @autor HGP
     * @return Map
     */
    HashMap<String, Object> getNullData(String s);
}
