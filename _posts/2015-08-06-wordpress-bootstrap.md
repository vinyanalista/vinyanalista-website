---
date: '2015-08-06 02:00:00 GMT-3'
layout: post
published: true
title: Como criar um tema responsivo do WordPress com o Bootstrap
image: /files/2015/08/wordpress-bootstrap-0.png
---

Nesse tutorial, você aprenderá a criar um tema responsivo do [WordPress](https://br.wordpress.org/) usando o [Bootstrap](http://getbootstrap.com/). Com um tema responsivo, seu *blog* ou *site* com WordPress aparecerá bem na grande variedade de dispositivos (computadores, *smartphones* e *tablets*) e navegadores existentes.

O Bootstrap é um *framework* para o desenvolvimento de *sites* e aplicações *web* responsivos e foi apresentado no [*post* anterior]({% post_url 2015-07-02-bootstrap %}).

Recentemente eu desenvolvi um tema responsivo para o WordPress usando o [excelente tutorial apresentado no Treehouse Blog](http://blog.teamtreehouse.com/responsive-wordpress-bootstrap-theme-tutorial). Como aquele tutorial parecia estar desatualizado (pelo código dos exemplos, muito provavelmente eles utilizaram [uma versão anterior do Bootstrap](http://getbootstrap.com/2.3.2/)), tive a ideia de escrever uma versão atualizada e em português. Para referência, aqui utilizo o Bootstrap 3.3.5 e o WordPress 4.2.3, as versões mais recentes até o momento da escrita.

Para seguir esse tutorial, você não precisa ter experiência anterior em [desenvolver temas do WordPress](https://codex.wordpress.org/Theme_Development). No entanto, vou assumir que você já tem o mínimo de familiaridade com a ferramenta para [instalá-la](https://codex.wordpress.org/pt-br:Instalando_o_WordPress), [adicionar páginas](https://codex.wordpress.org/pt-br:Criando_Páginas) e [*posts*](https://codex.wordpress.org/pt-br:Escrevendo_Posts) e [instalar *plugins*](https://codex.wordpress.org/pt-br:Usando_Plugins) utilizando a [área administrativa](https://codex.wordpress.org/Administration_Panels).

O tema que vamos construir será baseado no [exemplo Jumbotron](http://getbootstrap.com/examples/jumbotron/) (antigamente chamado de [Basic marketing site](http://getbootstrap.com/2.3.2/examples/hero.html)) disponível na [página de exemplos do Bootstrap](http://getbootstrap.com/getting-started/#examples) e contará com as seguintes páginas e funcionalidades:

- Página inicial personalizada
- Página Sobre
- Página Notícias, com comentários
- Página Contato
- Uma barra lateral com *widgets*

### Requisitos

Antes de começarmos a desenvolver o tema propriamente dito, você precisa baixar e instalar o [WordPress](https://br.wordpress.org/). Para o desenvolvimento, recomendo um servidor *web* como o [XAMPP](https://www.apachefriends.org/pt_br/) e um ambiente de desenvolvimento integrado como o [Aptana Studio](http://www.aptana.com/).

Em nosso tema, utilizaremos o Bootstrap a partir de uma [CDN (*Content Delivery Network*)](http://www.baboo.com.br/internet/entenda-o-que-e-cdn-ou-content-delivery-network/). No entanto, você pode [baixar o Bootstrap](http://getbootstrap.com/getting-started/#download) se desejar servi-lo com seu *site*.

Se for desenvolver esse tema utilizando um *site* do WordPress que já está no ar, recomendo que você utilize o [*plugin* Theme Test Drive para WordPress](https://wordpress.org/plugins/theme-test-drive/) para que seus visitantes não vejam o tema enquanto desenvolve. 

### Começando

Abra a pasta onde instalou o WordPress e navegue para a pasta `wp-content/themes`. É nessa pasta onde ficam armazenados os [temas do WordPress](https://codex.wordpress.org/pt-br:Usando_Temas). Se você acabou de instalar o WordPress, verá apenas os temas padrão: [Twenty Fifteen](https://wordpress.org/themes/twentyfifteen/), [Twenty Fourteen](https://wordpress.org/themes/twentyfourteen/) e [Twenty Thirteen](https://wordpress.org/themes/twentythirteen/), cada um em sua pasta.

```
$ cd wordpress
$ cd wp-content/themes
$ ls
index.php  twentyfifteen  twentyfourteen  twentythirteen
```

Vamos criar uma pasta para o nosso tema, chamada `wpbootstrap`.

```
$ mkdir wpbootstrap
$ cd wpbootstrap
```

Se você optou por baixar o Bootstrap, recomendo adicioná-lo a essa pasta agora. Eu recomendo criar uma pasta `lib` e colocá-lo dentro de `lib/bootstrap/3.3.5`, acredito que assim fica mais organizado.

```
$ mkdir -p lib/bootstrap/
$ unzip ~/Downloads/bootstrap-3.3.5-dist.zip -d lib/bootstrap/
$ mv lib/bootstrap/bootstrap-3.3.5-dist lib/bootstrap/3.3.5
```

Dentro da pasta `wpbootstrap`, crie um novo arquivo de texto chamado `index.php`:

```
$ touch index.php
```

Agora vamos copiar o código-fonte do [exemplo Jumbotron](http://getbootstrap.com/examples/jumbotron/) e colá-lo no arquivo `index.php`, fazendo algumas modificações para funcionar com o nosso exemplo. Você também pode ver o arquivo [aqui](https://github.com/vinyanalista/wpbootstrap/blob/67abfbb04f00aa35c03a0e7f7649226bf8af56c7/index.php) e as alterações destacadas [aqui](https://github.com/vinyanalista/wpbootstrap/commit/67abfbb04f00aa35c03a0e7f7649226bf8af56c7).

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Jumbotron Template for Bootstrap</title>

        <!-- Bootstrap core CSS -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <style type="text/css">
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Project name</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                            <input type="text" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-success">Sign in</button>
                    </form>
                </div><!--/.navbar-collapse -->
            </div>
        </nav>

        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <div class="container">
                <h1>Hello, world!</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
            </div>
        </div>

        <div class="container">
            <!-- Example row of columns -->
            <div class="row">
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>

            <hr>

            <footer>
                <p>&copy; Company 2014</p>
            </footer>
        </div> <!-- /container -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </body>
</html>
```

Agora que nós temos uma página de HTML estático, vamos seguir em frente e criar a folha de estilos do tema, o arquivo `style.css`. O WordPress [requer](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet) que esse arquivo tenha exatamente esse nome e também apresente um comentário com informações específicas no seu início. Ele usa as informações contidas nesse comentário para apresentar o tema na tela de seleção de tema (**Aparência** > **Temas**).

Na pasta do tema, a mesma onde está o arquivo `index.php`, crie um novo arquivo chamado `style.css` com o seguinte conteúdo:

```css
/*
Theme Name: WP Bootstrap
Theme URI: https://vinyanalista.github.io/blog/2015/08/06/wordpress-bootstrap/
Description: Tema criado para o tutorial <a href="https://vinyanalista.github.io/blog/2015/08/06/wordpress-bootstrap/">Como criar um tema responsivo do WordPress com o Bootstrap</a>.
Author: Antônio Vinícius Menezes Medeiros
Author URI: https://vinyanalista.github.io/
Version: 1.0
Tags: responsive, white, bootstrap

License: Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
License URI: http://creativecommons.org/licenses/by-sa/3.0/

Este tema simples foi criado usando o exemplo Jumbotron encontrado no site do Bootstrap http://getbootstrap.com/examples/jumbotron/
*/
```

A última coisa que precisamos fazer para que possamos selecionar e utilizar nosso tema é atribuir-lhe uma imagem. O WordPress [requer](https://codex.wordpress.org/Theme_Development#Screenshot) que essa imagem seja chamada `screenshot.png` (na verdade, os formatos `.jpg`, `.jpeg` e `.gif` também são suportados, embora não recomendados) e apresente resolução mínima de 387x290, sendo que o recomendado é 880x660 (aspecto 4:3). Você pode utilizar [esta imagem](https://raw.githubusercontent.com/vinyanalista/wpbootstrap/22981ee4247c8a4656fab44a38e9da94b6b51913/screenshot.png) ou outra de sua preferência:

{% include image.html src="/files/2015/08/wordpress-bootstrap-1.png" %}

Salve essa imagem com o nome de `screenshot.png` na mesma pasta dos arquivos `index.php` e `style.css`.

Agora estamos prontos para entrar na área de administração do WordPress e [selecionar nosso tema](https://codex.wordpress.org/Using_Themes/Theme_List#Selecting_the_Active_Theme). Entre na área administrativa e vá em **Aparência** > **Temas**. Você deve ver o nosso tema na lista de temas disponíveis:

{% include image.html src="/files/2015/08/wordpress-bootstrap-2.png" %}

Clique no botão **Ativar** no tema **WP Bootstrap** (lembre-se de utilizar o [*plugin* Theme Test Drive](https://wordpress.org/plugins/theme-test-drive/) se estiver desenvolvendo o tema usando um *site* que já está no ar).

Uma vez com o tema ativado, visite seu *site* no navegador e verá algo como isso:

{% include image.html src="/files/2015/08/wordpress-bootstrap-3.png" %}

Agora vamos começar a transformar essa página estática em um verdadeiro tema do WordPress.

### Transformando o *template* do Bootstrap em um tema do WordPress

A maioria dos [temas do WordPress](https://wordpress.org/themes/) inclui os seguintes arquivos:

- `index.php`
- `style.css`
- `header.php`
- `footer.php`
- `sidebar.php`

Normalmente eles possuem [outros arquivos](https://codex.wordpress.org/Theme_Development#Template_Files_List) além desses, mas vamos começar com esses e depois então acrescentar outros.

Crie novos arquivos de texto chamados `header.php`, `footer.php` e `sidebar.php`.

```
$ touch header.php footer.php sidebar.php
```

O que vamos fazer agora é mover todo o código HTML que será incluído no topo de todas as páginas para o arquivo `header.php`. Mova todo o código acima da `div.jumbotron` (ou seja, até a *tag* `</nav>`, linhas 1 a 56) para o arquivo `header.php` (em breve mostrarei como ficará esse arquivo ao final, mas por hora ele deve estar [assim](https://github.com/vinyanalista/wpbootstrap/blob/e79bda907e7e5703ea4bb4d5c44810f3e855d655/header.php)).

Depois, de maneira análoga, moveremos todo o código HTML que será incluído ao final de todas as páginas para o arquivo `footer.php`. Mova todo o código a partir da *tag* `<hr>` (incluindo esta, linhas 87 a 101) para o arquivo `footer.php` (também mostrarei em breve esse arquivo, mas por hora ele deve estar [assim](https://github.com/vinyanalista/wpbootstrap/blob/e79bda907e7e5703ea4bb4d5c44810f3e855d655/footer.php)).

Agora vamos utilizar nossas primeiras [*tags* do WordPress](https://developer.wordpress.org/reference/functions/) para incluir os códigos HTML presentes nos arquivos `header.php` e `footer.php` no arquivo `index.php`.

As duas *tags* que vamos utilizar são [get_header()](https://developer.wordpress.org/reference/functions/get_header/) e [get_footer()](https://developer.wordpress.org/reference/functions/get_footer/). Essas são funções que já vêm com o WordPress e inserem os conteúdos dos arquivos `header.php` e `footer.php` onde são invocadas. O WordPress é capaz de fazer isso porque nomeamos nossos arquivos seguindo suas convenções (`header.php` e `footer.php`). Se eles tivessem nomes diferentes (por exemplo, `topo.php` e `rodape.php`), essas funções não funcionariam.

Insira `<?php get_header(); ?>` no início do arquivo `index.php` (antes de todo o código) e `<?php get_footer(); ?>` no final do arquivo `index.php` (após todo o código).

Seu arquivo `index.php` deve estar [assim](https://github.com/vinyanalista/wpbootstrap/blob/e79bda907e7e5703ea4bb4d5c44810f3e855d655/index.php):

```html
<?php get_header(); ?>
        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <div class="container">
                <h1>Hello, world!</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
            </div>
        </div>

        <div class="container">
            <!-- Example row of columns -->
            <div class="row">
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>
<?php get_footer(); ?>
```

Você deve estar se perguntando porque fizemos isso. O motivo é simples: depois vamos criar várias páginas nas quais desejamos incluir os códigos HTML do topo e do rodapé. Se nós deixássemos esses códigos em todas as páginas e no futuro desejássemos realizar alguma mudança, então teríamos que replicar essa mudança em todas as páginas. Da maneira como vamos fazer, podemos mudar o código do topo da página ou do rodapé em apenas um arquivo, e todas as demais páginas que utilizam esses arquivos receberão as mudanças. Isso é bastante semelhante ao benefício que se obtém ao referenciar um arquivo CSS em todas as páginas ao invés de incluir todas as regras CSS no cabeçalho.

Aliás, falando em CSS, vamos fazer exatamente isso. Localize a parte do arquivo `header.php` que contém as regras e referências às folhas de estilos (linhas 13 a 22):

```html
<!-- Bootstrap core CSS -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

<!-- Custom styles for this template -->
<style type="text/css">
    body {
        padding-top: 50px;
        padding-bottom: 20px;
    }
</style>
```

Substitua essa parte por isso:

```html
<!-- CSS -->
<link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">
```

Então, adicione o seguinte ao final do arquivo `style.css` (ele deve ficar [assim](https://github.com/vinyanalista/wpbootstrap/blob/62fcfaaf27bfaf96510cf53e4a0f8d92b420ac92/style.css)):

```css
/* Bootstrap core CSS */

/* Se preferir utilizar a própria cópia do Bootstrap, descomente a linha a seguir e comente a próxima */
/*@import url('lib/bootstrap/3.3.5/css/bootstrap.min.css');*/
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');

/* Custom styles for this template */

body { 
    padding-top: 60px; 
    padding-bottom: 40px; 
}
```

O que fizemos aqui foi utilizar uma *tag* do WordPress para automaticamente referenciar o estilo do nosso tema em todas as páginas (já adianto que você verá neste tutorial chamadas à função [bloginfo()](https://developer.wordpress.org/reference/functions/bloginfo/) serem utilizadas das mais diversas formas). Depois, no arquivo `styles.css`, utilizamos a *tag* `@import` para referenciar o arquivo CSS do Bootstrap a partir do estilo do nosso tema.

Antes de passar para o arquivo `footer.php`, vamos fazer mais uma mudança no arquivo `header.php`: insira a *tag* `<?php wp_head(); ?>` imediatamente antes da *tag* `</head>`.

Seu arquivo `header.php` deve ficar [assim](https://github.com/vinyanalista/wpbootstrap/blob/62fcfaaf27bfaf96510cf53e4a0f8d92b420ac92/header.php):

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Jumbotron Template for Bootstrap</title>

        <!-- CSS -->
        <link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
        <?php wp_head(); ?>
    </head>

    <body>

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Project name</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                            <input type="text" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-success">Sign in</button>
                    </form>
                </div><!--/.navbar-collapse -->
            </div>
        </nav>
```

A função [wp_head()](https://developer.wordpress.org/reference/functions/wp_head/) permite que o WordPress insira mais elementos ao cabeçalho da página, como arquivos JavaScript ou CSS requisitados pelo tema ou pelos *plugins*. Se não incluíssemos essa *tag* no nosso tema, alguns *plugins* poderiam não funcionar.

Agora vamos seguir em frente e fazer uma limpeza no arquivo `footer.php`. O exemplo do Bootstrap utiliza alguns arquivos JavaScript. Vamos referenciá-los da [maneira recomendada pelo WordPress](https://codex.wordpress.org/Using_Javascript#JavaScript_in_Template_Files), removendo-os desse arquivo e trazendo-os para o cabeçalho da página. Vamos fazer com que nosso tema os insira na página através da função `wp_head()`.

Para fazer isso, vamos criar um novo arquivo chamado [functions.php](https://codex.wordpress.org/Functions_File_Explained) e carregar nosso JavaScript dele. Pode parecer trabalho extra para carregar um arquivo JavaScript, mas à medida em que seus temas se tornarem mais complexos esse hábito ajudará a mantê-los limpos e organizados.

Na mesma pasta do arquivo `footer.php`, crie e abra um arquivo de texto chamado `functions.php`. Copie para ele o seguinte [código-fonte](https://github.com/vinyanalista/wpbootstrap/blob/1cb8d07c31a0c3d9303db30f0552e9e932eb7ca6/functions.php):

```php
<?php
function scripts_do_template() {
    // Bootstrap core JavaScript
    // Se preferir utilizar a própria cópia do Bootstrap, descomente a linha a seguir e comente a próxima
    //wp_register_script('bootstrap', get_template_directory_uri().'/lib/bootstrap/3.3.5/js/bootstrap.min.js', array('jquery'));
    wp_register_script('bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', array('jquery'));

    wp_enqueue_script('jquery');
    wp_enqueue_script('bootstrap');
}

add_action('wp_enqueue_scripts', 'scripts_do_template');
?>
```

Aqui utilizamos uma chamada à função [wp_register_script()](https://developer.wordpress.org/reference/functions/wp_register_script/) para apresentar ao WordPress um novo *script*, que será incluído posteriormente na página com uma chamada à função [wp_enqueue_script()](https://developer.wordpress.org/reference/functions/wp_enqueue_script/).

Observe que nos preocupamos em registrar apenas o Bootstrap. A biblioteca [jQuery](https://jquery.com/), um [requisito para o Bootstrap]({% post_url 2015-07-02-bootstrap %}), [acompanha o WordPress](https://codex.wordpress.org/Function_Reference/wp_enqueue_script#Default_Scripts_Included_and_Registered_by_WordPress), de modo que não precisamos registra-la, apenas inclui-la.

Por fim, com a chamada à função [add_action()](https://developer.wordpress.org/reference/functions/add_action/), determinamos que a nossa função `scripts_do_template()` implementa a ação [wp_enqueue_scripts](https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/), invocada pelo WordPress no momento de enfileirar o *scripts* para renderização.

Vamos agora adicionar ao rodapé a *tag* [wp_footer()](https://developer.wordpress.org/reference/functions/wp_footer/), que funciona de maneira análoga à `wp_head()`. No arquivo `footer.php`, remova as referências às bibliotecas JavaScript (linhas 9 a 13) e insira a *tag* `<?php wp_head(); ?>` imediatamente antes da *tag* `</body>`.

Seu arquivo `footer.php` deve ficar [assim](https://github.com/vinyanalista/wpbootstrap/blob/1cb8d07c31a0c3d9303db30f0552e9e932eb7ca6/footer.php):

```html
            <hr>

            <footer>
                <p>&copy; Company 2014</p>
            </footer>
        </div> <!-- /container -->

        <?php wp_footer(); ?>
    </body>
</html>
```

Por último, vamos rever nossos arquivos `header.php`, `index.php` e `footer.php` de modo que tenhamos uma `div.container` em volta do conteúdo, [como manda o Bootstrap]({% post_url 2015-07-02-bootstrap %}). Ao final, eles devem ficar assim (você pode ver as mudanças destacadas [aqui](https://github.com/vinyanalista/wpbootstrap/commit/c5c456b119200ce82b6ce6d5b56b6be9ae05bb0b)):

- `header.php`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Jumbotron Template for Bootstrap</title>

        <!-- CSS -->
        <link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
        <?php wp_head(); ?>
    </head>

    <body>

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Project name</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                            <input type="text" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-success">Sign in</button>
                    </form>
                </div><!--/.navbar-collapse -->
            </div>
        </nav>

        <div class="container">
```

- `index.php`

```html
<?php get_header(); ?>
            <!-- Main jumbotron for a primary marketing message or call to action -->
            <div class="jumbotron">
                <h1>Hello, world!</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
            </div>

            <!-- Example row of columns -->
            <div class="row">
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>
<?php get_footer(); ?>
```

- `footer.php`

```html
            <hr>

            <footer>
                <p>&copy; Company 2014</p>
            </footer>
        </div> <!-- /container -->

        <?php wp_footer(); ?>
    </body>
</html>
```

Para testar se os arquivos CSS e JS estão sendo carregados adequadamente, abra seu *site* no navegador e redimensione a tela de modo a parecer um *tablet* ou *smartphone*. Clique no menu *dropdown* e ele deve aparecer assim:

{% include image.html src="/files/2015/08/wordpress-bootstrap-4.png" %}

Se esse menu não estiver funcionando, significa que algo deu errado na hora de referenciar algum arquivo. Certifique-se de que os arquivos estão nos locais corretos e que seu código está correto. Afinal de contas, você não deseja que seu *site* responsivo não funcione nos *smartphones* e *tablets*, não é mesmo?

Se desejar, pode conferir como estamos até agora, clicando [aqui](https://github.com/vinyanalista/wpbootstrap/tree/c5c456b119200ce82b6ce6d5b56b6be9ae05bb0b).

### Criando a página inicial do *site*

Agora que nós temos nosso tema minimamente configurado, vamos torná-lo realmente dinâmico criando uma página inicial no WordPress e exibindo seu conteúdo no nosso *site*, ao invés do conteúdo estático que temos agora, fixo no código (*hardcoded*).

Para isso, acesse a área administrativa do WordPress e vá em **Páginas** > **Adicionar Nova**. Chame a página de "Início". Clique na aba **Texto** acima do editor e mova o código HTML do arquivo `index.php` (isso não inclui as *tags* PHP) para o editor.

O código da sua página deve parecer com este:

```html
<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="jumbotron">
    <h1>Hello, world!</h1>
    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
    <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
</div>

<!-- Example row of columns -->
<div class="row">
    <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
    </div>
    <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
    </div>
    <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
    </div>
</div>
```

Agora, seu arquivo `index.php` deve conter apenas as chamadas para o topo e o rodapé:

```php
<?php get_header(); ?>

<?php get_footer(); ?>
```

Finalmente, clique em **Publicar**.

Para incluir o conteúdo da página que criamos agora no nosso tema dinamicamente, vamos usar a função provavelmente mais famosa do WordPress, chamada *loop* (laço).

O [*loop* do WordPress](https://codex.wordpress.org/pt-br:O_Loop) faz exatamente o que parece. Ele itera pelas páginas ou *posts* a serem exibidos e obtém seus títulos e conteúdos, assim como várias outras informações, como a data de publicação e o autor, e até mesmo os comentários, se houver.

Modifique seu arquivo `index.php` para realizar o *loop* entre as chamadas às funções `get_header()` e `get_footer()`:

```html
<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <h1><?php the_title(); ?></h1>
    <div class="entry-content">
        <?php the_content(); ?>
    </div>

<?php endwhile; else: ?>
    <p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
<?php endif; ?>

<?php get_footer(); ?>
```

Aqui basicamente verificamos se há *posts* ou páginas a serem exibidos com a função [have_posts()](https://developer.wordpress.org/reference/functions/have_posts/). Se não há nada a exibir, mostramos para o visitante uma mensagem de erro ([_e()](https://developer.wordpress.org/reference/functions/_e/)). Porém, se há *posts* ou páginas a exibir, e enquanto houver, obtemos um desses *posts* ou páginas ([the_post()](https://developer.wordpress.org/reference/functions/the_post/)) e exibimos seu título ([the_title()](https://developer.wordpress.org/reference/functions/the_title/)) e conteúdo ([the_content()](https://developer.wordpress.org/reference/functions/the_content/)).

Antes de testarmos nossa página inicial no navegador, vamos modificar uma configuração no WordPress para exibir a página que criamos como página inicial, ao invés das postagens mais recentes. Para isso, acesse a área administrativa e vá em **Configurações** > **Leitura** e na opção **A página inicial mostra** selecione **Uma página estática**. Em seguida, em **Página inicial**, selecione a página "Início":

{% include image.html src="/files/2015/08/wordpress-bootstrap-5.png" %}

Clique em **Salvar alterações** e acesse o *site*. Você deve ver o conteúdo da página que criamos na área administrativa.

O WordPress nos permite usar um arquivo dedicado a renderizar especificamente a página inicial do *site*, chamado `front-page.php`. Salve o arquivo `index.php` como `front-page.php` e remova a chamada à função `get_title()`, uma vez que não desejamos a palavra "Início" aparecendo no topo da página.

Seu arquivo `front-page.php` deve estar [assim](https://github.com/vinyanalista/wpbootstrap/blob/af163c63bcffdfe256e66c30f3bd18b2e03fba72/front-page.php):

```html
<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <div class="entry-content">
        <?php the_content(); ?>
    </div>

<?php endwhile; else: ?>
    <p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
<?php endif; ?>

<?php get_footer(); ?>
```

Pode deixar o arquivo `index.php` [como está](https://github.com/vinyanalista/wpbootstrap/blob/af163c63bcffdfe256e66c30f3bd18b2e03fba72/index.php).

Para provar que tudo está realmente funcionando, vamos editar a página inicial pela área administrativa do WordPress e ver o conteúdo atualizado no navegador. Acesse a área administrativa e edite a página "Início". Faça alguma alteração na página ou substitua o conteúdo por outro de sua preferência e salve as alterações.

Agora, visite o *site*. Você perceberá as alterações que fez no editor.

{% include image.html src="/files/2015/08/wordpress-bootstrap-6.png" %}

### Continua...

Gostou? Está começando a funcionar? Como esse tutorial é muito grande, decidi dividi-lo em partes. Não deixe de acompanhar o *blog* para ver as próximas partes!

Se você teve problemas em seguir o tutorial, pode verificar o que fizemos até agora [aqui](https://github.com/vinyanalista/wpbootstrap/tree/af163c63bcffdfe256e66c30f3bd18b2e03fba72). Também pode deixar sua dúvida nos comentários.

Abraço e até a próxima!