---
date: '2015-08-20 07:00:00 GMT-3'
layout: post
published: true
title: Como criar um tema responsivo do WordPress com o Bootstrap (parte 2)
image: /files/2015/08/wordpress-bootstrap-0.png
---

Nesse tutorial, você aprenderá a criar um tema responsivo do [WordPress](https://br.wordpress.org/) usando o [Bootstrap]({% post_url 2015-07-02-bootstrap %}). Com um tema responsivo, seu *blog* ou *site* com WordPress aparecerá bem na grande variedade de dispositivos (computadores, *smartphones* e *tablets*) e navegadores existentes.

Essa é a segunda parte do tutorial. Se você deseja acessar a primeira parte, então [clique aqui]({% post_url 2015-08-06-wordpress-bootstrap %}). Senão, continue lendo.

Assumirei que seu código está [como o deixamos no *post* anterior](https://github.com/vinyanalista/wpbootstrap/tree/af163c63bcffdfe256e66c30f3bd18b2e03fba72).

### Adicione conteúdo

Vamos continuar adicionando outras páginas ao nosso *site*. Acesse a [área administrativa](https://codex.wordpress.org/Administration_Panels) e [crie páginas](https://codex.wordpress.org/pt-br:Criando_P%C3%A1ginas) chamadas "Sobre", "Notícias" e "Contato". Por hora, você pode escrever qualquer coisa nessas páginas e depois alterá-las, se quiser. Aproveite para também [adicionar posts](https://codex.wordpress.org/pt-br:Escrevendo_Posts), dois ou três são suficientes.

### Navegação

Vamos substituir a barra de navegação estática no topo do *site* por uma que mostre as páginas que acabamos de adicionar. Localize a `div#navbar` no arquivo `header.php` e insira o seguinte código dentro dela, antes da *tag* `<form>`:

```html
<ul class="nav navbar-nav">
    <?php wp_list_pages(array('title_li' => '')); ?>
</ul>
```

Aqui, estamos utilizando a função [wp_list_pages()](https://developer.wordpress.org/reference/functions/wp_list_pages/) do WordPress para listar as páginas do nosso *site*. Ela cria um item de lista (*tag* `<li>`) e um *link* (*tag* `<a>`) para cada página.

Aproveite para remover o formulário de *login*, já que vamos fazer *login* diretamente pela área administrativa do WordPress.

O código da `div#navbar` deve estar assim:

```html
<div id="navbar" class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <?php wp_list_pages(array('title_li' => '')); ?>
    </ul>
</div><!--/.navbar-collapse -->
```

Se você acessar seu *site* agora, já deve visualizar *links* para as páginas na barra de navegação do topo, mas ainda temos trabalho a fazer.

Comece [excluindo a página](https://en.support.wordpress.com/pages/edit-pages-screen/#delete-pages) "Página de Exemplo".

Depois, mude a ordem em que as páginas aparecem na navegação. Para isso, acesse a área administrativa e vá em **Páginas**. Então, passe o *mouse* sobre a página "Sobre" e clique em "Edição rápida". Mude o valor do campo **Ordem** para 1 e clique em **Atualizar**.

{% include image.html src="/files/2015/08/wordpress-bootstrap-7.png" %}

Mude a ordem da página "Notícias" para 2 e a da página "Contato" para 3. A ordem da página "Início" deve ser mantida como 0.

Se você visitar seu *site* agora, as páginas devem ser apresentadas na ordem em que definimos.

Agora nossa navegação funciona. No entanto, ainda não com todo o estilo do Bootstrap. Se você clicar em um *link* para uma página, por exemplo, verá que ela não aparece em destaque na barra de navegação. Isso ocorre porque as classes dos elementos HTML gerados pelo WordPress nem sempre correspondem às classes oferecidas pelo Bootstrap.

Vamos copiar as regras de uma classe do Bootstrap para estilizar uma classe do WordPress. Procure no arquivo `bootstrap.css` as regras para o seletor `.navbar-inverse .navbar-nav > .active > a` (na versão 3.3.5, essas regras estão na linha 4662) e as copie para o arquivo `style.css`, aplicando-as aos seletores `.navbar-inverse .navbar-nav > .current_page_item > a` e `.navbar-inverse .navbar-nav > .current_page_parent > a`:

```css
/* lib/bootstrap/3.3.5/css/bootstrap.css, linha 4662 */
/*.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus*/
.navbar-inverse .navbar-nav > .current_page_item > a,
.navbar-inverse .navbar-nav > .current_page_item > a:hover,
.navbar-inverse .navbar-nav > .current_page_item > a:focus,
.navbar-inverse .navbar-nav > .current_page_parent > a,
.navbar-inverse .navbar-nav > .current_page_parent > a:hover,
.navbar-inverse .navbar-nav > .current_page_parent > a:focus {
    color: #fff;
    background-color: #080808;
}
```

Agora sim nossa barra de navegação está completa:

{% include image.html src="/files/2015/08/wordpress-bootstrap-8.png" %}

Vamos seguir criando *templates* diferenciados para páginas e *posts*.

### *Template* das páginas

Abra o arquivo `index.php` e salve-o como `page.php`. Assim, poupamos muita digitação.

Primeiro, vamos mudar o texto "Desculpe, não há *posts* a exibir" para "Desculpe, essa página não existe".

Em seguida, vamos criar um [*layout* de duas colunas com o Bootstrap]({% post_url 2015-07-02-bootstrap %}). Modifique o arquivo `page.php` para incluir uma `div.row` com uma `div.col-md-8` e uma `div.col-md-4`. Vamos utilizar a `div.col-md-8` para o conteúdo da página e a `div.col-md-4` para a barra lateral:

```html
<?php get_header(); ?>

<div class="row">
    <div class="col-md-8">

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <h1><?php the_title(); ?></h1>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>

        <?php endwhile; else: ?>
            <p><?php _e('Desculpe, essa página não existe.'); ?></p>
        <?php endif; ?>

    </div>
    <div class="col-md-4">
        <!-- Aqui virá a barra lateral -->
    </div>
</div>

<?php get_footer(); ?>
```

### *Template* da barra lateral

Uma vez que vamos usar a barra lateral em alguns *templates*, vamos aproveitar a função [get_sidebar()](https://developer.wordpress.org/reference/functions/get_sidebar/) do WordPress, que funciona de maneira análoga às funções [get_header()](https://developer.wordpress.org/reference/functions/get_header/) e [get_footer()](https://developer.wordpress.org/reference/functions/get_footer/).

Para isso, abra o arquivo `sidebar.php` (que até então estava vazio) e salve-o com o seguinte código:

```html
<h2>Barra lateral</h2>
```

Agora volte ao arquivo `index.php` e acrescente uma chamada à função `get_sidebar()` na `div.col-md-4`:

```html
<div class="col-md-4">
    <?php get_sidebar(); ?>
</div>
```

Se agora você acessar uma das páginas do *site*, verá que temos o título, o conteúdo e a barra lateral sendo exibidos.

Nosso *template* de páginas está muito bom! Vamos seguir para a página de notícias.

### Lista de *posts*

A página de notícias irá funcionar um pouco diferente das outras, porque ela listará as postagens, ao invés de exibir o conteúdo de uma página. Há diversas formas de listar os *posts*, mas vamos fazer algo simples.

Para começar, salve o arquivo `page.php` como `home.php`. No WordPress, o *template* `home.php` é reservado para a página que lista as postagens. No nosso caso, esse é o *template* que o WordPress utilizará para renderizar a página "Notícias".

A primeira coisa que vamos fazer é fixar no código (*hardcode*) uma *tag* `<h1>` no topo do conteúdo com o dizer "Notícias". Nossas postagens aparecerão listadas abaixo desse título:

```html
<h1>Notícias</h1>
```

Nesse *template*, o [*loop* do WordPress](https://codex.wordpress.org/pt-br:O_Loop) vai iterar por todas as postagens. Por isso, vamos utilizar uma *tag* `<h2>` para seus títulos, uma vez que já utilizamos uma *tag* `<h1>` para o título da página, assim criamos um efeito visual de hierarquia.

Também vamos utilizar uma nova função, [the_permalink()](https://developer.wordpress.org/reference/functions/the_permalink/), para criar *links* da página de listagem de notícias para as páginas das notícias em si:

```html
<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
```

Ao invés de exibir os conteúdos das notícias, vamos exibir a data em que elas foram publicadas usando a função [get_the_time()](https://developer.wordpress.org/reference/functions/get_the_time/). Ela é baseada na função [time()](http://php.net/manual/pt_BR/function.time.php) do [PHP](http://www.php.net) e nos permite exibir a data e hora no formato que desejarmos.

Para exibir a data como em "Domingo, 16 de agosto de 2015", vamos usar a função `get_the_time()` da seguinte forma (em conjunto com a função [uc_first()](http://php.net/manual/pt_BR/function.ucfirst.php) do PHP para capitalizar a primeira letra do dia da semana):

```html
<p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>
```

Adicione uma *tag* `<hr>` após a data para separar os *posts* uns dos outros e, finalmente, altere o texto que é exibido quando não há *posts* para "Desculpe, não há posts a serem exibidos".

Seu *template* `home.php` deve ficar assim:

```html
<?php get_header(); ?>

<div class="row">
    <div class="col-md-8">
        <h1>Notícias</h1>

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>
            <hr>

        <?php endwhile; else: ?>
            <p><?php _e('Desculpe, não há posts a serem exibidos.'); ?></p>
        <?php endif; ?>

    </div>
    <div class="col-md-4">
        <?php get_sidebar(); ?>
    </div>
</div>

<?php get_footer(); ?>
```

Para que a página de notícias seja exibida corretamente, volte à tela da área administrativa em que configuramos a página "Início" para ser exibida como página inicial (**Configurações** > **Leitura**). Na opção **Página de posts**, selecione a página "Notícias" e clique em **Salvar alterações**.

Agora você pode acessar a página "Notícias" em seu navegador e ver a lista dos *posts* que você criou.

### *Template* das postagens

Agora só nos resta fazer um *template*: o que exibe uma postagem. Esse *template* será bastante parecido com o utilizado para exibir páginas. Por isso, vamos começar abrindo o arquivo `page.php` e salvando-o como `single.php`. Por convenção, o WordPress utiliza o arquivo chamado `single.php` para renderizar uma postagem.

Nossa primeira alteração será incluir a data do *post* logo abaixo do título. Para isso, usaremos o mesmo código que utilizamos antes:

```html
<p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>
```

Para os visitantes do nosso *site*, a maior diferença da postagem para a página será a possibilidade de comentar. Embora a implementação dos comentários por trás dos bastidores seja bastante complexa, na verdade é muito fácil adicioná-los ao *template* graças à função [comments_template()](https://developer.wordpress.org/reference/functions/comments_template/). Basta adicioná-la após o conteúdo para permitir que nossos visitantes deixem comentários.

Por fim, adicione uma *tag* `<hr>` acima dos comentários para separá-los do conteúdo da postagem.

Seu *template* `single.php` deve ficar assim:

```html
<?php get_header(); ?>

<div class="row">
    <div class="col-md-8">

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <h1><?php the_title(); ?></h1>
            <p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
            <hr>
            <?php comments_template(); ?>

        <?php endwhile; else: ?>
            <p><?php _e('Desculpe, essa página não existe.'); ?></p>
        <?php endif; ?>

    </div>
    <div class="col-md-4">
        <?php get_sidebar(); ?>
    </div>
</div>

<?php get_footer(); ?>
```

Agora que temos todos os *templates* básicos, vamos fazer mais algumas alterações.

### Ajutes no arquivo `header.php`

O primeiro ajuste que faremos será em relação ao título da página. O título é uma parte importante da página, especialmente em relação à otimização para mecanismos de busca (mais conhecida como SEO, do inglês [*search engine optimization*](https://en.wikipedia.org/wiki/Search_engine_optimization)). O que se espera é que a *tag* `<title>` contenha não só o título da página ou postagem, mas também o nome do *site*.

Podemos obter facilmente o título da página ou postagem utilizando a função [wp_title()](https://developer.wordpress.org/reference/functions/wp_title/), que imprime o título da página ou postagem da maneira que desejamos.

O nome do *site* pode ser obtido pela função [bloginfo()](https://developer.wordpress.org/reference/functions/bloginfo/), passando como argumento a *string* `name`.

Combinando essas duas funções, podemos obter um título como "Notícias | Nome do site":

```html
<title><?php wp_title('|', true, 'right'); ?> <?php bloginfo('name'); ?></title>
```

Substitua a *tag* `<title>` no arquivo `header.php` pela apresentada acima e você perceberá que os títulos das páginas agora serão exibidos conforme o esperado.

Vamos exibir o nome do *site* também no início da barra de navegação ao topo, com um *link* que aponte para a página inicial. Para isso, localize a *tag* `a.navbar-brand` no arquivo `header.php` (deve ser a linha 36):

```html
<a class="navbar-brand" href="#">Project name</a>
```

E modifique-a para ficar assim:

```html
<a class="navbar-brand" href="<?php echo site_url(); ?>"><?php bloginfo('name'); ?></a>
```

A função [site_url()](https://developer.wordpress.org/reference/functions/site_url/) é nova, mas ela faz exatamente o que você deve ter imaginado: retornar o *link* para a página inicial do *site*.

Agora que temos um *link* para a página inicial em nossa barra de navegação, podemos remover o *link* para a página "Início". Podemos fazer isso adicionando mais uma opção na chamada à função `wp_list_pages()`, a opção `exclude`. Antes de utilizá-la, teremos que descobrir o ID da página "Início". Para isso, acesse a página pela área administrativa, como se fosse editá-la, e observe o endereço na barra de endereços do navegador:

{% include image.html src="/files/2015/08/wordpress-bootstrap-9.png" %}

Nesse exemplo, a página "Início" tem o ID igual a 4 (no seu *site* pode ser diferente). De posse desse ID, atualize a chamada à função `wp_list_pages()` para (substituindo 4 pelo ID da sua página inicial):

```php
<?php wp_list_pages(array('title_li' => '', 'exclude' => 4)); ?>
```

**Observação:** se você utilizar esse código em temas futuros, se lembre de verificar o ID da página inicial e alterar a chamada à função `wp_list_pages()` conforme necessário.

Ainda no arquivo `header.php`, vamos fazer mais uma alteração. Vamos chamar as funções do WordPress [language_attributes()](https://developer.wordpress.org/reference/functions/language_attributes/) e `bloginfo('charset')` para que as páginas do *site* sejam servidas com as configurações de [idioma](https://codex.wordpress.org/Installing_WordPress_in_Your_Language) e [codificação](https://codex.wordpress.org/Editing_wp-config.php#Database_character_set) do *site*:

```html
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
```

Se você acessar seu *site* pelo navegador e verificar o código-fonte da página, perceberá algo assim:

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
```

Agora seu arquivo `header.php` deve estar assim:

```html
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title><?php wp_title('|', true, 'right'); ?> <?php bloginfo('name'); ?></title>

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
                    <a class="navbar-brand" href="<?php echo site_url(); ?>"><?php bloginfo('name'); ?></a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <?php wp_list_pages(array('title_li' => '', 'exclude' => 4)); ?>
                    </ul>
                </div><!--/.navbar-collapse -->
            </div>
        </nav>

        <div class="container">
```

### *Widgets* na barra lateral

A última alteração no tema que faremos por hora será "*widgetizar*" nosso tema. Isso nos permitirá adicionar [*widgets* do WordPress](http://codex.wordpress.org/WordPress_Widgets) na nossa barra lateral.

Para suportar a exibição de *widgets* nas páginas, precisaremos adicionar um pouco mais de código ao arquivo `functions.php`.

Abra o arquivo `functions.php` e acrescente o seguinte código ao final do arquivo:

```php
if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'before_title' => '<h3>',
        'after_title' => '</h3>',
        'before_widget' => '<div class="row"><div class="col-md-12">',
        'after_widget' => '</div></div>',
    ));
}
```

Feito isso, volte ao arquivo `sidebar.php` e substitua o conteúdo estático pelo código que nos permitirá gerenciar os *widgets* da barra lateral pela área administrativa:

```php
<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar()): ?>
<?php endif; ?>
```

### *Download* do tema

Se você teve algum problema em seguir esse tutorial (ou é do tipo que gosta de pegar o código fácil, já pronto), você pode [conferir](https://github.com/vinyanalista/wpbootstrap/tree/f6cbd9e57e8c9c9cf97f1b50edb770f4f1f0d97f) ou [baixar](https://github.com/vinyanalista/wpbootstrap/archive/f6cbd9e57e8c9c9cf97f1b50edb770f4f1f0d97f.zip) o que fizemos até agora.

### Acabou? Ou ainda tem mais?

Parabéns! Nesse exato momento nós temos um tema simples, mas funcional, que você pode começar a personalizar adicionando seus próprios estilos e conteúdo (lembrando que os estilos são adicionados ao arquivo `styles.css`).

A partir de agora você também deve se sentir confortável em editar por conta própria os *templates* básicos que criamos nesse tutorial. Se estiver interessado, visite a lista de todas as possíveis [*tags* para *templates* do WordPress](https://codex.wordpress.org/Template_Tags) que você pode usar no seu *site*.

Se esse é o seu primeiro tema do WordPress, então você começou bem! À medida que vamos aprendendo a construir temas do WordPress, aprendemos como tornar mais e mais coisas dinâmicas e configuráveis a partir da área administrativa, ao invés de fixadas no código.

O tema que construímos até aqui é bastante semelhante ao desenvolvido a partir do tutorial original em inglês, apresentado no [Treehouse Blog](http://blog.teamtreehouse.com/responsive-wordpress-bootstrap-theme-tutorial) e que inspirou a escrita deste em português. Nosso tema difere principalmente por utilizar a versão mais recente do Bootstrap até o momento.

Farei ainda mais uma parte apresentando algumas dicas de como tornar seu tema ainda mais interessante com o Bootstrap!

Abraço a todos e até a próxima!