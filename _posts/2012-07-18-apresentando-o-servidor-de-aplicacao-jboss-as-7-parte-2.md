---
date: '2012-07-18 23:16:17 -0300'
date_gmt: '2012-07-18 23:16:17 -0300'
layout: post
published: true
status: publish
title: Apresentando o servidor de aplica&ccedil;&atilde;o JBoss AS 7 (parte 2)
---

O [JBoss Application Server](http://www.jboss.org/jbossas/) (ou, abreviadamente, JBoss AS) é um servidor de aplicação de código aberto desenvolvido pela [JBoss](http://www.jboss.org/) (atualmente, uma divisão da [Red Hat](http://www.redhat.com/)) para a plataforma [Java EE](http://www.oracle.com/technetwork/java/javaee/). Ele oferece toda a infraestrutura necessária para executar aplicações Web desenvolvidas sobre essa plataforma. Nesse post, você saberá o necessário para começar a desenvolver aplicações Java para a Web utilizando esse servidor.

![jboss_as_01]({{ site.url }}/files/2012/07/jboss_as_01.jpg)

Essa é a segunda parte de dois posts que visam apresentar o JBoss AS 7. Se você desejava acessar a primeira parte, [clique aqui]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7 %}). Senão, continue lendo.

<!--more-->

### Console de administração Web do JBoss AS

Podemos gerenciar o servidor de aplicação JBoss AS através de um console Web, que nos permite realizar, entre outras configurações, deploy e undeploy de aplicações, iniciar ou interromper a execução de aplicações, verificar o consumo de memória do servidor, configurar datasources, etc. Esse console, por padrão (se você não alterar as configurações de portas) é acessado através do endereço “[http://localhost:9990/](http://localhost:9990/)“.

Na primeira vez em que você tentar acessar esse console, no entanto, ele emitirá uma mensagem de erro (é bonita, eu sei, mas se você examinar seu conteúdo, verá que é uma mensagem de erro, rsrsrs):

![jboss_as_05]({{ site.url }}/files/2012/07/jboss_as_05.jpg)

Esse aviso nos diz que é necessário definir um usuário e uma senha para acessar o console de administração Web. Vamos fazer isso.

Execute o script “add-user” dentro da pasta “bin” do servidor (“C:\jboss-as\bin\add-user.bat” no Windows, e “/home/vinicius/jboss-as/bin/add-user.sh” no Linux):

{% highlight bash %}
$ /home/vinicius/jboss-as/bin/add-user.sh
{% endhighlight %}

Após iniciar o script, você será guiado no processo de adicionar um novo usuário:

{% highlight text %}
What type of user do you wish to add?
a) Management User (mgmt-users.properties)
b) Application User (application-users.properties)
(a):
{% endhighlight %}

Nesse caso, como estamos criando um usuário com a finalidade de administrar o servidor, escolhemos a opção “a”. Ela já é a opção padrão, apenas tecle Enter.

Você será solicitado a fornecer informações sobre o novo usuário. Quando questionado sobre o domínio do usuário (Realm), aceite a opção padrão (ManagementRealm), para isso basta teclar Enter quando chegar nesse campo. No mais, digite nome de usuário, senha e confirme a senha.

{% highlight text %}
Enter the details of the new user to add.
Realm (ManagementRealm) :
Username :
Password :
Re-enter Password :
{% endhighlight %}

Se não houver nada errado, uma mensagem de confirmação será exibida na tela.

