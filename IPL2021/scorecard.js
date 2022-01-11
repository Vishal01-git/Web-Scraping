// const url =
//   "https://www.espncricinfo.com/series/ipl-2021-1249214/sunrisers-hyderabad-vs-chennai-super-kings-44th-match-1254091/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

function AllScorecards(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractMatchDetails(html);
        }
    })
}

function extractMatchDetails(html) {
    const $ = cheerio.load(html);
    let descElem = $(".header-info .description");
    let result = $(".event .status-text");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    result = result.text();
    //console.log(`${result} ${venue} ${date}`);

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < innings.length; i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("h5").text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        let cInnings = $(innings[i]);
        let allRows = cInnings.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if (isWorthy == true) {
              let playerName = $(allCols[0]).text().trim();
              let runs = $(allCols[2]).text().trim();
              let balls = $(allCols[3]).text().trim();
              let fours = $(allCols[5]).text().trim();
              let sixes = $(allCols[6]).text().trim();
              let sr = $(allCols[7]).text().trim();
             console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
            }
        }
    }
}


module.exports = {
    AllScorecards: AllScorecards
}