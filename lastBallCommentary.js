const url =
  "https://www.espncricinfo.com/series/india-in-south-africa-2021-22-1277060/south-africa-vs-india-1st-test-1277079/ball-by-ball-commentary";
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);

    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let $ = cheerio.load(html);
    let elemArr = $(".match-comment-wrapper");
    let text = $(elemArr[0]).text();
    console.log(text);
}