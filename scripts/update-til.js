const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
  const targetUrl = "https://softourr.tistory.com";

  try {
    const res = await axios.get(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(res.data);
    const titles = [];

    $("section.h-entry").each((i, el) => {
      if (i < 5) {
        // 최신 5개만
        const title = $(el).find("h2.post_title").text().trim();
        titles.push(`- ${title}`);
      }
    });

    console.log("✅ 최신 5개 포스트 (링크 제거):\n", titles.join("\n"));

    // README.md 업데이트
    const readmePath = "README.md";
    let readme = fs.readFileSync(readmePath, "utf8");

    const start = "<!-- TIL-POST-LIST:START -->";
    const end = "<!-- TIL-POST-LIST:END -->";
    const regex = new RegExp(`${start}[\\s\\S]*${end}`, "g");

    const newContent = `${start}\n${titles.join("\n")}\n${end}`;
    readme = readme.replace(regex, newContent);

    fs.writeFileSync(readmePath, readme);
    console.log("✅ README.md 업데이트 완료!");
  } catch (error) {
    console.error("❌ 에러 발생:", error);
  }
})();
