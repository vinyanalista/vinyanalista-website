---
date: '2014-01-20 03:53:32 -0300'
date_gmt: '2014-01-20 03:53:32 -0300'
layout: post
published: true
status: publish
title: Reduzindo o tamanho de discos rígidos virtuais do VirtualBox
image: /files/2014/01/virtualbox.png
---

É verdade que quando criamos um disco rígido virtual dinamicamente alocado no [VirtualBox](http://www.virtualbox.org/), ele cresce à medida em que arquivos são gravados. No entanto, seu tamanho não diminui à medida em que excluímos arquivos. Veja agora como é possível reduzir discos rígidos desse tipo no VirtualBox.

<!--more-->

{% include image.html src="/files/2014/01/virtualbox.png" %}

Primeiro, é necessário executar um utilitário na **máquina virtual** (*guest*), que vai transformar todo o espaço livre em *bits* zero no disco rígido virtual. Se sua máquina virtual roda Linux, esse utilitário é o **zerofree**, se roda Windows, há o **SDelete**.

A [página na qual descobri o zerofree](http://www.thelinuxdaily.com/2010/02/shrinking-a-dynamic-virtualbox-disk-image/) recomenda reiniciar o Linux (da máquina virtual) no modo de recuperação (*safe mode* ou *recovery mode*) para executar o **zerofree**. Pra simplificar a vida, eu prefiro inicializar a máquina virtual utilizando um LiveCD.

Se você tiver um LiveCD do Ubuntu, o **zerofree** pode ser instalado nele via:

```
# apt-get install zerofree
```

O openSUSE também possui o **zerofree** nos repositórios oficiais da distribuição:

```
# zypper in zerofree
```

Se for usar o LiveCD de outra distribuição, pesquise na Internet como obter o **zerofree** para a sua distribuição.

Se você não souber identificar o disco rígido, o utilitário **fdisk** pode dar uma pista:

```
# fdisk -l
```

No meu caso, vou compactar o **/dev/sda1**.

Montamos o disco rígido como somente leitura em uma pasta temporária e executamos o **zerofree** nele:

```
# mkdir /mnt/tmp
# mount -o ro /dev/sda1 /mnt/tmp
# zerofree /dev/sda1
```

Se sua máquina virtual roda Windows, você deve baixar o [SDelete](http://technet.microsoft.com/en-us/sysinternals/bb897443.aspx), abrir o Prompt de Comando, ir até a pasta onde o **SDelete** foi baixado e executar o comando:

```
> sdelete -c C:/
```

Onde **C** é a letra da unidade cujo espaço livre deseja-se converter em **bits** zero.

Após executar o **zerofree** ou o **SDelete**, devemos voltar à **máquina real** (*host*) e executar o utilitário do VirtualBox que vai de fato compactar o disco rígido virtual, reduzindo seu tamanho fisicamente.

Se sua máquina real roda Linux:

```
$ VBoxManage modifyhd /caminho/para/o/hd/virtual.vdi --compact
```

Se sua máquina real roda Windows, provavelmente você terá que ir até a pasta do VirtualBox para executar o comando:

```
> cd "C:\Program Files\Oracle\VirtualBox"
> VBoxManage modifyhd "C:\caminho\para\o\hd\virtual.vdi" --compact
```

Foi assim que hoje consegui reduzir um disco rígido virtual de 6,5GB para 5GB. Foi uma redução pequena, mas isso varia de um caso para outro. O autor [desse post no Make Tech Easier](http://www.maketecheasier.com/shrink-your-virtualbox-vm) conseguiu uma redução de 45% no espaço que o disco rígido virtual ocupava (de 10GB para 5,5GB).

Abraço a todos e até mais!

### Referências

- [Shrinking a Dynamic VirtualBox Disk Image | The Linux Daily](http://www.thelinuxdaily.com/2010/02/shrinking-a-dynamic-virtualbox-disk-image/)
- [How To Shrink Your Virtualbox VM And Free Up Space For Your Hard Disk – Make Tech Easier](http://www.maketecheasier.com/shrink-your-virtualbox-vm)