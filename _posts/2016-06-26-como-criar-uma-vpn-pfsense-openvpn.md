---
date: '2016-06-26 01:00:00 GMT-3'
layout: post
published: true
title: Como criar uma VPN utilizando pfSense e OpenVPN
image: /files/2016/06/pfsense-vpn-01.png
---

{% include image.html src="/files/2016/06/pfsense-vpn-01.png" %}

O [pfSense][pfsense] é uma solução de *firewall* incrível, não só pela quantidade de recursos que oferece, como também pela facilidade para configurá-lo. Ele permite criar VPNs utilizando, dentre outros protocolos, o [OpenVPN][openvpn], que é [livre][software-livre], versátil e seguro sem abrir mão da praticidade, motivos pelos quais é amplamente difundido.

## O que é uma VPN?

Uma **rede privada virtual** (do inglês *Virtual Private Network*, ou VPN) estabelece uma conexão entre dois computadores distantes, que passam a se comunicar pela Internet como se estivessem conectados a um mesmo *switch* ou roteador.

Ela funciona assim: os dois computadores pertencem, a princípio, a redes diferentes (eles podem estar em prédios, cidades ou até mesmo países diferentes, por exemplo). Mas eles precisam se comunicar e possuem conexão com a Internet. Então, eles estabelecem na rede mundial um circuito por onde trocam informações de forma privada. É como uma ligação telefônica que não pudesse ser grampeada.

{% include image.html src="/files/2016/06/pfsense-vpn-02.jpg" caption="Apesar de estarem conectados à Internet, dois computadores em uma VPN se comunicam de forma privada" %}

Para quem utiliza esses computadores, é imperceptível que eles estão distantes. É como se eles estivessem conectados diretamente por um cabo, apesar de esse cabo não existir de verdade (por isso, essa rede é dita **virtual**). E a comunicação, apesar de ocorrer pela Internet, não pode ser lida pelos computadores no meio do caminho entre um e outro, porque os dois computadores que estabelecem a VPN utilizam criptografia para se comunicar (por isso, essa rede é dita **privada**).

Porque a informação trafega por um circuito cujo conteúdo não pode ser lido pelos computadores que ajudam a formar o circuito, nem pelos que estão fora dele, apenas pelos computadores nas pontas (o remetente e o destinatário), a VPN também é conhecida como **túnel**.

{% include image.html src="/files/2016/06/pfsense-vpn-03.png" caption="Um túnel é bem assim: só quem está dentro dele vê o que por ele passa" %}

Tentando explicar de forma simples, uma VPN é isso.

Com VPNs, podemos fazer algumas coisas interessantes, como por exemplo: em casa ou durante uma viagem a negócios utilizar um *notebook* para acessar um computador do trabalho (como se estivesse dentro do trabalho); na rua, abrir, do celular, um arquivo que está no computador de casa (como se estivesse em casa); compartilhar arquivos e recursos (como impressoras ou servidores) entre sede e filial da empresa ou entre empresas diferentes.

O Psiphon, que apresentei em [outro post][psiphon], é um exemplo interessante de VPN: ele cria um túnel entre seu computador e algum computador anônimo situado em algum lugar bem distante no mundo e redireciona todo o seu tráfego de Internet por esse computador anônimo. Dessa forma, o Psiphon permite que você utilize a Internet de forma anônima.

{% include image.html src="/files/2015/12/vpn.png" %}

Um uso prático disso é burlar bloqueios e censuras. Recentemente, [o WhatsApp foi bloqueado no Brasil][whatsapp] e muitos internautas recorreram a VPNs como o Psiphon para conseguir usar o aplicativo nos seus celulares. VPNs como essas são muito utilizadas em países com governos autoritários, como a [China][china].

## O que preciso para criar uma VPN?

Os dois computadores que queremos conectar precisam estar conectados à Internet. Um deles vai atuar como servidor, disponibilizando a VPN. O outro, vai atuar como cliente, utilizando a VPN. Eles também precisam de um protocolo para que consigam se comunicar. Existem alguns protocolos que podem ser usados para estabelecer VPNs, exemplos incluem: [PPTP, L2TP, SSTP][protocolos] e [OpenVPN][openvpn]. Cada protocolo serve a um tipo de VPN e pode ser mais adequado para uma ou outra finalidade.

Aqui, vou explicar como estabelecer uma VPN entre um *firewall* pfSense (suponho que já esteja instalado e funcionando) e um computador com [Windows][windows] ou um celular com [Android][android].

