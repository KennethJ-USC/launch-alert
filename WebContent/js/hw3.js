

var latCenter = 33.98;
var lonCenter = -81.05;
var baseMapCenter = L.latLng(latCenter, lonCenter);
var map = L.map('mapid').setView(baseMapCenter, 6);
var streetLayerUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?"+
		"access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
var streetLayer = L.tileLayer(streetLayerUrl,{id: 'mapbox.streets', attribution: "MapBox"});
map.addLayer(streetLayer);

map.on('click', mapClickHandler);
function clickPanZoom(e) {
	console.log(e);
}

//////////////

function buttonLatLngStr() {
	var fullText = document.getElementById("theTextArea").value;
	var rows = fullText.split("\n");
	rows = rows.slice(1); 
	
	for (var i=0; i<rows.length; i++) {
		console.log(rows[i]);
		displayLatLng(rows[i]);
	}
}

function buttonLatLngStrWithProperty() {
	var fullText = document.getElementById("theTextArea").value;
	var rows = fullText.split("\n");
	rows = rows.slice(1); 
	
	for (var i=0; i<rows.length; i++) {
		displayLatLngWithProperty(rows[i]);
	}
}

function displayLatLng(rowstr) {
	rowarr = rowstr.split(",");  // row 
	
	console.log(rowarr);
	
	var point = L.latLng(rowarr[0],rowarr[1]);  // load in lat and lng
	console.log(point.toString());
	
	circleMarker = L.circleMarker(point, {label:"point", color:"red", radius:10});
	map.addLayer(circleMarker);
	map.panTo(point);
}

function displayLatLngWithProperty(rowstr) {
	rowarr = rowstr.split(",");  // row 
	
	var point = L.latLng(rowarr[0],rowarr[1]);  // load in lat and lng
		
	radiusProp = rowarr[2] / 1000;
	circleMarker = L.circleMarker(point, {label:"point", color:"red", radius:radiusProp});
	map.addLayer(circleMarker);
	map.panTo(point);
	
}

function clearPoints() {
	// added 'label' attribute to circleMarker to identify layers that are circleMarkers	
	map.eachLayer (function (layer) {
		if (layer.options.label == "point") {
			map.removeLayer(layer);
		}
	});
}

function displayCrimeData() {
	var rows = crimeData.features;
	console.log(rows);
	
	for (var i=0; i<rows.length; i++){
		displayCrimePoint(rows[i]);
	}
}

function displayCrimePoint(ro) {
	var temp_point = ro.geometry.coordinates;
	var point = [temp_point[1], temp_point[0]];
	
	console.log(ro);
	circleMarker = L.circleMarker(point, {label:"point", color:"red", radius:10});
	circleMarker.addEventListener("click", function(e) {
		map.panTo(this.getLatLng());
	});
	map.addLayer(circleMarker);
	
	circleMarker.bindPopup("<dl><dt>Street</dt>" + "<dd>" + ro.properties.street + "</dd>"
			+ "<dt>Type</dt>" + "<dd>" + ro.properties.crime_type + "</dd>" 
			+ "<dt>Day</dt>" + "<dd>" + ro.properties.crimeday + "</dd>" 
			+ "<dt>Location</dt>" + "<dd>" + ro.properties.location_category + "</dd>" +
			"</dl>");
	//map.panTo(point);
}