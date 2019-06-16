import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import getWeather from './services/weather.service.js'

document.querySelector('.go').addEventListener('click', handleSearch);
document.querySelector('.myLoc').addEventListener('click', handleUserLoc);
document.querySelector('.search').addEventListener('keypress', checkIfEnter);




document.body.onload = () => {
    handleUserLoc();
    var lat = checkQueryStr('lat');
    var lng = checkQueryStr('lng');
    console.log(lat, lng)


}

function checkQueryStr(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}






function handleUserLoc() {

    let userPos = locService.getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                .then(
                    () => {
                        mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    }
                ).catch(console.warn);

            let weather = getWeather.getWeather(pos.coords.latitude, pos.coords.longitude)
            weather.then(weatData => {
                handleSearch(weatData.name);
            })

        })

}

function checkIfEnter(ev) {
    if (ev.key === "Enter") handleSearch();
}





function handleSearch(loc) {
    let input;
    if (typeof loc !== 'string') input = document.querySelector('.search').value;
    else input = loc;
    console.log(input)
    let geoCodeData = mapService.geoCode(input);
    let strHtml = '';
    let strWeatHtml = '';
    geoCodeData.then(data => {
        console.log(data)
        strHtml += ` Location:  ${data.results[0].formatted_address}
        `
        document.querySelector('h2').innerText = strHtml;

        mapService.initMap(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
            .then(
                () => {
                    mapService.addMarker({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng });
                }
            ).catch(console.warn);
        let weather = getWeather.getWeather(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
        weather.then(weatData => {
            console.log(weatData)
            strWeatHtml += `
            <p class="weat-header"> Weather now:  <span class="weat-data-weat">${weatData.weather[0].main}</span> </p>
            <img class="weat-img" src="http://openweathermap.org/img/w/${weatData.weather[0].icon}.png">
            <p class="weat-data">${weatData.name},${weatData.sys.country} </p> 
            <p class="weat-temp">${weatData.main.temp}℃ temperature from ${weatData.main.temp_min}℃ to ${weatData.main.temp_max}℃ wind ${weatData.wind.speed} m/s </p> 
            
            `

            document.querySelector('.weather').innerHTML = strWeatHtml;
        })

    })



}