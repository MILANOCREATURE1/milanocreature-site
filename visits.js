// 방문자 수: 전체 / 오늘 (abacus 무료 카운터, 키 없음). 브라우저 세션당 1번만 셈.
// show(문자열)을 두 번 부를 수 있음: 먼저 마지막으로 본 숫자(localStorage), 그 다음 새 숫자.
window.mcVisits = function (show) {
  var base = "https://abacus.jasoncameron.dev/", ns = "milanocreature-com";
  var last = localStorage.getItem("mcv-last");
  if (last) show(last);
  var day = new Date(Date.now() + 9 * 36e5).toISOString().slice(0, 10).replace(/-/g, ""); // KST
  var act = sessionStorage.getItem("mcv") ? "get" : "hit";
  sessionStorage.setItem("mcv", "1");
  var read = function (key) {
    return fetch(base + act + "/" + ns + "/" + key, { signal: AbortSignal.timeout(8000) })
      .then(function (r) { return r.ok ? r.json() : { value: 0 }; })
      .then(function (j) { return Number(j.value) || 0; });
  };
  var load = function () {
    return Promise.all([read("total"), read("d" + day)]).then(function (v) {
      var s = v[0].toLocaleString("en-US") + " / " + v[1].toLocaleString("en-US");
      localStorage.setItem("mcv-last", s);
      show(s);
    });
  };
  load().catch(function () { setTimeout(function () { load().catch(function () {}); }, 5000); }); // ponytail: 1회 재시도만
};
