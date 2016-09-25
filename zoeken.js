$(document).ready(function(){

    var options = {
        url: "json/datalist.json",
        getValue: "styleName",
        list: {
            match: {
                enabled: true
            },
            onClickEvent: function() {
                var searchCode = $("#searchHome").getSelectedItemData().nameID;
                //                    alert(searchCode)
                handleSearch(searchCode)
                handleClearch()
            }
        }
    };
    
    var options2 = {
            url: "json/datalistSupOnly.json",
            getValue: "styleName",
            list: {
                match: {
                    enabled: true
                },
                onClickEvent: function() {
                    var searchCode = $("#searchAddItem").getSelectedItemData().nameID;
                    var styled = $("#searchAddItem").getSelectedItemData().styleName;
//                    alert(searchCode)
                    addItemInput(searchCode,styled)
                    $('#searchAddItem').val('');
                }
            }
        };
        
    $("#searchHome").easyAutocomplete(options);
    $("#searchAddItem").easyAutocomplete(options2);
    
    $('input#searchHome').focus(centerOnSearchBar);
    $('input#searchHome').blur(function(){
        resetCenterOnSearchBar();
        if($('#searchHome').val!=''){
            handleClearch()
        }
    });
});

function centerOnSearchBar(){
    $('html, body').animate({ scrollTop: 0 }, "slow", function() {
        $('.container').css({'position': 'fixed' , 'padding-top': 66, 'top':'auto'});
        $('.easy-autocomplete-container').css({'top':124});
    })
    
}
function resetCenterOnSearchBar(){
    console.log('hoi');
    $('.container').removeAttr('style');
    $('.easy-autocomplete-container').css({'top':59});
}

//Used code

//Shows the little X at the end of the searchbar. Needed to clear the search and reload the home
function handleClearch(){
    $('#clearSearch').show();
    $('#clearSearch').off('click');
    $('#clearSearch').click(function(){
        $(".bierBand").remove();
        $(".bierBandSearch").remove();
        $(".colorBand").remove();
        jsonLoader();
        $('#clearSearch').hide();
        $('#searchHome').val('');
        
    });
    
}