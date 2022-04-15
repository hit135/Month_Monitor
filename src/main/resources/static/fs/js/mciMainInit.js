window.min_category = [];
window.refresh_time = '';

window.center_name = 'main';
window.area = [];
window.areaIndex = {};
window.lv1cnt = 0;

window.selected_areacode = 'AREA_000001';
window.selected_areamap = '';
window.selected_grpcode = '';
window.selected_snsrid = '';
window.store_danger_cnt_type = '경보 누적 수';

window.series = [];
window.categoryData = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23'];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmii_initTimer() {
  setInterval(function () {
    let w = ['일', '월', '화', '수', '목', '금', '토'];
    let now_str = fn_mcmii_dateToString(new Date());

    $('.top-date').text(now_str.substring(0, 10) + ' (' + w[new Date().getDay()] + ')');
    $('.top-time').text(now_str.substring(11));
  }, 1000);

  window.refresh_time = window.setInterval(function () {
    if (new Date().getMinutes() % 10 === 2) {
      let s = $("#snsrId").val();
      fn_mcmii_refresh();
      fn_mcmi_setSnsrKwhChart(s);
      fn_mcmi_setSnsrEvtChart(s);
    }
  }, 60 * 1000);  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fn_mcmii_initTemplate() {
  // 화면 위
  $.template(
    'top-search-result',
    '<p data-areacode="{{html AREACODE}}" data-strcode="{{html STRCODE}}">{{html STRNAME}} [{{html AREANAME}}]</p>'
  );

  // 화면 왼쪽 구/시장
  $.template(
    'left-area',
    '<p class="area-lv{{html LEVEL}}" data-code="{{html CODE}}">' +
      '<span class="name">{{html NAME}}</span><span class="danger">{{html DANGER}}</span><span class="warn">{{html WARN}}</span>' +
    '</p>'
  );
  
  // 화면 왼쪽 점검 목록
  $.template(
    'left-check-sensor',
    '<p class="left-check-sensor" data-areacode="{{html AREACODE}}" data-strcode="{{html STRCODE}}" data-code="{{html SNSRID}}">' +
      '{{html AREANAME}}_{{html SNSRNICK}} ({{html CNT}})' +
    '</p>'
  );

  // 화면 오른쪽 경고/주의/고장
  $.template(
    'right-sensor',
    '<p class="right-sensor" data-areacode="{{html AREACODE}}" data-strcode="{{html STRCODE}}" data-code="{{html SNSRID}}">' +
      '{{html AREANAME}}_{{html SNSRNICK}} ' + 
      '<span style="color: red;">({{html CNT}})</span>' +
    '</p>'
  );

  // 상점 목록
  $.template(
    'center-left-store',
    '<p class="{{html STATE}} d-flex justify-content-between" data-areacode="{{html AREACODE}}" data-grpcode="{{html GRPCODE}}" data-grpname="{{html GRPNAME}}">' +
    '<span>' +
    '<span class="snsrCnt">{{html SNSRCOUNT}}</span> {{html GRPNAME}} ' +
    '</span>' +
    '<span>' +
    '{{if CNT > 0}}<span class="dangerCnt">{{html CNT}}</span>{{/if}}' +
    '{{if CNT2 > 0}}<span class="warnCnt">{{html CNT2}}</span>{{/if}}' +
    '{{if CNT3 > 0}}<span class="disnCnt">{{html CNT3}}</span>{{/if}}' +
    '</span>' +
    '</p>'
  );

  // 상점 센서 목록
  $.template(
    'store-info-sensor',
    '<div class="form-inline">' +
      '<p class="mb-0 mr-1">' +
        '<input type="radio" name="snsr-radio-btn" value="{{html SNSRID}}" />' +
      '</p>' +
      '<p class="nobtn-datalog {{html STATE}}" data-snsrid="{{html SNSRID}}" data-checktype="{{html STATE}}" onclick="fn_mcsti_checkNobtnDatalog(\'${SNSRID}\')">' +
        '{{html SNSRNICK}} ({{html SNSRIDTRIM}})' +
      '</p>' +
    '</div>'
  );


  // 상점 기본정보 센서 데이터 목록
  $.template(
    'dataInfoLog',
    '<p class="{{html STATE}}" data-regdate="{{html REGDATE}}" data-almtype="{{html ALMTYPE}}">' +
    // '[{{html SNSRRCVTIME}}] {{html SNSRID}} : {{html DATALOG}}' +
    '[{{html SNSRRCVTIME}}]  {{html SNSRID}}' +
    '</p>'
  );

  // 상점 기본정보 센서 데이터 목록
  $.template(
    'dataLogLog',
    '<p class="{{html STATE}}" data-regdate="{{html REGDATE}}" data-almtype="{{html ALMTYPE}}">' +
    // '[{{html SNSRRCVTIME}}] {{html SNSRID}} : {{html DATALOG}}' +
    '[{{html SNSRRCVTIME}}]  {{html SNSRID}}' +
    '</p>'
  );


  $.template(
    'area-select-button',
    '<div class="row ml-1">' +
    '<button class="btn" onClick="fn_mcmi_listImageArea(\'{{html AREAMAP}}\')" id="{{html AREAMAP}}"' +
    '        style="padding: 8px 24px; border: 1px solid rgb(35, 40, 44);">' +
    '  <span class="h6 m-0 text-center">{{html AREAMAP}}</span>' +
    '</button>' +
    '</div>'
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fn_mcmii_initClickEvent() {

  $('.top-search-result').on('click', 'p', function () {
    window.selected_areacode = 'AREA_000001'

    fn_mcmii_clickCheckSensor();
    $('.top-search-result').html('');
  });

  // Main Page 버튼 & 자세히보기 버튼
  $('.center-main-btn').on('click', function () {
    if(window.center_name === 'store') {
      $('.left .area-lv2').removeClass('on');
      $('.center-left-store-list p.on').removeClass('on');

      window.center_name = 'main';

      fn_mcmii_toggleCenterCont();
      fn_mcmi_initImageSelect();
    }else{
      window.center_name = 'store';
      window.selected_snsrid = $("#snsrId").val();
      fn_mcmii_clickCheckSensor();
      fn_mcsti_getTodayAreaState();
      fn_mcsti_getTodayAreaStoreState();
    }
  });

  $(".center-left-store-btn").on("click", function () {
    if (window.store_danger_cnt_type != $(this).text()) {
      $(".btn-info.center-left-store-btn").removeClass("btn-info").addClass("btn-secondary");
      $(this).removeClass("btn-secondary").addClass("btn-info");

      window.store_danger_cnt_type = $(this).text();
      fn_mcmii_clickAreaLv2();
    }
  });

  // 화면 왼쪽 시장 선택
  // $('.left').on('click', '.area-lv2', function () {
  //   $('.left .area-lv2.on').removeClass('on');
  //   $(this).addClass('on');
  //
  //   window.selected_areacode = $(this).attr('data-code');
  //   window.selected_strcode = '';
  //   window.selected_snsrid = '';
  //
  //   fn_mcmii_clickAreaLv2();
  // });

  // 시장 내 왼쪽 상점 목록 선택
  $('.center-left-store-list').on('click', 'p', function () {
    if(!$(this).hasClass("on")) {
      $('.center-left-store-list p.on').removeClass('on');
      $(this).addClass('on');

      window.selected_grpcode = $(this).attr('data-grpcode');
      window.selected_snsrid = '';
      $('.center-cont-top .store-name').text($(this).attr('data-grpname'));

      fn_mcsti_clickContPage();
    }
  });

  // 시장 정보 위 기본정보 / 경보이력 / 분석차트 선택
  $('.center-cont-top').on('click', '.center-cont-top-btn', function () {
    if(!$(this).hasClass('on')) {
      $('.center-cont-top-btn.on').removeClass('on');
      $(this).addClass('on');

      fn_mcsti_clickContPage();
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmii_initMinCategory() {
  for (let i = 0; i < 24; i++)
    for (let j = 0; j < 6; j++)
      window.min_category.push(('0' + i).slice(-2) + ':' + (j + '0'));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 점검 / 경고 / 주의 / 고장에서 상점 선택
function fn_mcmii_clickCheckSensor() {
  window.center_name = 'store';
  fn_mcmii_toggleCenterCont();
}

// 왼쪽 시장 목록 선택
function fn_mcmii_clickAreaLv2() {
  window.center_name = 'store';

  fn_mcmii_toggleCenterCont();
  fn_mcsti_getTodayAreaState();
  fn_mcsti_getTodayAreaStoreState();
}

// 메인/상점 정보 화면 toggle
function fn_mcmii_toggleCenterCont() {
  if (window.center_name == 'main') {
    $('.center-main-cont').show();
    $('.center-store-cont').hide();
  } else {
    $('.center-main-cont').hide();
    $('.center-store-cont').show();
  }
}

// 관리 화면 이동
function fn_mcmii_movePageAdm(type) {
  location.href = ((location.hostname === "localhost") ? "http://localhost:8081/#/" : "http://1.223.40.19:30081/adm#/") + type;
  // http://1.223.40.19:30081/adm#/area
}

// 로그아웃
function fn_mcmii_logout() {
  location.href = $('#contextRoot').val() + '/mng/logout';
}

// 새로고침
function fn_mcmii_refresh() {
  fn_mcmi_initTodayState();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmii_dateToString(d) {
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) +
    ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
}

function fn_mcmii_numberWithCommas(s) {
  return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}