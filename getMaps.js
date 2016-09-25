var map;
var allResults = ''
//var uniqueResults = []

function initMap() {

    var pyrmont = {lat: 51.840929, lng: 4.951446};
        
    map = new google.maps.Map({
        center: pyrmont
    });

    //  infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch({
        location: pyrmont,
        radius: 100,
        query: ['supermarkt']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            allResults = allResults+' '+results[i].name;
        }
        // added to fool the system
        var uniqueResults = []
        //
        allResults = allResults.split(' ');
        
        //Delete dubbele entries uit de lijst
        $.each(allResults, function(i, el){
            if($.inArray(el, uniqueResults) === -1) uniqueResults.push(el);
        });
//        console.log(uniqueResults)
    }
}
function sendAllResults() {
    var uniqueResults = ['','ALDI', 'Jumbo', 'AH', 'Lidl', 'CoopCompact', 'Nettorama', 'Plus', 'EMTÉ', 'Hoogvliet','MCD', 'Coop']
//    console.log(uniqueResults)
    return uniqueResults
}
//
//function lookForSuper(allResults, markt, name1, name2, name3){
//    for (var i = 0; i < allResults.length; i++) {
//        if (allResults[i]==name1 || allResults[i]==name2 || allResults[i]==name3) {
//            placeSupermarkts(markt);
//            return [markt, i]
//        }
//    }
//}

