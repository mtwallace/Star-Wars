import './css/bootstrap.css';
import './css/index.css';
import {getCharByUrl, getCharById, getFilms, getSwapiUrl} from './api/swapi';
import {arrayForChart, loadChart} from './charts/charts';
const Promise = require('es6-promise').Promise,
      swapiUrl = getSwapiUrl();
const json = require('./appOptions/options.js'),
      options = json.default['character-options'];

getFilms().then((result) => {
    let results = result.results, // Films array
        cards = Math.floor(results.length/2), // Number of cards since it needs to be even
        iterations = cards * 2, // Even number of films
        calls = [], // Character API end points
        film = {}, // Film objects to be added to the array of films
        info = [], // Array for films
        charIndex = 0, // Character index in map
        charMap = {}; // Characater map for end points

    // Create film info array
    // Keep track of character end points so each is only hit once
    for (let i = 0; i < iterations; i++) {
        film.title = results[i].title; // Movie Title
        film.director = results[i].director; // Movie Director
        film.crawlLength = results[i].opening_crawl.length; // Opening Crawl Length

        // Map characters to their index in the characters array
        for (let j = 0; j < 3; j++) {
            if (!charMap.hasOwnProperty(results[i].characters[j])) {
                charMap[results[i].characters[j]] = charIndex; // Character Map
                charIndex++;
            }

            calls.push(results[i].characters[j]);
        }

        film.charUrls = calls; // Film character endpoints
        info.push(film); // Add each film to array
        film = {};
        calls = [];
    }

    // Create array of end points for the Promise
    for (let call in charMap) {
        calls.push(call);
    }

    Promise.all(calls.map((url) => {
        return getCharByUrl(url); // Get each of the character's info
    })).then((characters) => {
        // Format array for HTML
        let filmsArray = combineInfo(info, characters, charMap);
        // Write HTML for films
        filmsHtml(filmsArray);
        // Get favorite/least favorite characters
        getCharacter(characters, charMap, options.favorite, "favorite");
        getCharacter(characters, charMap, options.leastFavorite, "least-favorite");
        return filmsArray;
    }).then((filmsArray) => {
        // Load chart with appropriate data
        loadChart(arrayForChart(filmsArray));
    }).then(() => {
        // Show sidebar with content
        global.document.getElementById('sidebar').style.display = 'block';
        // Remove loader
        global.document.getElementById('loader').style.display = 'none';
        // Open up bar with content
        global.document.getElementById('outer-container').className += 'open';
    });
});
// Generate HTML for the list of films
function filmsHtml(info) {
    let html = ``;

    for (let i = 0; i < info.length; i = i+2) {
        // Define local image names since swapi doesn't return images
        let image1 = info[i].title.toLowerCase().split(' ').join('_'),
            image2 = info[i+1].title.toLowerCase().split(' ').join('_');

        html += `<div class="col-sm-4">
                    <div class="card">
                        <div class="row">
                            <div class="col-sm-6 film">
                                <div class="poster">
                                    <img src="./images/${image1}.jpg" alt="${info[i].title} Poster">
                                </div>
                                <h3>${info[i].title}</h3>
                                <h4>
                                    <span>directed by</span>
                                    ${info[i].director}
                                </h4>
                                <ul class="list-unstyled">
                                    <li>${info[i].chars[0]}</li>
                                    <li>${info[i].chars[1]}</li>
                                    <li>${info[i].chars[2]}</li>
                                </ul>
                            </div>
                            <div class="col-sm-6 film">
                                <div class="poster">
                                    <img src="./images/${image2}.jpg" alt="${info[i+1].title} Poser">
                                </div>
                                <h3>${info[i+1].title}</h3>
                                <h4>
                                    <span>directed by</span>
                                    ${info[i+1].director}
                                </h4>
                                <ul class="list-unstyled">
                                    <li>${info[i+1].chars[0]}</li>
                                    <li>${info[i+1].chars[1]}</li>
                                    <li>${info[i+1].chars[2]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    writeHtml(html, 'films');
}
// Combine the characters with the film data array using the character map
function combineInfo(info, characters, charMap) {
    let i = 0, name, index;

    info.forEach((a) => {
        var b = a.charUrls;
        info[i].chars = [];
        b.forEach((c) => {
            index = charMap[c];
            name = characters[index].name;
            info[i].chars.push(name);
        });
        i++;
    });
    return info;
}
// Favorite Character
function getCharacter(data, charMap, id, placement) {
    let property = swapiUrl + 'people/' + id + '/';

    if (charMap.hasOwnProperty(property))
        writeHtml(data[charMap[property]].name, placement);
    else
        getCharacterInfo(id, placement);
}
// Use swapi to retrieve specific character
function getCharacterInfo(id, placement) {
    getCharById(id).then((result) => {
        writeHtml(result.name, placement);
    });
}
// Add HTML to DOM
function writeHtml(html, placement) {
    global.document.getElementById(placement).innerHTML = html;
}