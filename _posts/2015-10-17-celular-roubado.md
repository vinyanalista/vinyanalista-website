---
date: '2015-10-17 23:59:59 GMT-3'
layout: post
published: true
title: 'Meu celular foi roubado: e agora, o que faço?'
image: /files/2015/10/celular-roubado-00.jpg
---

{% include image.html src="/files/2015/10/celular-roubado-00.jpg" %}

Em primeiro lugar, não se culpe e **procure manter a calma**. Feito isso, siga as dicas que apresento aqui para tentar restringir ao máximo a ação do bandido, se possível até mesmo recuperar o celular. Você também pode seguir essas dicas se perdeu seu celular. Algumas dicas podem funcionar também com *tablets*.

<!--more-->

Algumas medidas apresentadas aqui dependem de ações prévias (você deve reforçar a segurança do seu celular antes de realmente precisar dela), que serão apresentadas em outro *post*.

Vou me concentrar nos celulares com [Android](https://www.android.com/intl/pt-BR_br/), porque são os que eu conheço. Ao longo do texto, se é do meu conhecimento, disponibilizo soluções genéricas, que funcionam para qualquer celular, ou *links* para páginas nas quais você pode obter mais informações.

Se você tiver alguma dica a acrescentar, por favor, não tenha vergonha de usar os comentários.

## Sério, não se culpe

Você não deve se culpar porque seu celular foi assaltado. "Ah, mas eu vacilei, não devia estar passando com ele na mão por aquela rua..." Será mesmo que você poderia ter evitado? Já parou pra pensar que o bandido poderia ter te abordado de qualquer jeito?

O ideal seria que fôssemos livres para termos e fazermos o que quisermos precisando nos preocupar apenas em agir de acordo com a lei. Infelizmente, [moramos no Brasil](http://www.vagalume.com.br/farofa-carioca/moro-no-brasil.html): aqui, a inteligência é fundamental.

Então, sei que não é fácil, mas **tente manter a calma**, e veja o que você pode fazer após ter seu celular roubado.

Se você também teve cartões roubados, providencie o bloqueio deles. **Agilidade nessa hora é tudo!**

## 1) Localizar, bloquear e/ou apagar a memória do celular

Se seu celular possui algum sistema de localização, talvez seja interessante não bloquear o cartão SIM (vou usar o termo mais conhecido: *chip*) e o celular de imediato e tentar primeiro recuperá-los. Nesse caso, peça ajuda à polícia, não tente fazer isso por conta própria.

Para chamar a polícia, você pode discar `190` de qualquer telefone fixo ou celular. A ligação é gratuita e pode ser feita mesmo que você não possua créditos.

### Gerenciador de dispositivos Android

Uma das ferramentas que podem te ajudar é o [Gerenciador de dispositivos Android](https://support.google.com/accounts/answer/6160491?hl=pt-BR), que permite localizar seu celular Android pela Internet. Ele está disponível na forma de [*site*](https://www.google.com/android/devicemanager?hl=pt-BR) ou [aplicativo](https://play.google.com/store/apps/details?id=com.google.android.apps.adm) (nesse caso, você pode instalá-lo e usá-lo em outro celular para localizar o seu).

Quando você entra no *site* com a sua conta do Google, que deve ser a mesma configurada no celular, o Gerenciador de dispositivos Android começa a procurá-lo. Se ele estiver conectado à Internet, a posição aproximada dele será mostrada no mapa. A ferramenta também indica a última vez em que o celular foi visto conectado:

{% include image.html src="/files/2015/10/celular-roubado-01.jpg" %}

Se o seu celular foi localizado com sucesso, é possível fazê-lo [tocar, bloquear ou apagar a memória](https://support.google.com/accounts/answer/6160500?hl=pt-BR) clicando em um dos botões disponíveis na tela.

Note que você só pode usar o Gerenciador de dispositivos Android se [configurou o seu celular antes](https://support.google.com/accounts/answer/3265955).

### Aplicativo projetado pelo fabricante

Alguns fabricantes, a exemplo da [Samsung](http://www.samsung.com/br/home/), vendem os celulares com sistemas de localização já instalados de fábrica, como o [Find My Mobile](https://findmymobile.samsung.com/).

{% include image.html src="/files/2015/10/celular-roubado-02.jpg" %}

Se seu celular possui um sistema como esse, pode ser que ele ofereça mais opções que o Gerenciador de dispositivos Android. Nesse caso, consulte o manual do seu celular para ver o que pode ser feito.

### Avast Anti-Theft

Se seu celular possui instalado o [Avast Anti-Theft](https://www.avast.com/pt-br/anti-theft) (a solução antifurto gratuita mais completa que conheço, e que uso no meu celular), você pode localizá-lo e/ou controlá-lo remotamente acessando a sua [conta do Avast](https://my.avast.com/pt-br/) ou enviando mensagens SMS para ele.

{% include image.html src="/files/2015/10/celular-roubado-03.jpg" %}

Para indicar ao Avast que seu celular foi perdido (ou roubado), você pode usar outro celular para enviar para o seu celular (para o seu próprio número) um SMS com o seguinte conteúdo:

`1234 LOST` (substitua `1234` pelo seu PIN do Avast)

Recebendo esse comando, o Avast Anti-Theft executará as mesmas ações configuradas para o caso de um *chip* estranho ser inserido: se você não alterou a configuração padrão, ele irá bloquear o celular, disparar o alarme e enviar uma mensagem de alerta por SMS para os celulares cadastrados como amigos. Um alerta também é enviado para o seu *e-mail*.

Provavelmente, ao roubar seu celular, o bandido removeu seu *chip* e instalou um novo, dele. Nesse caso, por padrão, o Avast Anti-Theft informa a você por *e-mail* e aos seus amigos por SMS o número do *chip* que o bandido instalou. A partir daí, os comandos SMS devem ser enviados para esse número (é pelo número do bandido que o celular os receberá).

Outros comandos que você pode enviar por SMS incluem:

- `1234 LOCATE`: faz com que o Avast Anti-Theft envie a localização do seu celular;
- `1234 SIREN ON`: ativa o alarme do celular (observe que isso chamará a atenção do ladrão, mas também fará com que ele saiba que o Avast Anti-Theft está instalado);
- `1234 LOCK`: bloqueia o celular, impossibilitando seu uso;
- `1234 MESSAGE Devolva meu celular!`: exibe a mensagem `Devolva meu celular!` na tela do aparelho;
- `1234 SET LOCKTEXT Vou pegar voce!`: configura o celular para exibir na tela a mensagem `Vou pegar voce!` quando for bloqueado (use esse comando antes do comando `LOCK`);
- `1234 WIPE`: apaga todos os dados da memória do celular;
- `1234 FOUND`: indica ao Avast que o celular foi encontrado, desativando o bloqueio e o som de alarme;
- `1234 SIREN OFF`: desativa o alarme do celular;
- `1234 UNLOCK`: desbloqueia o celular e adiciona o *chip* em uso à lista de *chips* confiáveis.

Também é possível enviar comandos SMS para o celular perdido usando o [Avast Mobile Security](https://www.avast.com/pt-br/free-mobile-security), caso você consiga outro celular com esse antivírus instalado. Para isso:

1. Abra o Avast Mobile Security e selecione **mais ferramentas**:

{% include image.html src="/files/2015/10/celular-roubado-04.png" %}

2. Selecione **Anti-Theft**:

{% include image.html src="/files/2015/10/celular-roubado-05.png" %}

3. Selecione **Controle remoto via SMS**:

{% include image.html src="/files/2015/10/celular-roubado-06.png" %}

4. A lista de comandos possíveis aparece:

{% include image.html src="/files/2015/10/celular-roubado-07.png" %}

5. Clicando em um deles (`LOST`, por exemplo), o Avast te auxiliará a enviar a mensagem SMS com o comando:

{% include image.html src="/files/2015/10/celular-roubado-08.png" %}

Ao utilizar o Avast Anti-Theft para controlar seu celular perdido, você deve estar atento a alguns detalhes:

- o celular que você usa para enviar comandos via SMS deve possuir créditos para enviá-los, assim como seu celular deve possuir créditos para poder alertá-lo quando um *chip* desconhecido for inserido e responder aos comandos recebidos; e
- se você configurou o Avast Anti-Theft para aceitar apenas mensagens enviadas pelos celulares cadastrados como amigos, certifique-se de utilizar um desses celulares para enviar os comandos, do contrário eles serão ignorados.

Para mais informações sobre o Avast Anti-Theft, consulte o manual do Avast Mobile Security:

- [Avast User Manuals | Download and Read User Guide or Manual](https://www.avast.com/pt-br/download-documentation)

### Microsoft Exchange

Se você trabalha em uma empresa que utiliza o [Microsoft Exchange](https://products.office.com/pt-br/exchange/email) para prover o *e-mail* organizacional e seu celular está vinculado a uma [conta corporativa](https://support.office.com/pt-br/article/O-que-%C3%A9-uma-conta-do-Microsoft-Exchange-47f000aa-c2bf-48ac-9bc2-83e5c6036793?ui=pt-BR&rs=pt-BR&ad=BR), você pode acessar o *e-mail* da empresa e enviar um comando para [limpar remotamente todos os dados da memória do celular](https://support.office.com/pt-br/article/Excluir-ou-limpar-remotamente-todas-as-informações-do-seu-telefone-ou-dispositivo-perdido-395fa3f6-8e0c-4ebe-9b5e-d661d7792fac). Para isso:

1. Entre na sua conta usando o Outlook Web App.

2. No Outlook Web App, no canto superior direito da tela, clique em **Opções** e depois em **Consulte Todas as Opções**.

3. Do lado esquerdo da tela, clique em **Telefone**.

4. Selecione o celular ou *tablet* cuja memória você deseja apagar.

5. Clique em **Apagar Dispositivo**:

{% include image.html src="/files/2015/10/celular-roubado-09.jpg" %}

### Outras opções

Se você possui um [iPhone](http://www.apple.com/br/iphone/) ou [Windows Phone](https://www.windowsphone.com/pt-br), saiba que esses celulares também possuem aplicativos de fábrica que podem ajudá-lo a localizá-los em caso de perda ou roubo. Para mais informações, recomendo a leitura dessa página:

- [Aplicativos de fábrica ajudam a localizar smartphone roubado; saiba usar - Notícias - Tecnologia](http://tecnologia.uol.com.br/noticias/redacao/2014/05/06/aplicativos-ajudam-a-localizar-smartphone-roubado-saiba-como-configurar.htm)

## 2) Bloquear o *chip*

Se tentar recuperar o celular não deu certo ou não foi possível, talvez seja melhor aceitar o aparelho como perdido e agir então para limitar o raio de ação do bandido.

A primeira coisa a fazer é bloquear o *chip*, para que não consumam seus créditos e/ou franquia de Internet, nem façam ligações se passando por você.

Esse é um dos procedimentos mais simples e rápidos: entre em contato com a sua operadora e solicite o bloqueio do seu *chip*. Depois, é possível solicitar outro *chip* com o mesmo número.

O procedimento para bloquear o *chip* varia de operadora para operadora, mas deixo aqui instruções que encontrei na Internet para clientes da [Oi](http://faq.oi.com.br/como-faco-para-bloquear-meu-numero-por-perda-ou-roubo) e da [TIM](http://www.tim.com.br/para-voce/atendimento/perguntas-frequentes/tim-chip/bloqueio-e-desbloqueio-de-chip).

## 3) Bloquear a conta do WhatsApp

Se você possui outro *chip* com o mesmo número, então a maneira mais rápida de bloquear sua conta no celular roubado, segundo [orientação da Equipe de Suporte do WhatsApp](http://www.whatsapp.com/faq/pt_br/general/24460358), é **acessar sua conta do WhatsApp por outro celular**.

A lógica é simples: como uma conta do WhatsApp pode ser usada apenas em um celular de cada vez, quando você inserir seu *chip* em outro aparelho e entrar na sua conta do WhatsApp por ele, automaticamente o aparelho roubado é desconectado.

Se você não tiver como acessar sua conta por outro celular, **envie um *e-mail* para a Equipe de Suporte do WhatsApp** (<support@whatsapp.com>) informando que seu celular foi roubado e solicitando a desativação da conta. No *e-mail*, informe seu número em [formato internacional](http://www.whatsapp.com/faq/pt_br/general/21016748) (por exemplo, **+55 79 91234-5678**).

Fique atento ao seu *e-mail*: eles não demoram a responder.

Como você bloqueou seu *chip*, mesmo que o celular roubado ainda esteja com seu número, não conseguirá mais entrar na sua conta do WhatsApp, pois não poderá receber a mensagem SMS para verificar a conta.

## 4) Revogar acesso do dispositivo ao *netbanking*

Para te tranquilizar um pouco: sei que o momento é tenso, mas não mencionei o *netbanking* antes porque, a menos que você tenha informado sua senha, **a chance de conseguirem acessar sua conta bancária pelo celular é remota**.

Na pior das hipóteses, a depender da política de segurança do seu banco, pode ser que o bandido chute e erre sua senha algumas vezes e o banco bloqueie sua conta, o que, para o momento, pode até te ajudar. Depois, você pode entrar em contato com o banco para mudar a senha e desbloquear a conta.

Se quiser prevenir qualquer possível dano à sua conta, você pode revogar o acesso do seu celular ao *netbanking*, caso seu banco ofereça essa possibilidade. Entre em contato com seu banco para saber se isso é possível e como você deve proceder.

Para mostrar um exemplo, vejamos como é possível bloquear o acesso de um celular pelo *netbanking* do [Banco do Brasil](http://www.bb.com.br):

1. Acesse o [*site* do Banco do Brasil](http://www.bb.com.br) e entre com sua agência e conta corrente.

2. Na tela seguinte, entre com sua senha.

3. No menu à esquerda, desça até encontrar a opção **Segurança**, aponte para ela e, em **Autorização/Bloqueio para transações**, clique em **Smartphone e Tablet**.

4. Na lista, selecione o celular roubado e clique em **Bloquear**:

{% include image.html src="/files/2015/10/celular-roubado-10.jpg" %}

## 5) Mudar as senhas das contas e encerrar as sessões abertas

Os aplicativos que armazenam suas senhas oferecem bastante comodidade na hora de usar, mas depois que você é assaltado, eles oferecem um sério risco à sua segurança.

Nesse momento, é importante que você altere a senha de **todas** as suas contas. **TODAS** mesmo! Não só as contas referentes aos aplicativos (como o [Facebook](https://play.google.com/store/apps/details?id=com.facebook.katana), por exemplo), mas também as contas dos *sites*. Se você gosta da comodidade, lembre-se que você pode ter autorizado seu navegador a memorizar senhas.

Você pode começar alterando as senhas das contas utilizadas pelos aplicativos. Se seu celular é um Android, você pode ver a [lista dos seus aplicativos](https://play.google.com/apps) no [Google Play](https://play.google.com/) para se certificar de não esquecer de nenhum:

{% include image.html src="/files/2015/10/celular-roubado-11.jpg" caption="O Facebook e o Foursquare são dois exemplos de aplicativos cujas contas você deve mudar a senha" %}

Alguns serviços, a exemplo do [Facebook](https://www.facebook.com/) e do [Google](https://www.google.com.br/), permitem que você encerre as sessões abertas em todos os dispositivos, para assegurar que ninguém utiliza sua conta.

Ao [mudar a senha do Facebook](https://pt-br.facebook.com/help/748385731848104), ele oferece essa possibilidade:

{% include image.html src="/files/2015/10/celular-roubado-12.jpg" %}

Ao [mudar a senha do Google](https://support.google.com/mail/answer/41078?hl=pt-BR), automaticamente todas as sessões abertas são desconectadas.

Se você utiliza o [Mozilla Firefox](https://www.mozilla.org/pt-BR/firefox/) ou o [Google Chrome](https://www.google.com.br/chrome/) no computador e no celular, e sincroniza todos os seus dados com a nuvem, verificar quais usuários e senhas foram salvos pode te ajudar a não esquecer de nenhum *site*.

Para [verificar os usuários e senhas salvas no Mozilla Firefox](https://support.mozilla.org/pt-BR/kb/gerenciador-de-senhas-memorize-apague-e-altere-sen):

1. No canto superior direito da janela, clique no menu do Mozilla Firefox (um botão que apresenta três traços horizontais).

2. Clique em **Preferências**.

3. Clique na aba **Segurança**.

4. Clique no botão **Senhas memorizadas** para que o Gerenciador de Senhas seja aberto:

{% include image.html src="/files/2015/10/celular-roubado-13.jpg" %}

Para [verificar os usuários e senhas salvas no Google Chrome](https://support.google.com/chrome/answer/95606?hl=pt-BR):

1. No canto superior direito da janela, clique no menu do Google Chrome (um botão que apresenta três traços horizontais).

2. Clique em **Configurações**.

3. Na parte inferior da página, clique em **Mostrar configurações avançadas**.

4. Em **Senhas e formulários**, clique em **Gerenciar senhas**. Uma caixa de diálogo com uma lista de senhas salvas é exibida:

{% include image.html src="/files/2015/10/celular-roubado-14.jpg" %}

Essa página apresenta instruções para os navegadores [Internet Explorer](http://windows.microsoft.com/pt-br/internet-explorer/), [Opera](http://www.opera.com/pt-br) e [Safari](http://www.apple.com/br/safari/):

- [Como exibir senhas de sites salvas no navegador- TecMundo](http://www.tecmundo.com.br/senha/9104-como-exibir-senhas-de-sites-salvas-no-navegador.htm)

## 6) Localizar o número IMEI

Bloquear o seu *chip* impede que o ladrão use o seu número, mas não que ele insira outro *chip* no celular e continue utilizando o aparelho normalmente. Além de bloquear seu *chip*, você deve bloquear também o número IMEI do celular.

O [número IMEI](http://www.tecmundo.com.br/celular/3544-imei-aprenda-a-bloquear-o-aparelho-celular-em-caso-de-roubo.htm) (*International Mobile Equipment Identity*, Identificação Internacional de Equipamento Móvel) é um número único atribuído a cada celular, semelhante a um chassi de carro ou um número de série. Todo celular habilitado tem seu IMEI registrado em um banco de dados central, compartilhado por todas as operadoras.

Quando um celular possui seu IMEI bloqueado, independente do *chip* utilizado, todas as operadoras se recusam a oferecer serviços para ele. Então, ele não pode mais realizar chamadas, enviar mensagens SMS ou se conectar à Internet móvel.

A boa prática diz que devemos localizar o número IMEI do aparelho e guardá-lo em um arquivo ou anotá-lo em um lugar seguro, pro caso de um dia precisar. Se chegou o dia em que você precisou do IMEI e não o tem anotado em lugar nenhum, ainda assim pode tentar descobri-lo. Vejamos algumas opções.

Para começar, saiba que você pode localizar o número IMEI do seu celular em duas ferramentas já mostradas aqui:

- na [conta do Avast](https://my.avast.com/pt-br/) (veja na tela acima), clicando em **Mais informações**; ou
- no Outlook Web App (veja na tela acima), selecionando o celular na lista e clicando em **Detalhes**.

**Observação:** se seu celular possui dois ou mais *chips*, há um número IMEI para cada entrada de *chip*. O ideal é que você identifique todos os números IMEI associados ao seu celular.

### Caixa do celular

Você ainda tem a caixa na qual veio seu aparelho, quando foi comprado? Se sim, busque-a. Deve haver nela um adesivo com um código de barras indicando o número IMEI.

Nem sempre é tão óbvio descobrir qual dos números impressos na caixa é o IMEI. Veja nessa caixa de um [Samsung Galaxy S4 Mini Duos](http://www.samsung.com/latin_en/consumer/mobile-devices/smartphones/galaxy-s/GT-I9192ZWLTPA) que o número IMEI aparece desacompanhado de um rótulo que o identifique:

{% include image.html src="/files/2015/10/celular-roubado-15.jpg" %}

Além disso, já que esse celular suporta o uso de até dois *chips*, esse adesivo deveria apresentar dois números IMEI.

### Painel do Google

O [Painel do Google](https://support.google.com/accounts/answer/162744?hl=pt-BR) concentra informações relacionadas à sua conta e aos produtos do Google que você usa. Você pode acessá-lo [nesse endereço](https://www.google.com/dashboard?hl=pt-BR).

Entre com a conta do Google associada ao seu celular Android e expanda a seção **Android** para ver informações sobre o(s) seu(s) dispositivo(s) Android. No meio dessas informações, deve estar o número IMEI do seu celular:

{% include image.html src="/files/2015/10/celular-roubado-16.jpg" %}

### Outros lugares

Usuários de iPhone podem descobrir o IMEI do aparelho via [iTunes](http://www.apple.com/br/itunes/), como mostra essa página:

- [Encontre o número de série e outras informações do seu iPhone, iPad e iPod touch  - Suporte da Apple](https://support.apple.com/pt-br/HT204073)

## 7) Registrar o boletim de ocorrência

Procure a delegacia mais próxima para registrar a ocorrência. Em alguns estados, também é possível fazer isso pela Internet (veja, por exemplo, a [Delegacia Interativa de Sergipe](http://www.delegaciainterativa.se.gov.br/)).

Forneça a maior quantidade de informações possível: data, hora, local, o que você fazia, como te abordaram, como e por onde fugiram, o que levaram... Em relação ao celular, forneça pelo menos modelo e número(s) IMEI. Ao final, peça providências.

Se você chegou a usar algum sistema de localização, como o Avast Anti-Theft, pode adicionar quaisquer informações que descobriu ao registro.

Comparecendo pessoalmente a uma delegacia, pode ser que você receba alguma instrução, como tentar **obter imagens de câmeras de segurança** na cena do crime. Siga as instruções do delegado.

## 8) Bloquear o número IMEI

Entre em contato com a operadora e verifique como é possível bloquear o(s) número(s) IMEI do aparelho. [Possivelmente](http://www.tecmundo.com.br/celular/3544-imei-aprenda-a-bloquear-o-aparelho-celular-em-caso-de-roubo.htm), será solicitado a você o boletim de ocorrência, por isso falei do bloqueio do IMEI depois do boletim de ocorrência.

Com o(s) número(s) IMEI bloqueado(s), o celular roubado não poderá mais realizar chamadas, enviar mensagens SMS ou se conectar à Internet móvel.

## 9) Comprar um celular novo

Naturalmente, depois de toda a dor de cabeça, você vai comprar um celular novo. Hoje é praticamente impossível viver sem um. Além disso, você, diferente do bandido, [pode contar com salário no mês seguinte](http://musica.com.br/artistas/ana-carolina/m/noticias-populares/letra.html).

**Atenção:** se for comprar um celular usado, não feche negócio sem antes verificar todas as suas funções. Se ele não faz ligações, não envia mensagens SMS e não se conecta à Internet móvel, **desconfie** da sua procedência: **não compre!**

Se seu celular anterior era um Android e fazia [*backup* dos dados nos servidores do Google](https://support.google.com/nexus/answer/2819582?hl=pt-BR), e seu celular novo também é um Android, ao fazer *login* em sua conta do Google, os dados armazenados no *backup* são restaurados automaticamente, economizando um tempo na tarefa de colocar as coisas no lugar novamente.

Você pode habilitar a restauração das configurações dos aplicativos quando reinstalá-los:

1. Abra o aplicativo **Configurações**.

2. Dentre as várias opções, selecione **Fazer backup e restaurar**.

3. Marque a caixa ao lado de **Restauração automática**:

{% include image.html src="/files/2015/10/celular-roubado-17.png" %}

Uma vez que tudo esteja em ordem, não custa lembrar de **reforçar os cuidados**. Afinal de contas, moramos no Brasil...

Também não se esqueça de se precaver e reforçar a segurança do seu celular novo: dicas no próximo *post*!

Abraço a todos e boa sorte!
