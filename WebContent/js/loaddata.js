// Script to orchestrate the intake and integration of data.


// Example: To return launches after August 20th, 2015:
//      > https://launchlibrary.net/1.4/launch/2015-08-20

var launches;
var alaunch;

function launchAlertData() {
    var oneWeekAgo = new Date();
    var endDate = new Date();
    
    endDate.setDate(oneWeekAgo.getDate() + 182);
    endDate = endDate.toISOString().substring(0,10);
    
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo = oneWeekAgo.toISOString().substring(0,10);
    console.log(oneWeekAgo);  // >2019-11-26
    
    var url = "";
    var ll_rooturl = "https://launchlibrary.net/1.4/launch?";
    

    url = ll_rooturl + "startdate=" + oneWeekAgo;
    url = url + "&enddate=" + endDate;
    url = url + "&limit=200";
    url = url + "&mode=verbose";
    console.log(url);
    
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
        
        console.log(earth.toString());
        console.log(url);
        
        launches = data.launches;
        console.log("above for");
        
        alaunch = launches[1];
        console.log(alaunch.location.pads[0].latitude);
        for (var i=0; i<data.count; i++) {
            var loc = launches[i].location.pads[0];
            var agency = launches[i].lsp;
            var lat = loc.latitude;
            var lon = loc.longitude;
            
            var marker = new WE.marker([lat,lon]).addTo(earth);
            marker.bindPopup("<img id=\"rocketimg\" src=" + launches[i].rocket.imageURL + ">" + 
            		"<table>" +
                    "<tr><th>Launch</th><td>" + launches[i].name + "</td></tr>" +
                    "<tr><th>Agency</th><td>" + agency.abbrev + "</td></tr>" +
                    "<tr><th>countryCode</th><td>" + agency.countryCode + "</td></tr>" +
                    
            		"</table>")
        }  // end for
    })
    .catch(function() {
        
    });

    return launches;
    
}