function getBiernetData(markt) {
    var url = markt;
    return $.ajax({
        url: 'process.php',
        data: 'url='+url,
        dataType: 'json',
        type: 'POST',
        success: function(response){
                var merk = filterAanbiedingData(response.rank, 'merk');
                var prijs = filterAanbiedingData(response.rank, 'prijs');
                var soort1 = filterAanbiedingData(response.rank, 'soort1');
                var soort2 = filterAanbiedingData(response.rank, 'soort2');
                var oPrijs = filterAanbiedingData(response.rank, 'oPrijs');
                var nPrijs = filterAanbiedingData(response.rank, 'nPrijs');
                var datum = filterAanbiedingData(response.rank, 'datum');
                var korting1 = filterAanbiedingData(response.rank, 'korting1');
                var korting2 = filterAanbiedingData(response.rank, 'korting2');
                var ltrprijs = filterAanbiedingData(response.rank, 'ltrprijs');
                var image = filterAanbiedingData(response.rank, 'image');
                
                totalObj = {
                    supermarkt: markt ,merk: merk, prijs: prijs, soort1: soort1, soort2: soort2, oPrijs: oPrijs, nPrijs: nPrijs, datum: datum, korting1: korting1, korting2: korting2, ltrprijs: ltrprijs, image: image
                }                
                createObjectList(totalObj, markt);
            console.log('succes')

        },
        error: function(e){
            console.log('failed')
            $('.problem').html('Er is iets mis gegaan met het ophalen van de data :(');
        }
    });
}

function filterAanbiedingData(data, type) {
//    Zet de geScarpete HTML om in losse stukken. Wordt aangeroepen door filterAanbiedingData()
//    Mogelijke opties voor type: 'merk' | 'prijs' | 'soort1' | 'soort2' | 
    var items = [];
//    Soort1 zijn bijvoorbeeld Kratten of Flesjes. 
//    Soort2 zijn de soort plus details. Bijvoorbeeld: 2 kratjes of 6pack flesje 24cl
    if (data == ''){
        return items
    }     
    if (type == 'oPrijs' || type == 'nPrijs' ) { // voor oPrijs en nPrijs
        data = data.split('<del>&euro;');
        for (var i = 1; i < (data.length); i++) {
            var data2 = data[i].split('</del>')[0];
            var data3 = data[i].split('&euro;')[1].split('</span>')[0];
            if (type=='oPrijs') {
                items.push(data2)
            } else {
                items.push(data3)
            }
        }
    } if (type == 'datum') {    // voor 'datum' 
        data = data.split('<p class="nomargin">')
        for (var i = 1; i < ((data.length/2)); i++) {
            var data2 = data[(i*2)-1].split('</p>')[0];
            items.push(data2)
        }
    } if (type == 'image') {    // voor 'image' 
        data = data.split('<img src="/images/soort/')
        for (var i = 1; i < ((data.length)); i++) {
            var data2 = data[i].split('" alt="')[0];
            items.push('http://www.biernet.nl/images/soort/'+data2)
        }
    } if (type == 'korting1' || type == 'korting2' ) {    // voor 'korting1' en 'korting2' 
        data = data.split('<span title = "&euro;');
        for (var i = 1; i < (data.length); i++) {
            var data2 = data[i].split(' totale korting  (kortingspercentage van ')
            var data3 = data2[1].split(')">')
            if (type=='korting1') {
                items.push(data2[0])
            } else {
                items.push(data3[0])
            }
        }
    } if (type == 'soort1' || type == 'soort2' ) {    // voor 'soort1' en 'soort2' 
        data = data.split('<p class="');
        for (var i = 1; i < (data.length/3); i++) {
            var data2 = data[(i*3)-2].split('</p>')
            var data3 = data2[0].split('>')
            
            if (type=='soort1') {
                items.push(data3[0])
            } else {
                items.push(data3[1])
            }
        }
    } if (type == 'merk' || type == 'prijs' || type == 'ltrprijs' ) {        // voor 'merk' en 'prijs'
        data = data.split('<span class="'+type+'">')
        for (var i = 1; i < data.length; i++) {
            data2 = data[i].split('</span>')   
            if(type=='ltrprijs'){
                items.push(data2[0].split('&euro;')[1])
            } else {
                items.push(data2[0])
            }
        }
    }
    return items;
}