---
date: '2019-09-27 22:00:00 GMT-3'
layout: post
published: true
title: 'Bom senso na web: tratando imagens para publicação em sites'
image: '/files/2019/09/famdetodos-01.jpg'
---

Eu fico indignado com páginas que demoram pra carregar devido ao tamanho das imagens. Não o tamanho que elas aparentam ter na página, mas o tamanho que elas realmente tem: muitas vezes na página a imagem ocupa um espaço pequeno, mas como é inserida grande do jeito que veio da câmera ou do profissional que fez a arte digital, acaba sendo um arquivo pesado que soma no tempo de carregamento da página.

Além de ficar mais tempo que o necessário esperando pelo carregamento da página, o visitante pode ter sua franquia de dados desperdiçada. Imagine você visitando uma página usando o celular consumir 1MB da sua franquia de dados apenas com uma imagem miudinha numa página!

Outra situação: já recebeu um _e-mail_ que é um informativo ou propaganda e não tem texto, todo o corpo do _e-mail_ é apenas uma imagem? Se essa imagem é desnecessariamente grande, pode lotar sua caixa de entrada e impedir que você receba novos _e-mails_.

Por isso, seja você um blogueiro, um fotógrafo, um profissional de TI ou da comunicação ou qualquer outro tipo de pessoa que publica imagens em _sites_ ou envia imagens por _e-mail_, eu venho aqui hoje te dar dicas de como tratar imagens para publicação na Internet.

## Um (mau) exemplo

Essa semana eu estava vendo a programação do [festival Florianópolis Audiovisual Mercosul (FAM)][fam], quando percebi que as páginas do _site_ demoravam pra carregar. Ele era tão pesado que o navegador chegava a travar, era difícil até rolar a página pra cima ou pra baixo.

Então me dei conta que o motivo da lentidão eram as imagens, que demoravam pra carregar:

{% include image.html src="/files/2019/09/famdetodos-01.jpg" %}

Eis que decidi abrir uma imagem em uma nova guia, de curiosidade:

{% include image.html src="/files/2019/09/famdetodos-02.jpg" caption="Página: [http://www.famdetodos.com.br/programacao/26](http://www.famdetodos.com.br/programacao/26)" %}

Olha o tamanho da imagem original:

{% include image.html src="/files/2019/09/famdetodos-03.jpg" %}

Isso mesmo, pasme: 5616 x 3744 _pixels_!

Uma tela de 4K não seria suficiente pra exibir essa imagem com toda a sua qualidade.

Quem sabe eu poderia baixar essa imagem, mandar fazer um _outdoor_ e colocar na rua.

Na página, a imagem aparece com o tamanho de 253 x 168 _pixels_. Ela é reduzida 22 vezes! Então, pra quê usar o arquivo original? Por que não reduzir a imagem para um tamanho mais apropriado?

Agora o tamanho em _bytes_: são 868,9 kB em uma única imagem!

Sabe o Prezão da Claro com franquia diária de 100 MB? Aquele que a Anitta faz propaganda?

{% include image.html src="/files/2019/09/prezao.jpg" %}

Nesse ritmo, não daria pra ver a sinopse dos 121 filmes da programação em um dia só...

Aliás, a página inicial do _site_ levou 2 minutos pra carregar no meu _notebook_, em uma conexão com largura de banda de 35 Mb/s! Ao todo, foram 18,8 MB transferidos:

{% include image.html src="/files/2019/09/famdetodos-04.jpg" caption="Página: [http://www.famdetodos.com.br/](http://www.famdetodos.com.br/)" %}

Só pra "pisar o pé" nesse _site_, você já queimaria 20% da franquia do seu prezão...

Bom, a bronca foi dada. Por favor, não façam isso. Agora vamos às boas práticas.

## Use um programa apropriado

Vários programas de edição de imagens podem ser usados para tratar imagens antes de publicá-las no seu _site_. Dois exemplos mais profissionais são o famigerado [Photoshop] (pago) e o [GIMP] (gratuito, [_software_ livre][software-livre]).

