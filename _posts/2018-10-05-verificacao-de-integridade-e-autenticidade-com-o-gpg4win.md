---
date: 2018-10-05 18:30:00 GMT-3
image: '/files/2018/10/gpg4win.png'
layout: post
published: true
title: 'Verificação de integridade e autenticidade com o Gpg4win'
excerpt: 'Por vezes pode ser importante verificar um arquivo obtido da Internet. Duas verificações comuns que reduzem a quase zero as chances de usar um arquivo corrompido ou adulterado são a soma de verificação e a assinatura digital. Nesse post, você verá como fazê-las com o Gpg4win, um software livre gratuito para Windows. Como exemplo, verificaremos uma imagem ISO da distribuição openSUSE Leap.'
---

Por vezes pode ser importante verificar um arquivo obtido da Internet, por exemplo, a [imagem ISO][iso] de uma [distribuição Linux][distribuicao-linux] - ela contém o sistema operacional que você vai utilizar ou instalar em seu computador, já pensou se o arquivo se corrompeu durante o *download* ou foi adulterado por um [ataque de homem no meio][ataque-homem-no-meio]?

Duas verificações comuns que reduzem a quase zero as chances de usar um arquivo corrompido ou adulterado são a [soma de verificação][checksum] e a [assinatura digital][gph]:

- a **soma de verificação** (*checksum*) é uma soma feita antes do envio por quem cria o arquivo e verificada depois por quem baixa o arquivo, há alguns algoritmos para fazer essa soma, mas a ideia geral é somar os *bytes* do arquivo - ao verificar a soma de um arquivo, se houve modificação do arquivo ou da soma em si, a verificação falha, indicando que não é seguro usar o arquivo; e
- a **assinatura digital** certifica um arquivo, tal qual uma assinatura à mão, mas por utilizar mecanismos de criptografia tem a vantagem de ser resistente a fraudes - ao verificar a assinatura de um arquivo, se houve modificação do arquivo ou da assinatura em si, ou se a assinatura foi feita com a chave de outra pessoa, a verificação falha, indicando que não é seguro usar o arquivo.

Elas verificam, respectivamente, **integridade** e **autenticidade**, duas propriedades básicas da [segurança da informação][si].

Comumente as distribuições Linux disponibilizam somas de verificação [SHA-256][sha-256] e assinaturas digitais [GPG][gpg].

Nesse *post*, você verá como fazer essas verificações com o [**Gpg4win**][gpg4win], um *software* livre gratuito para [Windows][windows]. Como referência, aqui uso a versão 3.1.3, [lançada em 31/08/2018][gpg4win-release-notes]. Como exemplo, verificaremos uma imagem ISO da distribuição [openSUSE Leap][opensuse-leap].

{% include image.html src="/files/2018/10/gpg4win.png" %}

Embora usemos aqui o exemplo da imagem ISO, qualquer arquivo pode ser verificado, contanto que a soma de verificação e a assinatura digital estejam disponíveis. É o caso, por exemplo, do instalador do programa [VeraCrypt][veracrypt]. Curiosamente, [é possível usar o Gpg4win para verificar o instalador do próprio Gpg4win][gnupg-wiki] (no caso de uma atualização).

## Visão geral

Como a verificação de uma imagem ISO não é um processo tão simples, primeiro tenhamos uma visão geral do processo. Antes de começar, teremos uma etapa inicial de configuração do computador, com a instalação do Gpg4win. Depois, a "receita de bolo" se resume a:

1. Baixar a imagem ISO do *site* da distribuição (como de costume, nenhuma novidade);
2. Baixar a soma de verificação e a assinatura digital do *site* da distribuição, a depender da distribuição elas podem ser dois arquivos ou pode ser apenas um arquivo de texto contendo ambas (o openSUSE é o segundo caso);
3. Importar a chave pública da distribuição, seja do *site* da distribuição, seja de um servidor de chaves públicas confiável (obteremos a chave do *site* do openSUSE, mas [o openSUSE também tem um servidor de chaves][opensuse-wiki]);
4. Fazer a soma de verificação da imagem ISO baixada e conferir com a soma de verificação esperada; e
5. Verificar a assinatura digital, que pode ter sido feita em relação à imagem ISO, ou em relação à soma de verificação, o que estende a proteção à soma de verificação (o openSUSE é o segundo caso).

