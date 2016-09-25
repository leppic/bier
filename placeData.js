//Wordt aangeroepen door checkSupermarktJSONbrand(nameBrand). Deze checkt alle supermarkten aan de hand van één bepaald merk en roept deze functie het nodige aantal keer aan.
function placeSearchResultsMerk(image, merk, soort2, oPrijs, nPrijs, datum, korting1, korting2, ltrprijs, supermarkt) {
    if ($('.bierBandSearch').length==0){
        var wrapper = '<div class="bierBandSearch"> </div>';
        $(".mainBody .container").append(wrapper);
        placeSearchResultsMerkContent(image, merk, soort2, oPrijs, nPrijs, datum, korting1, korting2, ltrprijs, supermarkt)
    } else {
        placeSearchResultsMerkContent(image, merk, soort2, oPrijs, nPrijs, datum, korting1, korting2, ltrprijs, supermarkt)
    }
}

function placeSearchResultsMerkContent(image, merk, soort2, oPrijs, nPrijs, datum, korting1, korting2, ltrprijs, supermarkt){
    
    var resizeTekst = ' style="font-size:8pt; font-weight:700; margin-top:58px;"'
    if (merk.length > 14){
             if (merk.lengt > 20){
                  resizeTekst = ' style="font-size:9pt; font-weight:700; margin-top:58px;"'} else
             { resizeTekst = ' style="font-size:10pt; font-weight:700; margin-top:56px;"'}
         } else{ resizeTekst = ''}
    
    var itemCode = '<div class="item itemSearch"><div class="'+supermarkt+' superLogo"></div> <img src="https://www.biernet.nl'+image+'" style="padding-left:14px;"> <span class="bierNaam"'+resizeTekst+'>'+merk+'</span> <span class="bierFormaat">'+soort2+'</span> <span class="oPrijs">'+oPrijs+'</span> <span class="nPrijs">'+nPrijs+'</span> <span class="datum">'+datum+'</span> <span class="korting">-€'+korting1+' ('+korting2+') | '+ltrprijs+' per liter</span> </div>'
         
    $(".bierBandSearch").append(itemCode);
}


//Nieuwe code:

//Plaats de data voor de homepage. Wordt opgeroepen door checkSupermarktJSON(namesSup). De supermarkten die geplaatst moeten worden komen op dit moment uit een array uit jsonLoader. 
function placeHomepage(supermarkt, content,index){
    var contentHTML  = '';
    $.each(content, function(index, value){
        var fontsizeName = '';
        if (value.name.length>15){
            fontsizeName = ' style="font-size:'+(1.4-((value.name.length-14)/21))+'em;"'
        }
        contentHTML = contentHTML+'<div class="item itm'+index+'" style="left:'+(95+(172*index))+'px"> <img src="http://www.biernet.nl'+value.image+'"> <span class="bierNaam"'+fontsizeName+'>'+value.name+'</span> <span class="bierFormaat">'+value.kind+'</span> <span class="oPrijs">'+value.oPrice+'</span> <span class="nPrijs">'+value.nPrice+'</span> <span class="datum">'+value.date+'</span> <span class="korting">'+value.disc1+' '+value.disc2+' | '+value.ltrPrice+'</span> </div>'
    });
    
    $('.mainBody .container').append('<div class="bierBand"><div class="item superMarkt '+supermarkt+'"></div>'+contentHTML+'</div><div class="colorBand '+supermarkt+'"></div>')
}

function handleSearch(searchCode) {
    console.log(searchCode)
    $(".bierBand").remove();
    $(".bierBandSearch").remove();
    $(".colorBand").remove();
//    console.log(window.supermarketsGlob.responseJSON.supermarkt.length)
    $.each(window.supermarketsGlob.responseJSON.supermarkt, function(index, value){
        if (value.name==searchCode){
            console.log('Supermarkt');
            checkSupermarktJSONmarkt(searchCode)
            return false;
        } else if ((window.supermarketsGlob.responseJSON.supermarkt.length-1) == index) {
            console.log('Geen supermarkt')
            checkSupermarktJSONbrand(searchCode)
        }
    })
}