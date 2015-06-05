$(document).ready(function(){
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
    
    var $anuncio_1 = $('<ins class="adsbygoogle" id="ad_unit_2" data-ad-format="auto"></ins>');
    $posts.eq(post1 - 1).find('.blog-post-conteudo .row').after($anuncio_1);
    
    if (quantidade_de_posts < 2) {
        return;
    }
    
    var $anuncio_2 = $('<ins class="adsbygoogle" id="ad_unit_3" data-ad-format="auto"></ins>');
    $posts.eq(post2 - 1).find('.blog-post-conteudo .row').after($anuncio_2);
});