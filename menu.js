$(document).ready(function(){
    $('.fader').fadeOut(10)
    console.log($('.optionsIcon'))
    $('.optionsIcon').click(function(){
//        $('.mainBody').addClass('scaled');
//        $('.opt1').addClass('scaled');
        $('.fader').fadeIn(300)
        $('.menu').animate({
            left: '30vw'
        },300)
    })
    
    $('.fader').click(function(){
        animateMenuOut()
    });
    
    $('#homeBut').click(function(){
        console.log('click')
        $('.opt1').hide();
        $('.mainBody').show();
        jsonLoaded()
        animateMenuOut()
    })
    
    $('#favSupBut').click(function(){
        $('.mainBody').hide();
        $('.opt1').show();
        jsonLoaded();
        animateMenuOut();
    });
    
    $('.addItem').click(function(){
        $('.faderOpt1').fadeIn();
        $('.addItemName').fadeIn();
        $('#searchAddItem').focus();
//        saveCookies();
//        
    })
    
});
function handleSortables(){
//    Reset everything
    console.log('doet die dit?')
    $('.ui-state-default.ui-sortable-handle').removeClass('ui-state-default ui-sortable-handle');
//    remove clickhandles
    $('.removeItem').off('click')
    
//    Add everything
    $( "#opt1List" ).sortable({
        items: "li:not(.addItem)",
        handle: ".handle",
        stop: function(event, ui) {
            saveCookies()
        }
    });
    $('.removeItem').click(function(){
        console.log('click')
        $(this).parent().remove();
        saveCookies();
    })
}

function animateMenuOut(){
//    $('.mainBody').removeClass('scaled');
//    $('.opt1').removeClass('scaled');
    $('.fader').fadeOut(300)
    $('.menu').animate({
        left: '100vw'
    },300)
}

function addItemInput(input, styled){
    $('.faderOpt1').fadeOut();
    $('.addItemName').fadeOut();
    $('#opt1List li:last-child').before('<li name="'+input+'">'+styled+'<span class="handle"></span><span class="removeItem"></span></li>');
    handleSortables()
    saveCookies();
}
function saveCookies(){
    var favSupers = '';
    $.each($('#opt1List').children(), function(index,value){
        if (($('#opt1List').children().length-2)==index){
            favSupers = favSupers + $(value).attr('name')
            return false;
        } else {
            favSupers = favSupers + $(value).attr('name') + ','
        }
        
    })
    console.log(favSupers)
    $.cookie('favSupers', favSupers),{ expires: 365 };
}