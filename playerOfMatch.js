const request = require("request");
const cheerio = require('cheerio');
request(
  "https://www.espn.in/cricket/series/8048/game/1254117/chennai-super-kings-vs-kolkata-knight-riders-final-indian-premier-league-2021",
  cb
);
function cb(error, response, html) {
    if (error) {
        console.error("error:", error); // Print the error if one occurred
    } else { 
        handleHtml(html);
    }
}

function handleHtml(html) {
    let selTool = cheerio.load(html);
    let contentArr = selTool(
      ".gp__cricket__player-match__player__detail__link"
    );
    let data = selTool(contentArr[0]).text();
    console.log(data);

}
