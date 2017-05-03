import 'whatwg-fetch';

const swapiUrl = 'http://swapi.co/api/';

export function getSwapiUrl() {
    return swapiUrl;
}

export function getFilms() {
    return get(swapiUrl + 'films');
}

export function getCharByUrl(url) {
    return get(url);
}

export function getCharById(id) {
    return get(swapiUrl + `people/${id}`);
}

function get(url) {
    return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}