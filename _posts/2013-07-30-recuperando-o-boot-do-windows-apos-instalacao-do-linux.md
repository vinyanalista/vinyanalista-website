---
date: '2013-07-30 02:50:45 -0300'
date_gmt: '2013-07-30 02:50:45 -0300'
layout: post
published: true
status: publish
title: Recuperando o boot do Windows após instalação do Linux
image: /files/2013/07/windows-startup-recovery1.jpg
---

É, pessoal, sei que é uma situação um tanto inusitada, mas aconteceu comigo hoje, quando tentei instalar o [openSUSE](http://www.opensuse.org/) 12.3 no meu computador, que até então só tinha o Windows 7. O problema mais comum é quando [o Linux já está instalado e então instalamos o Windows](http://www.vivaolinux.com.br/dica/Restaurando-o-GRUB-apos-a-instalacao-de-outro-sistema-operacional), que a princípio impede que outros sistemas sejam inicializados, reservando o computador para si. Mas hoje comigo aconteceu isso: após instalar o openSUSE 12.3, o menu do [GRUB2](http://en.opensuse.org/GRUB) não oferecia a opção de inicializar o Windows. Venho aqui (tentar) descrever a solução.

### Instalação do openSUSE

A configuração dos meus HDs é bastante semelhante àquela encontrada ano passado quando escrevi [outro post]({% post_url 2012-04-21-problemas-envolvendo-bootloaders-mbr-e-tabela-de-particoes %}) sobre problemas com *dual boot*. Naquela época, usava Debian e estava pensando em migrar pro openSUSE, o que de fato aconteceu e desde então é a distribuição que uso. Aliás, foi bom reler aquele post e perceber que [essa não é a primeira vez que tenho problemas em relação ao *dual boot* com openSUSE]({% post_url 2012-04-21-problemas-envolvendo-bootloaders-mbr-e-tabela-de-particoes %}).

Executando o comando **fdisk**, obtenho o seguinte:

<script type="syntaxhighlighter" class="brush: text"><![CDATA[
Disk /dev/sda: 1000.2 GB, 1000204886016 bytes
255 heads, 63 sectors/track, 121601 cylinders, total 1953525168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0xa1a11ae7

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1            2048   419432447   209715200    7  HPFS/NTFS/exFAT
/dev/sda2       419432448  1468008447   524288000    7  HPFS/NTFS/exFAT
/dev/sda3      1468010496  1887440895   209715200    7  HPFS/NTFS/exFAT
/dev/sda4   *  1887442942  1953523711    33040385    5  Extended
/dev/sda5      1887442944  1953523711    33040384   83  Linux

Disk /dev/sdb: 250.1 GB, 250059350016 bytes
255 heads, 63 sectors/track, 30401 cylinders, total 488397168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x1ba01b9f

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048   488396799   244197376    7  HPFS/NTFS/exFAT
]]></script>

Durante a instalação do openSUSE 12.3, não alterei as configurações do *bootloader*. O instalador automaticamente selecionou a melhor configuração para o meu computador (que no caso de o Linux estar em uma partição estendida, é [instalar o *bootloader* na partição estendida](http://en.opensuse.org/SDB:Prefered_bootloader_options)).

### Recuperação do bootloader do Windows

Na busca por soluções, encontrei [este site](http://www.howtogeek.com/howto/33433/restore-the-windows-boot-loader-after-an-ubuntu-update/) e tentei algumas alternativas nele apresentadas, que descrevo a seguir (só depois vim perceber que já havia as listado no [post anterior]({% post_url 2012-04-21-problemas-envolvendo-bootloaders-mbr-e-tabela-de-particoes %}), mas tudo bem, não custa repetir):

1. Iniciei o computador pelo DVD de instalação do Windows 7. Na tela inicial, escolhi meu idioma (que não é inglês, quero reconhecer [o crédito do autor das imagens](http://www.howtogeek.com/howto/33433/restore-the-windows-boot-loader-after-an-ubuntu-update/)) e cliquei em “Avançar”:

{% include image.html src="/files/2013/07/windows-startup-recovery2.jpg" %}

2. Em seguida, cliquei em “Reparar o computador”:

{% include image.html src="/files/2013/07/windows-startup-recovery3.jpg" %}

3. Nessa tela, escolhi a primeira opção, não selecionei nada na lista, e cliquei em “Avançar”:

{% include image.html src="/files/2013/07/windows-startup-recovery4.png" %}

4. Finalmente, nessa tela, diferentemente do autor, escolhi a primeira opção, “Startup Recovery”:

{% include image.html src="/files/2013/07/windows-startup-recovery5.png" %}

A instalação executou seus procedimentos de manutenção, após os quais reiniciei o computador. Ainda nada de Windows, e agora ele não exibia mais nem o menu do GRUB2, acusando que havia múltiplas partições ativas.

Executei novamente os passos 1 a 3 acima, até chegar naquela tela em que cliquei em “Startup Recovery”, mas dessa vez escolhi “Command Prompt”. Executei o seguinte comando e reiniciei o computador:

```
> bootrec /rebuildbcd
```

Nada mudou: além de não conseguir acessar o Windows, não conseguia acessar o menu do GRUB2, e ainda havia a reclamação de duas partições ativas. Agora vejo no meu post anterior que [eu poderia ter tentado outros comandos](http://www.vinyanalista.com.br/blog/2012/04/21/problemas-envolvendo-bootloaders-mbr-e-tabela-de-particoes/), mas enfim… hoje o que eu executei foi esse e consegui resolver. Não após ele, ainda falta alguns passos da minha solução...

### Definição da partição ativa

Reiniciei o computador dessa vez usando o LiveDVD do openSUSE 12.3. Abri o [GParted](http://gparted.sourceforge.net/) e vi que tanto a partição do Windows (**/dev/sda1**) quanto a partição estendida (**/dev/sda4**) estavam definidas como ativas. Defini que apenas a partição estendida deveria ser ativa.

Reiniciei novamente o computador e dessa vez consegui o menu do GRUB2, ainda sem a opção do Windows. Só faltava isso para o problema estar resolvido.

### Reconfiguração do GRUB2

Iniciei o computador pelo openSUSE instalado no HD. Após pesquisar e ler um bocadinho, descobri que o comando responsável pela reconfiguração do GRUB2 no openSUSE é o seguinte:

```
# grub2-mkconfig -o /boot/grub2/grub.cfg
```

Reiniciei o computador, mas nada mudou... iniciei o openSUSE novamente. Agora não me perguntem por que cargas d’água, **esse comando só funcionou depois que eu montei a partição do Windows** (isso pode ser feito pelo Dolphin, ao tentar abrir a partição do Windows, ou, para os mais experientes, usando o comando **mount**). Montei a partição do Windows, executei a reconfiguração do GRUB2 novamente e, dessa vez, quando reiniciei o computador, tudo estava normal de novo…

### Configurando o GRUB2 para iniciar o Windows por padrão

Aproveito a oportunidade para passar aqui uma dica preciosa para os usuários de Linux que, infelizmente, não são os únicos usuários do computador. Na minha casa, tanto meu irmão quanto minha mãe só usam Windows. Por isso, sempre deixo o Windows iniciando por padrão. No openSUSE, isso [pode ser feito de maneira fácil através da interface gráfica do YaST](http://doc.opensuse.org/documentation/html/openSUSE/opensuse-reference/grub2.html#grub2.yast2.config.default):

1. Inicie o YaST pelo Kickoff. Forneça a senha de root para que ele possa abrir.
2. Clique em “Carregador de inicialização” (*Boot loader*, no inglês).
3. Clique em “Opções do carregador de inicialização” (*Boot Loader Options*).
4. Em “Seção de inicialização padrão” (*Default Boot Section*), selecione qual sistema deseja que seja iniciado por padrão.
5. Clique em “OK” e depois em “OK” novamente para ativar as mudanças.

### Considerações finais

Pois é, pessoal. Não sei explicar o que ocasionou esse problema no meu computador, mas sei que ele aconteceu, eu tive que buscar uma solução, encontrei e estou compartilhando aqui com vocês. Parece que nem sempre o instalador do openSUSE, apesar de muito inteligente, faz as coisas como deveria… o dual boot será algo que a equipe do openSUSE precisa rever em seu instalador?

Aliás, essa não é a única coisa estranha que percebo no openSUSE: meu netbook (que só eu uso, é um [ASUS EeePC 1015PEM](http://www.asus.com/Notebooks_Ultrabooks/Eee_PC_1015PEM/)) às vezes suspende quando volta da hibernação. Acontece o seguinte: eu paro de usar o netbook e o fecho. Ele inicia a hibernação. Quando o abro e volto a usar (ele volta da hibernação), alguns segundos depois o KDE avisa que a bateria está em nível crítico (0%, que loucura!) e que necessita suspender, e é isso que ele faz. Se conecto o carregador antes de abrir o netbook, consigo evitar a suspensão, mas não sei porque isso acontece, mesmo quando ele tá com a bateria cheia...

Abraço a todos e até a próxima!