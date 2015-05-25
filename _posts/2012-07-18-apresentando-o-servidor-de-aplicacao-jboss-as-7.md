---
date: '2012-07-18 22:18:38 -0300'
date_gmt: '2012-07-18 22:18:38 -0300'
layout: post
published: true
status: publish
title: Apresentando o servidor de aplica&ccedil;&atilde;o JBoss AS 7
---

O [JBoss Application Server](http://www.jboss.org/jbossas/) (ou, abreviadamente, JBoss AS) é um servidor de aplicação de código aberto desenvolvido pela [JBoss](http://www.jboss.org/) (atualmente, uma divisão da [Red Hat](http://www.redhat.com/)) para a plataforma [Java EE](http://www.oracle.com/technetwork/java/javaee/). Ele oferece toda a infraestrutura necessária para executar aplicações Web desenvolvidas sobre essa plataforma. Nesse post, você saberá o necessário para começar a desenvolver aplicações Java para a Web utilizando esse servidor.

![jboss_as_01]({{ site.url }}/files/2012/04/jboss_as_01.jpg)

O JBoss AS 7 é completamente compatível com a especificação Java EE 6 (diz-se “Java EE 6 Full Profile”), tendo recebido inclusive [certificação da Oracle](http://www.oracle.com/technetwork/java/javaee/overview/compatibility-jsp-136984.html). Assim, ao executar nossas aplicações Web nesse servidor, se elas foram desenvolvidas obedecendo aos padrões da plataforma, teremos a certeza de que elas funcionarão como desejamos (é claro que eventualmente erros de lógica podem ser cometidos por programadores, o fato de uma aplicação atender à especificação não garante que ela esteja livre desses erros, rsrsrs).

É necessário que o Java Development Kit (JDK) esteja instalado no computador para que o JBoss AS possa ser executado. Também é importante que a variável de ambiente JAVA_HOME esteja configurada, o JBoss AS obtém o valor dessa variável e o utiliza para saber a localização do JDK no sistema. Se precisar de ajuda com relação a isso, leia [esse outro post]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}), no qual explico como instalar e testar o JDK.

Precisaremos também do Maven, que já foi abordado em [outro post]({% post_url 2012-07-18-instalacao-do-apache-maven %}). Ele não é necessário à execução do JBoss AS, mas precisaremos dele nesse passo-a-passo para implantar uma aplicação de exemplo no servidor.

### Download do JBoss AS

Na [página de downloads do JBoss AS 7](http://www.jboss.org/jbossas/downloads/) há várias opções de download. Vamos nos concentrar aqui naquelas que se referem à versão mais atual do servidor de aplicação (no momento da escrita deste post, a versão 7.1.1, apelido “Brontes”). Para os usuários de Windows, eu recomendo o download do arquivo **.zip**, e para os usuários de Linux, eu recomendo o download do arquivo **.tar.gz**, pois esses formatos são os mais comuns nesses dois sistemas.

Nesse passo-a-passo, precisaremos ainda do código-fonte da aplicação de exemplo que demonstrarei, mas como ela não é necessária à instalação do servidor, deixarei seu download para um momento mais oportuno.

Os links para download direto dos arquivos mencionados acima são [esse](http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.zip) e [esse](http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz). No caso do Linux, é possível baixar este arquivo pelo terminal usando o comando **wget**:

{% highlight bash %}
$ wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz
{% endhighlight %}

### Instalação do JBoss AS

Tanto no Windows quanto no Linux, basta descompactar o arquivo baixado que o JBoss AS já pode ser executado a partir daquele local. Assim como acontece com o [JDK]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}), é possível instalar em uma localização visível a todos os usuários (como “C:\” no Windows ou “/opt/” no Linux) ou visível apenas ao seu usuário (no meu caso, “C:\Users\Vinicius\Documents” ou “/home/vinicius”). Em ambos os casos, o arquivo descompactado gera uma pasta chamada “jboss-as-7.1.1.Final? e pode ser excluído após a extração.

É necessário prestar atenção a esse local pois sempre que quisermos invocar o JBoss AS, digitaremos o caminho para esse local. Assim, recomendo renomear a pasta para algo menor, como “jboss-as”.

