'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
//

const IMDB_Scraper = require('./imdb-scraper');

const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
    `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);


console.log("imdb scraper starting...");

let movieTitle = IMDB_Scraper.getMovieTitle();
let movieYear = IMDB_Scraper.getMovieYear();


console.log("imdb scraper ended.");
console.log("imdb movie is: " + movieTitle + ", year is: " + movieYear);


console.log("Sending movie details to cringemdb...");

let movieQueryText = movieTitle.toLowerCase().replaceAll(' ', '-') + '-' + movieYear;

chrome.runtime.sendMessage({ movieQueryText: movieQueryText }, function(response) {
    console.log(response.data);
    IMDB_Scraper.appendMovieTitle(response.data);
});

