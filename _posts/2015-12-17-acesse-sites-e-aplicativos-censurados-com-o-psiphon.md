---
date: '2015-12-17 08:00:00 GMT-3'
layout: post
published: true
title: Acesse sites e aplicativos censurados com o Psiphon
image: /files/2015/12/psiphon-00.png
---

De uma hora para outra, [o WhatsApp foi bloqueado no Brasil][noticia-whatsapp]. Mas há artifícios que possibilitam a utilização do aplicativo, mesmo com o bloqueio das operadoras. Aqui veremos um deles: o aplicativo [Psiphon][psiphon].

{% include image.html src="/files/2015/12/psiphon-00.png" %}

Vale observar que o Psiphon também permite o uso de quaisquer *sites* e aplicativos bloqueados ou censurados pelo responsável pela rede (seja a empresa, organização, universidade, operadora, etc).

## Porque o WhatsApp deixou de funcionar?

A Justiça [ordenou][noticia-whatsapp] que as operadoras de telefonia bloqueassem o uso do aplicativo [WhatsApp][whatsapp] em todo o Brasil por 48 horas, começando à meia noite (0h) dessa quinta-feira 17 de dezembro de 2015. Esse bloqueio aconteceu porque a empresa responsável pelo WhatsApp descumpriu uma determinação judicial. Como o processo corre em segredo de justiça, quase nenhuma informação é revelada.

O fato é que, mesmo sem saber ao certo porque, muita gente ficou na mão sem poder usar o WhatsApp de ontem pra hoje. [As pessoas já começaram a migrar][noticia-telegram] para outros [aplicativos semelhantes][alternativas-whatsapp].

Uma solução para quem não deseja ficar sem usar o serviço de mensagens é utilizar aplicativos que visam burlar a censura na Internet, a exemplo do Psiphon.

## Como funciona o Psiphon?

O Psiphon burla a censura ou bloqueio imposta ao seu computador ou dispositivo móvel (*smartphone* ou *tablet*) por meio de uma conexão em forma de [túnel][vpn] que ele estabelece com algum outro computador anônimo em algum outro lugar do mundo. Ele atravessa os dados que chegam e saem de você por esse túnel. Dessa maneira, os dados evitam o caminho comum, que está bloqueado, e passam por outro caminho, que não está censurado.

## Instalando e usando o Psiphon no Android

Em *smartphones* e *tablets* com [Android][android], o Psiphon pode ser baixado e instalado pela [Play Store][play-store], como a maioria dos aplicativos:

{% include image.html src="/files/2015/12/google-play.png" link="https://play.google.com/store/apps/details?id=com.psiphon3" caption="Clique para obter o Psiphon na Play Store" %}

**Observação:** o ideal é que você instale o Psiphon em seu aparelho antes mesmo de precisar, porque pode ser que a rede que você estiver usando no momento em que realmente precisar não permita essa instalação.

Para iniciá-lo, procure pelo ícone na tela inicial ou na lista de aplicativos:

{% include image.html src="/files/2015/12/psiphon-01.png" %}

Assim que o aplicativo é iniciado, ele já tenta criar o túnel. Diante disso, o Android exibe um alerta. Marque a opção **Confio nesse aplicativo** e toque em **OK**:

{% include image.html src="/files/2015/12/psiphon-02.png" %}

Quando a conexão é estabelecida com sucesso, o aplicativo abre no navegador sua página oficial:

{% include image.html src="/files/2015/12/psiphon-03.png" %}

A partir de agora, você já pode acessar *sites* e usar aplicativos censurados.

Quando não quiser usar mais o túnel, volte ao aplicativo e clique em **Stop**:

{% include image.html src="/files/2015/12/psiphon-04.png" %}

## Usando o Psiphon no Windows

No computador, não é necessário instalar o Psiphon: basta baixar e começar a usar.

Acesse o [site do Psiphon][psiphon] e clique em **Download**, em seguida clique no *link* do Psiphon para Windows:

{% include image.html src="/files/2015/12/psiphon-05.jpg" %}

**Observação:** o ideal é que você baixe o Psiphon antes mesmo de precisar, porque pode ser que a rede que você estiver usando no momento em que realmente precisar não permita o acesso ao *site* do Psiphon. Você pode baixá-lo em um computador não censurado e carregá-lo consigo em um *pendrive*, por exemplo.

Quando acabar o *download*, inicie o aplicativo, ele estabelecerá a conexão:

{% include image.html src="/files/2015/12/psiphon-06.jpg" %}

Quando a conexão é estabelecida com sucesso, o aplicativo abre no navegador sua página oficial. A partir de agora, você já pode acessar *sites* e usar aplicativos censurados.

Quando não quiser mais usar o túnel, volte ao aplicativo e clique em **Disconnect**.

## E se bloquearem o Psiphon também?

Nesse caso, não será possível burlar a censura ou bloqueio imposto pela rede usando o Psiphon, mas você pode tentar usar outros aplicativos semelhantes, a exemplo do [Tor][tor] ou do [Hola][hola]. Uma pesquisa na Internet pode mostrar mais alternativas.

## Há Psiphon para Linux?

No [site do Psiphon][psiphon] não há uma opção de *download* para o Linux. Há [evidências][psiphon-linux] de que é possível utilizar a versão para Windows no Linux com o [Wine][wine], mas é mais prático utilizar o [Tor][tor], que dispõe de uma versão própria para Linux.

Espero que possa ter ajudado! Dúvidas nos comentários!

[noticia-whatsapp]:         http://g1.globo.com/tecnologia/noticia/2015/12/operadoras-sao-intimadas-bloquear-whatsapp-no-brasil-por-48-horas.html
[psiphon]:                  https://psiphon3.com/pt_PT/index.html
[whatsapp]:                 https://www.whatsapp.com/?l=pt_br
[noticia-telegram]:         http://g1.globo.com/tecnologia/noticia/2015/12/telegram-whatsapp-bloqueado-faz-app-ter-500-mil-novos-brasileiros-em-3-h.html
[alternativas-whatsapp]:    http://www.tecmundo.com.br/bate-papo/51611-10-alternativas-para-substituir-o-whatsapp.htm
[vpn]:                      http://www.tecmundo.com.br/1427-o-que-e-vpn-.htm
[android]:                  https://www.android.com/intl/pt-BR_br/
[play-store]:               https://play.google.com/store/apps?hl=pt_BR
[tor]:                      https://www.torproject.org/download/download.html
[hola]:                     https://hola.org/
[linux]:                    https://www.vivaolinux.com.br/linux/
[psiphon-linux]:            http://askubuntu.com/a/637573
[wine]:                     https://www.winehq.org/
