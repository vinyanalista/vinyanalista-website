---
date: '2015-07-05 02:05:00 GMT-3'
layout: post
published: true
title: Design multitelas com Bootstrap
image: /files/2015/07/bootstrap_0.jpg
---

Nos dispositivos móveis ([Android](https://www.android.com/), [iOS](https://www.apple.com/br/ios/what-is/), [BlackBerry](http://br.blackberry.com/), etc.) , aquele *site* tradicional projetado para [PC](http://museudocomputador.org.br/ibmpc.html) com resolução 1024x768 não é exibido de maneira adequada. Muitas vezes, os elementos na tela aparecem muito pequenos, obrigando os visitantes a aumentar o *zoom* e deslizar a tela pra lá e pra cá para visualizar todo o conteúdo. Não raro, o desenvolvedor desse *site* se preocupou em testá-lo apenas no [Internet Explorer](http://windows.microsoft.com/pt-br/internet-explorer/), e o resultado disso é que em alguns dispositivos o *layout* do *site* pode se tornar uma verdadeira bagunça.

Pensando em facilitar e agilizar a solução desses problemas, os desenvolvedores do [Twitter](https://twitter.com) lançaram o [Bootstrap](http://getbootstrap.com/), um *framework* [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), e [JS](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) que auxilia o desenvolvimento de *sites* e aplicações *web* responsivos, voltados principalmente aos dispositivos móveis.

{% include image.html src="/files/2015/07/bootstrap_0.jpg" %}

Um <strong>*design* responsivo</strong>, explicado de maneira simples, é aquele que se adapta (responde) ao tamanho da tela do dispositivo em que é renderizado. Se um *site* é projetado tendo em vista tão somente dispositivos móveis, pode parecer muito grande ou espaçoso em um computador de mesa. Por outro lado, se projetado para computadores de mesa, pode parecer pequeno em dispositivos móveis. Um *site* responsivo exibe seu conteúdo de uma maneira em computadores de mesa e de outra maneira em dispositivos móveis, ajustando-se da melhor maneira ao espaço disponível na tela.

Não confunda *design* responsivo com projetar diferentes interfaces para diferentes dispositivos, como faz, por exemplo, o Facebook, ao disponibilizar uma [versão para computadores tradicionais](https://www.facebook.com), uma [versão para celulares](https://m.facebook.com) e uma [versão para *tablets*](https://touch.facebook.com). Estou falando de um código só que serve para todos os dispositivos.

**Esta página que você lê nesse exato momento é responsiva**. Experimente abri-la em um celular, em um *tablet* e em um computador. Ou, mais prático: se estiver usando um computador, experimente redimensionar a janela do navegador. Você verá como o texto se adapta ao espaço disponível.

Se você utiliza como navegador o [Mozilla Firefox](https://www.mozilla.org/pt-BR/firefox/), o [Google Chrome](http://www.google.com.br/chrome/) ou o [Opera](http://www.opera.com/pt-br), outra maneira de verificar como um *site* aparece em diversos dispositivos é instalar a extensão [Web Developer](http://chrispederick.com/work/web-developer/) e usar a opção **Resize**, **View Responsive Layouts**:

{% include image.html src="/files/2015/07/bootstrap_1.jpg" %}

{% include image.html src="/files/2015/07/bootstrap_2.jpg" %}

Sem mais conversa, vejamos como utilizar esse *framework* que é uma verdadeira mão na roda! Não apenas responsividade, o Bootstrap provê componentes e estilos prontos, que podem ser utilizados para tornar o *site* ou aplicação *web* mais bonita e funcional.

### Primeiros passos

Vamos partir do modelo de página em conformidade com o [HTML 5](http://www.tecmundo.com.br/navegador/2254-o-que-e-html-5-.htm) (o padrão de HTML mais recente até o momento) fornecido pelo [Aptana Studio](http://www.aptana.com/) (meu [IDE](https://pt.wikipedia.org/wiki/Ambiente_de_desenvolvimento_integrado) favorito para desenvolvimento *web*, recomendo):

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">

        <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
        Remove this if you use the .htaccess -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title>new_file</title>
        <meta name="description" content="">
        <meta name="author" content="Vinicius">

        <meta name="viewport" content="width=device-width; initial-scale=1.0">

        <!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    </head>

    <body>
        <div>
            <header>
                <h1>new_file</h1>
            </header>
            <nav>
                <p>
                    <a href="/">Home</a>
                </p>
                <p>
                    <a href="/contact">Contact</a>
                </p>
            </nav>

            <div>

            </div>

            <footer>
                <p>
                    &copy; Copyright  by Vinicius
                </p>
            </footer>
        </div>
    </body>
</html>
```

Vamos [começar](http://getbootstrap.com/getting-started/) adicionando o Bootstrap a essa página. Vale observar que o Bootstrap 3.3.4 requer a biblioteca [jQuery](https://jquery.com/) versão 1.9.1 ou mais recente. Para começar a usar o jQuery e o Bootstrap, vamos adicionar as seguintes linhas (em destaque):

```html{20,21,23-28,56-59}
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">

        <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
        Remove this if you use the .htaccess -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title>new_file</title>
        <meta name="description" content="">
        <meta name="author" content="Vinicius">

        <meta name="viewport" content="width=device-width; initial-scale=1.0">

        <!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- Bootstrap -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <div>
            <header>
                <h1>new_file</h1>
            </header>
            <nav>
                <p>
                    <a href="/">Home</a>
                </p>
                <p>
                    <a href="/contact">Contact</a>
                </p>
            </nav>

            <div>

            </div>

            <footer>
                <p>
                    &copy; Copyright  by Vinicius
                </p>
            </footer>
        </div>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    </body>
</html>
```

Fazendo isso, temos um modelo bem parecido com [o modelo básico apresentado no *site* do Bootstrap](http://getbootstrap.com/getting-started/#template). Algumas observações:

- Adicionando o jQuery e o Bootstrap como no exemplo acima, nossos visitantes baixarão essas bibliotecas de [CDNs (*Content Delivery Networks*)](http://www.baboo.com.br/internet/entenda-o-que-e-cdn-ou-content-delivery-network/). É a forma mais fácil para integrá-las ao nosso *site*, uma vez que não precisamos nos preocupar em hospedá-las, e a forma mais ágil para os visitantes obtê-las, pois cópias dessas bibliotecas estarão replicadas pelo globo e poderão ser baixadas do servidor mais próximo.
- Utilizamos bibliotecas adicionais (nesse caso, [html5shiv](https://github.com/afarkas/html5shiv) e [Respond.js](https://github.com/scottjehl/Respond) para adicionar às versões 8 e 9 do Internet Explorer suporte a algumas propriedades do [CSS 3](http://www.w3c.br/Cursos/CursoCSS3) e alguns elementos do HTML 5, utilizados pelo Bootstrap. Essas bibliotecas só são baixadas pelo visitante caso ele utilize o Internet Explorer 8 ou o 9.
- As folhas de estilo são listadas no elemento `head`, enquanto os *scripts* são listados no final do elemento `body`. [Dizem](http://robertnyman.com/2008/04/23/where-to-include-javascript-files-in-a-document/) que assim a página carrega mais rápido.

Se não quiser depender de servidores de terceiros para usar o Bootstrap, você também pode [baixá-lo](http://getbootstrap.com/getting-started/#download) e hospedá-lo em seu próprio servidor. [Clique aqui](https://github.com/twbs/bootstrap/releases/download/v3.3.4/bootstrap-3.3.4-dist.zip) para baixar o Bootstrap versão 3.3.4 (a versão mais atual do Bootstrap até o momento). Descompacte-o em algum local no seu servidor e atualize as referências de acordo, por exemplo (supondo que você extraiu o arquivo baixado na mesma pasta do arquivo acima):

```html
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
```

Mais exemplos do Bootstrap em ação podem ser vistos na [página de exemplos do Bootstrap](http://getbootstrap.com/getting-started/#examples) ou na [lista de *sites* feitos com Bootstrap](http://expo.getbootstrap.com/). Vale lembrar que [este *site*]({{ site.url | append: site.base_url }}) que você lê agora também utiliza o Bootstrap.

### *Design* responsivo

O *design* responsivo pode ser conseguido pelo Bootstrap a partir do seu [sistema de *grids*](http://getbootstrap.com/css/#grid), que provê até 12 colunas que são redimensionadas automaticamente a medida em que o tamanho do dispositivo ou do [*viewport*](http://www.w3schools.com/css/css_rwd_viewport.asp) aumentam. O Bootstrap fornece classes pré-definidas que facilitam a definição do *layout* da página.

Inicialmente, o Bootstrap requer que o conteúdo da página seja inserido dentro de um [*container*](http://getbootstrap.com/css/#overview-container), que pode ser de largura fixa (uma `div` com a classe `.container`) ou preencher toda a largura do *viewport* (uma `div` com a classe `.container-fluid`).

Dentro do *container*, utilizamos linhas (`div`s com a classe `.row`) para criar agrupamentos horizontais de colunas, que devem ser, na estrutura da página, as únicas descendentes das linhas.

O conteúdo deve ser inserido nas colunas. Existem diversas classes para especificar colunas, com base nos tamanhos e dispositivos desejados. Essas classes obedecem ao seguinte padrão:

- `.col-xs-` para dispositivos muito pequenos (largura < 768px), como celulares;
- `.col-sm-` para dispositivos pequenos (768px <= largura < 992px), como *tablets*;
- `.col-md-` para dispositivos médios (992px <= largura < 1200px), como computadores de mesa (*desktops*); e
- `.col-lg-` para dispositivos grandes (largura >= 1200px)

A soma dos tamanhos das colunas em uma linha deve, preferencialmente, ser igual a 12.

O exemplo a seguir define um *layout* com duas colunas de igual largura (6/12, ou 50%) para um computador ou *tablet* (telas com largura igual ou superior a 768px). Em telas com largura inferior a 768px (celulares, por exemplo), a primeira coluna é exibida acima da segunda coluna, como se fossem duas linhas.

```html
<div class="container exemplo">
    <div class="row">
        <div class="col-sm-6">
            .col-sm-6
        </div>
        <div class="col-sm-6">
            .col-sm-6
        </div>
    </div>
</div>
```

<div class="exemplo">
    <div class="row">
        <div class="col-sm-6">
            .col-sm-6
        </div>
        <div class="col-sm-6">
            .col-sm-6
        </div>
    </div>
</div>

Nesta página, defini a classe `.exemplo` para facilitar a visualização dos exemplos:

```css
.exemplo div {
    border: 1px solid blue;
}
```

Observe que as colunas já definem espaços entre seus conteúdos.

Se mais de 12 colunas são inseridas em uma única linha, cada grupo de colunas extras irá cair, como se estivesse em uma nova linha. Observe o exemplo a seguir:

```html
<div class="container exemplo">
    <div class="row">
        <div class="col-sm-2">
            .col-sm-2
        </div>
        <div class="col-sm-3">
            .col-sm-3
        </div>
        <div class="col-sm-4">
            .col-sm-4
        </div>
        <div class="col-sm-5">
            .col-sm-5
        </div>
        <div class="col-sm-6">
            .col-sm-6
        </div>
    </div>
</div>
```

<div class="exemplo">
    <div class="row">
        <div class="col-sm-2">
            .col-sm-2
        </div>
        <div class="col-sm-3">
            .col-sm-3
        </div>
        <div class="col-sm-4">
            .col-sm-4
        </div>
        <div class="col-sm-5">
            .col-sm-5
        </div>
        <div class="col-sm-6">
            .col-sm-6
        </div>
    </div>
</div>

Observe também que é possível definir tamanhos diferentes para as colunas a depender do dispositivo. No exemplo a seguir, as duas colunas aparecem numa relação de 1 para 2 em *tablets* e computadores e numa relação de 1 para 1 em celulares.

```html
<div class="container exemplo">
    <div class="row">
        <div class="col-xs-6 col-sm-4">
            .col-xs-6 .col-sm-4
        </div>
        <div class="col-xs-6 col-sm-8">
            .col-xs-6 .col-sm-8
        </div>
    </div>
</div>
```

<div class="exemplo">
    <div class="row">
        <div class="col-xs-6 col-sm-4">
            .col-xs-6 .col-sm-4
        </div>
        <div class="col-xs-6 col-sm-8">
            .col-xs-6 .col-sm-8
        </div>
    </div>
</div>

Na ausência de uma classe que defina o tamanho para a coluna em um dispositivo particular, se aplica a regra do dispositivo menor. Então, no exemplo acima, ao definir o tamanho da coluna para *tablets* (`.col-sm-`) e não definir o tamanho da coluna para computadores (`.col-md-`), as colunas serão exibidas da mesma maneira nesses dispositivos.

Se não houver uma regra nem para o dispositivo atual e nem para um menor, cada coluna ocupará sua linha. Vamos modificar o exemplo acima, removendo a definição do tamanho da coluna para celulares (`.col-xs-`):

```html
<div class="container exemplo">
    <div class="row">
        <div class="col-sm-4">
            .col-sm-4
        </div>
        <div class="col-sm-8">
            .col-sm-8
        </div>
    </div>
</div>
```

<div class="exemplo">
    <div class="row">
        <div class="col-sm-4">
            .col-sm-4
        </div>
        <div class="col-sm-8">
            .col-sm-8
        </div>
    </div>
</div>

Nesse novo exemplo, nos celulares as colunas serão exibidas uma em cima da outra, como se fossem linhas. Em computadores e *tablets*, elas serão exibidas lado a lado, como no exemplo anterior.

O Bootstrap permite ainda [exibir determinado conteúdo apenas em certos dispositivos](http://getbootstrap.com/css/#responsive-utilities):

```html
<div class="container exemplo">
    <p class="visible-xs-block hidden-print">
        Esse parágrafo só aparece em celulares
    </p>
    <p class="hidden-sm">
        Esse parágrafo não aparecerá em <em>tablets</em>
    </p>
    <p class="hidden-print">
        Esse parágrafo não será impresso (experimente visualizar a impressão)
    </p>
</div>
```

<div class="exemplo">
    <div class="row">
        <p class="visible-xs-block hidden-print">
            Esse parágrafo só aparece em celulares
        </p>
        <p class="hidden-sm">
            Esse parágrafo não aparecerá em <em>tablets</em>
        </p>
        <p class="hidden-print">
            Esse parágrafo não será impresso (experimente visualizar a impressão)
        </p>
    </div>
</div>

Nada melhor que ver os [exemplos](http://getbootstrap.com/css/#grid-example-basic) para compreender os princípios desse sistema de *grid* e aplicá-los ao seu próprio código. Treinar também é importante!

### Estilos e componentes

Não apenas responsividade, o Bootstrap provê componentes e estilos prontos, que podem ser utilizados para tornar o *site* ou aplicação *web* mais bonita e funcional. Aqui, mostrarei apenas alguns exemplos e dicas.

Em relação aos [estilos prontos](http://getbootstrap.com/css/), chamo a atenção para os [formulários](http://getbootstrap.com/css/#forms), bastante elegantes e funcionais. Como dicas, recomendo o [gerador de forms do Bootstrap](http://bootsnipp.com/forms?version=3) e o *plugin* [Bootstrap Validator](http://1000hz.github.io/bootstrap-validator/). Veja abaixo um exemplo de formulário construído com o auxílio do referido gerador.

<form class="form-horizontal">
    <fieldset>
        <legend>Um exemplo de formulário</legend>

        <div class="form-group">
            <label class="col-md-4 control-label" for="nome">Nome</label>  
            <div class="col-md-8">
                <input id="nome" name="nome" type="text" placeholder="Antônio Vinícius" class="form-control input-md" required="">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="email">E-mail</label>  
            <div class="col-md-8">
                <input id="email" name="email" type="text" placeholder="E-mail" class="form-control input-md" required="">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="senha">Senha</label>
            <div class="col-md-8">
                <input id="senha" name="senha" type="password" placeholder="Senha" class="form-control input-md" required="">
                <span class="help-block">Mínimo de 6 caracteres</span>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="botao_enviar"></label>
            <div class="col-md-8">
                <button id="botao_enviar" name="botao_enviar" class="btn btn-primary">Enviar</button>
            </div>
        </div>

    </fieldset>
</form>

```html
<form class="form-horizontal">
    <fieldset>
        <legend>Um exemplo de formulário</legend>

        <div class="form-group">
            <label class="col-md-4 control-label" for="nome">Nome</label>  
            <div class="col-md-8">
                <input id="nome" name="nome" type="text" placeholder="Antônio Vinícius" class="form-control input-md" required="">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="email">E-mail</label>  
            <div class="col-md-8">
                <input id="email" name="email" type="text" placeholder="E-mail" class="form-control input-md" required="">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="senha">Senha</label>
            <div class="col-md-8">
                <input id="senha" name="senha" type="password" placeholder="Senha" class="form-control input-md" required="">
                <span class="help-block">Mínimo de 6 caracteres</span>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="botao_enviar"></label>
            <div class="col-md-8">
                <button id="botao_enviar" name="botao_enviar" class="btn btn-primary">Enviar</button>
            </div>
        </div>

    </fieldset>
</form>
```

Em relação aos [componentes](http://getbootstrap.com/components/), posso citar como exemplos os [Glyphicons](http://getbootstrap.com/components/#glyphicons), ícones prontos para uso que acompanham o Bootstrap (são populares também os ícones da [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/), providos por terceiros), e os [alertas](http://getbootstrap.com/components/#alerts):

<div class="alert alert-info" role="alert">
    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    <span class="sr-only">Aviso:</span>
    <strong>Sem JavaScript habilitado, você não consegue utilizar o Bootstrap!</strong> Veja <a href="http://enable-javascript.com/pt/">como habilitar o JavaScript no seu navegador</a>.
</div>

```html
<div class="alert alert-info" role="alert">
    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    <span class="sr-only">Aviso:</span>
    <strong>Sem JavaScript habilitado, você não consegue utilizar o Bootstrap!</strong> Veja <a href="http://enable-javascript.com/pt/">como habilitar o JavaScript no seu navegador</a>.
</div>
```

Há ainda [outros componentes cuja utilização envolve JavaScript](http://getbootstrap.com/javascript/), a exemplo dos [diálogos](http://getbootstrap.com/javascript/#modals):

<button type="button" class="btn btn-primary btn-lg" id="meu_botao">
    Clique para exibir um exemplo de diálogo
</button>

<div class="modal fade" id="meu_dialogo" tabindex="-1" role="dialog" aria-labelledby="titulo_do_meu_dialogo">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="titulo_do_meu_dialogo">Um exemplo de diálogo</h4>
            </div>
            <div class="modal-body">
                <p>Dentro do diálogo, você pode exibir o que quiser.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="botao_ok">OK</button>
            </div>
        </div>
    </div>
</div>

```html
<button type="button" class="btn btn-primary btn-lg" id="meu_botao">
    Clique para exibir um exemplo de diálogo
</button>

<div class="modal fade" id="meu_dialogo" tabindex="-1" role="dialog" aria-labelledby="titulo_do_meu_dialogo">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="titulo_do_meu_dialogo">Um exemplo de diálogo</h4>
            </div>
            <div class="modal-body">
                <p>Dentro do diálogo, você pode exibir o que quiser.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="botao_ok">OK</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
```

```js
$(document).ready(function(){
    $('#meu_dialogo').modal({
        show: false
    });

    $('#meu_botao').click(function(event){
        event.preventDefault();
        $('#meu_dialogo').modal('show');
    });
    
    $('#botao_ok').click(function(event){
        event.preventDefault();
        $('#meu_dialogo').modal('hide');
    });
});
```

### Suporte a diversos navegadores e dispositivos

O Bootstrap suporta as versões mais recentes dos navegadores mais comuns:

- [Google Chrome](http://www.google.com.br/chrome/)
- [Mozilla Firefox](https://www.mozilla.org/pt-BR/firefox/)
- [Internet Explorer](http://windows.microsoft.com/pt-br/internet-explorer/)
- [Opera](http://www.opera.com/pt-br)
- [Safari](https://www.apple.com/br/safari/)

Assim como os dispositivos mais comuns também:

- [Android](https://www.android.com/)
- [iOS](https://www.apple.com/br/ios/what-is/)
- [Mac OS X](https://www.apple.com/br/osx/what-is/)
- [Microsoft Windows](http://www.microsoft.com/pt-br/windows)

O Bootstrap não suporta oficialmente os navegadores para [Linux](http://www.vivaolinux.com.br/linux/), mas espera-se que ele funcione bem também nesses navegadores.

Se desejar mais informações sobre a compatibilidade do Bootstrap com diversos navegadores, acesse [essa página](http://getbootstrap.com/getting-started/#support).

### Problemas

Pra não dizer que só falei em flores... vejamos alguns problemas que tive com a utilização do Bootstrap. E o mais importante: como contorná-los!

#### Internet Explorer

Oficialmente, o Bootstrap suporta o navegador Internet Explorer a partir da versão 8.

No entanto, as versões 8 e 9 do Internet Explorer não suportam alguns recursos do CSS e do HTML que o Bootstrap necessita. O contorno para esse problema já vimos: impor a utilização das bibliotecas [html5shiv](https://github.com/afarkas/html5shiv) e [Respond.js](https://github.com/scottjehl/Respond) aos visitantes que estiverem utilizando essas versões do Internet Explorer. Para isso, acrescente ao `head` da página:

```js
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
```

O [*site* do Bootstrap](http://getbootstrap.com/getting-started/#support-ie10-width) também relata a existência de um *bug* no Internet Explorer 10 para Windows 8 e Windows Phone 8 que afeta a exibição de *sites* construídos com o Bootstrap nesses sistemas operacionais. Para contorná-lo, é suficiente acrescentar os seguintes CSS e JavaScript ao *site*:

```css
@-webkit-viewport   { width: device-width; }
@-moz-viewport      { width: device-width; }
@-ms-viewport       { width: device-width; }
@-o-viewport        { width: device-width; }
@viewport           { width: device-width; }
```

```js
/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

(function () {
  'use strict';
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }
})();
```

#### Componentes de terceiros

Os estilos do Bootstrap podem afetar a exibição de componentes de terceiros no seu *site*. No meu caso, tive problemas com o [mecanismo de pesquisa personalizado do Google (*Google Custom Search Engine*)](https://cse.google.com.br/) e o [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/).

O *site* do Bootstrap mostra [algumas soluções possíveis](http://getbootstrap.com/getting-started/#third-parties). Eu resolvi meus problemas definindo uma classe `.reset-box-sizing` e aplicando essa classe às `div`s desses componentes:

```css
.reset-box-sizing,
.reset-box-sizing *,
.reset-box-sizing *:before,
.reset-box-sizing *:after {
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
}
```

### Considerações finais

Espero que este *post* tenha apresentado uma boa visão geral do potencial que o Bootstrap tem para melhorar o seu *site* ou aplicação *web*. Não tenho a intenção de esgotar o assunto aqui, até porque há muito a falar do Bootstrap. Portanto, recomendo que continue lendo o [*site* oficial do Bootstrap](http://getbootstrap.com/). Ele é realmente a melhor fonte de informações sobre o Bootstrap. Além dele, não há nada que uma busca no [Google](https://www.google.com.br) ou no [Stack Overflow](http://pt.stackoverflow.com/) não responda.

Se não quiser utilizar o tema padrão do Bootstrap, você pode encontrar bons temas, tanto pagos quanto gratuitos, nos *sites* a seguir:

- [ShapeBootstrap](https://shapebootstrap.net/) (foi nele que encontrei o [tema Xeon](https://shapebootstrap.net/item/1524966-xeon-best-onepage-site-template), que utilizo no *site* do [Portugol Online](https://vinyanalista.github.io/portugol))
- [Bootswatch](https://bootswatch.com/) (foi nele que encontrei o [tema Paper](https://bootswatch.com/paper/), que utilizo neste *site*)
- [Start Bootstrap](http://startbootstrap.com/) (já utilizei o modelo [SB Admin](http://startbootstrap.com/template-overviews/sb-admin) em um projeto, muito bom para aplicações *web*)
- [Bootstrap Zero](http://www.bootstrapzero.com/)
- [Bootplus](http://aozora.github.io/bootplus/) (uma versão modificada do Bootstrap inspirada no estilo do [Google Plus](https://plus.google.com))

<style>
.exemplo {
    margin-bottom: 10px;
}
.exemplo div {
    border: 1px solid blue;
}
</style>
<script>
    $(document).ready(function(){
        $('#botao_enviar').click(function(event){
            event.preventDefault();
        });

        $('#meu_dialogo').modal({
            show: false
        });

        $('#meu_botao').click(function(event){
            event.preventDefault();
            $('#meu_dialogo').modal('show');
        });

        $('#botao_ok').click(function(event){
            event.preventDefault();
            $('#meu_dialogo').modal('hide');
        });
    });
</script>