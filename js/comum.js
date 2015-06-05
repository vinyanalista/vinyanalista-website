function numero_aleatorio(primeiro, ultimo) {
    return Math.floor((Math.random() * (ultimo - primeiro + 1))) + primeiro;
}

/* AddThis */

var addthis_config = {
    "data_track_clickback":true,
    "data_track_addressbar":true,
    "ui_language": "pt"
};

/* SyntaxHighlighter */

SyntaxHighlighter.config.clipboardSwf = '{{ "/lib/syntaxhighlighter/2.1.382/scripts/clipboard.swf" | prepend: site.baseurl }}';
SyntaxHighlighter.config.strings.alert = 'Alerta do componente SyntaxHighlighter\n\n';
SyntaxHighlighter.config.strings.brushNotHtmlScript = 'O brush não suporta a opção html-script: ';
SyntaxHighlighter.config.strings.copyToClipboard = 'Copiar';
SyntaxHighlighter.config.strings.copyToClipboardConfirmation = 'O código foi copiado para a sua área de transferência.';
SyntaxHighlighter.config.strings.expandSource = 'Exibir código-fonte';
SyntaxHighlighter.config.strings.help = '?';
SyntaxHighlighter.config.strings.noBrush = 'Não foi possível localizar o brush: ';
SyntaxHighlighter.config.strings.print = 'Imprimir';
SyntaxHighlighter.config.strings.viewSource = 'Nova janela';
SyntaxHighlighter.defaults['auto-links'] = true;
SyntaxHighlighter.defaults['class-name'] = 'reset-box-sizing';
SyntaxHighlighter.defaults['pad-line-numbers'] = false;
SyntaxHighlighter.defaults['wrap-lines'] = false;
SyntaxHighlighter.all();

/* AdSense */

adsbygoogle = window.adsbygoogle || [];

$(document).ready(function(){
    $('.adsbygoogle').each(function(index, element){
        $(element).attr('data-ad-client', adsense_editor_id);
        $(element).attr('data-ad-slot', adsense_ad_units[index]);
        adsbygoogle.push({});
    });
});