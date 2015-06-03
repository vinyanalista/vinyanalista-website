---
date: '2012-04-21 05:42:01 -0300'
date_gmt: '2012-04-21 05:42:01 -0300'
layout: post
published: true
status: publish
title: Problemas envolvendo bootloaders, MBR e tabela de partições
image: /files/2012/04/computador-maluco.jpg
---

Gente, a tarde de ontem foi um sufoco! Acidentalmente excluí a tabela de partições de um dos meus HDs, pensei que já tinha perdido todos os meus arquivos e passei várias horas tentando recuperá-la. Tentei ferramentas do Windows, do Linux, e acabei conseguindo. Venho compartilhar nesse post o que houve, como resolvi e algumas observações curiosas sobre o ocorrido.

{% include image.html src="/files/2012/04/computador-maluco.jpg" %}

É algo que não desejo a ninguém, mas se algum dia alguém vier a passar pelo que eu passei (ou algo parecido) pode ler as páginas aqui indicadas e ver se alguma das soluções propostas por elas se aplica ao caso.

<!--more-->

### O que aconteceu

Vou tentar ser breve nessa explicação (realmente é uma longa história, se estiverem mais interessados nas possíveis soluções para o problema, podem pular pros próximos tópicos). Tenho dois HDs, particionados como mostra a saída do comando `fdisk` no Linux a seguir. Em resumo, são duas partições pros sistemas operacionais (Windows 7 e [Debian](http://www.debian.org/)) e duas partições para arquivos pessoais.

{% highlight text linenos %}
Disk /dev/sdb: 250.1 GB, 250059350016 bytes
255 heads, 63 sectors/track, 30401 cylinders, total 488397168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x1ba01b9f

Device    Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048   488396799   244197376    7  HPFS/NTFS/exFAT

Disk /dev/sda: 1000.2 GB, 1000204886016 bytes
255 heads, 63 sectors/track, 121601 cylinders, total 1953525168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0xa1a11ae7

Device    Boot      Start         End      Blocks   Id  System
/dev/sda1            2048   419432447   209715200    7  HPFS/NTFS/exFAT
/dev/sda2       419432448  1468008447   524288000    7  HPFS/NTFS/exFAT
/dev/sda3      1468010496  1887440895   209715200    7  HPFS/NTFS/exFAT
/dev/sda4   *  1887442942  1953523711    33040385    5  Extended
/dev/sda5      1887442944  1953523711    33040384   83  Linux
{% endhighlight %}

Como estou pensando em mudar de distribuição, hoje decidi instalar o [openSUSE](http://www.opensuse.org/) no lugar do Debian. Gravei o CD do openSUSE, nenhum procedimento de backup, já que estou acostumado a formatações (um erro, admito), iniciei o computador pelo CD, respondi a todas as perguntas do instalador, iniciou-se a cópia dos arquivos, até aí tudo bem.

O problema começou quando percebi que a cópia dos arquivos estava muito lenta. Imaginei que a causa fosse a mídia, o que confirmei quando reiniciei e executei o teste pelo próprio LiveCD (outro erro: iniciar a instalação sem ter verificado antes a mídia).

Só que a essa altura do campeonato o instalador já tinha formatado a partição que antes era do Debian, o [GRUB](http://www.gnu.org/software/grub/) tornou-se então inutilizável, o que me impediria de acessar o Windows e gravar um novo CD do openSUSE. Iniciei o computador pelo [Slax](http://www.slax.org/) que tenho em um pendrive e tentei gravar o CD do openSUSE por ele usando o [K3B](http://k3b.org/) (seria a solução mais prática, já que instalando o openSUSE eu teria o GRUB e o Windows de volta, né?), sem sucesso. Eis que decidi [remover o GRUB do HD](http://www.cyberciti.biz/faq/linux-how-to-uninstall-grub/) para que o computador iniciasse diretamente pelo Windows. Aí foi onde eu cometi o erro mais grave de todos.

O comando que eu queria executar deveria apagar apenas o gerenciador de boot (bootloader) do Linux, o GRUB, no entanto ele apagou a MBR inteira, incluindo a tabela de partições. O comando que eu utilizei foi:

{% highlight bash %}
# dd if=/dev/null of=/dev/sda bs=512 count=1
{% endhighlight %}

Quando deveria ser (esses comandos eu obtive [aqui](http://www.cyberciti.biz/faq/linux-how-to-uninstall-grub/), por que o cidadão que escreveu aquele tutorial tinha que ter colocado aquele comando primeiro, hein?):

{% highlight bash %}
# dd if=/dev/null of=/dev/sda bs=446 count=1
{% endhighlight %}

Quando reiniciei o computador, aparece na tela a mensagem de sistema operacional ausente. Foi então que executando o [GParted](http://gparted.sourceforge.net/) através de um LiveCD do [Ubuntu](http://www.ubuntu.com/) percebi o engano: ele informava que o HD não tinha uma tabela de partições (já citei aqui quatro distribuições, perceberam? rsrsrs).

### Primeiro problema: recuperar a tabela de partições

Inseri o DVD de instalação do Windows 7 e tentei a recuperação de inicialização, como sugerido por [esse site](http://www.howtogeek.com/howto/windows-vista/fixing-bootmgr-is-missing-error-while-trying-to-boot-windows-vista/) (lá você encontra o passo-a-passo com imagens, elas são da instalação do Windows Vista, mas as telas permaneceram iguais na instalação do Windows 7, vou copiar apenas a tela que achei mais importante):

1. Inseri o DVD de instalação do Windows 7 na unidade e iniciei o computador por ele;
2. Na primeira tela, selecionei meu idioma e meu modelo de teclado e cliquei em “Avançar”;
3. Cliquei no link “Reparar seu computador”;
4. Na lista em que ele manda selecionar o sistema operacional, eu não selecionei nenhum (sem a tabela de partições ele não conseguiria identificar o sistema que estava instalado) e cliquei em Avançar;
5. Eis que apareceu a seguinte tela com as opções de recuperação oferecidas pelo DVD de instalação do Windows 7 (volto a falar dela já já):

{% include image.html caption="Ferramentas de recuperação disponibilizadas no DVD de instalação do Windows 7" src="/files/2012/04/win7-system-recovery-options.jpg" %}

Eu cliquei em “Startup Repair”, esperei ele concluir o reparo, e após isso, reiniciei o computador, mas nada mudou.

Depois disso iniciei novamente o computador pelo DVD do Windows 7 e tentei reparar manualmente o MBR, como sugerido [nesse outro site](http://www.howtogeek.com/howto/32523/how-to-manually-repair-windows-7-boot-loader-problems/). Os primeiros passos são os mesmos, exceto que, chegando na tela da imagem acima, ao invés de clicar em “Startup Repair” eu cliquei em “Command Prompt” para digitar os comandos manualmente. Tentei o seguinte comando, reiniciei pra ver se algo mudou, e vi que o erro permanecia.

{% highlight powershell %}
> bootrec /fixmbr
{% endhighlight %}

Repeti os passos, executei esse outro comando, reiniciei novamente, e nada mudou:

{% highlight powershell %}
> bootrec /fixboot
{% endhighlight %}

Por último, testei esse outro comando de terminal sugerido [nessa página](http://www.ehow.com/how_4836283_repair-mbr-windows.html), seguindo praticamente os mesmos procedimentos (só mudou o comando, claro), e aparentemente nada mudou, de novo:

{% highlight powershell %}
> bootsect /nt60 all
{% endhighlight %}

Inseri o LiveCD do Ubuntu na unidade e iniciei o Linux por ele. Já estava disposto a tentar alguma ferramenta Linux, quando abri o [Nautilus](http://live.gnome.org/Nautilus) e verifiquei que todas as partições estavam listadas. Eu as abri, abri algumas pastas, abri alguns arquivos, tudo aparentemente estava no lugar.

Apenas a título de curiosidade, gostaria de listar as duas soluções que (talvez) fossem possíveis no Linux (não cheguei a precisar delas, já que consegui me virar com o DVD do Windows 7, e sinceramente, não sei se pretendo repetir as condições necessárias para testá-las): [gpart](http://ubuntuforums.org/showthread.php?t=370121), um programa que você pode instalar no Ubuntu (há [essa outra página](http://www.hardware.com.br/dicas/fazendo-backup-recuperando-mbr-tabela-particoes.html) um tanto desatualizada do Morimoto que também fala dele) que, pelo que eu entendi, lê o HD inteiro e tenta recompor a tabela de partições dele

Bom, que alívio! Algum dos procedimentos anteriores (não sei qual) recuperou minhas partições. Talvez eu tivesse que instalar novamente o Windows e o Linux, mas meus dados ao menos já estavam salvos. Devolvida a tabela de partições ao HD, agora eu tinha que recuperar a outra parte do MBR: o gerenciador de boot (bootloader).

### Segundo problema: recuperar o gerenciador de boot

Recuperadas as partições, agora eu poderia gravar o CD do openSUSE e continuar com a instalação, mas antes eu precisaria acessar o sistema operacional. Então, eu precisaria que pelo menos o bootloader do Windows estivesse funcionando. Com a tabela de partições comprovadamente recuperada, voltei a tentar os procedimentos acima descritos usando o DVD de instalação do Windows 7, e **nada**!

Eis que decidi instalar o Ubuntu para ter ao menos um sistema operacional funcionando no meu disco rígido (no caso, instalei o Ubuntu na partição Linux que antes era do Debian e que eu desejava que fosse então do openSUSE). A instalação devolveu o GRUB ao MBR e, por incrível que pareça, o GRUB listava o Windows 7 juntamente com o Ubuntu como sistemas operacionais disponíveis.

### Terceiro problema: recuperar a inicialização do Windows

Imaginava que agora eu conseguiria acessar o Windows, mas esbarrei em um novo problema. A tela exibida quando eu iniciava o computador e escolhia o Windows na lista do GRUB era a seguinte (clique na imagem para ampliar):

{% include image.html caption="Erro 0xc000000e" src="/files/2012/04/erro-0xc000000e.jpg" %}

Mais uma rodada de tentativas executando aqueles comandos que eu mostrei acima, e dessa vez houve algum resultado: só que o sistema ainda não funcionou, o erro foi que mudou. Agora a tela exibia:

{% include image.html caption="BOOTMGR is missing" src="/files/2012/04/erro-bootmgr.png" %}

Encontrei algumas soluções na Internet, mas decidi tentar primeiro a que tinha [no site da Microsoft](http://support.microsoft.com/kb/2622803): tentei o método 2 fornecido nessa página, que consiste em executar, da mesma forma que os comandos anteriores, o comando:

{% highlight powershell %}
> Bootrec /RebuildBcd
{% endhighlight %}

Executei, reiniciei o computador e, novamente, **nada**! Em dois fóruns ([aqui](http://www.tomshardware.com/forum/6610-63-0xc000000e-caused-media-drive) e [aqui](http://forum.clubedohardware.com.br/resolvido-bootmgr-is/674691)) eu vi a sugestão de desconectar todos os HDs e dispositivos removíveis (pendrives, cartões de memória, etc.) antes de executar o comando acima, deixando apenas o disco que se quer recuperar. Desliguei meu computador, abri o gabinete, retirei o cabo de força do outro HD que eu tenho, tirei o pendrive que tinha o Slax, reiniciei o procedimento e... **nada**!

A última sugestão que eu tentei foi a solução definitiva. [Nesse site](http://www.pcdicasuteis.com/bootmgr-is-missing-press-ctrlaltdel-to-restart-windows-7), eles indicam copiar o arquivo BOOTMGR do DVD de instalação do Windows pro HD no qual ele está faltando. Eu iniciei o computador por esse DVD, abri o terminal (como indicado acima) e executei os seguintes comandos (suponha que `D:` seja a sua unidade de CD/DVD na qual se encontra o DVD de instalação do Windows 7 e `C:` seja o disco rígido que você pretende reparar):

{% highlight powershell %}
> cd D:
> copy bootmgr C:
{% endhighlight %}

Simples assim! Reiniciei o computador e ele carregou o sistema operacional do mesmo jeito que estava antes.

### Quarto problema: recuperar o GRUB (de novo)

Só que essa solução me trouxe dois problemas: o GRUB sumiu (imagina só: agora que eu consegui acessar o Windows, não consigo mais acessar o Linux!) e aquela imagem da bandeira do Windows brilhando não aparece mais na inicialização, ao invés disso, é a barra verde do Vista (isso não chega a ser um problema, mas não deveria acontecer, veja nas imagens a seguir o antes e o depois).

{% include image.html caption="O que aparecia antes enquanto o Windows 7 era carregado" src="/files/2012/04/win7-boot.jpg" %}

{% include image.html caption="O que aparece agora" src="/files/2012/04/winvista-boot.jpg" %}

Eu poderia [facilmente recuperar o GRUB](http://www.vivaolinux.com.br/dica/Restaurando-o-GRUB-apos-a-instalacao-de-outro-sistema-operacional) para conseguir acessar o Linux, mas como a instalação do Ubuntu era provisória, preferi gravar o CD do openSUSE e instalá-lo por cima do Ubuntu, o que devolveu o GRUB ao MBR e o atualizou para fornecer o Windows 7 e o openSUSE como opções. Desliguei o computador, devolvi o cabo de força do outro HD, liguei de novo pra ver se estava tudo bem, ele reconheceu o “novo” disco rígido… Agora está tudo como era antes, e com o Linux novo, como eu queria.

Antes de instalar o openSUSE, obviamente, eu fiz uma [cópia do MBR](http://www.hardware.com.br/dicas/fazendo-backup-recuperando-mbr-tabela-particoes.html), já pensou se eu tivesse problemas com isso de novo? Para isso, usei o próprio LiveCD do openSUSE, executando o seguinte comando como root em uma janela de terminal (suponha que `/dev/sda` seja o caminho para o HD cujo MBR você deseja copiar):

{% highlight bash %}
# dd if=/dev/sda of=backup.mbr bs=512 count=1
{% endhighlight %}

Aqui fica uma dica aos que um dia precisarem fazer algum dia o backup de um MBR: por motivos óbvios, você não deve salvar esse backup no mesmo disco (não falo na mesma partição não, é no mesmo disco, mesmo!). Se acidentalmente o MBR desse disco for excluído, como você vai conseguir acessar dentro do disco o arquivo que contém o backup para restaurá-lo? O trauma com essa experiência foi tão grande que o backup que eu fiz do MBR eu salvei nos meus dois pendrives.

### Considerações finais (e minhas observações)

Tudo bem que o problema inicial foi causado por falha humana (e, diga-se de passagem, minha), no entanto, eu observei que alguns dos problemas durante a tentativa de correção foram causados pela **insuficiência das soluções propostas** em diversos lugares na Internet, seja em termos de **eficiência** (nenhuma delas corrigia o problema por completo), seja em termos de **documentação** (cada página poderia explicar o porquê de estarmos usando aquela ou outra solução, ou talvez até haja informação sobre cada uma dessas soluções, mas a urgência em resolver o problema e a falta de tempo em procurar explicações pesaram mais). Isso pode ter me levado a executar um comando ou outro em um momento inapropriado e pode ter adiado o desfecho da história por mais algumas etapas. Mesmo a documentação oficial da Microsoft oferece algumas possíveis soluções para problemas muito semelhantes.

Bem, em relação à documentação, achei bastante interessante a cooperação entre os usuários. Um dos detalhes fundamentais à solução do meu problema eu achei [em um fórum](http://forum.clubedohardware.com.br/resolvido-bootmgr-is/674691) e a solução final eu achei [em um blog](http://www.pcdicasuteis.com/bootmgr-is-missing-press-ctrlaltdel-to-restart-windows-7). Fico feliz de ver que as pessoas na Internet estão dispostas a ajudar umas as outras e que a solução do problema de uma pessoa serve para outras, **a Internet é um ambiente colaborativo**. Por isso estou compartilhando aqui o que aconteceu comigo, talvez esse texto, contendo as indicações dos links que eu visitei, possa servir a alguém.

Outra observação curiosa que eu fiz foi que as ferramentas da Microsoft só conseguiram recuperar a inicialização do Windows depois que o GRUB voltou a funcionar corretamente, com a instalação do Linux; no entanto, a correção do Windows removeu o GRUB do MBR, impedindo o acesso ao Linux (que bela forma de agradecer o favor, né? rsrsrsrs) Na minha opinião, **as ferramentas da Microsoft deveriam ser suficientes para recuperar ao menos o Windows**. Se as pessoas que não usam Linux passassem por um problema desses (imagine o MBR sendo destruído por um vírus, por exemplo), talvez não conseguissem recuperar o sistema e acabassem formatando.

Finalmente, algo inusitado foi **a remoção do arquivo BOOTMGR da partição do Windows**. Nenhuma das páginas que eu consultei me instruiu a excluí-lo (nem eu o fiz, ao menos não que eu soubesse). Isso significa que alguma das ferramentas que eu utilizei para tentar recuperar o Windows acabou excluindo esse arquivo acidentalmente. Ferramentas que resolvem um problema e criam outro não são realmente de grande utilidade…

E que esse post sirva para refletir sobre **o trabalho e a responsabilidade de um técnico**: eu ainda sabia o que provocou o erro (até porque fui eu mesmo que causei), mas imagina tentar entender a explicação de um usuário! Vejam também quanta mão-de-obra e quanta paciência requer resolver um problema desses! Como nada é muito bem documentado, eu tive que resolver meu problema na base da tentativa e erro! Muitos “técnicos” simplesmente se limitariam a formatar o computador e obrigar o usuário a reaver (ou refazer, o que seria pior) tudo aquilo que tinha, quando uma solução menos danosa era possível e ele não tentou o bastante!

Um abraço a todos, e até a próxima aventura deste técnico que vos escreve! E espero que alguém mais entendido possa me esclarecer o motivo da confusão. Não a confusão “do início”, que fui eu que causei, mas a confusão “do meio”, imagino que a solução do meu problema não deveria ter tantos arrodeios, já que a maioria dos usuários relatam que um ou dois comandos deveriam resolver os problemas (podem conferir nos links que eu mencionei ao longo da resolução)...