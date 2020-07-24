---
date: 2020-07-24 02:00:00 GMT-3
image: '/files/2020/07/kingston-a400-480gb.jpg'
layout: post
published: true
title: 'Como resolver o problema do SATAFIRM S11 do SSD Kingston A400 (e outros modelos)'
---

{% include image.html src="/files/2020/07/kingston-a400-480gb.jpg" %}

Mês passado eu estava usando meu _notebook_ quando de repente os programas começaram a apresentar diversas mensagens de erro. Reiniciei o computador e, para minha surpresa, o sistema operacional não iniciou, apresentando mensagem de erro relacionada ao meu [SSD Kingston A400 de 480GB][ssd-kingston], que agora era reconhecido como **SATAFIRM S11**.

{% include image.html src="/files/2020/07/satafirm-s11-erro.jpg" %}

Nesse _post_, vou mostrar como resolvi esse problema e informações que podem te ajudar, caso você também possua um SSD desse modelo e tenha se deparado com o mesmo erro.

## Como diagnosticar esse problema?

Você pode verificar de algumas formas que seu SSD é reconhecido como **SATAFIRM S11**.

Você pode ver essa informação acessando o _setup_ da [BIOS] do computador. Como fazer isso varia de modelo para modelo, você pode consultar o manual do seu computador. No caso do meu _notebook_, um [Acer Aspire E 15][acer], eu fico apertando **F2** assim que ele liga:

{% include image.html src="/files/2020/07/satafirm-s11-bios.jpg" %}

No [Windows], você pode ver essa informação abrindo o **Gerenciador de Dispositivos**:

{% include image.html src="/files/2020/07/satafirm-s11-windows.jpg" %}