O processo pode variar de acordo com a distribuição, mas geralmente segue essa linha. Por exemplo, há vários algoritmos de somas de verificação. O algoritmo [MD5][md5] era mais popular, mas tem sido substituído pelo [SHA-256][sha-256], que em tese é menos vulnerável. Também há distribuições que não fazem assinatura digital, nesses casos não é possível verificar a autenticidade da imagem ISO.

## 1) Download e instalação do Gpg4win

Baixe o Gpg4win do seu *site* oficial: [https://www.gpg4win.org/][gpg4win]

{% include image.html src="/files/2018/10/gpg4win-01.jpg" %}

Em se tratando de segurança da informação, sempre obtenha os arquivos dos seus respectivos *sites* oficiais. Nesse *post*, não vou fornecer nenhum *link* para *download* direto.

Também pensando na segurança, nos deparamos agora com um dilema: estamos baixando o Gpg4win para verificar arquivos baixados, mas como verificamos o próprio Gpg4win?

Pensando nisso, os desenvolvedores do Gpg4win possibilitaram verificar a integridade e a autenticidade do instalador usando recursos do próprio Windows.

Na página de *download* do Gpg4win, clique no *link* **Check integrity** (traduzindo: Verificar integridade). Vamos precisar das informações que constam nessa página.

### 1.1) Verificando a integridade do Gpg4win

No Windows, é possível fazer somas de verificação usando o utilitário de linha de comando **CertUtil**. Inicie o aplicativo [**Prompt de Comando**][cmd] pelo **menu Iniciar**, digite o comando a seguir e tecle **Enter** (substitua `gpg4win-3.1.3.exe` pelo nome do arquivo, se for diferente):

```
CertUtil -hashfile Downloads\gpg4win-3.1.3.exe SHA256
```

### 1.2) Verificando a autenticidade do Gpg4win

Para verificar a assinatura do instalador do Gpg4win, clique com o botão direito do *mouse* no instalador baixado e clique em **Propriedades**. Na caixa de diálogo que abre, selecione a aba **Assinaturas Digitais** e clique no botão **Detalhes**. Na nova caixa de diálogo, selecione a aba **Avançado** e depois a opção **Número de série**.

Compare os valores informados pelo Windows com os presentes no *site* do Gpg4win:

{% include image.html src="/files/2018/10/gpg4win-02.png" %}

Se os valores conferem, você baixou o instalador corretamente. Execute-o como administrador e faça a instalação, no estivo Avançar, Avançar, Concluir...

## 2) Baixando a imagem ISO do openSUSE

Baixe a imagem de instalação via rede do openSUSE Leap, assim como o arquivo da soma de verificação, em:

[https://software.opensuse.org/distributions/leap][download-leap]

{% include image.html src="/files/2018/10/gpg4win-03.png" %}

Escolhi a imagem de instalação via rede por ser o menor arquivo, apenas para exemplo.

Quando acabar, você deve ver dois arquivos na pasta `Downloads`:

- a imagem ISO (`openSUSE-Leap-15.0-NET-x86_64.iso.sha256`) e
- a soma de verificação (`openSUSE-Leap-15.0-NET-x86_64.iso.sha256`).

## 3) Importando a chave pública do openSUSE

Mais abaixo na página **Baixe o openSUSE**, na seção **Verifique seu download antes de usar**, clique no grande número em [hexadecimal][hexadecimal]:

{% include image.html src="/files/2018/10/gpg4win-04.png" %}

Na página seguinte, clique no outro número, menor, também em hexadecimal (curiosamente, não é outro número, são os 8 últimos dígitos do anterior, como se fosse um resumo):

{% include image.html src="/files/2018/10/gpg4win-05.png" %}

A página seguinte mostra a chave pública do Projeto openSUSE em formato de texto.

Selecione tudo entre `-----BEGIN PGP PUBLIC KEY BLOCK-----` e `-----END PGP PUBLIC KEY BLOCK-----` e copie:

{% include image.html src="/files/2018/10/gpg4win-06.png" %}

Inicie o aplicativo [**Kleopatra**][kleopatra], incluso no Gpg4win, vá no menu **Ferramentas**, aponte para **Área de transferência**, e clique em **Importação do certificado**:

{% include image.html src="/files/2018/10/gpg4win-07.png" %}

Você agora deve ver a chave pública do openSUSE importada no Kleopatra, que oferece para assinar a chave, marcando-a como confiável, vamos por enquanto clicar em **Não**:

{% include image.html src="/files/2018/10/gpg4win-08.png" %}

Isso na verdade é opcional, volto a explicar no final.

Faça um duplo clique na chave e confira a impressão digital (*fingerprint*) com a presente no *site* do openSUSE. Se os números conferem, você importou com sucesso a chave pública do openSUSE para o Kleopatra:

{% include image.html src="/files/2018/10/gpg4win-09.png" %}

## 4) Verificando a integridade da imagem ISO

Na tela principal do Kleopatra, vá no menu **Arquivo** e clique em **Verificar arquivos de soma de verificação**:

{% include image.html src="/files/2018/10/gpg4win-10.png" %}

Informe a localização do arquivo que contém a soma de verificação (`openSUSE-Leap-15.0-NET-x86_64.iso.sha256`).

Na tela seguinte, se a soma de verificação confere, o arquivo da imagem ISO (`openSUSE-Leap-15.0-NET-x86_64.iso`) é destacado na cor verde:

{% include image.html src="/files/2018/10/gpg4win-11.png" %}

Na parte inferior da janela, aparece **Ocorreu um erro**. Essa mensagem é exibida provavelmente porque o Kleopatra não interpreta nesse momento as linhas referentes à assinatura GPG. Se tiver curiosidade, você pode ver essas linhas abrindo o arquivo da soma de verificação usando um programa como o [Notepad++][notepad]:

{% include image.html src="/files/2018/10/gpg4win-12.png" %}

Se a soma de verificação não confere, o arquivo da imagem ISO é destacado na cor vermelha. Clicando em **Mostrar**, é possível ver na última linha *checksums did NOT match* (somas de verificação NÃO conferem):

{% include image.html src="/files/2018/10/gpg4win-13.png" %}

Se isso acontecer, você deve tentar baixar a imagem ISO novamente.

## 5) Verificando a autentiticade da imagem ISO

Na tela principal do Kleopatra, vá no menu **Arquivo** e clique em **Descriptografar/verificar**:

{% include image.html src="/files/2018/10/gpg4win-14.png" %}

Informe a localização do arquivo que contém a soma de verificação.

Se a chave não foi assinada (etapa que o Kleopatra nos ofereceu, mas pulamos antes) e a verificação da assinatura confere, o Kleopatra mostra uma mensagem neutra, que não parece uma mensagem nem de sucesso nem de erro:

{% include image.html src="/files/2018/10/gpg4win-15.png" %}

O ideal seria assinar a chave, como explicarei a seguir, mas realmente penso que é um passo a mais e opcional. Se você é do tipo tranquilo, pode ficar satisfeito com a mensagem acima e usar a imagem ISO tranquilamente. Veja como uma assinatura inválida parece.

Independente de a chave ter sido assinada ou não, se a verificação da assinatura falha, o Kleopatra mostra **Assinatura inválida**, em vermelho:

{% include image.html src="/files/2018/10/gpg4win-16.png" %}

Se isso acontecer, você deve tentar baixar a imagem ISO novamente.

## 6) Opcionalidades

Até aqui, você fez todos os passos que elencamos na visão geral, no início.

Você pode ir um passo além assinando a chave pública do openSUSE com uma chave privada sua, sinalizando para o Kleopatra que você confia que a chave pública do openSUSE pertence de fato ao openSUSE.

Pode parecer burocrático, mas da forma como o GPG foi projetado, idealmente as pessoas trocariam chaves apenas pessoalmente, para formar uma rede de confiança. Na prática, não é assim que funciona. Obter a chave pública do *site* da distribuição é o máximo que você pode fazer enquanto usuário final que deseja verificar uma imagem ISO. De qualquer forma, já é mais seguro do que baixar a imagem ISO e confiar nela sem fazer nenhuma verificação.

Para assinar a chave pública do openSUSE, você precisa antes criar um par de chaves seu.

## 6.1) Criando um par de chaves pessoal

Na tela principal do Kleopatra, vá no menu **Arquivo** e clique em **Novo Par de Chaves**:

{% include image.html src="/files/2018/10/gpg4win-17.png" %}

Na primeira tela do **Assistente de Criação de Pares de Chaves**, clique em **Criar um par de chaves OpenGPG pessoal**:

{% include image.html src="/files/2018/10/gpg4win-18.png" %}

Na tela seguinte, preencha os campos **Nome** e **E-mail** e clique em **Next** (Avançar, esqueceram de traduzir esse botão):

{% include image.html src="/files/2018/10/gpg4win-19.png" %}

Confirme seus dados e clique em **Criar**:

{% include image.html src="/files/2018/10/gpg4win-20.png" %}

Crie uma senha (*passphrase*) para a nova chave, digite de novo no campo abaixo para se certificar que não digitou errado, e clique em **OK**:

{% include image.html src="/files/2018/10/gpg4win-21.png" %}

Kleopatra informa que **O par de chaves foi criado com sucesso**. Clique em **Terminar**:

{% include image.html src="/files/2018/10/gpg4win-22.png" %}

Sua chave pessoal agora aparece na tela principal do Kleopatra. Agora você pode utilizá-la para assinar a chave pública do openSUSE.

## 6.2) Assinando a chave pública do openSUSE

Na tela principal do Kleopatra, selecione a chave pública do openSUSE e clique em **Certificar**:

{% include image.html src="/files/2018/10/gpg4win-23.png" %}

Na tela seguinte, selecione a opção **Foram verificadas as impressões digitais** (de fato, já fizemos isso lá atrás) e clique em **Next** (Avançar):

{% include image.html src="/files/2018/10/gpg4win-24.png" %}

Na tela seguinte, você pode manter a opção padrão marcada (**Certificar somente para mim mesmo**) e clicar em **Certificar**:

{% include image.html src="/files/2018/10/gpg4win-25.png" %}

Digite a senha da sua chave e clique em **OK**:

{% include image.html src="/files/2018/10/gpg4win-26.png" %}

A última tela do assistente confirma que você certificou a chave pública do Projeto openSUSE. Clique em **Terminar**:

{% include image.html src="/files/2018/10/gpg4win-27.png" %}

## 6.3) Verificando novamente a autentiticade da imagem ISO

Repita a verificação de autentiticade da imagem ISO (seção 5). Veja que agora a mensagem apresentada pelo Kleopatra é bem mais assertiva, transmite bem mais segurança:

{% include image.html src="/files/2018/10/gpg4win-28.png" %}

Repare na última frase: **A assinatura é válida e a validade do certificado é completamente confiável**.

## Finalizando

Uma vez instalado, o Gpg4win pode ser usado para verificar as imagens ISO de futuras versões do openSUSE, assim como imagens ISO de outras distribuições, ou quaisquer arquivos que se precise verificar. Como expliquei na visão geral, o processo é semelhante.

Possivelmente, boa parte do que fizemos aqui você não precisará fazer de novo:

- você só precisa baixar e instar de novo o Gpg4win (seção 1) se houver uma atualização do Gpg4win;
- você só precisa importar de novo a chave pública do openSUSE (seção 3) se no futuro o openSUSE criar uma nova chave;
- você só precisa assinar de novo a chave pública do openSUSE (seção 6.2) se no futuro importar uma nova chave; e
- se você só utiliza sua chave GPG pessoal para verificar arquivos baixados, não precisará criar um novo par de chaves (seção 6.1).

Caso baixe outra imagem ISO do openSUSE (por exemplo, quando houver uma nova versão da distribuição), você repetirá as seções 2, 4 e 5.

Caso baixe uma imagem ISO de outra distribuição, aí sim você vai passar novamente por boa parte do processo: seções 2, 3 (e, opcionalmente, a 6.2), 4 e 5.

Espero que tenha ajudado. Deixo as referências para o caso de você querer ler mais sobre essa ferramenta bem completa que é o Gpg4win.

## Referências

- [HOW TO VERIFY YOUR DOWNLOADED FILES ARE AUTHENTIC - Deep Dot Web][deepdotweb1-1]
- [PGP Tutorial For Windows (Kleopatra - Gpg4Win) - Deep Dot Web][deepdotweb1-2]
- [How to Verify a Linux ISO's Checksum and Confirm It Hasn't Been Tampered With][howtogeek]
- [How to Verify an Electrum Download on Windows - Bitzuma][bitzuma]
- [The GNU Privacy Handbook][gph]
- [Gpg4win/CheckIntegrity - GnuPG wiki][gnupg-wiki]
- [SDB:Ajuda de download - openSUSE][opensuse-wiki]

[iso]:                      https://pt.wikipedia.org/wiki/Imagem_ISO
[distribuicao-linux]:       https://pt.wikipedia.org/wiki/Distribui%C3%A7%C3%A3o_Linux
[ataque-homem-no-meio]:     https://pt.wikipedia.org/wiki/Ataque_man-in-the-middle
[checksum]:                 https://pt.wikipedia.org/wiki/Soma_de_verifica%C3%A7%C3%A3o
[gph]:                      https://www.gnupg.org/gph/en/manual.html
[si]:                       https://pt.wikipedia.org/wiki/Seguran%C3%A7a_da_informa%C3%A7%C3%A3o
[sha-256]:                  https://pt.wikipedia.org/wiki/SHA-2
[gpg]:                      https://gnupg.org/
[gpg4win]:                  https://www.gpg4win.org/
[windows]:                  https://www.microsoft.com/pt-br/windows/
[gpg4win-release-notes]:    http://lists.wald.intevation.org/pipermail/gpg4win-announce/2018-August/000080.html
[opensuse-leap]:            https://www.opensuse.org/
[veracrypt]:                https://www.veracrypt.fr/
[opensuse-wiki]:            https://pt.opensuse.org/SDB:Ajuda_de_download
[md5]:                      https://pt.wikipedia.org/wiki/MD5
[cmd]:                      https://pt.wikipedia.org/wiki/Prompt_de_comando
[download-leap]:            https://software.opensuse.org/distributions/leap
[hexadecimal]:              https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_hexadecimal
[kleopatra]:                https://www.openpgp.org/software/kleopatra/
[notepad]:                  https://notepad-plus-plus.org/
[deepdotweb1-1]:            https://www.deepdotweb.com/jolly-rogers-security-guide-for-beginners/how-to-verify-your-downloaded-files-are-authentic/
[deepdotweb1-2]:            https://www.deepdotweb.com/2015/02/21/pgp-tutorial-for-windows-kleopatra-gpg4win/
[howtogeek]:                https://www.howtogeek.com/246332/how-to-verify-a-downloaded-linux-iso-file-wasnt-tampered-with/
[bitzuma]:                  https://bitzuma.com/posts/how-to-verify-an-electrum-download-on-windows/
[gnupg-wiki]:               https://wiki.gnupg.org/Gpg4win/CheckIntegrity