Feito isso, nós já podemos acessar o console de administração Web, informando o usuário e senha criados quando solicitados (lembrando que o endereço é “[http://localhost:9990/](http://localhost:9990/)“):

![jboss_as_06]({{ site.url }}/files/2012/07/jboss_as_06.jpg)

Vamos fazer undeploy e deploy da aplicação usando o console de administração Web. Para isso, no menu do lado esquerdo, clique em “Manage Deployments”. É exibida uma lista das aplicações instaladas no servidor:

![jboss_as_07]({{ site.url }}/files/2012/07/jboss_as_07.jpg)

Clicando em “Disable”, interromperíamos a aplicação, fazendo com que ela não ficasse mais disponível ao usuário final, mas ainda permanecesse no servidor. Não é o que queremos aqui. Clique em “Remove” para de fato remover a aplicação do servidor. Aparece uma mensagem de confirmação na tela, clique em “Confirm”.

Feito isso a aplicação desaparece da lista, ela já não está mais no servidor (e muito menos acessível):

![jboss_as_08]({{ site.url }}/files/2012/07/jboss_as_08.jpg)

Se você tentar acessá-la pelo seu endereço (“[http://localhost:8080/jboss-as-helloworld-jsf/](http://localhost:8080/jboss-as-helloworld-jsf/)“), visualizará uma página de erro no navegador.

De volta ao console de administração Web, clique no botão “Add Content” para fazermos deploy da aplicação novamente.

O primeiro passo é selecionar o arquivo que você deseja fazer deploy. Na janela que aparece, clique em “Browse…”, navegue até a pasta do exemplo (aqui, “/home/vinicius/jboss-jdf-jboss-as-quickstart-8505020/helloworld-jsf/”) e, dentro da pasta “target”, escolha o arquivo “jboss-as-helloworld-jsf.war”, que representa a aplicação compilada e empacotada em um formato próprio de aplicação Web (arquivo **.war**), análogo ao formato de aplicação Desktop (arquivo **.jar**). Por último, clique em “Next”:

![jboss_as_09]({{ site.url }}/files/2012/07/jboss_as_09.jpg)

Ele pede para confirmar as informações. Simplesmente clique em “Save”:

![jboss_as_10]({{ site.url }}/files/2012/07/jboss_as_10.jpg)

De volta à lista de aplicações, a aplicação foi instalada no servidor, mas não foi iniciada:

![jboss_as_11]({{ site.url }}/files/2012/07/jboss_as_11.jpg)

Clique em Enable para iniciá-la. Aparece uma mensagem de confirmação na tela, clique em “Confirm”. Feito isso a aplicação passa a aparecer na lista como habilitada:

![jboss_as_12]({{ site.url }}/files/2012/07/jboss_as_12.jpg)

Agora é possível acessá-la novamente pelo endereço “[http://localhost:8080/jboss-as-helloworld-jsf/](http://localhost:8080/jboss-as-helloworld-jsf/)“.

### Encerrando o JBoss AS

Encerrar o servidor, tanto no Windows quanto no Linux, é um procedimento bastante simples: basta abortar a execução do comando na janela de terminal onde o servidor está sendo executado. Para isso, basta apertar Ctrl + C (vale para ambos os sistemas).

Aqui ele encerrou o servidor em pequeníssimos 143 milissegundos:

{% highlight text %}
15:09:21,996 INFO  [org.jboss.as.osgi] (MSC service thread 1-1) JBAS011942: Stopping OSGi Framework
15:09:22,034 INFO  [org.jboss.as.logging] JBAS011503: Restored bootstrap log handlers
15:09:22,044 INFO  [org.jboss.weld.deployer] JBAS016009: Stopping weld service for deployment jboss-as-helloworld-jsf.war
15:09:22,053 INFO  [org.apache.coyote.http11.Http11Protocol] Pausing Coyote HTTP/1.1 on http--127.0.0.1-8080
15:09:22,058 INFO  [org.apache.coyote.http11.Http11Protocol] Stopping Coyote HTTP/1.1 on http--127.0.0.1-8080
15:09:22,083 INFO  [com.arjuna.ats.jbossatx] ARJUNA032018: Destroying TransactionManagerService
15:09:22,111 INFO  [com.arjuna.ats.jbossatx] ARJUNA032014: Stopping transaction recovery manager
15:09:22,111 INFO  [org.jboss.as.server.deployment] JBAS015877: Stopped deployment jboss-as-helloworld-jsf.war in 132ms
15:09:22,114 INFO  [org.jboss.as.controller] JBAS014774: Service status report
JBAS014776:    Newly corrected services:
service jboss.server.controller.management.security_realm.ApplicationRealm.properties_authentication (new available)

15:09:22,121 INFO  [org.jboss.as] JBAS015950: JBoss AS 7.1.1.Final "Brontes" stopped in 143ms
{% endhighlight %}

### Mais informações sobre o JBoss AS

Pois é, pessoal. Vou encerrando minha apresentação do JBoss AS por aqui. Gostaria apenas de fazer algumas considerações finais e deixar as páginas que usei como referência para escrever esse post.

Também é possível administrar o JBoss AS através do terminal (da linha de comando), mas não apresentei essa ferramenta aqui por considerar o console Web muito mais simples de usar. Mais informações sobre essas duas ferramentas (o console Web e o console via terminal) vocês encontram no [guia de administração do JBoss AS](https://docs.jboss.org/author/display/AS71/Admin+Guide).

Um bom ponto de partida para quem quiser conhecer mais o JBoss AS (assim como o Maven e a plataforma Java EE) é explorar as [aplicações de exemplo](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/) do servidor. Há um [guia passo-a-passo](https://docs.jboss.org/author/display/AS71/Getting+Started+Developing+Applications+Guide) que fornece explicações sobre alguns desses exemplos.

Quem utiliza a IDE [Eclipse](http://www.eclipse.org/) pode se interessar em instalar o plugin [JBoss Tools](http://www.jboss.org/tools/), que acrescenta funcionalidades no Eclipse próprias para a utilização do JBoss AS como servidor Java EE dentro da IDE (como adicionar o servidor na view Servers, executar aplicações Web desenvolvidas pela IDE no servidor, fazer deploy e undeploy de aplicações, iniciar ou interromper aplicações, realizar depuração remota) e para o desenvolvimento de aplicações Web (acrescenta assistentes para a criação de arquivos próprios dessas aplicações, melhora a compleção de código, entre outras).

Encerrando as considerações, há um vídeo na Internet que demonstra [5 maneiras de fazer deploy da sua aplicação no JBoss AS 7](http://vimeo.com/25831010). Nesse vídeo, ele realiza deploy da aplicação de exemplo [helloworld](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/helloworld/) de 5 maneiras diferentes.

As páginas da [documentação oficial do JBoss AS](https://docs.jboss.org/author/display/AS71/Documentation) que utilizei como referência para escrever esse post foram:

- [Getting Started Guide](https://docs.jboss.org/author/display/AS71/Getting+Started+Guide)
- [Getting Started Developing Applications Guide](https://docs.jboss.org/author/display/AS71/Getting+Started+Developing+Applications+Guide)
- [Admin Guide](https://docs.jboss.org/author/display/AS71/Admin+Guide)

Abraço a todos e até a próxima!