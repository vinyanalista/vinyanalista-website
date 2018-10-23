---
date: 2018-10-22 19:45:00 GMT-3
image: '/files/2018/10/data-hora.jpg'
layout: post
published: true
title: 'Com horário de verão confuso, hora de computadores e celulares foi adiantada antes, veja como configurá-los'
excerpt: 'Do sábado para o domingo muita gente viu os relógios do computador e do celular se adiantarem em 1 hora sozinhos, com o suposto início do horário de verão. Ocorre que desde o ano passado já é a terceira vez que o governo brasileiro altera a data de início do horário de verão em 2018. Quem estava com seus dispositivos devidamente configurados e atualizados não teve problemas. Nesse post você vai entender o que aconteceu e como se prevenir.'
---

{% include image.html src="/files/2018/10/data-hora.jpg" %}

Do sábado para o domingo muita gente viu [os relógios do computador e do celular se adiantarem em 1 hora sozinhos][cb], com o suposto início do horário de verão. Ocorre que desde o ano passado já [é a terceira vez que o governo brasileiro altera a data de início do horário de verão em 2018][g1]. Quem estava com seus dispositivos devidamente configurados e atualizados não teve problemas. Nesse *post* você vai entender o que aconteceu e como se prevenir.

Aqui vou tratar de [Windows][windows] e [iOS][ios] ([iPhone][iphone], [iPad][ipad] e [iPod touch][ipod-touch]).

Para [Linux][linux] e [Android][android], consulte os excelentes tutoriais do *blog* [Linux Kamarada][kamarada]:

- [Acordou com a hora do computador errada? Entenda o que aconteceu][kamarada-linux]
- [Mantenha a hora do Android sempre certa][kamarada-android]

**Observação:** se você utiliza Windows e Linux em *dual boot*, consulte o tutorial acima para Linux para ver como configurar os dois.

## O que aconteceu esse final de semana

O [**horário de verão**][horario-de-verao] é a prática de adiantar os relógios em 1 hora durante o verão. Quando foi criado, a ideia era aproveitar a maior duração do dia no verão e economizar energia.

No entanto, com o passar dos anos, a mudança na rotina dos brasileiros e o aquecimento do planeta fizeram com que a economia com o horário de verão se tornasse cada vez menor: as pessoas mudaram seus horários de trabalho e passaram a chegar em casa já à noite, além disso o uso de equipamentos que mais consomem energia como ares-condicionados e ventiladores se intensificou justamente durante o dia.

[Há proposta do Senado para extinguir o horário de verão][r7] e [o governo a estuda][oglobo]. Quem é contra o horário de verão, também alega que o horário de verão pode implicar problemas de saúde. Quem é a favor, alega que o horário de verão incentiva o comércio, o turismo e a prática de esportes nas cidades.

Por ora, o governo decidiu reduzir a duração do horário de verão.

Em dezembro de 2017, o presidente Michel Temer assinou o [Decreto nº 9.242][decreto] que alterou o início do horário de verão do terceiro domingo de outubro (21/10/2018) para o primeiro domingo de novembro (04/11/2018), um fim de semana após o segundo turno das eleições, que está marcado para 28/10/2018.

Essa alteração foi feita a pedido do Tribunal Superior Eleitoral (TSE). O horário de verão em ano de eleição dificulta a apuração dos votos. Em 2014, por exemplo, a Justiça Eleitoral teve que adiar a divulgação do resultado para esperar a votação acabar no Acre.

O final do horário de verão foi mantido no terceiro domingo de fevereiro (17/02/2019).

Acontece que o Ministério da Educação (MEC) pediu que o início do horário de verão fosse adiado para 18 de novembro, a fim de evitar prejuízos aos estudantes que farão o Exame Nacional do Ensino Médio (Enem), cuja primeira prova está marcada para 04 de novembro. A necessidade de adiantar os relógios em uma 1 poderia confundir os candidatos.

O governo chegou a preparar o decreto e anunciar que faria essa nova alteração, porém depois não a oficializou por meio do Diário Oficial da União (DOU), decidindo finalmente por manter o horário de verão iniciando no dia 04 de novembro.

