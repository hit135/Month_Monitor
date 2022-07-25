window.min_category = [];
window.refresh_time = '';

window.center_name = 'main';
window.area = [];
window.areaIndex = {};
window.lv1cnt = 0;

window.selected_areacode = '';
window.selected_strcode = '';
window.selected_snsrid = '';
window.store_danger_cnt_type = '경보 누적 수';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmi_initTimer() {
  setInterval(function () {
    let w = ['일', '월', '화', '수', '목', '금', '토'];
    let now_str = fn_mcmi_dateToString(new Date());

    $('.top-date').text(now_str.substring(0, 10) + ' (' + w[new Date().getDay()] + ')');
    $('.top-time').text(now_str.substring(11));
  }, 1000);

  window.refresh_time = window.setInterval(function () {
    if (new Date().getMinutes() % 10 === 2)
      fn_mcmi_refresh();
  }, 60 * 1000);  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fn_mcmi_initTemplate() {
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
    '<p class="{{html STATE}} d-flex justify-content-between" data-areacode="{{html AREACODE}}" data-strcode="{{html STRCODE}}" data-strname="{{html STRNAME}}">' +
      '<span>' + 
        '<span class="snsrCnt">{{html SNSRCOUNT}}</span> {{html STRNAME}} ' +
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
      '<p class="store-info-check {{html CHECK}}">' +
        '<span class="btn-check-start" data-snsrid="{{html SNSRID}}">점검</span>' +
        '<span class="btn-check-end" data-snsrid="{{html SNSRID}}">점검중</span>' +
      '</p>' +
      '<p class="nobtn-datalog {{html STATE}}" data-snsrid="{{html SNSRID}}" data-checktype="{{html STATE}}" onclick="fn_mcsti_checkNobtnDatalog(\'${SNSRID}\')">' +
        '{{html SNSRNICK}} ({{html SNSRIDTRIM}})' +
      '</p>' +
    '</div>'
  );

  // 상점 기본정보 센서 데이터 목록
  $.template(
    'datalog',
    '<p class="{{html STATE}}" data-regdate="{{html REGDATE}}" data-almtype="{{html ALMTYPE}}">' +
      // '[{{html SNSRRCVTIME}}] {{html SNSRID}} : {{html DATALOG}}' +
      '[{{html SNSRRCVTIME}}]  {{html SNSRID}}' +
    '</p>'
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fn_mcmi_initClickEvent() {
  // 화면 위 상점 검색
  $('.top-search-text').on('keyup', fn_mcmi_searchStore);
  $('.top-search button').on('click', fn_mcmi_searchStore);

  $('.top-search-result').on('click', 'p', function () {
    window.selected_areacode = $(this).attr('data-areacode');
    window.selected_strcode = $(this).attr('data-strcode');
    window.selected_snsrid = '';

    fn_mcmi_clickCheckSensor();
    $('.top-search-result').html('');
  });

  // Main Page 버튼
  $('.center-main-btn').on('click', function () {
    $('.left .area-lv2').removeClass('on');
    $('.center-left-store-list p.on').removeClass('on');

    window.selected_areacode = '';
    window.selected_strcode = '';
    window.selected_snsrid = '';
    window.center_name = 'main';

    fn_mcmi_toggleCenterCont();
  });

  // 시장 현황 패널 열고 닫기
  $('.center-main-cont').on('click', '.js-panel-collapse', function () {
    let id = '#' + $(this).attr('data-id');

    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(id + ' .panel-container').removeClass('show');
    } else {
      $(this).addClass('on');
      $(id + ' .panel-container').addClass('show');
      
      fn_mcm_updateMainAreaList();
    }
  });

  // 시장 현황 패널 전체 화면
  $('.center-main-cont').on('click', '.js-panel-fullscreen', function () {
    let id = '#' + $(this).attr('data-id');

    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(id).removeClass('panel-fullscreen');
    } else {
      $(this).addClass('on');
      $(id).addClass('panel-fullscreen');

      fn_mcm_updateMainAreaList();
      fn_mcm_getMainAreaWeek();
    }
  });

  // 시장 현황 패널 전체 화면 차트 / 지도
  $('.center-main-cont').on('click', '.center-main-cont-top-btn', function () {
    $('.panel.panel-fullscreen .center-main-cont-top-btn.on').removeClass('on');
    $(this).addClass('on');

    fn_mcm_tapCenterMainPage();
  });

  // 화면 왼쪽 시장 선택
  $('.left').on('click', '.area-lv2', function () {
    $('.left .area-lv2.on').removeClass('on');
    $(this).addClass('on');

    window.selected_areacode = $(this).attr('data-code');
    window.selected_strcode = '';
    window.selected_snsrid = '';

    fn_mcmi_clickAreaLv2();
  });

  // 점검 센서 선택
  $('.left-list-sensor').on('click', 'p', function () {
    window.selected_areacode = $(this).attr('data-areacode');
    window.selected_strcode = $(this).attr('data-strcode');
    window.selected_snsrid = $(this).attr('data-code');

    fn_mcmi_clickCheckSensor();
  });

  // 경고/주의/고장 센서 선택
  $('.list-sensor').on('click', 'p', function () {
    window.selected_areacode = $(this).attr('data-areacode');
    window.selected_strcode = $(this).attr('data-strcode');
    window.selected_snsrid = $(this).attr('data-code');

    fn_mcmi_clickCheckSensor();
  });

  // 시장 내 왼쪽 상점 목록 선택
  $('.center-left-store-list').on('click', 'p', function () {
    $('.center-left-store-list p.on').removeClass('on');
    $(this).addClass('on');

    window.selected_strcode = $(this).attr('data-strcode');
    window.selected_snsrid = '';
    $('.center-cont-top .store-name').text($(this).attr('data-strname'));

    fn_mcst_clickContPage();
  });

  $(".center-left-store-btn").on("click", function () {
    if (window.store_danger_cnt_type != $(this).text()) {
      $(".btn-info.center-left-store-btn").removeClass("btn-info").addClass("btn-secondary");
      $(this).removeClass("btn-secondary").addClass("btn-info");

      window.store_danger_cnt_type = $(this).text();
      fn_mcmi_clickAreaLv2();
    }
  });

  // 시장 정보 위 기본정보 / 경보이력 / 분석차트 선택
  $('.center-cont-top').on('click', '.center-cont-top-btn', function () {
    $('.center-cont-top-btn.on').removeClass('on');
    $(this).addClass('on');

    fn_mcst_clickContPage();
  });


  // 점검 등록
  $('.store-info').on('click', '.btn-check-start', function () {
    if (confirm('점검 등록할까요?')) {
      $.post(
        $('#contextRoot').val() + '/mng/startCheckAjax',
        { snsrid: $(this).attr('data-snsrid') },
        function (d) {
          if (d == 'success') {
            alert('점검 등록 되었습니다.');

            fn_mcsti_getStoreInfoSensorList();
            fn_mcll_getCheckSensorList();
          } else {
            alert('점검 등록을 실패하였습니다.');
          }
      });
    }
  });

  // 점검 완료
  $('.store-info').on('click', '.btn-check-end', function () {
    if (confirm('점검 완료할까요?')) {
      $.post(
        $('#contextRoot').val() + '/mng/endCheckAjax',
        { snsrid: $(this).attr('data-snsrid') },
        function (d) {
          if (d == 'success') {
            alert('점검 완료 되었습니다.');

            fn_mcsti_getStoreInfoSensorList();
            fn_mcll_getCheckSensorList();
          } else {
            alert('점검 완료를 실패하였습니다.');
          }
      });
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmi_initMinCategory() {
  for (let i = 0; i < 24; i++)
    for (let j = 0; j < 6; j++)
      window.min_category.push(('0' + i).slice(-2) + ':' + (j + '0'));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 상점 검색
function fn_mcmi_searchStore() {
  $.post(
    $('#contextRoot').val() + '/mng/storeSearchAjax',
    { search: $('.top-search-text').val() },
    function (d) {
      $('.top-search-result').html('');
      $('.top-search-result').append($.tmpl('top-search-result', d));
  });
}

// 왼쪽 시장 목록 선택
function fn_mcmi_clickAreaLv2() {
  window.center_name = 'store';

  fn_mcmi_toggleCenterCont();
  fn_mcst_getTodayAreaState();
  fn_mcst_getTodayAreaStoreState();
}

// 점검 / 경고 / 주의 / 고장에서 상점 선택
function fn_mcmi_clickCheckSensor() {
  window.center_name = 'store';
  fn_mcmi_toggleCenterCont();
  fn_mcst_onAreaLv2();
}

// 메인/상점 정보 화면 toggle
function fn_mcmi_toggleCenterCont() {
  if (window.center_name == 'main') {
    $('.center-main-cont').show();
    $('.center-store-cont').hide();
  } else {
    $('.center-main-cont').hide();
    $('.center-store-cont').show();
  }
}

// 관리 화면 이동
function fn_mcmi_movePageAdm(type) {
  location.href = ((location.hostname === "localhost") ? "http://localhost:3000/#/" : "https://dev1.fscom.kr/adm#/") + type;
  // https://dev1.fscom.kr/adm#/area
}

// 로그아웃
function fn_mcmi_logout() {
  location.href = $('#contextRoot').val() + '/mng/logout';
}

// 새로고침
function fn_mcmi_refresh() {
  fn_mcm_initTodayState();

  if (window.center_name == 'main') {
    fn_mcm_updateMainAreaList();
    fn_mcm_getMainAreaWeek();
  } else {
    fn_mcsti_refreshStoreInfo();
    setTimeout(function () { fn_mcst_onAreaLv2(); }, 800);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mcmi_dateToString(d) {
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) +
    ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
}

function fn_mcmi_numberWithCommas(s) {
  return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}