Como eu não conseguia iniciar o sistema operacional, usei um _[case]_ para conectar o SSD a uma porta USB de outro computador com Windows. Se isso não é uma opção para você, pode manter o SSD no computador e usar o [Hiren's BootCD][hirensbootcd].

No outro computador com Windows, eu tentei usar o programa [Kingston SSD Manager][ksm] da própria fabricante, mas ele não reconhecia o SSD como sendo da Kingston, uma vez que era reportado como **SATAFIRM S11**. No Hiren's BootCD, eu não consegui instalar esse programa.

Se você usa uma distribuição [Linux] com a área de trabalho [GNOME], como é o caso do [Linux Kamarada][kamarada-15.1], que eu uso, e também do [Ubuntu], que é uma das distribuições mais populares, pode ver essa informação abrindo o aplicativo **Discos**:

{% include image.html src="/files/2020/07/satafirm-s11-linux.png" %}

No caso do Linux, você não precisa remover o SSD do computador para diagnosticar o problema, você pode iniciar o Linux a partir de um [LiveUSB].

Outros comandos do Linux que podem ser usados para detectar o problema são apresentados a seguir (mostro apenas a parte relevante das saídas dos comandos):

- comando **[fdisk]**:

```
# fdisk -l
Disco /dev/sda: 447,1 GiB, 480103981056 bytes, 937703088 setores
Modelo de disco: SATAFIRM   S11  
[...]
```

- comando **[hdparm]**:

```
# hdparm -I /dev/sda

/dev/sda:

ATA device, with non-removable media
	Model Number:       SATAFIRM   S11                          
	Serial Number:      50026B7782026D18    
	Firmware Revision:  SBFK71W1
	Transport:          Serial, ATA8-AST, SATA 1.0a, SATA II Extensions, SATA Rev 2.5, SATA Rev 2.6, SATA Rev 3.0
Standards:
[...]
```

- comando **[smartctl]**:

```
# smartctl -a /dev/sda
smartctl 6.6 2017-11-05 r4594 [x86_64-linux-4.12.14-lp151.28.36-default] (SUSE RPM)
Copyright (C) 2002-17, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Device Model:     SATAFIRM   S11
Serial Number:    50026B7782026D18
LU WWN Device Id: 5 0026b7 782026d18
Firmware Version: SBFK71W1
User Capacity:    480.103.981.056 bytes [480 GB]
[...]
```

## O que ocasiona esse problema?

Pesquisando na Internet, o que se tem de informação é que esse problema é comum a modelos de SSD (inclusive de outras marcas, não só da Kingston) que são fabricados com a controladora **Phison S11**. Dependendo da versão do _[firmware]_ instalado no SSD (o _software_ que controla o SSD), em algum momento, não se sabe quando ou porque, ele pode se desprogramar e perder a configuração específica do fabricante, passando a se identificar de forma genérica pro computador como sendo do "modelo" **SATAFIRM S11**.

No caso da série Kingston A400, sabe-se que esse problema pode acontecer em SSDs cujo _firmware_ está na versão **SBFK71W1**, que foi justamente a que veio de fábrica no meu SSD.

Nos exemplos acima, o aplicativo Discos do Linux, assim como os comandos **hdparm** e **smartctl** do Linux mostram a versão do _firmware_ instalada no SSD.

Você também pode ver a versão do _firmware_ que veio de fábrica na etiqueta no seu SSD:

{% include image.html src="/files/2020/07/kingston-ssd.jpg" %}

Nessa etiqueta, você também pode ver o código do produto: no meu caso, **SA400S37/480G**.

## É possível prevenir esse problema?

Talvez sim. Se você possui um SSD Kingston A400 instalado no computador e funcionando, experimente usar o programa [Kingston SSD Manager][ksm] da própria fabricante (disponível apenas para Windows) para verificar se é possível atualizar o _firmware_ do SSD.

Além disso, serve para qualquer modelo de SSD de qualquer fabricante e com qualquer versão de _firmware_: **mantenha um _backup_ de seus dados pessoais sempre em dia e armazenado em mídia e local seguros**. Em caso de problemas como esse, um _backup_ pode te livrar de perder muitos dos seus dados.

## Como eu resolvi esse problema

A Kingston oferece [garantia condicional de 3 anos][garantia] para o modelo de SSD A400.

Felizmente, eu comprei meu SSD em junho de 2018 na [Kabum] e, portanto, em junho de 2020, 2 anos depois, ainda estava na garantia da Kingston.

Meu _backup_ não estava em dia, mas os arquivos mais importantes estavam armazenados em serviços na nuvem, como o [Dropbox].

Usando um LiveUSB do Linux Kamarada, consegui montar as partições do SSD como somente leitura e fazer _backup_ de quase todos os arquivos para um HD externo. Não consegui copiar todos os arquivos, alguns apresentaram erro de entrada e saída.

Acionei a garantia, enviei meu SSD pelos [Correios] e a Kingston me enviou um SSD novo do mesmo modelo, também pelos Correios. Eu arquei com os custos do envio do SSD defeituoso, enquanto a Kingston arcou com os custos do envio do SSD novo.

Esse vídeo, da própria Kingston, mostra como acionar a garantia:

{% include youtube.html id="xUNBfa9GpmM" %}

A seguir, uma captura de tela do Kingston SSD Manager mostrando o SSD novo:

{% include image.html src="/files/2020/07/kingston-ssd-manager.jpg" %}

## Soluções alternativas

Caso seu SSD não esteja mais na garantia, ainda assim eu recomendo que você entre em contato com a assistência da fabricante para verificar se eles recomendam alguma solução oficial.

Se você já deu seu SSD como perdido, não tem nada a perder e se sente a fim de tentar uma solução extraoficial, você pode fazer uma [pesquisa no Google][google] e tentar uma das soluções sugeridas por outras pessoas que se depararam com o mesmo problema. Note que eu não testei nenhuma dessas soluções, portanto não me arrisco a indicar uma em específico. Vi que todas sugerem a execução de algum programa no Windows. Alguns desses programas não são nem específicos para o SSD da Kingston. Eu tentaria uma solução dessas só realmente em último caso. Se você possui mais de um HD ou SSD instalado no mesmo computador, tome cuidado para não selecionar o dispositivo errado na hora de executar o procedimento, o que pode levar a perda irreversível de dados. Como precaução, remova do computador qualquer dispositivo que não for necessário à realização do procedimento.

## Referências

Eu soube dos comandos para Linux mostrados acima nessas páginas:

- [Linux: Find out serial / model number and vendor information for SATA and IDE hard disk  - nixCraft][cyberciti]
- [How to see disk details like manufacturer in Linux - Unix & Linux Stack Exchange][stackexchange]

[ssd-kingston]:     https://www.kingston.com/br/ssd/a400-solid-state-drive?partnum=SA400S37%2F480G
[bios]:             https://pt.wikipedia.org/wiki/BIOS
[acer]:             https://www.acer.com/ac/pt/BR/content/support-product/5977
[windows]:          https://www.microsoft.com/pt-br/windows/
[case]:             https://www.kabum.com.br/produto/74806/case-c3-tech-p-hd-2-5-usb-3-0-preto-ch-300bk
[hirensbootcd]:     https://www.hirensbootcd.org/
[ksm]:              https://www.kingston.com/br/support/technical/ssdmanager
[linux]:            https://www.vivaolinux.com.br/linux/
[gnome]:            https://br.gnome.org/
[kamarada-15.1]:    https://kamarada.github.io/pt/2020/02/24/kamarada-15.1-vem-com-tudo-que-voce-precisa-para-usar-o-linux-no-dia-a-dia/
[ubuntu]:           https://ubuntu.com/
[liveusb]:          https://kamarada.github.io/pt/2016/02/21/como-preparar-um-liveusb/
[fdisk]:            https://man7.org/linux/man-pages/man8/fdisk.8.html
[hdparm]:           https://man7.org/linux/man-pages/man8/hdparm.8.html
[smartctl]:         https://linux.die.net/man/8/smartctl
[firmware]:         https://pt.wikipedia.org/wiki/Firmware
[garantia]:         https://www.kingston.com/br/company/warranty
[kabum]:            https://www.kabum.com.br/produto/85198/ssd-kingston-a400-480gb-sata-leitura-500mb-s-grava-o-450mb-s-sa400s37-480g
[dropbox]:          https://db.tt/4VzN0K26
[correios]:         http://www.correios.com.br/
[google]:           https://www.google.com/search?q=como+resolver+satafirm+s11
[cyberciti]:        https://www.cyberciti.biz/faq/linux-getting-scsi-ide-harddisk-information/
[stackexchange]:    https://unix.stackexchange.com/q/5085
