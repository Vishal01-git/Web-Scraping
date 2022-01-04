const url =
  "https://www.espncricinfo.com/series/new-zealand-in-india-2021-22-1278658/india-vs-new-zealand-2nd-t20i-1278672/full-scorecard";
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
let wTeam;
function extractHtml(html) {
  let $ = cheerio.load(html);
  let teamArr = $(
    ".match-info.match-info-MATCH.match-info-MATCH-half-width .team"
  );
  for (let i = 0; i < teamArr.length; i++) {
    let hasClass = $(teamArr[i]).hasClass("team-gray");
    if (hasClass == false) {
      let teamNameElem = $(teamArr[i]).find(".name");
      wTeam = teamNameElem.text().trim();
      // console.log(wTeam);
    }
  }

  let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlStr = "";
  for (let i = 0; i < inningsArr.length; i++) {
    // let cHtml = $(inningsArr[i]).html();
    // htmlStr += cHtml;
    // console.log(htmlStr);
    //team name
    let teamNameElem = $(inningsArr[i]).find(".header-title.label");
    let teamName = teamNameElem.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    //console.log(teamName);
   
      let tableElem = $(inningsArr[i]).find(".table.batsman");
      let allBatters = $(tableElem).find("tr");
      for (let j = 0; j < allBatters.length; j++) {
        let allColOfPlayer = $(allBatters[j]).find("td");
          let isBatsmanCol = $(allColOfPlayer[0]).hasClass("batsman-cell");
          if (isBatsmanCol == true) {
              let href = $(allColOfPlayer[0]).find("a").attr("href");
              let name = $(allColOfPlayer[0]).text();
              let fulllink = "https://www.espncricinfo.com" + href;
            //   console.log(fulllink);
              getBirthdayPage(fulllink, name, teamName);
          }   
        }    
  }
}

function getBirthdayPage(url, name, teamName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractBirthday(html, name, teamName);
        }
    }
}

function extractBirthday(html, name, teamName) {
    let $ = cheerio.load(html);
    let detailArr = $(".player-card-description");
    let birthday = $(detailArr[1]).text();
    console.log(`${name} Plays for ${teamName} born on ${birthday}`);
}