A ideia de escrever foi compartilhar a experiência vivida onde eu trabalho.

Quero citar o excelente tutorial passo a passo do [Thiago Melo][thiago-melo], que aqui utilizo como base para escrever uma versão um pouco mais atual e acrescentando alguns comentários meus.

Para referência futura, a versão do pfSense utilizado aqui é a 2.3, lançada em [abril de 2016][pfsense-2.3], e a do OpenVPN é a 2.1.11, lançada em [maio de 2016][openvpn-2.3.11].

## Criando a VPN no pfSense

O pfSense vem com um assistente (*wizard*) que pode ser utilizado para criar VPNs, mais ou menos no famoso estilo *next*, *next*, *next* (avançar, avançar, avançar) do Windows. No entanto, eu o achei um tanto falho. Quando eu o utilizava, ele repetia algumas configurações entre as VPNs. Assim, passei a fazer a maior parte das etapas manualmente, deixando o assistente apenas para configurar a VPN propriamente dita e as regras do *firewall*, que são as etapas finais.

Vamos configurar manualmente os pré-requisitos para a VPN.

Primeiro, precisamos de uma **autoridade certificadora** (do inglês *Certificate Authority*, CA) para emitir os certificados do servidor e do cliente. Vá em **System**, **Cert. Manager**, aba **CAs** e clique no botão **Add**. Preencha o cadastro com as informações a seguir (claro, lembre-se sempre de alterar de acordo com as suas necessidades):

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

Precisamos também cadastrar os usuários que utilizarão a VPN (*login* e senha) e criar certificados para esses usuários. Vá em **System**, **User Manager** e clique no botão **Add**. Preencha o cadastro com as informações a seguir:

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
- **Local Port:** 1194 (porta na qual o servidor aguardará pela conexão do cliente, 1194 é a porta convencional para o protocolo OpenVPN, você pode utilizar essa porta para a primeira VPN, mas se for criar outras, deverá reservar portas diferentes para cada VPN, por exemplo 1195, 1196...)
- **Description:** VPN de teste (descrição da VPN, deve ser um nome informativo, até porque aparecerá na tela do cliente identificando a conexão)
- **Tunnel Network:** 192.168.26.0/24 (endereço e máscara da rede virtual privada, no formato de [CIDR][cidr], observe que o pfSense tomará o primeiro endereço IP para ele, nesse caso 192.168.26.1, e os demais endereços IPs serão atribuídos aos clientes)
- **Local Network:** 192.168.25.0/24 (endereço e máscara da rede interna que o cliente conectado pela VPN poderá acessar, é possível especificar mais de uma rede separando as redes por vírgula e até mesmo restringir o acesso a apenas um computador na rede interna, por exemplo 192.168.25.2/32)

Com relação ao campo **Tunnel Network**, devo observar que ele determina a quantidade de computadores que poderão se conectar pela VPN. Obrigatoriamente, o servidor consumirá 1 endereço IP da VPN. Além disso, o pfSense não deixa criarmos uma VPN cujo endereço de rede utilize 30, 31 ou 32 *bits* do endereço IP. Então, a menor rede virtual privada que podemos criar utiliza 29 *bits* do endereço IP para se identificar. Com os 3 *bits* restantes, podemos endereçar 5 clientes.

Para esclarecer a explicação, se tivéssemos preenchido o campo **Tunnel Network** com **192.168.26.0/29**, os endereços da nossa VPN seriam assim:

- **192.168.26.0:** endereço da rede
- **192.168.26.1:** endereço do pfSense
- **192.168.26.2:** endereço atribuído ao primeiro cliente que se conectar à VPN
- **192.168.26.3:** endereço atribuído ao segundo cliente
- **192.168.26.4:** endereço atribuído ao terceiro cliente
- **192.168.26.5:** endereço atribuído ao quarto cliente
- **192.168.26.6:** endereço atribuído ao quinto cliente
- **192.168.26.7:** endereço de *broadcast*

Provavelmente os campos **Tunnel Network** e **Local Network** são os que merecem mais cuidado nessa tela.

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

O pfSense é capaz de exportar o *software* e os arquivos de configuração que devem ser instalados no computador cliente para que ele consiga se conectar à VPN. Para isso, usamos o **OpenVPN Client Export Utility**. Esse utilitário não acompanha a instalação padrão do pfSense, sendo disponibilizado como um pacote.

