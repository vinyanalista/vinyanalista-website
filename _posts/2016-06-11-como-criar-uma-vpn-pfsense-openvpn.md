---
date: '2016-06-11 02:00:00 GMT-3'
layout: post
published: false
title: Como criar uma VPN utilizando pfSense e OpenVPN
image: /files/2015/12/vpn.png
---

O [pfSense][pfsense] é uma solução de *firewall* incrível, não só pela quantidade de recursos que oferece, como também pela facilidade para configurá-lo. Ele permite criar VPNs utilizando, dentre outros protocolos, o [OpenVPN][openvpn], que é [livre][software-livre], versátil e seguro sem abrir mão da praticidade, motivos pelos quais é amplamente difundido.

## O que é uma VPN?

Uma **rede privada virtual** (do inglês *Virtual Private Network*, ou VPN) estabelece uma conexão entre dois computadores distantes, que passam a se comunicar pela Internet como se estivessem conectados a um mesmo *switch* ou roteador.

IMAGEM

Ela funciona assim: os dois computadores pertencem, a princípio, a redes diferentes (eles podem estar em prédios, cidades ou até mesmo países diferentes, por exemplo). Mas eles precisam se comunicar e possuem conexão com a Internet. Então, eles estabelecem na rede mundial um circuito (como em uma ligação telefônica) por onde trocam informações.

Para quem utiliza, é imperceptível que eles estão distantes. É como se eles estivessem conectados diretamente por um cabo, apesar de esse cabo não existir de verdade (por isso, essa rede é dita **virtual**). E a comunicação, apesar de ocorrer pela Internet, não pode ser lida pelos computadores no meio do caminho entre um e outro, porque os dois computadores que estabelecem a VPN utilizam criptografia para se comunicar (por isso, essa rede é dita **privada**).

Porque a informação trafega por um circuito cujo conteúdo não pode ser lido pelos computadores que fazem parte do circuito, apenas pelos computadores nas pontas, a VPN também é conhecida como túnel.

IMAGEM

Tentando explicar de forma simples, uma VPN é isso.

Com VPNs, podemos fazer algumas coisas interessantes, como por exemplo: em casa ou durante uma viagem a negócios utilizar um *notebook* para acessar um computador do trabalho (como se estivesse dentro do trabalho); na rua, abrir, do celular, um arquivo que está no computador de casa (como se estivesse em casa); compartilhar arquivos e recursos (como impressoras ou servidores) entre sede e filial ou entre empresas diferentes.

O Psiphon, que apresentei em [outro post][psiphon], é um exemplo interessante de VPN: ele cria um túnel entre seu computador e algum computador anônimo situado em algum lugar bem distante no mundo e redireciona todo o seu tráfego de Internet por esse computador anônimo. Dessa forma, o Psiphon permite que você utilize a Internet de forma anônima.

{% include image.html src="/files/2015/12/vpn.png" %}

Um uso prático disso é burlar bloqueios e censuras. Recentemente, [o WhatsApp foi bloqueado no Brasil][whatsapp] e muitos internautas recorreram a VPNs como o Psiphon para conseguir usar o aplicativo nos seus celulares. VPNs como essas são muito utilizadas em países com governos autoritários, como a [China][china].

## O que preciso para criar uma VPN?

Os dois computadores que queremos conectar precisam estar conectados à Internet. Um deles vai atuar como servidor, disponibilizando a VPN. O outro, vai atuar como cliente, utilizando a VPN. Eles também precisam de um protocolo para que consigam se comunicar. Existem alguns protocolos que podem ser usados para estabelecer VPNs, exemplos: [PPTP, L2TP, SSTP][protocolos] e OpenVPN. Cada protocolo serve a um tipo de VPN e pode ser mais adequado para uma ou outra finalidade.

Aqui, vou explicar como estabelecer uma VPN entre um *firewall* pfSense (suponho que já esteja instalado e funcionando) e um computador com [Windows][windows] ou um celular com [Android][android].

