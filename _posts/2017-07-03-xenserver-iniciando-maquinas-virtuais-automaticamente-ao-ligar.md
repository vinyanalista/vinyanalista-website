---
date: '2017-07-03 01:25:00 GMT-3'
layout: post
published: true
title: XenServer iniciando máquinas virtuais automaticamente ao ligar
image: /files/2017/07/xenserver.jpg
---

Servidores são diferentes de *desktops* em muitos sentidos. Um deles é que eles podem ser configurados para ligar automaticamente assim que percebem a presença de energia: após uma queda, quando a rede elétrica é restabelecida, automaticamente o servidor liga e começa a carregar o sistema operacional. Isso reduz o tempo para restabelecer os serviços, ainda mais em casos onde o servidor está distante e se dirigir até ele para apertar um botão de ligar pode ser inviável.

Esse recurso, apesar de ajudar bastante, pode se mostrar insuficiente quando o servidor é na verdade um [virtualizador][virtualizador], como o [XenServer][xenserver]: nesse caso, também é necessário iniciar as máquinas virtuais.

Felizmente, o XenServer nos permite configurá-lo para iniciar máquinas virtuais logo após a inicialização do virtualizador. Como fazer isso é o que você verá nesse *post*.

{% include image.html src="/files/2017/07/xenserver.jpg" %}

Se você está acostumado com a interface gráfica de gerenciamento do XenServer para [Windows][windows], o [XenCenter][xencenter], saiba que não contará com sua conveniência dessa vez. A [documentação do XenServer][documentacao-xenserver] informa que essa configuração foi removida do XenCenter na versão 6.0 por interferir de forma imprevisível em funcionalidades de [alta disponibilidade (*high availability*)][ha]. Mas você verá como é fácil fazer essa configuração pela linha de comando.

Se você utiliza a [Xen Orchestra][xen-orchestra], uma interface *web* extra oficial, saiba que ela disponibiliza essa configuração [de forma gráfica][documentacao-xen-orchestra]. Nos bastidores, ela faz o que faremos aqui.

O procedimento a seguir funciona pelo menos nas versões 6.5 e 7.0 do XenServer.

Sem mais conversa, vamos por a mão na massa!

## 1) Acesse o console do virtualizador

Se você utiliza [Linux][linux], pode fazer isso via [SSH][ssh] (substitua `192.168.25.5` pelo endereço IP do seu virtualizador):

```
$ ssh root@192.168.25.5
```

Se você utiliza Windows, pode se conectar ao XenServer via SSH usando o [Putty][putty] ou acessar o console do virtualizador pelo XenCenter, selecionando o virtualizador e clicando na aba **Console**.

## 2) Liste os pools

[*Pools*][xenserver-pools] são agrupamentos de virtualizadores XenServer. Permitem que vários virtualizadores se somem e se comportem como um só.

Liste os *pools* do seu virtualizador com o comando:

```
# xe pool-list
```

Se você não o adicionou a nenhum *pool*, ele possui apenas o próprio *pool* e o comando deve retornar algo como:

```
uuid ( RO)                : 10e52888-52eb-e445-7d8f-0ad7f8396694
          name-label ( RW):
    name-description ( RW):
              master ( RO): 726d7a9e-3e54-493f-8395-834e5c94d7f5
          default-SR ( RW): 0130555a-b493-470a-4e92-29411697ba6f
```

Observe o `uuid` do *pool* (primeira linha), vamos utilizá-lo no próximo passo.

## 3) Configure o pool para iniciar automaticamente

Execute o comando a seguir para habilitar o início automático do seu *pool* (substitua o `uuid` pelo do seu *pool*):

```
# xe pool-param-set uuid=10e52888-52eb-e445-7d8f-0ad7f8396694 other-config:auto_poweron=true
```

## 4) Liste as máquinas virtuais

Agora, vamos habilitar o início automático das máquinas virtuais. Antes, precisamos obter o `uuid` de cada máquina virtual que desejamos iniciar automaticamente com o virtualizador.

Para listar as máquinas virtuais, execute o comando a seguir:

```
# xe vm-list
```

Ele deve retornar algo parecido com:

```
uuid ( RO)           : 44397d64-d569-036d-b9f6-eaf23ad2f24b
     name-label ( RW): firewall.minhacasa.net - pfSense 2.3
    power-state ( RO): running


uuid ( RO)           : de7ac7e8-b0f3-9ee2-19ef-eda6b2b9b368
     name-label ( RW): ad.minhacasa.net - Windows Server 2016
    power-state ( RO): running
```

Você pode identificar as máquinas virtuais por seu `name-label`. Anote (ou copie, se possível) o `uuid` daquelas que devem iniciar automaticamente.

## 5) Configure a máquina virtual para iniciar automaticamente

Para cada máquina virtual que deve ser iniciada automaticamente, execute o comando a seguir (substitua o `uuid` pelo da sua máquina virtual):

```
# xe vm-param-set uuid=44397d64-d569-036d-b9f6-eaf23ad2f24b other-config:auto_poweron=true
```

Pronto! Feito isso, você pode ficar tranquilo de que, havendo alguma queda de energia, aquele servidor essencial voltará assim que for possível.

Espero que essa dica possa ser útil. Até a próxima!

## Referências

- [How to Setup XenServer 6.x to Auto-Start Virtual Machines][documentacao-xenserver]
- [Auto start VM on XenServer boot][documentacao-xen-orchestra]

[virtualizador]: https://pt.wikipedia.org/wiki/Hipervisor
[xenserver]: https://xenserver.org/
[windows]: https://www.microsoft.com/pt-br/windows/
[xencenter]: https://xenserver.org/partners/developing-products-for-xenserver/21-xencenter-development/88-xc-dev-home.html
[documentacao-xenserver]: https://support.citrix.com/article/CTX133910
[ha]: https://pt.wikipedia.org/wiki/Sistema_de_alta_disponibilidade
[xen-orchestra]: https://xen-orchestra.com/
[linux]: https://www.vivaolinux.com.br/linux/
[documentacao-xen-orchestra]: https://xen-orchestra.com/blog/auto-start-vm-on-xenserver-boot/
[linux]: https://www.vivaolinux.com.br/linux/
[ssh]: https://pt.wikipedia.org/wiki/Secure_Shell
[putty]: http://www.putty.org/
[xenserver-pools]: http://docs.citrix.com/de-de/xencenter/6-5/xs-xc-pools/xs-xc-pools-about.html