Caso você ainda não o tenha instalado, vá em **System**, **Package Manager**, na aba **Available Packages**, busque por esse pacote e o instale clicando no botão **Install**:

{% include image.html src="/files/2016/06/pfsense-vpn-13.jpg" %}

Com o utilitário instalado, vá em **VPN**, **OpenVPN**, aba **Client Export**.

Em **Remote Access Server**, selecione a VPN (nesse exemplo, **VPN de teste**).

Mais abaixo, no final da página, na linha correspondente ao usuário que deve acessar a VPN (nesse exemplo, **vinyanalista**), clique no botão correspondente ao cliente que deseja exportar.

Vou demonstrar como conectar à VPN um computador cujo sistema operacional é o Windows 10 de 64 *bits*. Nesse caso, clique no botão **x64-win6** para exportar o cliente correspondente:

{% include image.html src="/files/2016/06/pfsense-vpn-14.jpg" %}

O *download* do instalador do cliente é iniciado. Esse arquivo (cujo nome deve ser algo parecido com **firewall-udp-1194-vinyanalista-install.exe**) deve ser copiado ou movido para o computador cliente.

Também vou demonstrar como conectar à VPN um celular com sistema Android. Você pode aproveitar para já baixar também o arquivo de configuração que será necessário. Para isso, clique no botão **Android**. Esse arquivo (cujo nome deve ser algo parecido com **firewall-udp-1194-vinyanalista-android-config.ovpn**) deve ser copiado ou movido para o celular. No caso do Android, o *software* cliente é instalado pela [Play Store][play-store], por isso o pfSense exporta apenas o arquivo de configuração.

## Conectando à VPN pelo Windows 10

No computador cliente, execute o instalador do cliente OpenVPN, baixado do pfSense. A instalação é bem simples. Aqui, mais uma vez, é *next*, *next*, *next*:

{% include image.html src="/files/2016/06/pfsense-vpn-15.jpg" %}

Terminada a instalação, para iniciar o cliente OpenVPN, abra o **menu Iniciar**, clique em **Todos os programas**, depois em **OpenVPN** e, por fim, em **OpenVPN GUI**:

{% include image.html src="/files/2016/06/pfsense-vpn-16.jpg" %}

O cliente OpenVPN é iniciado. Observe seu ícone na área de notificação:

{% include image.html src="/files/2016/06/pfsense-vpn-17.jpg" %}

Dê dois clique nesse ícone. O cliente solicita usuário e senha para se conectar com a VPN. Informe o usuário e a senha que você configurou no pfSense e clique em **OK**:

{% include image.html src="/files/2016/06/pfsense-vpn-18.jpg" %}

Se conseguir se conectar, o cliente OpenVPN mostra uma notificação com o endereço IP que foi atribuído ao computador dentro da rede privada virtual. Observe também que o ícone do cliente muda sua cor para verde, indicando que está conectado:

{% include image.html src="/files/2016/06/pfsense-vpn-19.jpg" %}

Como teste, você pode abrir o **Prompt de comando** do Windows e verificar a conectividade com algum computador na rede da outra ponta da VPN:

```
Microsoft Windows [versão 10.0.10240]
(c) 2015 Microsoft Corporation. Todos os direitos reservados.

C:\Users\Vinicius>ping 172.20.0.4

Disparando 172.20.0.4 com 32 bytes de dados:
Resposta de 172.20.0.4: bytes=32 tempo=127ms TTL=62
Resposta de 172.20.0.4: bytes=32 tempo=78ms TTL=62
Resposta de 172.20.0.4: bytes=32 tempo=104ms TTL=62
Resposta de 172.20.0.4: bytes=32 tempo=97ms TTL=62

Estatísticas do Ping para 172.20.0.4:
    Pacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de
             perda),
Aproximar um número redondo de vezes em milissegundos:
    Mínimo = 78ms, Máximo = 127ms, Média = 101ms

C:\Users\Vinicius>
```

Quando não precisar usar mais a VPN, clique com o botão direito do *mouse* no ícone do cliente OpenVPN e em seguida clique em **Sair**:

{% include image.html src="/files/2016/06/pfsense-vpn-20.jpg" %}

### Solução de problemas

Caso você perceba que não conseguiu se conectar à VPN e o cliente exibe uma mensagem como esta:

```
TLS Error: TLS key negotiation failed to occur within 60 seconds (check your network connectivity)
```