A ideia de escrever foi compartilhar a experiência vivida onde eu trabalho. Quero citar o excelente tutorial passo a passo do [Thiago Melo][thiago-melo], que aqui utilizo como base para escrever uma versão um pouco mais atual e acrescentando alguns comentários meus.

Para referência futura, a versão do pfSense utilizado aqui é a 2.3, lançada em [abril de 2016][pfsense-2.3], e a do OpenVPN é a 2.1.11, lançada em [maio de 2016][openvpn-2.3.11].

## Criando a VPN no pfSense

O pfSense vem com um assistente (*wizard*) que pode ser utilizado para criar VPNs (algo como o famoso *next*, *next*, *next* do Windows). No entanto, eu o achei um tanto falho. Quando eu o utilizava, ele repetia algumas configurações entre as VPNs. Assim, passei a fazer a maior parte das etapas manualmente e deixei o assistente apenas para configurar a VPN propriamente dita e as regras do *firewall*, que são as etapas finais.

Vamos configurar manualmente os pré-requisitos para a VPN.

Primeiro, precisamos de uma **autoridade certificadora** (do inglês *Certificate Authority*, CA) para emitir os certificados do servidor e do cliente. Vá em **System**, **Cert. Manager**, aba **CA** e clique no botão **Add**. Preencha o cadastro com as informações a seguir (claro, alterando de acordo com suas necessidades):

- **Descriptive name:** MINHACASA_CA
- **Method:** Create an internal Certificate Authority
- **Country Code:** BR
- **State or Province:** Rio Grande do Sul
- **City:** Pelotas
- **Organization:** Minha Casa
- **Email Address:** vinyanalista@minhacasa.net
- **Common Name:** minhacasa-ca

Clique em **Save**:

{% include image.html src="/files/2016/06/pfsense-vpn-04.jpg" %}

Depois, precisamos de um certificado para o servidor. De volta à tela **Certificate Manager**, clique na aba **Certificates** e clique no botão **Add**. Preencha o cadastro com as informações a seguir:

- **Method**: Create an internal Certificate
- **Descriptive name:** VPN de teste
- **Certificate authority:** MINHACASA_CA
- **Certificate Type:** Server Certificate
- **Country Code:** BR
- **State or Province:** Rio Grande do Sul
- **City:** Pelotas
- **Organization:** Minha Casa
- **Email Address:** vinyanalista@minhacasa.net
- **Common Name:** vpn-de-teste

Clique em **Save**:

{% include image.html src="/files/2016/06/pfsense-vpn-05.jpg" %}

Precisamos também cadastrar quem utilizará a VPN (*login* e senha) e criar certificados para esses usuários. Vá em **System**, **User Manager** e clique no botão **Add**. Preencha o cadastro com as informações a seguir:

- **Username**: vinyanalista
- **Password:** Alg0$3guro!
- **Full name:** Antônio Vinícius Menezes Medeiros

Em **Certificate**, marque **Click to create a user certificate** para que ele gere um certificado para o usuário que estamos cadastrando. Acrescente as informações:

- **Descriptive name:** vinyanalista
- **Certificate authority:** MINHACASA_CA

Clique em **Save**:

{% include image.html src="/files/2016/06/pfsense-vpn-06.jpg" %}

Agora vamos à configuração da VPN propriamente dita.

Vá em **VPN**, **OpenVPN** e clique na aba **Wizards**. É iniciado então o **OpenVPN Remote Access Server Setup**. Na primeira tela, **Select an Authentication Backend Type**, escolha **Local User Access**, e clique em **Next**:

{% include image.html src="/files/2016/06/pfsense-vpn-07.jpg" %}

Na segunda tela, **Choose a Certificate Authority (CA)**, selecione a autoridade cerficadora que foi criada anteriormente (**MINHACASA_CA**) e clique em **Next**:

{% include image.html src="/files/2016/06/pfsense-vpn-08.jpg" %}

Na terceira tela, **Choose a Server Certificate**, selecione o certificado de servidor que foi criado anteriormente (**VPN de teste**) e clique em **Next**:

{% include image.html src="/files/2016/06/pfsense-vpn-09.jpg" %}

