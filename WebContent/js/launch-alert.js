
var earth; 

function initialize() {
    var options = {atmosphere: true, center: [0, 0], zoom: 0};
    earth = new WE.map('earth_div', options);
    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 5,
        attribution: 'NASA'
    }).addTo(earth);
}

var llData;
function load_ll_event() {
    launchAlertData();

}