Significa que o cliente e o servidor OpenVPN não estão conseguindo se comunicar, podendo a causa do problema estar em uma ponta ou outra da conexão. É provável que seu computador esteja sem conexão com a Internet ou algum *firewall* esteja impedindo a conexão do seu computador com o servidor da VPN.

Algumas verificações que você pode fazer do lado do cliente:

1. Tentar executar o cliente OpenVPN como administrador;
2. Verificar a hora do computador (para que a conexão segura possa ser estabelecida é um pré-requisito que a hora esteja correta);
3. Verificar no Firewall do Windows se a porta número 1194 está liberada para receber conexões TCP e UDP (se não estiver liberada, adicionar exceção);
4. Verificar no Firewall do Windows se o aplicativo **openvpn.exe** está sendo bloqueado (se estiver bloqueado, adicionar exceção);
5. Se houver algum *firewall* entre o computador e o provedor de Internet, verificá-lo também; e
6. Se já havia um cliente OpenVPN instalado no computador e o instalador baixado do pfSense apenas acrescentou a configuração da VPN recém-criada, considere a possibilidade de desinstalar o cliente já instalado na máquina e instalar o fornecido, que pode ser mais novo e conter correções para *bugs* e falhas de segurança.

Falando em *bug*, pode acontecer de o cliente OpenVPN relatar que conseguiu se conectar, mas não conseguiu configurar rotas para a rede privada virtual:

```
Tue Jun 14 22:15:09 2016 ROUTE: route addition failed using CreateIpForwardEntry: Acesso negado.   [status=5 if_index=4]
Tue Jun 14 22:15:09 2016 env_block: add PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem
Tue Jun 14 22:15:09 2016 ERROR: Windows route add command failed [adaptive]: returned error code 1
Tue Jun 14 22:15:09 2016 ROUTE: route addition failed using CreateIpForwardEntry: Acesso negado.   [status=5 if_index=4]
Tue Jun 14 22:15:09 2016 env_block: add PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem
Tue Jun 14 22:15:10 2016 ERROR: Windows route add command failed [adaptive]: returned error code 1
Tue Jun 14 22:15:10 2016 Initialization Sequence Completed
```

Isso é um [*bug*][bug] que afetava versões antigas do cliente OpenVPN, mas já foi corrigido. Você pode [baixar a versão mais recente do cliente OpenVPN][download-openvpn], instalá-la em seu computador e repetir os passos acima para se conectar à VPN normalmente. Ou, se não quiser fazer isso, você pode tentar executar o cliente já instalado em seu computador com permissões de administrador.

Quando você conseguir se conectar sem problemas, o cliente OpenVPN deve exibir uma sequência de mensagens parecida com esta:

```
Tue Jun 14 22:18:06 2016 OpenVPN 2.3.11 x86_64-w64-mingw32 [SSL (OpenSSL)] [LZO] [PKCS11] [IPv6] built on May 10 2016
Tue Jun 14 22:18:06 2016 Windows version 6.2 (Windows 8 or greater) 64bit
Tue Jun 14 22:18:06 2016 library versions: OpenSSL 1.0.1t  3 May 2016, LZO 2.09
Tue Jun 14 22:19:34 2016 Control Channel Authentication: using 'firewall-udp-1194-antonio.medeiros-tls.key' as a OpenVPN static key file
Tue Jun 14 22:19:34 2016 UDPv4 link local (bound): [undef]
Tue Jun 14 22:19:34 2016 UDPv4 link remote: [AF_INET]187.86.133.121:1194
Tue Jun 14 22:19:35 2016 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Tue Jun 14 22:19:35 2016 [VPN do HEUFPEL] Peer Connection Initiated with [AF_INET]187.86.133.121:1194
Tue Jun 14 22:19:38 2016 do_ifconfig, tt->ipv6=0, tt->did_ifconfig_ipv6_setup=0
Tue Jun 14 22:19:38 2016 open_tun, tt->ipv6=0
Tue Jun 14 22:19:38 2016 TAP-WIN32 device [Ethernet 3] opened: \\.\Global\{2D6F99C4-A78C-48F2-A301-AEBFDD5B5E30}.tap
Tue Jun 14 22:19:38 2016 Set TAP-Windows TUN subnet mode network/local/netmask = 10.100.201.0/10.100.201.2/255.255.255.0 [SUCCEEDED]
Tue Jun 14 22:19:38 2016 Notified TAP-Windows driver to set a DHCP IP/netmask of 10.100.201.2/255.255.255.0 on interface {2D6F99C4-A78C-48F2-A301-AEBFDD5B5E30} [DHCP-serv: 10.100.201.254, lease-time: 31536000]
Tue Jun 14 22:19:38 2016 Successful ARP Flush on interface [4] {2D6F99C4-A78C-48F2-A301-AEBFDD5B5E30}
Tue Jun 14 22:19:44 2016 Initialization Sequence Completed
```