No Windows, fiz a extração do arquivo na raiz do disco “C:\” e renomeei a pasta “jboss-as-7.1.1.Final” para apenas “jboss-as”. O caminho para o JBoss AS no meu sistema é, então, “C:\jboss-as”.

No Linux é mais prático fazer a instalação na pasta home do usuário. Se a finalidade de usar o JBoss AS é didática, recomendo essa instalação, porque é mais fácil de manter (não é necessário obter privilégios de administrador sempre que for necessário alterar algum arquivo à mão, por exemplo). No terminal, os comandos para download e extração seriam (já estou incluindo o comando para renomear a pasta, conforme sugeri):

{% highlight bash %}
$ cd /home/vinicius/
$ wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz
$ tar zxvf jboss-as-7.1.1.Final.tar.gz
$ mv jboss-as-7.1.1.Final jboss-as
$ rm jboss-as-7.1.1.Final.tar.gz
{% endhighlight %}

É possível instalar também em uma localização global, visível a todos os usuários. No caso específico do JBoss AS, já que estamos falando de um servidor, talvez essa seja a instalação mais comum. Para fazer isso, o procedimento é parecido, mas é necessário ter permissões de administrador:

{% highlight bash %}
$ cd /home/vinicius/
$ wget http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.tar.gz
# mv jboss-as-7.1.1.Final.tar.gz /opt
# cd /opt
# tar zxvf jboss-as-7.1.1.Final.tar.gz
# mv jboss-as-7.1.1.Final jboss-as
# rm jboss-as-7.1.1.Final.tar.gz
{% endhighlight %}

No primeiro caso, o caminho para o JBoss AS passa a ser “/home/vinicius/jboss-as” e, no segundo, “/opt/jboss-as”.

### Inicializando o servidor

