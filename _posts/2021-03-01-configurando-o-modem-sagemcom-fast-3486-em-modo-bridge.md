---
date: 2021-03-01 01:00:00 GMT-3
image: '/files/2021/03/modem-bridge-sagemcom.jpg'
layout: post
published: true
title: 'Configurando o modem Sagemcom F@ST 3486 em modo bridge'
---

Uma _**[bridge]**_ ("ponte", em inglês) é um dispositivo de rede que une duas redes a nível de camada 2 do [modelo OSI][osi] (camada de enlace). Normalmente, o modem da operadora atua como **[roteador]** (_router_), ou seja, atua na camada 3 (camada de rede), separando a rede de casa e a rede da operadora em espaços de endereços IP diferentes.

Se você tem outro roteador, como o [MikroTik] do qual já falei aqui em alguns _posts_, pode ser interessante mudar o modem da operadora para o modo _bridge_, o que faz com que seu outro roteador entre em contato direto com a rede da operadora, recebendo um endereço IP desta, e sendo o único responsável por gerenciar toda a rede da sua casa.

Tentando usar uma linguagem menos técnica, tornar o modem da operadora uma _bridge_ na prática seria como anulá-lo, ele passa a fazer apenas o "leva e traz" de dados na rede, enquanto quem faz o "trabalho pesado" mesmo é o roteador conectado a ele.

{% include image.html src="/files/2021/03/modem-bridge-sagemcom.jpg" %}

Se você, assim como eu, confia mais no seu roteador do que no equipamento da operadora, configurar o modem em modo _bridge_ pode trazer mais segurança para a rede da sua casa.

Hoje eu sou cliente da [Claro] e tenho em minha casa o modem Sagemcom F@ST 3486 e o roteador [MikroTik hAP ac lite TC][mikrotik]. Vou mostrar como deixar o modem Sagemcom em modo _bridge_ e o MikroTik como único roteador da casa.

<div class="alert alert-warning" role="alert">
{% markdown %}
Observe que as instruções de como configurar o modem em modo _bridge_ podem variar de modem para modem. Se seu modem é diferente, pesquise na Internet instruções específicas para ele. Observe também que esse procedimento pode não ser suportado pela operadora. Por isso, é importante que o primeiro passo seja fazer _backup_ das configurações do modem. Pode ser que você precise devolvê-las caso precise acionar o suporte da operadora no futuro.
{% endmarkdown %}
</div>

## Ponto de partida

Conecte seu roteador ao modem da operadora, como na imagem acima.

Conecte seu computador ao seu roteador.

Caso seu roteador seja um MikroTik como o meu e você tenha caído nessa página de paraquedas, talvez queira dar uma conferida nos textos anteriores:

- [Primeiros passos com o MikroTik hAP ac: roteador profissional para a rede de casa][mikrotik]
- [MikroTik: modo de segurança (Safe Mode)][safe-mode]

## Acessando a interface web do modem

Abra o navegador e acesse a interface _web_ do _modem_ da operadora. O endereço IP, assim como o _login_ e senha que você vai usar para acessar essa interface comumente podem ser encontrados em uma etiqueta no próprio modem ou fazendo uma pesquisa na Internet.

