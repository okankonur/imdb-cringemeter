'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const CRINGEMDB_URL = "https://cringemdb.com";

const cheerio = require('cheerio');


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    console.log("MESSAGE RECEIEVED AT BACKGROUND!!!");

    fetch(CRINGEMDB_URL + "/movie/" + request.movieQueryText).then(response => response.text()).then((body) => {

        console.log("background process returned result for: " + request.movieQueryText);


        const $ = cheerio.load(body);


        let cringeResultSelector = $("body > section > div.inner.movie-listing > div > div.movie-info > h2.certification");
        let cringeResult = cringeResultSelector[0].children[1].data;

        console.log("Cringe Result: " + cringeResult);

        sendResponse({ data: cringeResult });
    });

    return true; //this is needed to inform that response will be called asynchronously

});
