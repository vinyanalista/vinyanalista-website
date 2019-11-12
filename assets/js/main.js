function random_number(first, last) {
    return Math.floor((Math.random() * (last - first + 1))) + first;
}

$(document).ready(function(){
    $('body').bootstrapMaterialDesign();

    $('#fab').click(function(){
        var enterDesignMode = ($('#fab button i').text() == "visibility");
        $('#fab button i').text(enterDesignMode ? "edit" : "visibility");
        document.designMode = enterDesignMode ? "on" : "off";
    });

    // Realça links externos
    $('div.blog-post a').filter(function() {
        return (this.hostname && (this.hostname != location.hostname) && ($(this).find('img').length == 0));
    }).append(' <i class="fas fa-external-link-alt"></i>').attr('target', '_blank');
});
