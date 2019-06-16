var locs = [{ lat: 31.761134, lng: 35.186795 }]

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
    getLocs: getLocs,
    getPosition: getPosition
}