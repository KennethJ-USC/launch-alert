
var map = L.map('mapid').setView([35.7796,-78.6382], 11);
var streetLayerUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?"+
"access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
var streetLayer = L.tileLayer(streetLayerUrl,{id: 'mapbox.streets', attribution: "MapBox"});
map.addLayer(streetLayer).a;


var myStyle = {
        "color": "red",
        "weight": 5,
        "opacity": 0.65
    };
        

var crimeData;
function loadData() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {	     
            var jsonText = this.responseText;
            console.info(jsonText);
            crimeData = JSON.parse(jsonText);
            
            // latitude  - crimeData.features[i].geometry.coordinates[0];
            // longitude - crimeData.featyres[i].geometry.coordinates[1];
            // street - crimeData.features[i].properties.street;
            
            for (var i=0; i<crimeData.features.length; i++) {
                
                try {
                    var el = crimeData.features[i];
                    console.info("-------------------------------------");
                    console.info("Crime number: " + i);
                    console.info(" - Latitude: " + el.geometry.coordinates[0]);
                    console.info(" - Longitude " + el.geometry[1]);
                    console.info(" - Street: " + el.properties.street);
                } catch (e) {
                    console.log(e.toString());
                }
            }
        }};

        xhttp.open("GET", "data/crime-dataset-nc.geojson", true);
        xhttp.send();
}  // end loadData method

var layers;
var crimeCollection = L.featureGroup(); 
var feature;
var circleMarker;

var myCircleMarker = L.CircleMarker.extend({
   options: {
       street:"<no street>",
       crime_type:"<no crime_type>",
       crimeday:"<no crimeday>",
   } 
});

function loadDataJQuery() {
    $.ajax({
        url: 'data/crime-dataset-nc.geojson',
        dataType: 'json',
        type: 'GET',
        beforeSend: function() {
            console.log("BEFORESEND - hide your spinner");
        },
        complete: function() {
            console.log("COMPLETE - hide your spinner");
        },
        success: function(response) {
            console.log("Experienced Sucess!");
            layers = L.geoJSON(response).getLayers();
            
            for (var i=0; i<layers.length; i++) {
                feature = layers[i].feature;
                circleMarker = new myCircleMarker(feature.geometry.coordinates.reverse(), 
                    {
                        color:"red",
                        radius:4,
                        street:feature.properties.street,
                        crime_type:feature.properties.crime_type,
                        crimeday:feature.properties.crimeday
                    }
                );
                circleMarker.addEventListener("click", function (e) {
                    document.getElementById("street").value = this.options.street;
                    document.getElementById("crimetype").value = this.options.crime_type;
                    document.getElementById("crimeday").value = this.options.crimeday;


                });
                circleMarker.addTo(crimeCollection);
                crimeCollection.addTo(map);
            }
        }   // end success 
    });
}



	    
	  
	   