Na tela seguinte, **Server Setup**, vamos configurar o servidor da VPN. Aqui, você deve preencher de acordo com as configurações da rede do seu servidor (a rede da sua empresa, por exemplo). Vejamos algumas configurações:

- **Interface:** WAN (interface de rede na qual o servidor aguardará pela conexão do cliente, deve apresentar conexão com a Internet)
- **Local Port:** 1194 (porta na qual o servidor aguardará pela conexão do cliente, 1194 é a porta convencional para o protocolo OpenVPN, você pode utilizar essa porta para a primeira VPN, mas se for criar outras, deverá reservar portas diferentes para cada VPN)
- **Description:** VPN de teste (descrição da VPN, deve ser um nome informativo, até porque aparecerá na tela do cliente identificando a conexão)
- **Tunnel Network:** 192.168.26.0/24 (endereço e máscara da rede virtual privada, no formato de [CIDR][cidr], observe que o pfSense tomará o primeiro endereço IP, nesse caso 192.168.26.1, para ele e os demais endereços IPs serão atribuídos aos clientes)
- **Local Network:** 192.168.25.0/24 (endereço e máscara da rede interna que o cliente conectado pela VPN poderá acessar, é possível especificar mais de uma rede separando as redes por vírgula e até mesmo restringir o acesso a apenas um computador na rede interna, por exemplo 192.168.25.2/32)

Com relação ao campo **Tunnel Network**, devo observar que ele determina a quantidade de computadores que poderão se conectar pela VPN. Como disse, um endereço IP será obrigatoriamente reservado para o servidor. O pfSense não deixa criarmos uma VPN cujo endereço de rede utilize 30, 31 ou 32 *bits* do endereço IP. Então, a menor rede virtual privada que podemos criar utiliza 29 *bits* do endereço IP para se identificar. Com os 3 *bits* restantes, podemos endereçar 5 clientes.

Para clarear a explicação, se tivéssemos preenchido o campo **Tunnel Network** com **192.168.26.0/29**, os endereços da nossa VPN seriam assim:

- **192.168.26.0:** endereço da rede
- **192.168.26.1:** endereço do pfSense
- **192.168.26.2:** endereço atribuído ao primeiro cliente que se conectar à VPN
- **192.168.26.3:** endereço atribuído ao segundo cliente

E assim por diante até:

- **192.168.26.6:** endereço atribuído ao quinto cliente
- **192.168.26.7:** endereço de *broadcast*

Talvez os campos **Tunnel Network** e **Local Network** sejam os que merecem mais cuidado nessa tela.

Há alguns campos que podem ser preenchidos caso você necessite configurar o cliente conectado à VPN usando DHCP. Desses, destaco:

- **DNS Default Domain**
- **DNS Server 1**, **DNS Server 2**, **DNS Server 3** e **DNS Server 4**
- **NTP Server** e **NTP Server 2**
- **WINS Server 1** e **WINS Server 2**

Perceba que essa tela é extensa, mas nela estão quase todas as configurações da VPN:

{% include image.html src="/files/2016/06/pfsense-vpn-10.jpg" %}

Quando terminar de configurar a VPN, clique em **Next**.

Na penúltima tela do assistente, **Firewall Rule Configuration**, certifique-se de que as duas opções **Firewall Rule** e **OpenVPN rule** estejam marcadas. Com isso, o pfSense criará automaticamente as regras de *firewall* necessárias para que a VPN funcione. Clique em **Next**:

{% include image.html src="/files/2016/06/pfsense-vpn-11.jpg" %}

A última tela apenas informa que a VPN foi criada. Clique em **Finish**:

{% include image.html src="/files/2016/06/pfsense-vpn-12.jpg" %}

## Exportando o *software* cliente

O pfSense é capaz de exportar o *software* e os arquivos de configuração que devem ser instalados no computador cliente para que ele consiga se conectar à VPN por meio do **OpenVPN Client Export Utility**. Esse utilitário não acompanha a instalação padrão do pfSense, sendo disponibilizado como um pacote.

