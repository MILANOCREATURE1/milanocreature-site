// 방문자 수: 전체 / 오늘 (hitscounter.dev 무료 카운터, 키 없음, 한국시간 기준). 브라우저 세션당 1번만 셈.
// show(문자열)을 두 번 부를 수 있음: 먼저 마지막으로 본 숫자(localStorage), 그 다음 새 숫자.
window.mcVisits = function (show) {
  var last = localStorage.getItem("mcv-last");
  if (last) show(last);
  if (last && sessionStorage.getItem("mcv")) return; // 이 세션에서 이미 셌으면 기억한 숫자만
  var load = function () {
    return fetch("https://hitscounter.dev/api/hit?url=milanocreature.com&tz=Asia/Seoul&output=json", { signal: AbortSignal.timeout(8000) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var s = Number(j.total_hits).toLocaleString("en-US") + " / " + Number(j.today_hits).toLocaleString("en-US");
        sessionStorage.setItem("mcv", "1");
        localStorage.setItem("mcv-last", s);
        show(s);
      });
  };
  load().catch(function () { setTimeout(function () { load().catch(function () {}); }, 5000); }); // ponytail: 1회 재시도만
};
