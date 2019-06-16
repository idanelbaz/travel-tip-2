 function getWeather(lat, lng) {
     var prmRes = axios.get(`https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b6907d289e10d714a6e88b30761fae22`)
     var prmAns = prmRes.then((res) => {
         return res.data;
     })
     return prmAns;

 }


 export default {
     getWeather
 }