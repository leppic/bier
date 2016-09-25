//Global Variables
window.supermarketsGlob = $.getJSON("json/supermarkt.json", function(data){
    console.log(data.supermarkt)
    $.each(data.supermarkt, function(index, value){
        window[value.name+'Glob'] = $.getJSON( "http://www.chananippel.nl/cronjobs/bier/"+value.name+".json").done(function() { 
            if(index == (data.supermarkt.length-1)){
                jsonLoaded()
            }
        });
    });
})

function jsonLoader(favSuper){
    var nameBrand = 'Heineken'

    checkSupermarktJSON(favSuper);
}


function checkSupermarktJSON(namesSup){
    $('.bierBand').remove();
    $('.colorBand ').remove();
    $.each(namesSup, function( index, value ) {
        placeHomepage(value, window[value+'Glob'].responseJSON, index)
    });    
}

function checkSupermarktJSONbrand(nameBrand){
    $.each(window.supermarketsGlob.responseJSON.supermarkt, function( index, value ) {
        $.each(window[value.name+'Glob'].responseJSON, function(jndex, jalue){
            if(jalue.name.trim().split(' ')[0] == nameBrand.trim().split(' ')[0]){
                placeSearchResultsMerk(jalue.image, jalue.name, jalue.kind, jalue.oPrice, jalue.nPrice, jalue.date, jalue.disc1, jalue.disc2, jalue.ltrPrice, value.name)
            }
        })
    });
}
function checkSupermarktJSONmarkt(nameMarkt){
    var supermarktJSON = window[nameMarkt+'Glob'].responseJSON;
    console.log(supermarktJSON);
    if (supermarktJSON.length == 0){
        console.log('empty')
    } else {
        $.each(supermarktJSON, function(index, value){
            placeSearchResultsMerk(value.image, value.name, value.kind, value.oPrice, value.nPrice, value.date, value.disc1, value.disc2, value.ltrPrice, nameMarkt)
        })
    }
}