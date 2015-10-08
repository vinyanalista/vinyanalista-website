adsbygoogle = window.adsbygoogle || [];

var html_1 = '<div class="row">' +
    '<div class="col-xs-12">' +
    '<ins class="adsbygoogle" id="ad_unit_2" data-ad-format="auto"></ins>' +
    '</div></div>';

var html_2 = '<div class="row">' +
    '<div class="col-xs-12">' +
    '<ins class="adsbygoogle" id="ad_unit_3" data-ad-format="auto"></ins>' +
    '</div></div>';

$(document).ready(function(){
    if ($('#is_post').length > 0) {
        // Anúncios nas postagens ficam entre os parágrafos
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
        
        var $anuncio_1 = $(html_1);
        $paragrafos.eq(paragrafo1 - 1).after($anuncio_1);
        
        if (quantidade_de_paragrafos < 2) {
            return;
        }
        
        var $anuncio_2 = $(html_2);
        $paragrafos.eq(paragrafo2 - 1).after($anuncio_2);
    } else {
        // Anúncios nas páginas ficam entre as postagens
        var $posts = $('.blog-post');
        var quantidade_de_posts = $posts.length;
        
        if (quantidade_de_posts == 0) {
            return;
        }
        
        var post1, post2;
        if (quantidade_de_posts > 1) {
            post1 = numero_aleatorio(1, Math.floor(quantidade_de_posts / 2));
            do {
                post2 = numero_aleatorio(Math.ceil(quantidade_de_posts / 2), quantidade_de_posts);
            } while (post1 == post2);
        } else {
            post1 = 1;
        }
        
        var $anuncio_1 = $(html_1);
        $posts.eq(post1 - 1).find('.blog-post-conteudo .row').after($anuncio_1);
        
        if (quantidade_de_posts < 2) {
            return;
        }
        
        var $anuncio_2 = $(html_2);
        $posts.eq(post2 - 1).find('.blog-post-conteudo .row').after($anuncio_2);
    }
    
    $('.adsbygoogle').each(function(index, element){
        $(element).attr('data-ad-client', adsense_editor_id);
        $(element).attr('data-ad-slot', adsense_ad_units[index]);
        adsbygoogle.push({});
    });
});
