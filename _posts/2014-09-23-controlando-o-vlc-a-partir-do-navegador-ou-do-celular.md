---
date: '2014-09-23 15:38:39 -0300'
date_gmt: '2014-09-23 15:38:39 -0300'
layout: post
published: true
status: publish
title: Controlando o VLC a partir do navegador ou do celular
image: /files/2014/09/vlc_remoto_00.jpg
---

O [VLC](http://www.videolan.org/vlc/) é o verdadeiro canivete suíço dos vídeos, é um player com vários recursos interessantes, dentre eles a possibilidade de controlar a reprodução remotamente, através do navegador ou do celular. A depender de como você o usa para reproduzir seus arquivos multimídia, isso pode ser interessante. Veja aqui como fazê-lo.

<!--more-->

Vou supor que você já possui o VLC instalado. Senão, pode baixá-lo [aqui](http://www.videolan.org/vlc/).

### Habilitando o controle remoto do VLC

1. Inicie o VLC, abra o menu “Ferramentas” e clique em “Preferências”.

{% include image.html src="/files/2014/09/vlc_remoto_01.jpg" %}

A caixa de diálogo “Preferências” aparecerá como na imagem abaixo.

{% include image.html src="/files/2014/09/vlc_remoto_02.jpg" %}

2. Na caixa de seleção “Exibir configurações”, selecione “Detalhado”, para que todas as opções de configuração sejam exibidas.

{% include image.html src="/files/2014/09/vlc_remoto_03.jpg" %}

3. Na lista da esquerda, procure “Interfaces principais”, dentro de “Interface”. Dentre as opções que aparecem à direita, em “Módulos adicionais de interface”, marque “Web”.

{% include image.html src="/files/2014/09/vlc_remoto_04.jpg" %}

4. Reinicie o VLC para que as configurações tenham efeito.
5. Adicione vídeos à sua lista de reprodução.

{% include image.html src="/files/2014/09/vlc_remoto_05.jpg" %}

6. Para habilitar o controle remoto, abra o menu “Exibir”, depois vá em “Adicionar Interface” e marque “Web”.

{% include image.html src="/files/2014/09/vlc_remoto_06.jpg" %}

7. Agora o controle remoto está disponível no endereço “[http://127.0.0.1:8080](http://127.0.0.1:8080/)” (ou, se preferir, “[http://localhost:8080/](http://localhost:8080/)“). Abra seu navegador favorito e acesse esse endereço.

{% include image.html src="/files/2014/09/vlc_remoto_07.jpg" %}

8. Se na lista de reprodução você expandir “Não Definido”, verá os itens que adicionou antes de habilitar a interface Web.

{% include image.html src="/files/2014/09/vlc_remoto_08.jpg" %}

Você pode clicar nos controles no controle remoto aberto no navegador e verificar que o VLC responde de acordo.

As configurações padrão do VLC, no entanto, permitem apenas o acesso local, feito a partir própria máquina onde ele está sendo executado. Vamos habilitar o controle a partir outros computadores dentro da mesma rede.

### Habilitando o controle a partir de outros computadores na mesma rede

O VLC possui uma lista de computadores (hosts) habilitados a controlá-lo remotamente. Essa lista se encontra em “C:\Arquivos de Programas\VideoLAN\VLC\lua\http\.hosts” (no Windows) ou em “/usr/share/vlc/lua/http/.hosts” (no Linux). Vamos editá-la para permitir que o VLC aceite receber comandos de computadores que estejam na mesma rede que o computador que está reproduzindo os arquivos multimídia.

1. Abra seu editor de texto favorito com permissões de administrador. No Windows, recomendo utilizar o WordPad ou o [Notepad++](http://notepad-plus-plus.org/).

{% include image.html src="/files/2014/09/vlc_remoto_09.jpg" %}

2. Abra o arquivo “.hosts” no caminho já indicado.

{% include image.html src="/files/2014/09/vlc_remoto_10.jpg" %}

3. Descomente, removendo o caractere de jogo da velha (“#”), as linhas abaixo do comentário “# private addresses” (endereços particulares).

{% include image.html src="/files/2014/09/vlc_remoto_11.jpg" %}

4. Salve o arquivo e reinicie o VLC para que as alterações tenham efeito.

A partir de agora, a interface Web pode ser acessada a partir de outros computadores que estejam na mesma rede que o computador que executa o VLC. Lembre-se que para acessá-lo você deve digitar no seu navegador o endereço IP da máquina que executa o VLC acompanhado da porta 8080, que é a porta escutada pelo controle remoto por padrão.

### Controlando o VLC a partir de um celular Android

O mais interessante de poder controlar o VLC remotamente é comandar a reprodução a partir de um celular Android. Desse jeito, temos a impressão que realmente estamos utilizando um controle remoto, como o de uma TV. Isso pode ser feito habilitando-se a interface Web, como descrito nos procedimentos anteriores, e executando um aplicativo como o [VLC Direct](https://play.google.com/store/apps/details?id=com.vlcforandroid.vlcdirectprofree) ou o [VLC Remote](https://play.google.com/store/apps/details?id=com.hobbyistsoftware.android.vlcremote_usfree). Eles estão disponíveis gratuitamente, mas também apresentam versões pagas que possuem mais recursos.

{% include image.html src="/files/2014/09/vlc_remoto_vlc_direct.jpg" %}

Também deve haver aplicativos como esses para iOS, mas no momento desconheço.

### Dica sobre defeito no controle Web

A depender de como o controle remoto apareça no seu navegador, uma imagem pode impedi-lo de acessar a lista de reprodução, como na imagem a seguir.

{% include image.html src="/files/2014/09/vlc_remoto_12.jpg" %}

Um truque de web designer para remover essa imagem é clicar com o botão direito nela e em seguida clicar em “Inspecionar elemento”.

{% include image.html src="/files/2014/09/vlc_remoto_13.jpg" %}

No painel que aparece, o código HTML dela deve aparecer em destaque. Clique com o botão direito nele e em seguida clique em “Excluir nó”.

{% include image.html src="/files/2014/09/vlc_remoto_14.jpg" %}

A imagem deve desaparecer.

{% include image.html src="/files/2014/09/vlc_remoto_07.jpg" %}

Isso não é uma solução definitiva. Se você recarregar a página, a imagem ainda está lá. Espero que os desenvolvedores do VLC consertem logo esse bug chato...

É isso, pessoal, espero que vocês tenham gostado. Abraço e até a próxima!

### Referências

- [Documentation:Modules/http intf – VideoLAN Wiki](https://wiki.videolan.org/Documentation:Modules/http_intf/)
- [Control VLC via a browser – VideoLAN Wiki](https://wiki.videolan.org/Control_VLC_via_a_browser/)
- [Control VLC from an Android Phone – VideoLAN Wiki](https://wiki.videolan.org/Control_VLC_from_an_Android_Phone/)