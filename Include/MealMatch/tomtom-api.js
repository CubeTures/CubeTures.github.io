//ajjDAjGvMSNKknuqPpEd1T270qzItD2g
//https://{baseURL}/search/{versionNumber}/nearbySearch/.{ext}?key={Your_API_Key}&lat={lat}&lon={lon}&radius={radius}&limit={limit}&ofs={ofs}&categoryset={categoryset}&brandSet={brandSet}&openingHours={openingHours}
//7315: restaurant

async function getJSON(url) {
    const reponse = await fetch(url);
    return reponse.json;
}

async function nearbySearch() {
    const url = "";
}

async function logData() {
    const url = `https://api.tomtom.com/search/2/poiPhoto?key=ajjDAjGvMSNKknuqPpEd1T270qzItD2g&id=5CFIODvZ0yaMi_XwaXY-KA`;
    const asJSON = await getJSON(url);
    console.log(JSON.stringify(asJSON, null, 2));
}

//logData();