No caso do modem Sagemcom F@ST 3486, o endereço IP é [192.168.0.1](http://192.168.0.1), o _login_ é `admin` e a senha também é `admin`:

{% include image.html src="/files/2021/03/modem-bridge-01.jpg" %}

A tela inicial resume as informações da conexão e traz as configurações mais comuns, que são o nome e a senha da rede Wi-Fi. Clique em **Configurações avançadas**, no canto superior direito da tela:

{% include image.html src="/files/2021/03/modem-bridge-02.jpg" %}

### Fazendo backup da configuração atual

Clique em **Menu**, no canto superior esquerdo da tela, expanda **Administração** e clique em **Backup**:

{% include image.html src="/files/2021/03/modem-bridge-03.jpg" %}

Clique em **Backup** para baixar a configuração atual do modem:

{% include image.html src="/files/2021/03/modem-bridge-04.jpg" %}

O navegador vai baixar um arquivo chamado `backupsettings.conf`. Salve esse arquivo em um local seguro, que você se lembre depois, pro caso de precisar restaurar o _backup_.

### Desativando a rede Wi-Fi do modem

Na interface _web_ do modem, abra o **Menu**, expanda **Wi-Fi** e clique em **Rádio**.

A rede de **2.4 GHz** já vem selecionada por padrão, desmarque a opção **Ativar**:

{% include image.html src="/files/2021/03/modem-bridge-05.jpg" %}

Depois, selecione a rede de **5 GHz** e também desmarque a opção **Ativar**.

Desça até o final da página e clique em **Aplicar Ajustes**.

### Ativando o modo bridge

Abra o **Menu**, expanda **Rede** e clique em **Configurações Básicas**. Role a página até encontrar a opção **Tipo de conexão WAN** e defina-a como **Bridge Mode**:

{% include image.html src="/files/2021/03/modem-bridge-06.jpg" %}

Chegamos ao ponto de não retorno. Clique em **Aplicar Ajustes** para ativar o modo _bridge_.

O modem será reiniciado. Você pode fechar a janela do navegador.

Abra uma janela do terminal e deixe um **[ping]** rodando para algum endereço IP na Internet (por exemplo, o [servidor de DNS público do Google][google-public-dns], 8.8.8.8). Observando o comando **ping**, é possível saber quando o modem terminou de reiniciar e a conexão com a Internet voltou:

```
$ ping 8.8.8.8
...
From 10.0.0.1 icmp_seq=156 Destination Net Unreachable
64 bytes from 8.8.8.8: icmp_seq=157 ttl=114 time=49.0 ms
64 bytes from 8.8.8.8: icmp_seq=158 ttl=114 time=194 ms
64 bytes from 8.8.8.8: icmp_seq=159 ttl=114 time=138 ms
64 bytes from 8.8.8.8: icmp_seq=160 ttl=114 time=52.0 ms
```

## Verificando a conexão do roteador

Se seu roteador estava configurado para obter [DHCP], deve ter recebido um endereço IP diretamente da rede da operadora (não mais do modem, que agora está em modo _bridge_).

No caso do MikroTik, para verificar o endereço IP obtido, inicie o [WinBox][mikrotik]. Na janela do WinBox, à esquerda, expanda o menu **IP**, depois clique no item **Addresses** (endereços):

{% include image.html src="/files/2020/08/modem-bridge-06.jpg" %}

No meu exemplo, o MikroTik obteve o endereço IP `179.216.177.166/21`:

{% include image.html src="/files/2021/03/modem-bridge-07.jpg" %}

(se a notação `/21` é nova para você — eu só a conheci quando tive a oportunidade de trabalhar com redes — ela quer dizer que os primeiros 21 _bits_ do endereço IP identificam a rede, para mais informações procure saber sobre [CIDR])

## Acessando a interface web da bridge

No futuro, caso precise usar a interface _web_ do modem, que agora está em modo _bridge_ — por exemplo, para restaurar o _backup_ das configurações do modem, desativando assim o modo _bridge_ — abra o navegador e acesse o mesmo endereço IP de antes: [192.168.0.1](http://192.168.0.1).

Não sei como a _bridge_ responde por esse endereço IP, dado que ela não atua na camada 3 (camada de rede) do modelo OSI. Só sei que funciona. Parece mágica...

## Por que eu uso o modo bridge

Em 2015, eu tive um problema com o modem ARRIS TG862 da NET: um vírus invadiu o modem e mudou os endereços dos servidores DNS. Com isso, vários _sites_ passaram a exibir anúncios bastante irritantes e inconvenientes em russo, como os das imagens abaixo.

{% include image.html src="/files/2020/08/arris-tg862-malware-1.jpg" caption="(fonte da imagem: [Clube do Hardware](https://www.clubedohardware.com.br/topic/1114991-adware-russo-que-nenhum-antiv%C3%ADrus-elimina/))" %}

{% include image.html src="/files/2020/08/arris-tg862-malware-2.jpg" caption="(fonte da imagem: [Comunidade do Hardware.com.br](https://www.hardware.com.br/comunidade/adware-redirecionando/1372966/))" %}

Isso acontecia porque o servidor DNS farsante redirecionava as requisições ao [Google Analytics][analytics] (um serviço usado por muitos _sites_) para outro servidor que não era o do [Google], fazendo com que o navegador baixasse o _script_ dos anúncios em russo, em vez do _script_ requisitado pelo _site_, que era o do Google Analytics.

A solução foi entrar na interface _web_ do modem, mudar a senha de administrador e mudar a configuração de DNS. Depois disso, os anúncios em russo pararam de aparecer.

Se tiver curiosidade de ler mais sobre o ocorrido, aqui vão alguns _links_ da época:

- [Novo malware sequestra roteador e enche sites de propagandas - TecMundo][malware-1]
- [Android "infectado" e anúncios "estranhos" são sinais de ataque a roteador \| G1 - Tecnologia e Games][malware-2]
- [Adware Russo que nenhum antivírus elimina - Invasões e infecções - Clube do Hardware][malware-3]
- [Abrindo propagandas e links sozinho - Redes e Internet - Clube do Hardware][malware-4]
- [Adware me enlouquecendo e redirecionando para sites russos - Comunidade do Hardware.com.br][malware-5]
- [This router hack is injecting ads and porn into random websites - The Verge][malware-6]
- [Ad-Fraud Malware Hijacks Router DNS – Injects Ads Via Google Analytics \| University of South Wales:  Cyber University][malware-7]

Desde 2016, quando comprei o MikroTik, já me mudei algumas vezes e sempre o deixo como o roteador da casa, sempre configuro o modem da operadora em modo _bridge_. Com isso, tenho maior controle sobre a rede da minha casa e mais segurança.

## Referências

- [Manual de usuário do Sagemcom Fast 3184][sagemcom] (modelo parecido)
- [Colocar o modem da net Sagemcom F@ST3486 NET DOCSIS 3.0 em modo brigge][youtube]

[bridge]:               https://pt.wikipedia.org/wiki/Bridge_(redes_de_computadores)
[osi]:                  https://pt.wikipedia.org/wiki/Modelo_OSI
[roteador]:             https://pt.wikipedia.org/wiki/Roteador
[mikrotik]:             {% post_url 2020-07-20-primeiros-passos-com-o-mikrotik-hap-ac-roteador-profissional-para-a-rede-de-casa %}
[claro]:                https://www.claro.com.br/
[safe-mode]:            {% post_url 2020-07-21-mikrotik-modo-de-seguranca-safe-mode %}
[ping]:                 https://man7.org/linux/man-pages/man8/ping.8.html
[google-public-dns]:    https://developers.google.com/speed/public-dns/docs/using
[dhcp]:                 https://pt.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol
[cidr]:                 https://www.hardware.com.br/dicas/entendendo-cidr.html
[analytics]:            https://analytics.google.com/
[google]:               https://google.com/
[malware-1]:            https://www.tecmundo.com.br/malware/77194-novo-malware-sequestra-roteador-enche-sites-propagandas.htm
[malware-2]:            http://g1.globo.com/tecnologia/blog/seguranca-digital/post/android-infectado-e-anuncios-estranhos-sao-sinais-de-ataque-roteador.html
[malware-3]:            https://www.clubedohardware.com.br/topic/1114991-adware-russo-que-nenhum-antivírus-elimina/
[malware-4]:            https://www.clubedohardware.com.br/topic/1116552-abrindo-propagandas-e-links-sozinho/
[malware-5]:            https://www.hardware.com.br/comunidade/adware-redirecionando/1372966/
[malware-6]:            https://www.theverge.com/2015/3/25/8290277/router-hack-adware-porn-security-ara-labs
[malware-7]:            https://uwnthesis.wordpress.com/2015/03/26/ad-fraud-malware-hijacks-router-dns-injects-ads-via-google-analytics/
[sagemcom]:                https://www.net.com.br/documento/2019/07/01/hg100rl4_user_guide.pdf
[youtube]:              https://www.youtube.com/watch?v=k7uDrhdEPTI
