export default {
    initMap,
    addMarker,
    panTo,
    geoCode
}


var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', map);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function geoCode(txt) {
    if (!txt) txt = 'amsterdam rokin'
    let str = txt.split(' ');
    if (str.length > 1) {
        txt = str.toString();
        txt = txt.replace(',', '+');
    }

    var prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt},+IL&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
    var prmAns = prmRes.then((res) => {
        return res.data;
    })
    return prmAns;

}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws&callback=initMap`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
            // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}