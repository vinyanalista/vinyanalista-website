---
date: '2015-08-19 09:30:00 GMT-3'
layout: post
published: true
title: Como realçar links externos e abri-los em uma nova janela
image: /files/2015/08/links-externos.png
---

Você já reparou que na [Wikipédia](https://pt.wikipedia.org/) todos os *links* para outras páginas aparecem destacados? Em alguns *sites*, a exemplo do [Facebook](https://pt-br.facebook.com/), esses *links* são abertos sempre em novas janelas. Nessa dica breve, você aprenderá como tratar os *links* externos dessa maneira no seu *site*.

<!--more-->

[Milan Aryal em seu *blog*](http://milanaryal.com/2015/making-external-links-open-in-a-new-browser-tab/) mostra diversas maneiras de conseguir isso: HTML, JS, jQuery, CSS... aqui vou mostrar [como fiz](https://github.com/vinyanalista/vinyanalista-website/commit/706b8b9ec3cf8089f66afbeff771bb6fa2892e3a) neste *site*.

Meu *site* utiliza [jQuery](https://jquery.com/) e [Bootstrap](http://getbootstrap.com/) (veja o [*post* sobre Bootstrap]({% post_url 2015-07-02-bootstrap %})). Eu simplesmente adicionei as seguintes linhas de código ao arquivo JavaScript que é carregado em todas as páginas do *site*:

```js
$('div.blog-post a').filter(function() {
    return (this.hostname && (this.hostname != location.hostname));
}).append(' <span class="glyphicon glyphicon-new-window"></span>').attr('target', '_blank')
```

O que esse código basicamente faz é:

1. Usando jQuery, ele [seleciona](https://api.jquery.com/category/selectors/) todos os *links* da postagem (eu não trato *links* na barra lateral, por exemplo);
2. [Filtra](https://api.jquery.com/filter/) os *links* que apontam para *sites* diferentes do meu;
3. [Adiciona ao final](https://api.jquery.com/append/) do *link* (imediatamente antes da *tag* `</a>`) esse ícone <span class="glyphicon glyphicon-new-window"></span> do [Glyphicons](http://getbootstrap.com/components/#glyphicons), que acompanha o Bootstrap; e
4. [Define o valor do atributo](https://api.jquery.com/attr/) `target` para `_blank`, fazendo com que esses *links* sejam abertos em novas janelas (ou abas, a depender do navegador).

Se você utiliza os ícones da [Font Awesome](https://fortawesome.github.io/Font-Awesome/icons/), o código é bem parecido, só muda a classe da *tag* `<span>`:

```js
$('div.blog-post a').filter(function() {
    return (this.hostname && (this.hostname != location.hostname));
}).append(' <span class="fa fa-external-link"></span>').attr('target', '_blank')
```

Se você não utiliza Glyphicons nem Font Awesome, ainda assim pode usar jQuery, CSS e um pequeno ícone (uma imagem de 16 x 16, por exemplo, [no Google você encontra várias](https://www.google.com/search?q=external+link&tbm=isch&tbs=isz:ex,iszw:16,iszh:16)) para conseguir o mesmo efeito.

Adicione a seguinte regra ao estilo do seu *site* (no exemplo, a imagem se chama `link_externo.png`):

```css
a.externo {
    background: url("link_externo.png") no-repeat scroll right center transparent;
    padding-right: 20px;
}
```

Via jQuery, [adicione a classe](https://api.jquery.com/addclass/) `externo` aos *links* externos:

```js
$('div.blog-post a').filter(function() {
    return (this.hostname && (this.hostname != location.hostname));
}).addClass('externo').attr('target', '_blank')
```

Pronto! A partir de agora, a imagem `link_externo.png` deve ser exibida à direita dos seus *links* externos e esses devem ser abertos em uma nova janela (ou aba).

Não vou explorar aqui todas as possibilidades. Já expus o que eu fiz e mais duas alternativas. Se nenhuma delas atende às suas necessidades, você pode tentar alguma das várias apresentadas [nesse *post* muito interessante do Milan Aryal](http://milanaryal.com/2015/making-external-links-open-in-a-new-browser-tab/) ou [nessa página do CSS-Tricks](https://css-tricks.com/snippets/jquery/open-external-links-in-new-window/). Esse *site* tem [outra página](https://css-tricks.com/snippets/jquery/target-only-external-links/) na qual ainda mais opções são apresentadas.

### Pra não dizer que só falei de flores

Vale observar que, de acordo com a maioria dos especialistas em usabilidade, abrir *links* em uma nova janela (ou aba) do navegador não é considerada uma boa prática.

> Evite abrir várias janelas do navegador, se possível — impedir que os usuários utilizem o botão "Voltar" pode tornar suas experiências tão difíceis que normalmente não compensa qualquer benefício que você tente oferecer. Uma teoria comum a favor de abrir uma segunda janela é evitar que os usuários deixem seu *site*, mas ironicamente isso pode ter justamente o efeito oposto impedindo-os de voltar quando eles querem.

> *[Second browser windows](http://www.snyderconsulting.net/article_7tricks.htm#7), Seven tricks that Web users don't know*

Portanto, usemos com bom senso!