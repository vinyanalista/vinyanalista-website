---
date: '2015-09-16 21:30:00 GMT-3'
layout: post
published: true
title: Como desativar a inicialização rápida do Windows
image: /files/2015/09/inicializacao-rapida-0.png
---

Instalou o [Windows](http://www.microsoft.com/pt-br/windows) 8/8.1/10 e não consegue mais acessar suas partições NTFS pelo [Linux](http://www.vivaolinux.com.br/linux/)? Esse problema é comum e é causado pela nova forma como os sistemas mais novos da [Microsoft](http://www.microsoft.com/pt-br/) ligam e desligam o computador. O que você precisa fazer para recuperar o acesso a suas partições NTFS é desativar a inicialização rápida do Windows. Aqui apresento 3 maneiras de fazer isso.

A mensagem de erro que apareceu para mim quando eu tentei acessar a partição NTFS com meus arquivos pessoais foi a seguinte:

{% include image.html src="/files/2015/09/inicializacao-rapida-0.png" %}

Transcrevendo:

```
An error ocurred while accessing 'PESSOAL', the system responded:
The requested operation has failed:
Error mounting /dev/sdb2 at /run/media/linux/PESSOAL:
Command-line `mount -t "ntfs" -o "uhelper=udisks2,nodev,nosuid,uid=999,gid=100,dmask=0077,fmask=0177" "/dev/sdb2" "/run/media/linux/PESSOAL"' exited with non-zero exit status 14: The disk contains an unclean file system (0, 0).
Metadata kept in Windows cache, refused to mount.
Failed to mount '/dev/sda4': Operation not permitted
The NTFS partition is in an unsafe state. Please resume and shutdown Windows fully (no hibernation or fast restarting), or mount the volume read-only with the 'ro' mount option.
```

Primeiro, vou apresentar a solução para o problema. Depois, para quem quiser entender o que se passa, mais explicações, ao final.

### Como desativar a inicialização rápida pelo Painel de Controle

A maneira mais simples de desativar a inicialização rápida é pelo Painel de Controle:

1. Abra o menu Iniciar e digite **opções de energia**

2. Clique em **Opções de Energia**

{% include image.html src="/files/2015/09/inicializacao-rapida-1.png" %}

3. Clique em **Escolher a função dos botões de energia**

{% include image.html src="/files/2015/09/inicializacao-rapida-2.png" %}

4. Clique em **Alterar configurações não disponíveis no momento**

{% include image.html src="/files/2015/09/inicializacao-rapida-3.png" %}

5. Se o Windows pedir permissão para continuar, clique em **Sim**

6. Desmarque a opção **Ligar inicialização rápida (recomendado)** e clique em **Salvar alterações**

{% include image.html src="/files/2015/09/inicializacao-rapida-4.png" %}

7. Pronto! Se desejar, pode fechar a janela.

### Como desativar a inicialização rápida pelo Editor de Registro

Se você é do tipo que gosta de alterar as configurações do Windows à moda antiga, via Editor de Registro:

1. Abra o menu Iniciar e digite **regedit**

2. Clique com o botão direito em **regedit** e clique em **Executar como administrador**

    {% include image.html src="/files/2015/09/inicializacao-rapida-5.png" %}

3. Navegue até a chave de registro **HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power**

4. Modifique o valor **HiberbootEnabled**, do tipo **REG_DWORD**, para **0** (nesse caso, **0** significa inicialização rápida desativada e **1** significa ativada)

5. Pronto! Se desejar, pode fechar a janela.

### Como desativar a inicialização rápida via arquivo de lote

Se você é um administrador de rede e precisa desativar a inicialização rápida em mais de um computador, talvez seja interessante criar um arquivo de lote (extensão **.bat**) para automatizar a tarefa.

Abra seu editor de texto preferido (pode ser até mesmo o Bloco de Notas) e crie um novo arquivo com o seguinte conteúdo:

```bat
@echo off
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /V HiberbootEnabled /T REG_dWORD /D 0 /F
```

Salve-o com um nome de arquivo que termine com a extensão **.bat** (por exemplo, **DesativarInicializacaoRapida.bat**).

Para executá-lo, é só dar dois cliques (possivelmente, ao invés disso, você terá que clicar com o botão direito no arquivo de lote e clicar em **Executar como administrador**).

### O que é a inicialização rápida do Windows

Pensando em tornar a inicialização do Windows mais rápida, a Microsoft decidiu transformá-la em uma espécie de hibernação: quando o computador é desligado, todos os programas são encerrados, mas as partes mais essenciais do Windows, não. Em vez disso, elas são armazenadas no disco rígido e são carregadas para a memória novamente quando o computador é ligado (como ocorre na hibernação). Dessa forma, não é necessário processar novamente toda a inicialização do Windows sempre que o computador é ligado. Boa parte desse trabalho é reaproveitado.

Você pode ter uma ideia do ganho de desempenho trazido pela inicialização rápida, em comparação à "inicialização fria" (*cold boot*, como batizaram a inicialização tradicional), vendo essa imagem, encontrada em [um *blog* da MSDN](http://blogs.msdn.com/b/b8/archive/2011/09/08/delivering-fast-boot-times-in-windows-8.aspx):

{% include image.html src="/files/2015/09/inicializacao-rapida-6.png" %}

Infelizmente, o que pode ser muito bom para quem usa apenas o Windows, pode ser um problema para quem usa também o Linux: ao iniciar o Linux após ter desligado o computador pelo Windows 8/8.1/10, o sistema não consegue montar as partições NTFS com permissões de leitura e escrita, pois entende que o computador foi hibernado e o Windows ainda está utilizando essas partições (se você entendeu como funciona a inicialização rápida, deve concordar que a visão do Linux não está de toda errada, não é mesmo?).

Se quiser saber mais sobre a inicialização rápida do Windows, você pode ler esses *posts* oficiais da Microsoft (em inglês) ou essa página do [TecMundo](http://www.tecmundo.com.br) (em português):

- [Delivering fast boot times in Windows 8 - Building Windows 8 - Site Home - MSDN Blogs](http://blogs.msdn.com/b/b8/archive/2011/09/08/delivering-fast-boot-times-in-windows-8.aspx)
- [Designing for PCs that boot faster than ever before - Building Windows 8 - Site Home - MSDN Blogs](http://blogs.msdn.com/b/b8/archive/2012/05/22/designing-for-pcs-that-boot-faster-than-ever-before.aspx)
- [Windows 8: o que é o modo de inicialização rápida e como desabilitá-lo - TecMundo](http://www.tecmundo.com.br/como-fazer/29536-windows-8-o-que-e-o-modo-de-inicializacao-rapida-e-como-desabilita-lo.htm)

### Referências

Eu me deparei com esse erro ontem usando meu computador com Windows 10 e [openSUSE](https://pt-br.opensuse.org). A solução para ele (e a ideia de escrever esse texto em português) eu encontrei nesse tópico de um fórum sobre Windows 10:

[Fast Startup - Turn On or Off in Windows 10 - Windows 10 Forums](http://www.tenforums.com/tutorials/4189-fast-startup-turn-off-windows-10-a.html)

Também encontrei na Internet o que parece ser uma versão mais antiga desse mesmo tópico, voltada para o Windows 8:

[Fast Startup - Turn On or Off in Windows 8](http://www.eightforums.com/tutorials/6320-fast-startup-turn-off-windows-8-a.html)

Espero que possa ter ajudado! Dúvidas nos comentários!