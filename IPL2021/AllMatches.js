const request = require('request');
const cheerio = require('cheerio');
const scorecardObj = require("./scorecard");
function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractAllLinks(html);
    }
})
}

function extractAllLinks(html) {
    const $ = cheerio.load(html);
    let scorecardElems = $("a[data-hover='Scorecard']");
    for (let i = 0; i < scorecardElems.length; i++){
        let link = $(scorecardElems[i]).attr('href');
        let fulllink = "https://www.espncricinfo.com" + link;
        //console.log(fulllink);
        scorecardObj.AllScorecards(fulllink);
    }
}

module.exports = {
    getAllMatchesLink: getAllMatchesLink
}