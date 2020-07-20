---
date: 2020-07-20 00:30:00 GMT-3
image: '/files/2020/07/mikrotik-hap.jpg'
layout: post
published: true
title: 'Primeiros passos com o MikroTik hAP ac: roteador profissional para a rede de casa'
---

Entre 2016 e 2017 trabalhei como analista de redes e tive a oportunidade de conhecer os equipamentos da [MikroTik], uma fabricante de dispositivos de redes, tais como _switches_, antenas, roteadores, etc. Provavelmente a MikroTik é mais conhecida pela sua linha de roteadores [RouterBOARD]. Mas eu fiquei empolgado quando descobri que eles tinham também uma linha doméstica e logo comprei um roteador MikroTik pra mim.

Como me mudei recentemente, decidi aproveitar a oportunidade para reconfigurá-lo e escrever alguns tutoriais mostrando suas funcionalidades.

{% include image.html src="/files/2020/07/mikrotik-hap.jpg" caption="MikroTik hAP ac lite TC" %}

O [MikroTik hAP ac lite TC][mikrotik-hap] é um roteador e ponto de acesso sem fio (_access point_) doméstico. Ele fornece 5 portas Ethernet de 10/100Mbps, rede sem fio Wi-Fi 802.11 a/b/g/n/ac em duas frequências (_dual band_) de 2,4GHz e 5GHz ao mesmo tempo e ainda tem uma porta USB que pode ser usada para conectar um modem 3G/4G. Ele pode ser ligado por PoE (Power over Ethernet) na porta 1, assim como fornece uma porta PoE, a porta 5, que pode ser usada para ligar um dispositivo PoE, como uma câmera IP.

O padrão de Wi-Fi 802.11ac visa ao desempenho. Além de maior velocidade, a frequência maior de 5GHz também garante que haja menos interferência, seja pela menor quantidade de aparelhos que a utilizam (hoje, por exemplo, telefones sem fio, microondas e dispositivos Bluetooth competem com a Wi-Fi pela frequência de 2,4GHz), seja pelo menor alcance das redes a 5GHz (o comprimento da onda reduz quando aumenta a frequência, na prática isso quer dizer que se a sua Wi-Fi e a do vizinho transmitem a 5GHz, é mais difícil que elas invadam a casa um do outro).

O MikroTik já vem configurado de fábrica, de modo que você pode simplesmente conectar os cabos e já começar a usar a rede Wi-Fi. Claro, é recomendado pelo menos definir uma senha para a rede Wi-Fi e uma senha para o gerenciamento do próprio MikroTik.

Esse é o roteador perfeito para o _nerd_ que quer configurar e monitorar cada pequeno detalhe da sua rede doméstica!

Para os tutoriais, vou usar o [Linux Kamarada 15.1][kamarada-15.1], mas note que é possível configurar o MikroTik usando [Windows] ou outros sistemas operacionais, até mesmo um _tablet_ ou _smartphone_, porque ele tem uma interface _web_ e pode ser configurado pelo navegador.

## Ligando o MikroTik pela primeira vez

São poucas as conexões do MikroTik: usando um cabo de rede Ethernet, conecte a porta 1 do MikroTik ao modem da operadora. Também conecte a fonte de alimentação ao MikroTik e a uma fonte de energia (como uma tomada na parede, um filtro de linha ou um _nobreak_).

{% include image.html src="/files/2020/07/mikrotik-conexoes.jpg" %}

Note que o MikroTik não tem botão de liga/desliga. Então, ao plugar a fonte de alimentação, ele já liga. Se um dia você precisar desligá-lo, basta desconectar a fonte de alimentação.

## Configurações básicas

Após alguns segundos ligando, o MikroTik já fornece uma rede Wi-Fi.

Abra as configurações de Wi-Fi do sistema e conecte-o à rede do MikroTik (note que ela vem aberta de fábrica, sem senha):

{% include image.html src="/files/2020/07/mikrotik-01.jpg" %}

No meu caso, ele fornece duas redes: MikroTik-86349A (2,4GHz) e MikroTik-86349B (5GHz).