A razão para essa última decisão foi um protesto da Associação Brasileira das Empresas Aéreas (Abear), que alertou que a mudança poderia levar passageiros que compraram passagens com antecedência a perderem seus voos. Cerca de 42 mil voos poderiam ser afetados e pelo menos 3 milhões de passageiros poderiam ser prejudicados.

Portanto, desde o ano passado, o início do horário de verão no Brasil em 2018 já teve 3 mudanças: passou de 21/10 para 04/11, depois para 18/11, e por fim foi mantido em 04/11.

{% include image.html src="/files/2018/10/mapa-horario-de-verao-2018-2019.jpg" caption="Estados que adotam horário de verão no Brasil (referências: [G1](http://g1.globo.com/economia/noticia/2016/10/horario-de-verao-comeca-em-16-de-outubro-e-vai-ate-19-de-fevereiro.html) e [Decreto nº 8.112](http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/Decreto/D8112.htm), mapa emprestado do *blog* [Linux Kamarada](https://kamarada.github.io/pt/2018/10/22/mantenha-a-hora-do-android-sempre-certa/) e derivado do [mapa do Brasil em branco disponível na WikiMedia](https://commons.wikimedia.org/wiki/File:Brazil_Blank_Map_light.svg))" %}

## Como saber a hora certa

Você pode verificar se a data e a hora do seu computador ou celular estão corretas acessando o *site* do projeto [NTP.br][ntpbr], que mantém servidores de hora que os computadores podem consultar para sincronizar seus relógios:

{% include image.html src="/files/2018/10/ntpbr-hora-certa.jpg" %}

Agora que você já está a par do que aconteceu e conferiu a hora do seu computador e celular, vamos ver como configurá-los.

## Windows em casa

Para configurar a data e hora do seu computador Windows em casa, clique no **menu Iniciar**, depois em **Configurações**:

{% include image.html src="/files/2018/10/data-hora-windows-1.jpg" %}

Na tela **Configurações do Windows**, clique em **Hora e Idioma**:

{% include image.html src="/files/2018/10/data-hora-windows-2.png" %}

Em **Fuso horário**, selecione **(UTC-03:00) Brasília**:

{% include image.html src="/files/2018/10/data-hora-windows-3.jpg" %}

Se você mora na região Sul, Sudeste ou Centro-Oeste, regiões que adotam o horário de verão, ative a opção **Ajustar automaticamente para o horário de verão**. Se você mora no Nordeste ou no Norte, desative essa opção.

Depois, clique em **Configurações adicionais de data, hora e região** à direita.

Na janela que aparece, clique em **Data e Hora**:

{% include image.html src="/files/2018/10/data-hora-windows-4.png" %}

Na caixa de diálogo **Data e Hora**, selecione a aba **Horário na Internet** e clique em **Alterar configurações**:

{% include image.html src="/files/2018/10/data-hora-windows-5.png" %}

Pode ser que o sistema peça a senha do usuário administrador. Você deve fornecê-la para continuar.

Certifique-se de que a opção **Sincronizar com um servidor de horário na Internet** esteja marcada:

{% include image.html src="/files/2018/10/data-hora-windows-6.png" %}

No campo **Servidor**, informe o endereço `pool.ntp.br`.

Clique em **Atualizar agora** para já acertar a data e hora do seu computador.

Clique em **OK** para sair da caixa de diálogo **Configurações de Horário na Internet**. Depois, clique em **OK** para sair da caixa de diálogo **Data e Hora**. Pode fechar as janelas restantes.

Pronto! Seu computador já está com data e hora corretas e configurado para sincronizá-las com a Internet. Com isso, nunca mais você terá que se preocupar em ajustar manualmente a data e a hora no início e no fim do horário de verão.

Além disso, há outro detalhe que você precisa se atentar: **atualizações**. Como vimos, as datas de início e fim do horário de verão podem mudar. Embora a data e hora possam ser obtidas da Internet, o início e o fim do horário de verão são programados no sistema operacional. Por isso, é importante regularmente verificar atualizações para o Windows. 

Normalmente, o Windows já instala quaisquer atualizações disponíveis em um horário que você não costuma utilizar o computador, se ele estiver ligado.