Eu, particularmente, gosto de usar o [IrfanView]: gratuito (_[freeware]_), leve, simples, fácil de usar, apresenta várias funcionalidades e deve ser mais que suficiente para a maioria das pessoas. Funciona no [Windows] e também no [Linux] (usando [Wine]).

Já falei sobre ele aqui, em outro _post_, que você pode ler depois:

- [Dicas para bater bons prints][dicas-prints]

Para baixar o IrfanView, clique nos _links_ a seguir:

- [Instalador do IrfanView][instalador]
- [Instalador dos _plugins_ do IrfanView][plugins]
- [Instalador da tradução do IrfanView][traducao]

Para referência futura, aqui uso a versão 4.53 de 64 _bits_, a mais atual no momento da escrita.

Caso você precise da versão de 32 _bits_ (para computadores mais antigos) ou caso os _links_ quebrem (o que pode acontecer no futuro), baixe o IrfanView do seu _site_ oficial:

[https://www.irfanview.com/](https://www.irfanview.com/)

## Redimensionando as imagens

A resolução do meu _notebook_ é 1366 x 768 _pixels_, a segunda resolução de tela mais comum no mundo hoje em dia, segundo o serviço [StatCounter].

A menos que você tenha um bom motivo (por exemplo, você está compartilhando um papel de parede), não é razoável inserir qualquer imagem maior que isso em uma página da _web_.

A resolução de tela mais comum é 360 x 640 (_smartphone_ na orientação vertical). Mais um motivo para que as imagens não sejam desnecessariamente grandes.

Abra com o IrfanView a imagem que deseja tratar. Como exemplo, vou usar aquela imagem grande.

Para redimensioná-la, abra o menu **Imagem** (_Image_) e clique na opção **Redimensionar/Reamostrar** (_Resize/Resample_), ou, se preferir, tecle **Ctrl + F**:

{% include image.html src="/files/2019/09/redimensionar-01.jpg" %}

Para não distorcer a imagem ao redimensionar, certifique-se de que a opção **Manter proporções** (_Preserve aspect ratio_) esteja marcada:

{% include image.html src="/files/2019/09/redimensionar-02.jpg" %}

Selecione a opção **Definir novo tamanho** (_Set new size_) e informe, usando os campos **Largura** (_Width_) ou **Altura** (_Height_) as dimensões desejadas. Note que, ao mudar uma dimensão, o IrfanView automaticamente calcula a outra para que não haja distorção.

Como na página ela aparece com o tamanho de 253 x 168 _pixels_, eu poderia informar esse tamanho aqui. Mas vou informar um tamanho um pouco maior, pro caso de o visitante querer abrir a imagem em uma nova aba e vê-la maior: 640 x 427 _pixels_.

Quando terminar, clique em **OK**.

## Salvando com compressão

Já falamos do tamanho em _pixels_, que reduzimos redimensionando a imagem, agora vamos falar do tamanho em _bytes_, que reduzimos usando compressão.

Os formatos de imagem mais apropriados pra _web_ e que suportam compressão são:

- [JPEG] ou JPG: comumente usado com fotos;
- [GIF]\: geralmente usado com imagens pequenas que não precisam de grande qualidade (como _emoticons_), suporta animação e transparência; e
- [PNG]\: um meio termo, que suporta transparência, como o GIF, mas pode atingir maior qualidade, como o JPEG.

O melhor formato vai variar de caso a caso. Eu costumo testar os formatos e selecionar o que gera a imagem com menor tamanho. Pros tipos de imagem que eu costumo tratar (capturas de tela, fotos, artes), normalmente eu acabo usando o JPEG, às vezes o PNG.

Observe que a compressão tem um preço: para reduzir o tamanho do arquivo, a qualidade da imagem é reduzida. Seu objetivo é tentar achar o melhor custo-benefício entre arquivo pequeno e boa qualidade.

Para salvar a imagem em um formato apropriado pra _web_ usando compressão, abra o menu **Arquivo** (_File_) e clique na opção **Salvar para Web** (_Save for Web_):

{% include image.html src="/files/2019/09/salvar-para-web-01.jpg" %}

Infelizmente, essa tela não tem tradução. A imagem original (_Initial image_) é exibida à esquerda e a imagem otimizada (_Optimized image_), à direita. Também aparecem nessa tela o tamanho da imagem original e o tamanho estimado da imagem otimizada:

{% include image.html src="/files/2019/09/salvar-para-web-02.jpg" %}

Comece selecionando um formato, abaixo das imagens: **JPEG**, **GIF** ou **PNG**.

Para essa imagem, por se tratar de uma foto, selecionei o formato **JPEG**.

Depois, ajuste a qualidade (_Quality_). Note que à medida em que você desliza o controle pra esquerda (reduzindo a porcentagem), o tamanho estimado em _bytes_ reduz, mas também reduz a qualidade da imagem otimizada, que vai ficando embaçada ou pixelizada.

Geralmente, eu uso uma qualidade igual ou maior que 70%. Menos que isso, a imagem fica muito ruim pra valer a pena a compressão. Nesse exemplo, optei por usar 80%.

Já reduzi bastante o tamanho do arquivo: de 848,57 KiB para 22,96 KiB é um salto!

Quando estiver satisfeito com o balanço entre qualidade da imagem e tamanho do arquivo em _bytes_, clique em salvar (_Save_). Escolha uma pasta e nome pro arquivo e pronto!

## Resultado final

Veja como ficou a imagem tratada:

{% include image.html src="/files/2019/09/imagem_tratada.jpg" style="width: 253px; height: 168px;" %}

Na verdade, ela é maior que isso: aqui estou exibindo a imagem tratada no mesmo tamanho em que ela é exibida na página original (253 x 168 _pixels_), mas você pode abrir a imagem tratada em uma nova guia e ver seu tamanho real (640 x 427 _pixels_).

Se você comparar com a página original, não perceberá diferença:

[http://www.famdetodos.com.br/programacao/26](http://www.famdetodos.com.br/programacao/26)

Minto: perceberá que minha página carregou mais rápido! hehehe

E se você abrir a imagem tratada em uma nova guia, ainda conseguirá vê-la em um tamanho maior. Não tão maior a ponto de travar seu navegador, demorar uma eternidade pra carregar ou acabar com sua franquia, mas suficientemente maior.

Curiosidade: todas as 10 imagens que compõem esse tutorial somadas dão 824,7 kB — menos que a imagem original de 868,9 kB! É mais informação com a franquia do prezão!

Se você é grato por eu ter poupado a franquia do seu prezão nesse tutorial, considere compartilhá-lo para que mais pessoas tratem imagens antes de publicá-las e sua franquia possa ser usada para visitar mais _sites_.

[fam]:              http://www.famdetodos.com.br/
[photoshop]:        https://www.adobe.com/photoshop
[gimp]:             https://www.gimp.org/
[software-livre]:   https://www.gnu.org/philosophy/free-sw.pt-br.html
[irfanview]:        https://www.irfanview.com/
[freeware]:         https://pt.wikipedia.org/wiki/Software_gratuito
[windows]:          https://www.microsoft.com/pt-br/windows/
[linux]:            https://kamarada.github.io/
[wine]:             https://www.winehq.org/
[dicas-prints]:     {% post_url 2016-02-18-dicas-para-bater-bons-prints %}
[instalador]:       https://www.fosshub.com/IrfanView.html?dwl=iview453_x64_setup.exe
[plugins]:          https://www.fosshub.com/IrfanView.html?dwl=iview453_plugins_x64_setup.exe
[traducao]:         http://www.irfanview.net/lang/irfanview_lang_portugues-brasil.exe
[statcounter]:      https://gs.statcounter.com/screen-resolution-stats
[jpeg]:             https://pt.wikipedia.org/wiki/Joint_Photographic_Experts_Group
[gif]:              https://pt.wikipedia.org/wiki/Graphics_Interchange_Format
[png]:              https://pt.wikipedia.org/wiki/PNG