Caso você ainda não o tenha instalado, vá em **System**, **Package Manager**, na aba **Available Packages**, busque por esse pacote e o instale clicando no botão **Install**:

{% include image.html src="/files/2016/06/pfsense-vpn-13.jpg" %}

Com o utilitário instalado, vá em **VPN**, **OpenVPN**, aba **Client Export**. Em **Remote Access Server**, selecione a VPN (nesse exemplo, **VPN de teste**). Mais abaixo, no final da página, na linha correspondente ao usuário que deve acessar a VPN (nesse exemplo, **vinyanalista**), clique no botão correspondente ao cliente que deseja exportar.

Vou demonstrar como conectar à VPN um computador cujo sistema operacional é o Windows 10 de 64 *bits*. Nesse caso, clique no botão **x64-win6** para exportar o cliente correspondente:

{% include image.html src="/files/2016/06/pfsense-vpn-14.jpg" %}

O *download* do instalador do cliente é iniciado. Esse arquivo (cujo nome deve ser algo parecido com **firewall-udp-1194-vinyanalista-install.exe**) deve ser copiado ou movido para o computador cliente.

Também vou demonstrar como conectar à VPN um celular com sistema Android. Você pode aproveitar para já baixar também o arquivo de configuração que será necessário clicando no botão **Android**. Esse arquivo (cujo nome deve ser algo parecido com **firewall-udp-1194-vinyanalista-android-config.ovpn**) deve ser copiado ou movido para o celular. No caso do Android, o *software* cliente é instalado pela [Play Store][play-store], por isso o pfSense exporta apenas o arquivo de configuração.

## Conectando à VPN pelo Windows 10

## Conectando à VPN pelo Android

Para conectar um celular Android à VPN que acabamos de criar no nosso *firewall* pfSense, precisamos instalar um aplicativo cliente no celular. Aqui, vou demonstrar como usar o cliente oficial do OpenVPN, o OpenVPN Connect.

Comece instalando o OpenVPN Connect pela Play Store:

{% include image.html src="/files/2015/12/google-play.png" link="https://play.google.com/store/apps/details?id=net.openvpn.openvpn" caption="Clique para obter o OpenVPN Connect na Play Store" %}

Se ainda não passou, passe agora para o celular o arquivo de configuração exportado pelo pfSense.



## Referências

http://www.tecmundo.com.br/1427-o-que-e-vpn-.htm
http://olhardigital.uol.com.br/noticia/o-que-e-e-para-que-serve-uma-vpn/37913
https://technet.microsoft.com/pt-br/library/cc731954(v=ws.10).aspx
[protocolos]
http://www.gta.ufrj.br/grad/13_1/vpn_ipsec/
[thiago-melo]

[pfsense]: https://www.pfsense.org/
[openvpn]: https://openvpn.net/
[software-livre]: http://softwarelivre.org/portal/o-que-e
[psiphon]: {% post_url 2015-12-17-acesse-sites-e-aplicativos-censurados-com-o-psiphon %}
[whatsapp]: http://g1.globo.com/tecnologia/noticia/2015/12/operadoras-sao-intimadas-bloquear-whatsapp-no-brasil-por-48-horas.html
[china]: http://tecnologia.terra.com.br/internet/pai-da-censura-na-china-e-surpreendido-burlando-a-mesma-em-publico,1d6ba1d9b58468d4df30fb84daf29ee6e3c193t0.html
[protocolos]: https://technet.microsoft.com/pt-br/library/cc771298(v=ws.10).aspx
[windows]: https://www.microsoft.com/pt-br/windows/
[android]: https://www.android.com/intl/pt-BR_br/
[thiago-melo]: http://thiago.oxente.org/2011/11/09/pfsense-2-0-e-openvpn-e-autenticando-no-windows-2008/
[pfsense-2.3]: https://blog.pfsense.org/?p=2008
[openvpn-2.3.11]: http://swupdate.openvpn.org/community/releases/
[cidr]: https://pt.wikipedia.org/wiki/CIDR
[play-store]: https://play.google.com/store/