## Conectando à VPN pelo Android

Para conectar um celular com Android à VPN que acabamos de criar no nosso *firewall* pfSense, precisamos instalar um aplicativo cliente no celular. Aqui, vou demonstrar como usar o cliente oficial do OpenVPN, o OpenVPN Connect.

Comece instalando o OpenVPN Connect pela Play Store:

{% include image.html src="/files/2015/12/google-play.png" link="https://play.google.com/store/apps/details?id=net.openvpn.openvpn" caption="Clique para obter o OpenVPN Connect na Play Store" %}

Se ainda não passou, passe agora para o celular o arquivo de configuração exportado pelo pfSense.

No celular, abra o **menu de Aplicativos** e toque no **OpenVPN Connect**:

{% include image.html src="/files/2016/06/pfsense-vpn-21.jpg" %}

O cliente OpenVPN para Android é iniciado:

{% include image.html src="/files/2016/06/pfsense-vpn-22.jpg" %}

Toque no **botão de opções** (o com 3 pontos que aparece no canto superior direito da tela), em seguida em **Import** e, por último, em **Import Profile from SD card**:

{% include image.html src="/files/2016/06/pfsense-vpn-23.jpg" %}

Localize o arquivo de configuração na memória interna ou no cartão de memória do seu celular, toque nele e depois em **Select**:

{% include image.html src="/files/2016/06/pfsense-vpn-24.jpg" %}

O cliente solicita usuário e senha para se conectar com a VPN. Informe o usuário e a senha que você configurou no pfSense. Opcionalmente, marque a opção **Save** para que ele memorize o usuário e a senha. Por fim, toque em **Connect**:

{% include image.html src="/files/2016/06/pfsense-vpn-25.jpg" %}

Se conseguir se conectar, o cliente OpenVPN passa a exibir o *status* da conexão. Observe que ele fixa um ícone na área de notificação, indicando que está conectado:

{% include image.html src="/files/2016/06/pfsense-vpn-26.jpg" %}

Quando não precisar usar mais a VPN, volte ao cliente OpenVPN e toque em **Disconnect**.

## Conclusão

É isso. Espero que esse texto possa te ajudar caso necessite. A seguir, listo algumas referências que utilizei além dos *links* que já apareceram por todo o texto:

- [O que é VPN? - TecMundo][referencia-1]
- [O que é e para que serve uma VPN? - Olhar Digital][referencia-2]
- [O que é VPN? - TechNet][referencia-3]
- [VPN e IPsec - UFRJ][referencia-4]
- [OpenVPN Errors - TLS handshake failed - fórum do pfSense][referencia-5]
- [OPENVPN no pfsense conectando cliente windows  [RESOLVIDO] [servidores VPN] - Viva o Linux][referencia-6]
- [TLS Error: TLS key negotiation failed to occur within 60 seconds (check your network connectivity) - FAQ do OpenVPN][referencia-7]

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
[bug]: https://community.openvpn.net/openvpn/ticket/68
[download-openvpn]: https://openvpn.net/index.php/open-source/downloads.html
[referencia-1]: http://www.tecmundo.com.br/1427-o-que-e-vpn-.htm
[referencia-2]: http://olhardigital.uol.com.br/noticia/o-que-e-e-para-que-serve-uma-vpn/37913
[referencia-3]: https://technet.microsoft.com/pt-br/library/cc731954(v=ws.10).aspx
[referencia-4]: http://www.gta.ufrj.br/grad/13_1/vpn_ipsec/
[referencia-5]: https://forum.pfsense.org/index.php?topic=81287.0
[referencia-6]: https://www.vivaolinux.com.br/topico/servidores-VPN/OPENVPN-no-pfsense-conectando-cliente-windows
[referencia-7]: https://openvpn.net/index.php/open-source/faq/79-client/253-tls-error-tls-key-negotiation-failed-to-occur-within-60-seconds-check-your-network-connectivity.html

