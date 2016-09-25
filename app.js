//GLobale variabele worden aangemaakt
var nameSup = [];
var name1 = [];
var name2 = [];
var name3 = [];
var nodeObject = {};
var totalObj = {};
var totalObjList = [];

$(document).ready(function(){
// Een werkend voorbeeld van de Google Maps API
// https://jsfiddle.net/z0epygwh/2/
// Straal lijkt nog niet te werken, locatie is nog niet dynamisch en API-key is nu nog algemeen
// Read me jquery-cookie | https://github.com/carhartl/jquery-cookie    
    $('#but1').click(function(){
        var cookieList = 'jumbo'+','+'albert-heijn';
        $.cookie('name', cookieList);
        
    })
    $('#but2').click(function(){
        var cookSupermarkt = $.cookie('name').split(',')
        for (var i = 0; i < cookSupermarkt.length; i++){
            codeSupermarkts(cookSupermarkt[i])
        }
    })
    
//Start de kekke animatie voor het laden
    $('.loadingAnimation').animate({
        'height':175
    },2500)    
});
function jsonLoaded(){
    $('.loading').hide();
    $('.problem').hide();
    //    Load cookies
    var favSupersList = $.cookie('favSupers')
    if(favSupersList==undefined){
        favSupersList = 'jumbo,albert-heijn,nettorama'
    }
    var favSupers = favSupersList.split(',')
    console.log(favSupers)
    fillFavorite(favSupers)
    jsonLoader(favSupers)
}

function fillFavorite(favSupers){
    $('#opt1List li').slice(0, this.length - 1).remove();
    $.each(favSupers, function(index,value){
         $.each(window.supermarketsGlob.responseJSON.supermarkt, function(jndex,jalue){
             if(jalue.name == value){
                 console.log(jalue.searchName1)
                 $('.addItem').before('<li name="'+value+'">'+jalue.searchName1+'<span class="handle"></span><span class="removeItem"></span></li>');
                 handleSortables()
             }
         })
        
    })
}