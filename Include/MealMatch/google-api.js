const apiKey = 'AIzaSyBegtSVJn6lWy_0quk2oELyy0woSRmCqN8';
const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby';

/* https://maps.googleapis.com/maps/api/place/details/json
  ?fields=name%2Crating%2Cformatted_phone_number
  &place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
  &key=YOUR_API_KEY
  */

const header = {
    "includedTypes": ["restaurant"],
    "maxResultCount": 20,
    "locationRestriction": {
      "circle": {
        "center": {
          "latitude": 37.7937,
          "longitude": -122.3965},
        "radius": 500.0
      }
    }
}

function createRequest() {
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(header)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(JSON.stringify(response.json, null, 2));
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

//createRequest();