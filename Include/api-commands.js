async function httpRequest(url, parameters) {
    const parameterString = getParameterString(parameters);
    const completeUrl = `${url}${parameterString}`;
    const response = await fetch(completeUrl);
    return response.json();
}
function getParameterString(parameters) {
    let paramString = "";
    for(const [key, value] of Object.entries(parameters)) {
        const modifier = paramString.length > 0 ? "&" : "?";
        paramString = `${paramString}${modifier}${key}=${value}`; 
    }
    return paramString;
}

async function postRequest(url, header, body) {
    const response = await fetch(url, {
        method: "POST",
        header: header,
        body: JSON.stringify(body)
    });

    return response.json();
}

export { httpRequest, postRequest };