const scrabbleDataUrl = 'https://webappscrabbleclub.azurewebsites.net/API/Values';

export async function getClubs() {
    let fullUrl = `${scrabbleDataUrl}/GetClubs`;
    const response = await fetch(fullUrl, {
        method: 'GET', // It is a GET
        mode: 'cors', // I need the data so do not quietly ignore what cors permissions does not allow
        headers: {
            'Accept': 'application/json' // I want json response
        }
    });
    const jdata = await response.json();
    jdata.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    return jdata;
};

export async function getPlayers() {
    let fullUrl = `${scrabbleDataUrl}/GetPlayers`;
    const response = await fetch(fullUrl, {
        method: 'GET', // It is a GET
        mode: 'cors', // I need the data so do not quietly ignore what cors permissions does not allow
        headers: {
            'Accept': 'application/json' // I want json response
        }
    });
    const jdata = await response.json();
    jdata.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    return jdata;
};

export async function getClubNights() {
    let fullUrl = `${scrabbleDataUrl}/GetClubNights`;
    const response = await fetch(fullUrl, {
        method: 'GET', // It is a GET
        mode: 'cors', // I need the data so do not quietly ignore what cors permissions does not allow
        headers: {
            'Accept': 'application/json' // I want json response
        }
    });
    const jdata = await response.json();
    return jdata;
};

export async function getClubGames() {
    let fullUrl = `${scrabbleDataUrl}/GetClubGames`;
    const response = await fetch(fullUrl, {
        method: 'GET', // It is a GET
        mode: 'cors', // I need the data so do not quietly ignore what cors permissions does not allow
        headers: {
            'Accept': 'application/json' // I want json response
        }
    });
    const jdata = await response.json();
    return jdata;
};
