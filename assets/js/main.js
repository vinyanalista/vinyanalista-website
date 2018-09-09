function random_number(first, last) {
    return Math.floor((Math.random() * (last - first + 1))) + first;
}

$(document).ready(function(){
    $('body').bootstrapMaterialDesign();

    // Realça links externos
    $('div.blog-post a').filter(function() {
        return (this.hostname && (this.hostname != location.hostname) && ($(this).find('img').length == 0));
    }).append(' <span class="glyphicon glyphicon-new-window"></span>').attr('target', '_blank');
});
