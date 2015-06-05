$(document).ready(function(){
    var $paragrafos = $('.blog-post-conteudo p');
    var quantidade_de_paragrafos = $paragrafos.length;
    
    if (quantidade_de_paragrafos == 0) {
        return;
    }
    
    var paragrafo1, paragrafo2;
    if (quantidade_de_paragrafos > 1) {
        paragrafo1 = numero_aleatorio(1, Math.floor(quantidade_de_paragrafos / 2));
        do {
            paragrafo2 = numero_aleatorio(Math.ceil(quantidade_de_paragrafos / 2), quantidade_de_paragrafos);
        } while (paragrafo1 == paragrafo2);
    } else {
        paragrafo1 = 1;
    }
    
    var $anuncio_1 = $('<ins class="adsbygoogle anuncio-no-post" id="ad_unit_2" data-ad-format="auto"></ins>');
    $paragrafos.eq(paragrafo1 - 1).after($anuncio_1);
    
    if (quantidade_de_paragrafos < 2) {
        return;
    }
    
    var $anuncio_2 = $('<ins class="adsbygoogle anuncio-no-post" id="ad_unit_3" data-ad-format="auto"></ins>');
    $paragrafos.eq(paragrafo2 - 1).after($anuncio_2);
});