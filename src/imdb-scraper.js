module.exports = {
    getMovieTitle: getMovieTitle,
    getMovieYear: getMovieYear,
    appendMovieTitle: appendMovieTitle
};

const cheerio = require('cheerio');
const $ = cheerio.load(document.documentElement.outerHTML);

const originalTitleSelector = "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-ca85a21c-0.efoFqn > section > div:nth-child(4) > section > section > div.sc-80d4314-0.fjPRnj > div.sc-80d4314-1.fbQftq > h1";
const regionSpecificTitleSelector = "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-ca85a21c-0.efoFqn > section > div:nth-child(4) > section > section > div.sc-80d4314-0.fjPRnj > div.sc-80d4314-1.fbQftq > h1";


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

    let movieYearSelector = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-ca85a21c-0.efoFqn > section > div:nth-child(4) > section > section > div.sc-80d4314-0.fjPRnj > div.sc-80d4314-1.fbQftq > div > ul > li:nth-child(1) > span");

    let movieYear = movieYearSelector[0].children[0].data;

    return movieYear;
}



