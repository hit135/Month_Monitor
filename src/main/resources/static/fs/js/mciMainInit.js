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

window.igr1TimeChartData = [];
window.igr2TimeChartData = [];
window.igo1TimeChartData = [];
window.igo2TimeChartData = [];
window.oc1TimeChartData = [];
window.oc2TimeChartData = [];
window.snsrKwhTimeChartData = [];

window.igr1DayChartData = [];
window.igr2DayChartData = [];
window.igo1DayChartData = [];
window.igo2DayChartData = [];
window.oc1DayChartData = [];
window.oc2DayChartData = [];
window.snsrKwhDayChartData = [];

window.igr1MonthChartData = [];
window.igr2MonthChartData = [];
window.igo1MonthChartData = [];
window.igo2MonthChartData = [];
window.oc1MonthChartData = [];
window.oc2MonthChartData = [];
window.snsrKwhMonthChartData = [];


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
    '<p class="right-sensor" data-areamap="{{html AREAMAP}}" data-grpcode="{{html GRPCODE}}" data-code="{{html SNSRID}}">' +
    '{{html SNSRNICK}} ' +
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
    '<button class="btn" onClick="fn_mcmi_selectImageArea(\'{{html AREAMAP}}\')" id="{{html AREAMAP}}"' +
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
    if (window.center_name === 'store') {
      $('.left .area-lv2').removeClass('on');
      $('.center-left-store-list p.on').removeClass('on');

      window.center_name = 'main';

      fn_mcmii_toggleCenterCont();
      fn_mcmi_initImageSelect();
    } else {
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
    if (!$(this).hasClass("on")) {
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
    if (!$(this).hasClass('on')) {
      $('.center-cont-top-btn.on').removeClass('on');
      $(this).addClass('on');

      fn_mcsti_clickContPage();
    }
  });


  // 경고/주의/고장 센서 선택
  $('.list-sensor').on('click', 'p', function () {
    window.selected_areamap = $(this).attr('data-areamap');
    window.selected_grpcode = $(this).attr('data-grpcode');
    window.selected_snsrid = $(this).attr('data-code');

    fn_mcmi_listImageArea(window.selected_areamap);
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

// 보고서 선택
function fn_mcmi_openReportModal() {
  $("#menuModal").modal("hide");
  $("#reportModal").modal("show");
  fn_mcii_reportInfo();
  fn_mcii_reportInfoStat();
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
  if (window.center_name === 'main') {
    $('.center-main-cont').show();
    $('.center-store-cont').hide();
  } else if (window.center_name === 'store') {
    $('.center-main-cont').hide();
    $('.center-store-cont').show();
  }
}

// 관리 화면 이동
function fn_mcmii_movePageAdm(type) {
  location.href = ((location.hostname === "localhost") ? "http://localhost:3000/#/" : "https://dev1.fscom.kr/adm#/") + type;
  // https://dev1.fscom.kr/adm#/area
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


function fn_mcii_reportInfo() {
  let d = new Date;
  let startDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  $.post(
    $('#contextRoot').val() + '/img/reportInfo',
    {
      areaCode: $("#areaCode").val(),
      startDate: startDate
    },
    function (d) {
      if (d.result === "success") {
        fn_mcii_setReportInfo(d.infoStat);
        fn_mcii_setReportChartData(d.dayOfWeekStat, d.hourlyStat, d.weekMonthStat);
        fn_mcii_setReportTableData(d.dayOfWeekStat, d.hourlyStat, d.weekMonthStat);
      }
    });
}

function fn_mcii_reportInfoStat() {
  let d = new Date;
  let startDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  $.post(
    $('#contextRoot').val() + '/img/reportInfoList',
    {
      areaCode: $("#areaCode").val(),
      startDate: startDate
    },
    function (d) {
      if (d.result === "success") {
        let html = "";
        let a = d.areaStrKwhStat;
        for (let i = 0; i < a.length; i++) {
          html += '<tr>'
          html += '<td>' + a[i].grpName + '</td>'
          html += '<td>' + a[i].snsrKwh + '</td>'
          html += '<td></td>'
          html += '</tr>'
        }
        $("#wme_grp_kwh_table tbody").html(html);
      }
    });
}

function fn_mcii_setReportInfo(data) {
  let d = new Date;
  $("#cnt").html(data.snsrCnt + "(설치구역 수: " + data.grpCnt + ")")
  $("#regDate").html(data.aRegDate)
  $("#operPeriod").html(data.aRegDate + " ~ 현재")
  $("#checkPeriod").html(d.getFullYear() + "년")
  $("#address").html(data.areaAddr)
}

function fn_mcii_setReportChartData(d, h, m) {
  fn_mcii_setReportDayOfWeekStat(d);
  fn_mcii_setReportHourlyStat(h);
  fn_mcii_setReportMonthStat(m);
}


function fn_mcii_setReportTableData(d, h, m) {
  fn_mcii_chartDataReset();

  fn_mcii_setReportDayOfWeekChart(d);
  fn_mcii_setReportHourlyChart(h);
  fn_mcii_setReportMonthChart(m);
}

function fn_mcii_chartDataReset() {
  window.igr1TimeChartData = [];
  window.igr2TimeChartData = [];
  window.igo1TimeChartData = [];
  window.igo2TimeChartData = [];
  window.oc1TimeChartData = [];
  window.oc2TimeChartData = [];
  window.snsrKwhTimeChartData = [];

  window.igr1DayChartData = [];
  window.igr2DayChartData = [];
  window.igo1DayChartData = [];
  window.igo2DayChartData = [];
  window.oc1DayChartData = [];
  window.oc2DayChartData = [];
  window.snsrKwhDayChartData = [];

  window.igr1MonthChartData = [];
  window.igr2MonthChartData = [];
  window.igo1MonthChartData = [];
  window.igo2MonthChartData = [];
  window.oc1MonthChartData = [];
  window.oc2MonthChartData = [];
  window.snsrKwhMonthChartData = [];
}

function fn_mcii_setReportDayOfWeekStat(d) {
  for (let i = 0; i < d.length; i++) {
    $("#igo_d_day_" + (i + 1)).html(d[i].igo1stCnt);
    $("#igo_w_day_" + (i + 1)).html(d[i].igo2ndCnt);
    $("#igo_p_day_" + (i + 1)).html(d[i].igoTotalPer);
    $("#igr_d_day_" + (i + 1)).html(d[i].igr1stCnt);
    $("#igr_w_day_" + (i + 1)).html(d[i].igr2ndCnt);
    $("#igo_p_day_" + (i + 1)).html(d[i].igrTotalPer);
    $("#oc_d_day_" + (i + 1)).html(d[i].oc1stCnt);
    $("#oc_w_day_" + (i + 1)).html(d[i].oc2ndCnt);
    $("#igo_p_day_" + (i + 1)).html(d[i].ocTotalPer);
    $("#useKwh_day_" + (i + 1)).html(d[i].snsrKwh);
    $("#useKwhPer_day_" + (i + 1)).html(d[i].snsrKwhPer);
  }
}

function fn_mcii_setReportHourlyStat(h) {
  for (let i = 0; i < h.length; i++) {
    $("#igo_d_time_" + (i + 1)).html(h[i].igoDangerCnt);
    $("#igo_w_time_" + (i + 1)).html(h[i].igoWarningCnt);
    $("#igo_p_time_" + (i + 1)).html(h[i].igoTotalPer);
    $("#igr_d_time_" + (i + 1)).html(h[i].igrDangerCnt);
    $("#igr_w_time_" + (i + 1)).html(h[i].igrWarningCnt);
    $("#igr_p_time_" + (i + 1)).html(h[i].igrTotalPer);
    $("#oc_d_time_" + (i + 1)).html(h[i].ocDangerCnt);
    $("#oc_w_time_" + (i + 1)).html(h[i].ocWarningCnt);
    $("#oc_p_time_" + (i + 1)).html(h[i].ocTotalPer);
    $("#useKwh_time_" + (i + 1)).html(h[i].snsrKwh);
    $("#useKwhPer_time_" + (i + 1)).html(h[i].snsrKwhPer);
  }
}

function fn_mcii_setReportMonthStat(m) {
  let d = new Date();
  for (let i = 0; i < m.length; i++) {
    if (m.length - 1 === i) {
      $("#igo1_sum").html(m[i].igo1st);
      $("#igo2_sum").html(m[i].igo2nd);
      $("#igr1_sum").html(m[i].igr1st);
      $("#igr2_sum").html(m[i].igr2nd);
      $("#oc1_sum").html(m[i].oc1st);
      $("#oc2_sum").html(m[i].oc2nd);
      $("#sum_sum").html(m[i].monthlyEvt);
      $("#useKwh_sum").html(m[i].snsrKwh);
    } else {
      if ((d.getMonth() + 1) >= (i + 1)) {
        $("#igo1_" + (i + 1)).html(m[i].igo1st);
        $("#igo2_" + (i + 1)).html(m[i].igo2nd);
        $("#igr1_" + (i + 1)).html(m[i].igr1st);
        $("#igr2_" + (i + 1)).html(m[i].igr2nd);
        $("#oc1_" + (i + 1)).html(m[i].oc1st);
        $("#oc2_" + (i + 1)).html(m[i].oc2nd);
        $("#sum_" + (i + 1)).html(m[i].monthlyEvt);
        $("#useKwh_" + (i + 1)).html(m[i].snsrKwh);
      } else {
        $("#igo1_" + (i + 1)).html('-');
        $("#igo2_" + (i + 1)).html('-');
        $("#igr1_" + (i + 1)).html('-');
        $("#igr2_" + (i + 1)).html('-');
        $("#oc1_" + (i + 1)).html('-');
        $("#oc2_" + (i + 1)).html('-');
        $("#sum_" + (i + 1)).html('-');
        $("#useKwh_" + (i + 1)).html('-');
      }
    }
  }
}

function fn_mcii_setReportDayOfWeekChart(d) {
  for (let i = 0; i < d.length; i++) {
    window.igr1DayChartData.push(d[i].igo1stCnt);
    window.igr2DayChartData.push(d[i].igo2ndCnt);
    window.igo1DayChartData.push(d[i].igr1stCnt);
    window.igo2DayChartData.push(d[i].igr2ndCnt);
    window.oc1DayChartData.push(d[i].oc1stCnt);
    window.oc2DayChartData.push(d[i].oc2ndCnt);
    window.snsrKwhDayChartData.push(d[i].snsrKwh);
  }
  fn_mcii_makeDayOfWeekChart();
}

function fn_mcii_setReportHourlyChart(h) {
  for (let i = 0; i < h.length; i++) {
    window.igr1TimeChartData.push(h[i].igoDangerCnt)
    window.igr2TimeChartData.push(h[i].igoWarningCnt)
    window.igo1TimeChartData.push(h[i].igrDangerCnt)
    window.igo2TimeChartData.push(h[i].igrWarningCnt)
    window.oc1TimeChartData.push(h[i].ocDangerCnt)
    window.oc2TimeChartData.push(h[i].ocWarningCnt)
    window.snsrKwhTimeChartData.push(h[i].snsrKwh)
  }
  fn_mcii_makeHourlyChart();
}

function fn_mcii_setReportMonthChart(m) {
  for (let i = 0; i < m.length-1; i++) {
    window.igr1MonthChartData.push(m[i].igo1st);
    window.igr2MonthChartData.push(m[i].igo2nd);
    window.igo1MonthChartData.push(m[i].igr1st);
    window.igo2MonthChartData.push(m[i].igr2nd);
    window.oc1MonthChartData.push(m[i].oc1st);
    window.oc2MonthChartData.push(m[i].oc2nd);
    window.snsrKwhMonthChartData.push(m[i].snsrKwh);
  }
  fn_mcii_makeMonthChart();
}

function fn_mcii_makeDayOfWeekChart() {
  let data = ['igr', 'igo', 'oc', 'useKwh']
  let data1 = [window.igr1DayChartData, window.igo1DayChartData, window.oc1DayChartData, window.snsrKwhDayChartData]
  let data2 = [window.igr2DayChartData, window.igo2DayChartData, window.oc2DayChartData]
  let category = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  for (let i = 0; i < data1.length; i++) {
    if (i === (data.length - 1)) {
      let c = new ApexCharts(document.querySelector('#' + data[i] + "DayOfWeekChart"), {
        series: [{
          name: '사용량(kWh)',
          type: 'bar',
          data: data1[i]
        }],
        title: {text: '', type: 'bar', align: 'left'},
        chart: {height: 330, type: 'bar', id: data[i] + "useKwhDayOfWeekChart", animations: {enabled: false}},
        noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
        stroke: {width: 2},
        dataLabels: {enabled: false},
        tooltip: {
          enabled: true,
          marker: {show: true},
        },
        xaxis: {categories: category},
        yaxis: {
          lines: {show: true},
          tooltip: {enabled: true},
        },
        legend: {position: 'bottom'}
      });

      c.render();
    } else {
      let c = new ApexCharts(document.querySelector('#' + data[i] + "DayOfWeekChart"), {
        series: [{
          name: '주의',
          type: 'bar',
          data: data1[i]
        }, {
          name: '경고',
          type: 'bar',
          data: data2[i]
        }],
        title: {text: '', type: 'bar', align: 'left'},
        chart: {height: 330, type: 'bar', id: data[i] + "useKwhDayOfWeekChart", animations: {enabled: false}},
        noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
        stroke: {width: 2},
        dataLabels: {enabled: false},
        tooltip: {
          enabled: true,
          marker: {show: true},
        },
        xaxis: {categories: category},
        yaxis: {
          lines: {show: true},
          tooltip: {enabled: true},
        },
        legend: {position: 'bottom'}
      });

      c.render();
    }
  }
}

function fn_mcii_makeHourlyChart() {
  let data = ['igr', 'igo', 'oc', 'useKwh']
  let data1 = [window.igr1TimeChartData, window.igo1TimeChartData, window.oc1TimeChartData, window.snsrKwhTimeChartData]
  let data2 = [window.igr2TimeChartData, window.igo2TimeChartData, window.oc2TimeChartData]
  let category = ['0 ~ 3', '4 ~ 7', '8 ~ 11', '12 ~ 15', '16 ~ 19', '20 ~ 23']
  for (let i = 0; i < data1.length; i++) {
    if (i === (data1.length - 1)) {
      let c = new ApexCharts(document.querySelector('#' + data[i] + "TimeChart"), {
        series: [{
          name: '사용량(kWh)',
          type: 'bar',
          data: data1[i]
        }],
        title: {text: '', type: 'bar', align: 'left'},
        chart: {height: 330, type: 'bar', id: 'me_snsr_kwh_chart', animations: {enabled: false}},
        noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
        stroke: {width: 2},
        dataLabels: {enabled: false},
        tooltip: {
          enabled: true,
          marker: {show: true},
        },
        xaxis: {categories: category},
        yaxis: {
          lines: {show: true},
          tooltip: {enabled: true},
        },
        legend: {position: 'bottom'}
      });

      c.render();
    } else {
      let c = new ApexCharts(document.querySelector('#' + data[i] + "TimeChart"), {
        series: [{
          name: '주의',
          type: 'bar',
          data: data1[i]
        }, {
          name: '경고',
          type: 'bar',
          data: data2[2]
        }],
        title: {text: '', type: 'bar', align: 'left'},
        chart: {height: 330, type: 'bar', id: data[i] + "TimeChart", animations: {enabled: false}},
        noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
        stroke: {width: 2},
        dataLabels: {enabled: false},
        tooltip: {
          enabled: true,
          marker: {show: true},
        },
        xaxis: {categories: category},
        yaxis: {
          lines: {show: true},
          tooltip: {enabled: true},
        },
        legend: {position: 'bottom'}
      });

      c.render();
    }
  }
}

function fn_mcii_makeMonthChart() {
  let category = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  fn_mcii_makeOcMonthChart(category);
  fn_mcii_makeIgrIgoMonthChart(category);
  fn_mcii_makeUseKwhMonthChart(category);

}

function fn_mcii_makeOcMonthChart(category) {
  let c = new ApexCharts(document.querySelector("#ocChart"), {
    series: [{
      name: '과전류 1차경보',
      type: 'bar',
      data: window.oc1MonthChartData
    }, {
      name: '과전류 2차경보',
      type: 'bar',
      data: window.oc2MonthChartData
    }],
    title: {text: '', type: 'line', align: 'left'},
    chart: {height: 330, type: 'bar', id: "ocChart", animations: {enabled: false}},
    noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
    stroke: {width: 2},
    dataLabels: {enabled: false},
    tooltip: {
      enabled: true,
      marker: {show: true},
    },
    xaxis: {categories: category},
    yaxis: {
      lines: {show: true},
      tooltip: {enabled: true},
    },
    legend: {position: 'bottom'}
  });

  c.render();
}

function fn_mcii_makeIgrIgoMonthChart(category) {
  let c = new ApexCharts(document.querySelector("#igoigrChart"), {
    series: [{
      name: '전체누설전류 1차경보',
      type: 'bar',
      data: window.igo1MonthChartData
    }, {
      name: '전체누설전류 2차경보',
      type: 'bar',
      data: window.igo2MonthChartData
    },{
      name: '저항성누설전류 1차경보',
      type: 'bar',
      data: window.igr1MonthChartData
    }, {
      name: '저항성누설전류 2차경보',
      type: 'bar',
      data: window.igr2MonthChartData
    }],
    title: {text: '', type: 'line', align: 'left'},
    chart: {height: 330, type: 'bar', id: "igoigrChart", animations: {enabled: false}},
    noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
    stroke: {width: 2},
    dataLabels: {enabled: false},
    tooltip: {
      enabled: true,
      marker: {show: true},
    },
    xaxis: {categories: category},
    yaxis: {
      lines: {show: true},
      tooltip: {enabled: true},
    },
    legend: {position: 'bottom'}
  });

  c.render();
}

function fn_mcii_makeUseKwhMonthChart(category) {
  let c = new ApexCharts(document.querySelector("#useKwhChart"), {
    series: [{
      name: '전력사용량',
      type: 'bar',
      data: window.snsrKwhMonthChartData
    }],
    title: {text: '', type: 'bar', align: 'left'},
    chart: {height: 330, type: 'bar', id: "useKwhChart", animations: {enabled: false}},
    noData: {text: '데이터가 없습니다.', style: {fontSize: '15px'}},
    stroke: {width: 2},
    dataLabels: {enabled: false},
    tooltip: {
      enabled: true,
      marker: {show: true},
    },
    xaxis: {categories: category},
    yaxis: {
      lines: {show: true},
      tooltip: {enabled: true},
    },
    legend: {position: 'bottom'}
  });

  c.render();
}