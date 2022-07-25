# 스마티시티 챌린지 관제

## 메인 화면

https://dev1.fscom.kr/mng/main

## 관리 화면

https://dev1.fscom.kr/adm#

## 대전시 자치구별 화면

● 전기 이벤트 : https://dev1.fscom.kr/district/snsrMain

● 전력사용량 : https://dev1.fscom.kr/district/kwhMain

----

## 챌린지 서버 백업 스케쥴링 시간대

● 매일 3시 45분 : /root/ifiresens_api_csv_clear.sh
- 일주일 지난 연무 API CSV 파일 삭제 
- 연무 API CSV 파일 위치 /home/apis/snsrdata/

● 매일 4시 : /root/img_ifiresens_v2_backup.sh
- 이미지 첨부파일 압축 백업 실행
- 이미지 첨부파일 위치 /home/apps/img
- 이미지 첨부파일 압축 백업 위치 /home/backups/img/
- 2주 지난 압축 백업파일 삭제

● 매일 5시 : /root/mariadb_ifiresens_v2_backup.sh
- 챌린지 DB 압축 백업 실행
- 챌린지 DB 압축 백업 위치 /home/backups/mariadb/ifiresens_v2/
- 일주일 지난 챌린지 DB 압축 백업 파일 삭제
