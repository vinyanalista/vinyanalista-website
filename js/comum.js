function numero_aleatorio(primeiro, ultimo) {
    return Math.floor((Math.random() * (ultimo - primeiro + 1))) + primeiro;
}

/* AddThis */

var addthis_config = {
    "data_track_clickback":true,
    "data_track_addressbar":true,
    "ui_language": "pt"
};

/* AdSense */

adsbygoogle = window.adsbygoogle || [];

$(document).ready(function(){
    $('.adsbygoogle').each(function(index, element){
        $(element).attr('data-ad-client', adsense_editor_id);
        $(element).attr('data-ad-slot', adsense_ad_units[index]);
        adsbygoogle.push({});
    });
});