const axios = require("axios");
const fs = require("fs");

(async () => {
  const targetUrl = "https://softourr.tistory.com";

  try {
    const res = await axios.get(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = res.data;

    // HTML 전체를 파일로 저장
    fs.writeFileSync("page.html", html, "utf8");
    console.log("✅ HTML 전체 저장 완료: page.html");

    // 또는 콘솔에 출력 (너무 길면 주석 처리)
    // console.log(html);
  } catch (error) {
    console.error("❌ 에러 발생:", error);
  }
})();