Para verificar se há atualizações disponíveis, clique no **menu Iniciar**, depois em **Configurações**. Na tela **Configurações do Windows**, clique em **Atualização e Segurança**.

Instale todas as atualizações disponíveis até que o Windows informe **Você está atualizado**:

{% include image.html src="/files/2018/10/windows-atualizado.jpg" %}

## Windows na empresa

No caso de computadores Windows em empresas, se esses computadores estão ingressados em um domínio do [Active Directory (AD)][ad], por padrão eles sincronizam a data e a hora com o servidor controlador do domínio, então não há o que configurar.

Se a data e hora de um *desktop* da empresa estiverem erradas, experimente forçar a sincronização com o controlador do domínio executando o seguinte comando no **Prompt de Comando** (esse comando não precisa de permissão de administrador):

```
> net time %LOGONSERVER% /set /y
```

A saída desse comando deve ser parecida com:

```
A hora atual em \\MEU-AD é 22/10/2018 17:35:11

Comando concluído com êxito.
```

Caso depois de executar esse comando a data e hora continuem erradas, provavelmente a data e hora do controlador do domínio estão erradas e é necessário verificá-lo.

Vejamos então como configurar data, hora, fuso horário e sincronização em um servidor com [Windows Server][ws].

### Windows Server

O fuso horário do controlador do domínio é configurado da mesma forma que o fuso de qualquer computador Windows (ver instruções acima).

Quanto à data e hora, o servidor deve ser configurado para sincronizar com algum servidor de hora externo. Você pode fazer isso via [diretiva de grupo (GPO)][gpo], para mais informações consulte [esse *link* (em inglês)][ntp-gpo], ou via [Windows PowerShell][wps], que é mais rápido, especialmente se seu domínio possui apenas um controlador:

```
> w32tm /config /manualpeerlist:'''pool.ntp.br''' /syncfromflags:MANUAL
> Stop-Service w32time
> Start-Service w32time
> w32tm /query /status
```

Se sua rede possuir um servidor de hora dedicado, substitua `pool.ntp.br` por esse servidor.

## iOS

Antes de ajustar a configuração de data e hora propriamente dita, [a Apple recomenda][apple1] que o seu dispositivo tenha a versão mais recente do iOS.

Para verificar se esse é o caso, toque em **Ajustes** > **Geral** > **Atualização de Software**. Deve aparecer na tela **Seu software está atualizado**:

{% include image.html src="/files/2018/10/data-hora-ios-1.jpg" %}

Se, diferente disso, for informado que há uma atualização disponível, você deve instalá-la.

Não vou entrar em detalhes de como atualizar seu iOS. Se precisar de ajuda, consulte as instruções no *site* da [Apple][apple] em:

- [Atualizar o iPhone, iPad ou iPod touch - Suporte da Apple][apple2]

Usando a versão mais recente do iOS, é recomendado que você obtenha as configurações de data e hora automaticamente da sua operadora.

Para determinar o fuso horário, o iOS utiliza a localização do dispositivo. Vá em **Ajustes** > **Privacidade** > **Serviços de Localização** e ative os **Serviços de Localização**:

{% include image.html src="/files/2018/10/data-hora-ios-2.jpg" %}

Na mesma tela, deslize a lista de aplicativos até o final e toque em **Serviços do Sistema**.

Na tela seguinte, habilite o **Ajuste de Fuso Horário**:

{% include image.html src="/files/2018/10/data-hora-ios-3.jpg" %}

Por fim, toque em **Ajustes** > **Geral** > **Data e Hora** e ative a opção **Automaticamente**:

{% include image.html src="/files/2018/10/data-hora-ios-4.jpg" %}

Se você vir um alerta indicando que informações atualizadas de fuso horário estão disponíveis, reinicie o dispositivo para obter as novas informações. Como no meu celular não apareceu essa mensagem, vou tomar a captura de tela emprestada do [*site* da Apple][apple3]:

{% include image.html src="/files/2018/10/data-hora-ios-5.jpg" %}

Verifique se o dispositivo mostra o fuso horário correto em **Fuso Horário**. No meu caso, ele mostra **Sâo Paulo** porque estou no sul do Brasil, uma região que adota o horário de verão.

Verifique também se agora sua data e hora estão corretas.