De acordo com a [documentação do JBoss AS](https://docs.jboss.org/author/display/AS71/Getting+Started+Guide), há duas maneiras de iniciar o servidor de aplicação: em modo “standalone”, onde cada instância do servidor é um processo que atua de maneira independente; ou em modo de domínio (“domain”), onde várias máquinas (físicas ou virtuais) executando o servidor de aplicação compõem um domínio, no qual há uma máquina central responsável por gerenciar as demais. Para fins de demonstração, nessa página (e nas demais em que eu me referir ao JBoss AS) usarei o servidor em modo “standalone”.

Para iniciar o servidor dessa maneira, no Windows, usando o Windows Explorer mesmo, você pode ir até a pasta na qual o JBoss AS está instalado (no meu caso, “C:\jboss-as”), abrir a pasta “bin” e dar um duplo-clique no script “standalone.bat”. Uma nova janela de terminal se abre com a saída do servidor. É interessante criar um atalho para esse arquivo em algum local de fácil acesso, para facilitar sempre que se desejar iniciar o servidor.

No Windows, também é possível iniciar o JBoss AS pela linha de comando, invocando esse mesmo script. Nesse caso, a própria janela de terminal na qual o comando é invocado passa a exibir a saída do servidor (é importante observar que não é possível executar nenhum outro comando nessa mesma janela enquanto o servidor estiver em execução). O comando fica:

{% highlight powershell %}
> C:\jboss-as\bin\standalone.bat
{% endhighlight %}

No Linux, para iniciar o JBoss AS em modo standalone, devemos executar em uma janela de terminal o seguinte comando (supondo que o JBoss AS esteja instalado na pasta “/home/vinicius/jboss-as”):

{% highlight bash %}
$ ./home/vinicius/jboss-as/bin/standalone.sh
{% endhighlight %}

Nesse caso, a própria janela de terminal na qual o comando é invocado passa a exibir a saída do servidor e, assim como acontece no Windows, não é possível executar nenhum outro comando nessa mesma janela enquanto o servidor estiver em execução.

O terminal deve exibir uma saída parecida com essa, resultado da inicialização do servidor:

{% highlight text %}
=========================================================================

JBoss Bootstrap Environment

JBOSS_HOME: /home/vinicius/jboss-as

JAVA: /opt/jdk1.7.0/bin/java

JAVA_OPTS:  -server -XX:+TieredCompilation -Xms64m -Xmx512m -XX:MaxPermSize=256m -Djava.net.preferIPv4Stack=true -Dorg.jboss.resolver.warning=true -Dsun.rmi.dgc.client.gcInterval=3600000 -Dsun.rmi.dgc.server.gcInterval=3600000 -Djboss.modules.system.pkgs=org.jboss.byteman -Djava.awt.headless=true -Djboss.server.default.config=standalone.xml

=========================================================================

04:35:28,890 INFO  [org.jboss.modules] JBoss Modules version 1.1.1.GA
04:35:29,488 INFO  [org.jboss.msc] JBoss MSC version 1.0.2.GA
04:35:29,647 INFO  [org.jboss.as] JBAS015899: JBoss AS 7.1.1.Final "Brontes" starting
04:35:32,341 INFO  [org.xnio] XNIO Version 3.0.3.GA
04:35:32,366 INFO  [org.xnio.nio] XNIO NIO Implementation Version 3.0.3.GA
04:35:32,457 INFO  [org.jboss.as.server] JBAS015888: Creating http management service using socket-binding (management-http)
04:35:32,468 INFO  [org.jboss.remoting] JBoss Remoting version 3.2.3.GA
04:35:32,623 INFO  [org.jboss.as.logging] JBAS011502: Removing bootstrap log handlers
04:35:32,662 INFO  [org.jboss.as.configadmin] (ServerService Thread Pool -- 26) JBAS016200: Activating ConfigAdmin Subsystem
04:35:32,831 INFO  [org.jboss.as.clustering.infinispan] (ServerService Thread Pool -- 31) JBAS010280: Activating Infinispan subsystem.
04:35:33,167 INFO  [org.jboss.as.naming] (ServerService Thread Pool -- 38) JBAS011800: Activating Naming Subsystem
04:35:33,193 INFO  [org.jboss.as.osgi] (ServerService Thread Pool -- 39) JBAS011940: Activating OSGi Subsystem
04:35:33,269 INFO  [org.jboss.as.connector] (MSC service thread 1-2) JBAS010408: Starting JCA Subsystem (JBoss IronJacamar 1.0.9.Final)
04:35:33,393 INFO  [org.jboss.as.security] (ServerService Thread Pool -- 44) JBAS013101: Activating Security Subsystem
04:35:33,514 INFO  [org.jboss.as.webservices] (ServerService Thread Pool -- 48) JBAS015537: Activating WebServices Extension
04:35:33,515 INFO  [org.jboss.as.security] (MSC service thread 1-1) JBAS013100: Current PicketBox version=4.0.7.Final
04:35:33,588 INFO  [org.jboss.as.connector.subsystems.datasources] (ServerService Thread Pool -- 27) JBAS010403: Deploying JDBC-compliant driver class org.h2.Driver (version 1.3)
04:35:33,549 INFO  [org.jboss.as.naming] (MSC service thread 1-2) JBAS011802: Starting Naming Service
04:35:34,470 INFO  [org.jboss.as.mail.extension] (MSC service thread 1-1) JBAS015400: Bound mail session 1
04:35:34,530 INFO  [org.jboss.ws.common.management.AbstractServerConfig] (MSC service thread 1-2) JBoss Web Services - Stack CXF Server 4.0.2.GA
04:35:35,289 INFO  [org.apache.coyote.http11.Http11Protocol] (MSC service thread 1-2) Starting Coyote HTTP/1.1 on http--127.0.0.1-8080
04:35:35,866 INFO  [org.jboss.as.remoting] (MSC service thread 1-2) JBAS017100: Listening on /127.0.0.1:9999
04:35:36,060 INFO  [org.jboss.as.server.deployment.scanner] (MSC service thread 1-2) JBAS015012: Started FileSystemDeploymentService for directory /home/vinicius/jboss-as/standalone/deployments
04:35:36,119 INFO  [org.jboss.as.remoting] (MSC service thread 1-2) JBAS017100: Listening on /127.0.0.1:4447
04:35:36,270 INFO  [org.jboss.as.connector.subsystems.datasources] (MSC service thread 1-2) JBAS010400: Bound data source 1
04:35:36,294 INFO  [org.jboss.as] (Controller Boot Thread) JBAS015951: Admin console listening on http://127.0.0.1:9990
04:35:36,295 INFO  [org.jboss.as] (Controller Boot Thread) JBAS015874: JBoss AS 7.1.1.Final "Brontes" started in 8025ms - Started 133 of 208 services (74 services are passive or on-demand)
{% endhighlight %}

Tanto no Windows quanto no Linux, após iniciado o servidor, abra seu navegador de preferência e acesse o endereço “[http://localhost:8080](http://localhost:8080)” (a porta 8080 é a utilizada pelo JBoss AS por padrão, mas essa porta pode ser alterada na configuração do servidor). Você deve ver a tela de boas vindas do JBoss AS:

![jboss_as_02]({{ site.url }}/files/2012/04/jboss_as_02.jpg)

### Executando uma aplicação Web

Para verificar o funcionamento do JBoss AS, vamos instalar e executar (diz-se fazer deploy no servidor) de uma das [aplicações de exemplo oferecidas no site do servidor](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/). No caso, vou utilizar a [helloworld-jsf](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/helloworld-jsf/), que é simples, mas um pouco mais interessante que a tradicional [helloworld](http://jboss.org/jdf/quickstarts/jboss-as-quickstart/helloworld/).

As instruções fornecidas aqui se aplicam tanto ao Windows quanto ao Linux, mas vou utilizar o Linux para explicar as etapas. Necessitaremos do [Maven](http://maven.apache.org/) para compilar, empacotar e fazer deploy da aplicação. Se você ainda não possui o Maven em seu computador, prossiga à leitura [dessa página]({% post_url 2012-07-18-instalacao-do-apache-maven %}) antes de continuar.

Vá até a [página das aplicações de exemplo do JBoss AS](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/) e clique em “Get the source”. Depois, clique em “Source zip”:

![jboss_as_03]({{ site.url }}/files/2012/04/jboss_as_03.jpg)

Você está baixando um arquivo **.zip** (no momento da escrita deste post, nomeado “jboss-jdf-jboss-as-quickstart-7.1.1.Final-0-gbcbcf69.zip”) com todas as aplicações de exemplo do JBoss AS (se quiser por curiosidade conferir a lista, são todas essas que aparecem listadas nessa mesma página).

Quando o download acabar, extraia o conteúdo desse arquivo para uma pasta de fácil acesso. No Linux, o comando para extração desse arquivo é:

{% highlight bash %}
$ unzip jboss-jdf-jboss-as-quickstart-7.1.1.Final-0-gbcbcf69.zip
{% endhighlight %}

Isso cria uma pasta contendo as aplicações de exemplo (aqui se chama “jboss-jdf-jboss-as-quickstart-8505020″), entre nessa pasta e, em seguida, entre na pasta “helloworld-jsf” (usuários de Windows também devem entrar nessa pasta pelo terminal, já que vamos executar um comando do Maven dentro dela):

{% highlight bash %}
$ cd jboss-jdf-jboss-as-quickstart-8505020/helloworld-jsf
{% endhighlight %}

Certifique-se de que o JBoss AS esteja em execução e invoque o seguinte comando do Maven, que compilará, testará, empacotará e realizará o deploy da aplicação no servidor:

{% highlight bash %}
$ mvn package jboss-as:deploy
{% endhighlight %}

Ao final do processo, o console do Maven deve mostrar uma saída parecida com essa, informando que tudo ocorreu conforme o esperado:

{% highlight text %}
Jul 18, 2012 1:50:00 PM org.xnio.Xnio
INFO: XNIO Version 3.0.3.GA
Jul 18, 2012 1:50:00 PM org.xnio.nio.NioXnio
INFO: XNIO NIO Implementation Version 3.0.3.GA
Jul 18, 2012 1:50:00 PM org.jboss.remoting3.EndpointImpl
INFO: JBoss Remoting version 3.2.3.GA
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4:26.810s
[INFO] Finished at: Wed Jul 18 13:50:14 GMT+00:00 2012
[INFO] Final Memory: 9M/41M
[INFO] ------------------------------------------------------------------------
{% endhighlight %}

O console do JBoss AS deve mostrar que o deploy da aplicação foi realizado com sucesso:

{% highlight text %}
13:50:04,206 INFO  [org.jboss.as.repository] (management-handler-thread - 2) JBAS014900: Content added at location /root/jboss-as/standalone/data/content/1d/9f4c3c67cd2fb194ee4aacb3d990ab70da0b48/content
13:50:04,261 INFO  [org.jboss.as.server.deployment] (MSC service thread 1-2) JBAS015876: Starting deployment of "jboss-as-helloworld-jsf.war"
13:50:06,650 INFO  [org.jboss.weld.deployer] (MSC service thread 1-2) JBAS016002: Processing weld deployment jboss-as-helloworld-jsf.war
13:50:06,979 INFO  [org.jboss.weld.deployer] (MSC service thread 1-1) JBAS016005: Starting Services for CDI deployment: jboss-as-helloworld-jsf.war
13:50:07,045 INFO  [org.jboss.weld.Version] (MSC service thread 1-1) WELD-000900 1.1.5 (AS71)
13:50:07,578 INFO  [org.jboss.weld.deployer] (MSC service thread 1-2) JBAS016008: Starting weld service for deployment jboss-as-helloworld-jsf.war
13:50:08,753 INFO  [javax.enterprise.resource.webcontainer.jsf.config] (MSC service thread 1-2) Initializing Mojarra 2.1.7-jbossorg-1 (20120227-1401) for context '/jboss-as-helloworld-jsf'
13:50:11,774 INFO  [org.hibernate.validator.util.Version] (MSC service thread 1-2) Hibernate Validator 4.2.0.Final
13:50:14,120 INFO  [org.richfaces.log.Cache] (MSC service thread 1-2) Selected fallback cache factory
13:50:14,125 INFO  [org.richfaces.log.Cache] (MSC service thread 1-2) Creating LRUMap cache instance using parameters: {javax.faces.PROJECT_STAGE=Development}
13:50:14,186 INFO  [org.richfaces.log.Cache] (MSC service thread 1-2) Creating LRUMap cache instance of 512 items capacity
13:50:14,195 INFO  [org.richfaces.log.Application] (MSC service thread 1-2) RichFaces Core Implementation by JBoss by Red Hat, version v.4.2.0.Final
13:50:14,428 WARNING [org.richfaces.log.Application] (MSC service thread 1-2) JMS API was found on the classpath; if you want to enable RichFaces Push JMS integration, set context-param 'org.richfaces.push.jms.enabled' in web.xml
13:50:14,435 INFO  [javax.enterprise.resource.webcontainer.jsf.config] (MSC service thread 1-2) Monitoring jndi:/default-host/jboss-as-helloworld-jsf/WEB-INF/faces-config.xml for modifications
13:50:14,487 INFO  [org.jboss.web] (MSC service thread 1-2) JBAS018210: Registering web context: /jboss-as-helloworld-jsf
13:50:14,539 INFO  [org.jboss.as.server] (management-handler-thread - 2) JBAS018559: Deployed "jboss-as-helloworld-jsf.war"
{% endhighlight %}

Feito isso, podemos acessar a aplicação usando o navegador através do endereço “[http://localhost:8080/jboss-as-helloworld-jsf/](http://localhost:8080/jboss-as-helloworld-jsf/)“:

![jboss_as_04]({{ site.url }}/files/2012/04/jboss_as_04.jpg)

Essa é uma aplicação Web 2.0 com [AJAX](http://www.w3schools.com/ajax/default.asp) na qual ao digitar um nome no campo de texto, ele reproduz esse nome em uma mensagem de olá do lado direito desse campo. É realmente a única coisa que essa aplicação faz. Os componentes exibidos na tela são estilizados por causa da utilização do framework de apresentação [Richfaces](http://www.jboss.org/richfaces/) para renderizar esses componentes.

Se quisermos, podemos remover a aplicação do servidor (diz-se fazer o undeploy) através do Maven, usando o comando (deve ser executado da pasta que contém o código-fonte da aplicação):

{% highlight text %}
$ mvn jboss-as:undeploy
{% endhighlight %}

Também podemos fazer deploy e undeploy de aplicações no servidor, entre outras configurações, usando o console de administração do JBoss AS. Examinaremos esse console na [segunda parte desse post]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7-parte-2 %}).