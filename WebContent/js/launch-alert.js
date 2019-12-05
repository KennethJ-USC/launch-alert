
var earth; 

function initialize() {
    var options = {atmosphere: true, center: [0, 0], zoom: 0};
    earth = new WE.map('earth_div', options);
    earth.setView([15,-100],2);
    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 5,
        attribution: 'NASA'
    }).addTo(earth);
}

var before = null;
requestAnimationFrame(function animate(now) {
    var c = earth.getPosition();
    var elapsed = before? now - before: 0;
    before = now;
    earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
    requestAnimationFrame(animate);
});

var llData;
function load_ll_event() {
    launchAlertData();

}