Se depois de todas essas configurações sua data, hora ou fuso horário ainda estiverem incorretos, você deverá configurá-los manualmente.

Para isso, desative a opção **Automaticamente** e configure o fuso horário, a data e a hora conforme sua necessidade:

{% include image.html src="/files/2018/10/data-hora-ios-6.jpg" %}

Provavelmente você desejará mudar o fuso horário se mora em uma região que não adota o horário de verão. Nesse caso, selecione um fuso horário que também não adote o horário de verão (por exemplo, **Fortaleza**).

## Dica: mapa de fusos horários

Você pode usar o mapa de fusos horários disponível em [timeanddate.com][timeanddate] para encontrar uma cidade com um fuso horário que atenda a suas necessidades. Passe o *mouse* em uma cidade para ver sua data e hora atuais:

{% include image.html src="/files/2018/10/timeanddate.jpg" %}

## Referências

- [Relógios de computador e celulares se adiantam antes do horário de verão - Correio Braziliense][cb]
- [Planalto informa que não haverá adiamento e que horário de verão começará no próximo dia 4 - Política - G1][g1]
- [Governo voltará a discutir se acaba com horário de verão - Jornal O Globo][oglobo]
- [Senado propõe acabar com o horário de verão no Brasil - Notícias - R7 São Paulo][r7]
- [Guia Windows - NTP.br][ntpbr-win]
- [Receber ajuda com a data e a hora no iPhone, iPad e iPod touch - Suporte da Apple][apple1]
- [Atualizar o iPhone, iPad ou iPod touch - Suporte da Apple][apple2]
- [Como obter informações atualizadas de fuso horário no dispositivo Apple - Suporte da Apple][apple3]

[cb]:               https://www.correiobraziliense.com.br/app/noticia/brasil/2018/10/21/interna-brasil,714001/relogio-de-celulares-adianta-uma-hora-de-novo-e-a-segunda-vez-na-sema.shtml
[g1]:               https://g1.globo.com/politica/noticia/2018/10/15/planalto-informa-que-nao-havera-adiamento-e-que-horario-de-verao-comecara-no-proximo-dia-4.ghtml
[windows]:          https://www.microsoft.com/pt-br/windows/
[ios]:              https://www.apple.com/br/ios/
[iphone]:           https://www.apple.com/br/iphone/
[ipad]:             https://www.apple.com/br/ipad/
[ipod-touch]:       https://www.apple.com/br/ipod-touch/
[linux]:            https://www.vivaolinux.com.br/linux/
[android]:          https://www.android.com/
[kamarada]:         https://kamarada.github.io/
[kamarada-linux]:   https://kamarada.github.io/pt/2018/10/21/acordou-com-a-hora-do-computador-errada-entenda-o-que-aconteceu/
[kamarada-android]: https://kamarada.github.io/pt/2018/10/22/mantenha-a-hora-do-android-sempre-certa/
[horario-de-verao]: https://pt.wikipedia.org/wiki/Hor%C3%A1rio_de_ver%C3%A3o
[r7]:               https://noticias.r7.com/sao-paulo/senado-propoe-acabar-com-o-horario-de-verao-no-brasil-20092018
[oglobo]:           https://oglobo.globo.com/economia/governo-voltara-discutir-se-acaba-com-horario-de-verao-22397585
[decreto]:          http://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2017/Decreto/D9242.htm
[ntpbr]:            http://ntp.br/
[ws]:               https://www.microsoft.com/pt-br/cloud-platform/windows-server
[ad]:               https://technet.microsoft.com/pt-br/library/jj206711.aspx
[gpo]:              https://technet.microsoft.com/pt-br/library/cc668545.aspx
[ntp-gpo]:          http://www.sysadminlab.net/windows/configuring-ntp-on-windows-using-gpo
[wps]:              https://pt.wikipedia.org/wiki/PowerShell
[apple1]:           https://support.apple.com/pt-br/HT203483
[apple]:            https://www.apple.com/br/
[apple2]:           https://support.apple.com/pt-br/HT204204
[apple3]:           https://support.apple.com/pt-br/HT206986
[timeanddate]:      http://www.timeanddate.com/time/map/
[ntpbr-win]:        https://ntp.br/guia-win-comum.php
