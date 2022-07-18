module.exports = {
    getMovieTitle: getMovieTitle,
    getMovieYear: getMovieYear,
    appendMovieTitle: appendMovieTitle
};

const cheerio = require('cheerio');
const $ = cheerio.load(document.documentElement.outerHTML);

const originalTitleSelector = "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-2.khmuXj > h1";
const regionSpecificTitleSelector = "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-2.khmuXj > div > div";


function appendMovieTitle(text) {

    let movieFullTitle = document.querySelector(originalTitleSelector);
    if (!movieFullTitle) {

        console.log("Original title text not found. Getting region special title.");
        movieFullTitle = document.querySelector(regionSpecificTitleSelector);
    }

    if (!movieFullTitle) {
        throw new Error('Movie not found');
    }

    let toBeAppendedHtml;

    if (text.includes("Safe")) {

        toBeAppendedHtml = "<p class=\"safe-result\">" + text + "</p>";
        movieFullTitle.innerHTML += toBeAppendedHtml;
    }
    else {

        toBeAppendedHtml = "<p class=\"cringe-result\">" + text + "</p>";
        movieFullTitle.innerHTML += toBeAppendedHtml;
    }

}


function getMovieTitle() {

    let movieFullTitle = $(originalTitleSelector);
    if (!movieFullTitle) {

        console.log("Original title text not found. Getting region special title.");
        movieFullTitle = $(regionSpecificTitleSelector);
    }

    if (!movieFullTitle) {
        throw new Error('Movie not found');
    }

    let movieTitle = movieFullTitle[0].children[0].data.replace("Original Title: ", "");

    return movieTitle;
}

function getMovieYear() {

    let movieYearSelector = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-2.khmuXj > div > ul > li:nth-child(1) > span");

    let movieYear = movieYearSelector[0].children[0].data;

    return movieYear;
}