Uma vez conectado à rede Wi-Fi, note que você já consegue até mesmo acessar a Internet. Pela configuração de fábrica, o MikroTik fornece ao seu computador um endereço IP na rede `192.168.88.0/24` e o endereço IP padrão do próprio MikroTik é `192.168.88.1`.

Mas não queremos deixar a rede aberta assim. Vamos ajustar algumas configurações básicas do MikroTik. Para isso, vamos usar sua interface _web_.

Abra o navegador e acesse [192.168.88.1](http://192.168.88.1/).

No primeiro acesso, a tela **Quick Set** (configuração rápida) já vem selecionada:

{% include image.html src="/files/2020/07/mikrotik-02.jpg" %}

O mais importante nessa tela é a seção **Wireless** (rede sem fio). Forneça um nome para as redes (**Network Name**) e também uma senha (**WiFi Password**). A senha deve conter pelo menos 8 caracteres.

Caso deseje mudar os endereços da rede local, ajuste os campos na seção **Local Network**:

- **IP Address**: esse será o endereço do próprio MikroTik (defini como `10.0.0.1`)
- **DHCP Server Range**: a faixa de endereços IP que o MikroTik deve fornecer via DHCP. Como eu gosto de cadastrar meus dispositivos manualmente e ter maior controle sobre os endereços deles, deixei apenas os últimos endereços para atribuir a dispositivos desconhecidos (`10.0.0.200-10.0.0.254`)

Por convenção, as faixas de endereços IP disponíveis para uso em [redes privadas][rede-privada] são:

| Rede privada   | Faixa de endereços IP         | Número de IPs |
|----------------|-------------------------------|---------------|
| 10.0.0.0/8     | 10.0.0.0 a 10.255.255.255     | 16.777.216    |
| 172.16.0.0/12  | 172.16.0.0 a 172.31.255.255   | 1.048.576     |
| 192.168.0.0/16 | 192.168.0.0 a 192.168.255.255 | 65.536        |
| 169.254.0.0/16 | 169.254.0.0 a 169.254.255.255 | 65.536        |

No meu caso, decidi usar a rede `10.0.0.0/24` simplesmente para economizar digitação (são os endereços mais curtos e, portanto, mais fáceis de digitar).

Na seção **System**, defina uma senha para acessar a configuração do MikroTik (**Password**) e digite essa senha mais uma vez para confirmar que digitou certo (**Confirm Password**).

Por fim, clique no botão **Apply Configuration** (aplicar configuração).

Feito isso, você já é desconectado da rede padrão e a nova rede passa a estar disponível.

Agora sim você já pode se conectar à nova rede e usá-la com um mínimo de segurança.

## Acessando o MikroTik pela interface web

Já é possível acessar o MikroTik pelo seu novo endereço (`10.0.0.1`).

Abra o navegador e acesse [10.0.0.1](http://10.0.0.1/). Perceba que agora a interface _web_ exige senha:

{% include image.html src="/files/2020/07/mikrotik-03.jpg" %}

Digite a senha que você definiu para a configuração do MikroTik e clique em **Login**.

Dentro da interface _web_, selecione **WebFig** para ter acesso à interface mais completa:

{% include image.html src="/files/2020/07/mikrotik-04.jpg" %}

{% include image.html src="/files/2020/07/mikrotik-05.jpg" %}

## Download do programa WinBox

Por meio da interface _web_ do MikroTik, é possível acessar praticamente todas as suas configurações. Mas o mais comum é manusear o MikroTik por meio do programa WinBox. Esse sim disponibiliza todas as configurações do MikroTik, além de mais alguns recursos interessantes, como o modo de segurança, que veremos em outro tutorial.

O WinBox é um programa para Windows, mas pode ser executado no [Linux] por meio do [Wine]. No Linux Kamarada, o Wine já vem instalado por padrão. Se você usa outra distribuição Linux, consulte a documentação dela para saber como instalar o Wine.

Para baixar o WinBox, na interface _web_ do MikroTik, no menu à esquerda, clique em **WinBox** (é uma das últimas opções):

{% include image.html src="/files/2020/07/mikrotik-06.jpg" %}

Com isso, seu navegador baixará o executável `winbox.exe`.

Salve-o em um local fácil de lembrar (por exemplo, `Documentos` ou `Área de Trabalho`).

No meu caso, vou criar uma pasta `programas` dentro da minha pasta pessoal (`/home/vinicius/programas`) e vou salvar o `winbox.exe` nela.

## Iniciando o WinBox

Para abrir o WinBox, tanto no Linux Kamarada quanto no Windows, é só dar duplo clique no `winbox.exe`:

{% include image.html src="/files/2020/07/mikrotik-07.jpg" %}

{% include image.html src="/files/2020/07/mikrotik-08.png" %}

No Linux Kamarada, para facilitar iniciar o WinBox pelo menu **Atividades**, vamos criar um arquivo `.desktop` para o WinBox.

Salve a imagem a seguir na mesma pasta onde está o `winbox.exe`:

{% include image.html src="/files/2020/07/winbox.svg" style="max-width: 256px;" caption="Você pode clicar com o botão direito do mouse [nesse link](/files/2020/07/winbox.svg) e usar a opção **Salvar link como...** Fonte da imagem: [Free SVG](https://freesvg.org/winbox-app-icon)" %}

Abra o aplicativo **Editor de texto** ([gedit]), copie e cole o seguinte conteúdo:

```ini
[Desktop Entry]
Name=WinBox
Exec=wine /home/vinicius/programas/winbox.exe
Icon=/home/vinicius/programas/winbox.svg
Type=Application
```

(substitua `/home/vinicius/programas` pela pasta onde estão os arquivos)

Salve esse arquivo em `~/.local/share/applications` com o nome de `winbox.desktop`.

Com isso, você já deve ser capaz de abrir o menu **Atividades** e iniciar o WinBox por ele:

{% include image.html src="/files/2020/07/mikrotik-09.jpg" %}

## Acessando o MikroTik pelo WinBox

Ao ser iniciado, o WinBox busca dispositivos MikroTik no mesmo [domínio de _broadcast_][broadcast-domain] da camada 2 (enlace) e os lista na aba **Neighbors** (vizinhos):

{% include image.html src="/files/2020/07/mikrotik-10.png" %}

Se seu dispositivo MikroTik aparece nessa lista, dê um duplo clique nele.

Se seu MikroTik não aparece, você pode tentar clicar no botão **Refresh** (atualizar).

A depender da configuração do _firewall_ do seu computador, pode ser que o WinBox não consiga encontrar o MikroTik.

Mas essa detecção automática é apenas uma conveniência, não é de fato necessária para que você acesse seu MikroTik. Em último caso, digite no campo **Connect To** (conectar a) o endereço MAC ou o endereço IP do seu MikroTik.

Digite a senha (**Password**) que você definiu para a configuração do MikroTik, opcionalmente marque a opção para lembrar essa senha (**Keep Password**) e clique em **Connect** (conectar).

## Interfaces de rede

Note como o WinBox é bem semelhante à interface _web_:

{% include image.html src="/files/2020/07/mikrotik-11.png" %}

A janela mostrada na imagem acima é a lista de interfaces de rede do MikroTik. Para abri-la, clique no item **Interfaces** no menu à esquerda.

Na lista de interfaces, é possível ver o tráfego transmitido (**Tx**) e recebido (**Rx**) em cada interface.

## Verificando a conexão com a Internet

Na interface do WinBox, geralmente essas listas fornecem mais informações e opções quando você dá duplo clique em um item.

Como exemplo, vejamos como o MikroTik pode nos mostrar informações sobre a velocidade da nossa conexão com a Internet.

Dê um duplo clique na interface **ether1** (a interface onde está conectado o modem da operadora) e, na janela que aparece, mude para a aba **Traffic**:

{% include image.html src="/files/2020/07/mikrotik-12.png" %}

Para gerar tráfego de rede, abra um vídeo no [YouTube] ou [Netflix], ou use serviços de teste de velocidade como o [Minha Conexão][minhaconexao] ou o [Speedtest]. Observe no gráfico o tráfego aumentando.

Uma vez, eu já usei uma captura dessa tela para reclamar de conexão lenta à operadora:

<blockquote class="twitter-tweet" data-lang="pt"><p lang="pt" dir="ltr"><a href="https://twitter.com/Vivoemrede?ref_src=twsrc%5Etfw">@Vivoemrede</a> cadê a Internet de 15Mbps que eu pago? A média aqui não chega a 1! <a href="https://twitter.com/NetflixBrasil?ref_src=twsrc%5Etfw">@NetflixBrasil</a> tá ruim parecendo visão de míope! <a href="https://t.co/Z9xXEZcFQj">pic.twitter.com/Z9xXEZcFQj</a></p>&mdash; Antônio Vinícius (@vinyanalista) <a href="https://twitter.com/vinyanalista/status/898726026787700736?ref_src=twsrc%5Etfw">19 de agosto de 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Dispositivos conectados à rede Wi-Fi

O MikroTik mostra informações detalhadas sobre os dispositivos conectados às redes Wi-Fi. Para vê-las, no menu à esquerda, clique em **Wireless** (sem fio), depois selecione a aba **Registration** (registro):

{% include image.html src="/files/2020/07/mikrotik-13.png" %}

Se você não consegue identificar um dispositivo, o _site_ [MAC Vendors][mac-vendors] pode ajudar:

{% include image.html src="/files/2020/07/mikrotik-14.jpg" %}

O [endereço MAC][mac] de cada dispositivo é único, gravado em seu _hardware_ e atribuído pelo fabricante da interface de rede. É formado por um conjunto de 6 _bytes_. Na representação legível para nós, seres humanos, cada _byte_ é representado por dois algarismos em [hexadecimal] e separado dos demais por dois pontos (`:`). Os três primeiros _bytes_ identificam o fabricante e os três últimos, o dispositivo em si.

No exemplo da imagem acima, o _site_ MAC Vendors mostra que o endereço MAC `A0:56:F3:94:7C:52` pertence a um dispositivo fabricado pela [Apple] (identificada pelos três primeiros _bytes_ `A0:56:F3`). Já sei que é o meu [iPhone].

## Continua...

Com o que fizemos até aqui, o MikroTik não faz muito mais coisas que qualquer outro roteador comum. Mas você já pode perceber o poder dele reparando na quantidade de opções presentes nas interfaces de configuração (_web_ e WinBox).

Nos próximos dias, compartilharei outros tutoriais que mostram outras funcionalidades desse pequeno mas ousado roteador.

[mikrotik]:         https://mikrotik.com/
[routerboard]:      https://mikrotik.com/product/RB2011UiAS-RM
[mikrotik-hap]:     https://mikrotik.com/product/RB952Ui-5ac2nD-TC
[kamarada-15.1]:    https://kamarada.github.io/pt/2020/02/24/kamarada-15.1-vem-com-tudo-que-voce-precisa-para-usar-o-linux-no-dia-a-dia/
[windows]:          https://www.microsoft.com/pt-br/windows/
[rede-privada]:     https://pt.wikipedia.org/wiki/Rede_privada
[linux]:            https://www.vivaolinux.com.br/linux/
[wine]:             https://www.winehq.org/
[gedit]:            https://wiki.gnome.org/Apps/Gedit
[broadcast-domain]: https://pt.wikipedia.org/wiki/Domínio_de_broadcast
[youtube]:          https://br.youtube.com/
[netflix]:          https://www.netflix.com/br/
[minhaconexao]:     https://www.minhaconexao.com.br/
[speedtest]:        https://www.speedtest.net/pt
[mac-vendors]:      https://macvendors.com/
[mac]:              https://pt.wikipedia.org/wiki/Endereço_MAC
[hexadecimal]:      https://pt.wikipedia.org/wiki/Hexadecimal
[apple]:            https://www.apple.com/br/
[iphone]:           https://www.apple.com/br/iphone/
