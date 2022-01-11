const url = "https://www.espncricinfo.com/series/ipl-2021-1249214";
const request = require('request');
const cheerio = require('cheerio');

request(url, function(err,response,html){
    if (err) {
        console.log(err);
    } else {
        extractLink(html);
}
})

function extractLink(html) {
    const $ = cheerio.load(html);
    let anchorElem = $("a[data-hover='View All Results']");
    let link = $(anchorElem).attr('href');
    let fulllink = "https://www.espncricinfo.com" + link;
    console.log(fulllink);
}