// 방문자 수: 전체 / 오늘 (abacus 무료 카운터, 키 없음). 브라우저 세션당 1번만 셈.
window.mcVisits = function () {
  var base = "https://abacus.jasoncameron.dev/", ns = "milanocreature-com";
  var day = new Date(Date.now() + 9 * 36e5).toISOString().slice(0, 10).replace(/-/g, ""); // KST
  var act = sessionStorage.getItem("mcv") ? "get" : "hit";
  sessionStorage.setItem("mcv", "1");
  var read = function (key) {
    return fetch(base + act + "/" + ns + "/" + key)
      .then(function (r) { return r.ok ? r.json() : { value: 0 }; })
      .then(function (j) { return Number(j.value) || 0; });
  };
  return Promise.all([read("total"), read("d" + day)]).then(function (v) {
    return v[0].toLocaleString("en-US") + " / " + v[1].toLocaleString("en-US");
  });
};
