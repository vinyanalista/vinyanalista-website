---
date: '2012-07-19 04:36:13 -0300'
date_gmt: '2012-07-19 04:36:13 -0300'
layout: post
published: true
status: publish
title: Configurando um datasource do MySQL no JBoss AS
---

O [MySQL](http://www.mysql.com/) é um banco de dados de código aberto desenvolvido pela [Oracle](http://www.oracle.com/). Ele se tornou um dos bancos de dados mais utilizados no mundo devido ao fato de se integrar perfeitamente ao [PHP](http://www.php.net/), sendo oferecido pela maioria dos serviços de hospedagem de sites em conjunto com o suporte a essa linguagem. Nesse post, você verá como utilizá-lo em conjunto com o servidor de aplicação [JBoss AS](http://www.jboss.org/jbossas/) para satisfazer as necessidades de armazenamento de dados de suas aplicações [Java EE](http://www.oracle.com/technetwork/java/javaee/).

![jboss_as_mysql_01]({{ site.url }}/files/2012/07/jboss_as_mysql_01.jpg)

Aqui também há uma dica para usuários do banco de dados [PostgreSQL](http://www.postgresql.org/) que quiserem fazer o mesmo: leiam o final do post!

<!--more-->

No [post anterior]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7 %}), você foi apresentado ao JBoss AS. Nesse post, veremos como configurar nele uma conexão com o MySQL, e veremos também como configurar uma aplicação Java EE para utilizar essa conexão. Para fins didáticos, vou supor que você possui o JBoss AS e o MySQL instalados em seu computador, e que você criou uma base de dados chamada “teste” (para esse passo-a-passo a estrutura da base de dados não é importante, focaremos na conexão).

Há outras páginas na Internet que explicam exatamente o que vou explicar aqui (como [essa](https://zorq.net/b/2011/07/12/adding-a-mysql-datasource-to-jboss-as-7/), [essa](http://www.messiasbittencourt.com/168/jboss-7-mysql/), [essa](http://filosofisto.wordpress.com/2012/02/13/configurando-mysql-no-jboss-7-as/) e [essa](http://jbossdivers.wordpress.com/2012/01/20/introducao-ao-jboss-as-7-parte-2/), e aproveito para dizer que essas foram algumas das minhas referências na elaboração desse post), porém aqui proponho uma abordagem diferente, que só percebi que era possível quando li mais atentamente o [guia de administração do JBoss AS](https://docs.jboss.org/author/display/AS7/Admin+Guide#AdminGuide-Datasources) (a referência que encerra a lista): realizar toda a configuração da conexão pelo console Web de administração do servidor.

Dividirei a explicação em 3 etapas: fazer deploy do driver JDBC, criação do datasource e configurar a aplicação Web para utilizar esse datasource. As explicações aqui fornecidas se aplicam a qualquer sistema operacional onde seja possível executar o JBoss AS.

### Deploy do driver JDBC do MySQL

Em primeiro lugar, precisamos do driver JDBC do MySQL. Ele é distribuído como um pacote no site do MySQL (os desenvolvedores do MySQL chamam seu driver JDBC de “MySQL Connector/J”), juntamente com seus código-fonte e documentação.

Entre na [página de downloads do MySQL Connector/J](http://www.mysql.com/downloads/connector/j/) e baixe um dos pacotes disponíveis. Para os usuários de Windows, eu recomendo o download do arquivo **.zip**, e para os usuários de Linux, eu recomendo o download do arquivo **.tar.gz**. Descompacte o conteúdo do arquivo baixado para uma pasta de fácil acesso. Para demonstração, utilizarei o Linux, e baixarei o arquivo para minha pasta pessoal (“/home/vinicius/”):

Quando o conteúdo do arquivo é extraído, é criada uma pasta “mysql-connector-java-5.1.21″. Dentro dessa pasta, está o arquivo “mysql-connector-java-5.1.21-bin.jar”. Implante esse arquivo no servidor utilizando o console Web de administração do JBoss AS, exatamente como descrito na [segunda parte do post anterior]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7-parte-2 %}).

Ao final do processo, o driver JDBC do MySQL deve aparecer habilitado na lista de aplicações implantadas, como mostra a figura (curiosamente, a [aplicação de exemplo](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/helloworld-jsf/) que implantamos [naquele post]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7-parte-2 %}) ainda está no servidor):

![jboss_as_mysql_02]({{ site.url }}/files/2012/07/jboss_as_mysql_02.jpg)

### Criação do datasource

No painel superior do console Web, clique em “Profile”, e em seguida, no menu da esquerda, clique em “Datasources”. É exibida uma lista com todos os datasources configurados (nesse caso, só há o [datasource de exemplo](https://docs.jboss.org/author/display/AS7/Getting+Started+Guide#GettingStartedGuide-ModifyingtheExampleDataSource), que já vem configurado com o servidor de aplicação):

![jboss_as_mysql_03]({{ site.url }}/files/2012/07/jboss_as_mysql_03.jpg)

Clique em “Add”. Na caixa de diálogo que aparece, forneça ao datasource um nome (esse nome não afeta a conexão, serve apenas para distinguir o datasource na lista, aqui forneci “TesteDS”) e um nome [JNDI](http://www.oracle.com/technetwork/java/jndi/) (esse sim importa à conexão, é usado para localizar um recurso na rede e deve começar sempre com “java:/” ou “java:jboss/”, aqui digitei “java:/teste”), e em seguida clique em “Next”:

![jboss_as_mysql_04]({{ site.url }}/files/2012/07/jboss_as_mysql_04.jpg)

Selecione um driver JDBC na lista de drivers disponíveis. No nosso caso, devemos selecionar o MySQL Connector/J. Depois clique em “Next”:

![jboss_as_mysql_05]({{ site.url }}/files/2012/07/jboss_as_mysql_05.jpg)

Finalmente, devemos informar os detalhes da conexão: o endereço JDBC de acesso ao banco (aqui, preenchi com “jdbc:mysql://localhost:3306/teste”, o formato desse endereço é “jdbc:mysql://servidor:porta/base”), o usuário e a senha que serão utilizados. Depois de preencher os campos, clique em “Done”:

![jboss_as_mysql_06]({{ site.url }}/files/2012/07/jboss_as_mysql_06.jpg)

O datasource é criado e passa a aparecer na lista, mas ainda não está habilitado:

![jboss_as_mysql_07]({{ site.url }}/files/2012/07/jboss_as_mysql_07.jpg)

Antes de habilitá-lo, tornando-o assim disponível para conexão, vamos permitir que esse datasource seja gerenciado pela API de transações do Java ([Java Transaction API](http://www.oracle.com/technetwork/java/javaee/jta/index.html), ou JTA). Selecione-o na lista e, descendo na página, clique na aba “Connection”. Perceba que a JTA está desabilitada para esse datasource. Clique em “Edit” para alterar isso:

![jboss_as_mysql_08]({{ site.url }}/files/2012/07/jboss_as_mysql_08.jpg)

Marque as duas últimas opções e clique em “Save”:

![jboss_as_mysql_09]({{ site.url }}/files/2012/07/jboss_as_mysql_09.jpg)

Agora a JTA está habilitada:

![jboss_as_mysql_10]({{ site.url }}/files/2012/07/jboss_as_mysql_10.jpg)

Agora sim vamos habilitar o datasource: ainda com ele selecionado, clique no botão “Enable”, acima da lista. O datasource é então habilitado:

![jboss_as_mysql_11]({{ site.url }}/files/2012/07/jboss_as_mysql_11.jpg)

Ainda com o datasource selecionado na lista e a aba “Connection” aberta na parte de baixo, clique no botão “Test Connection”. Se você forneceu os dados corretamente, o servidor de aplicação conseguirá estabelecer uma conexão com o banco de dados, e a seguinte mensagem será exibida:

![jboss_as_mysql_12]({{ site.url }}/files/2012/07/jboss_as_mysql_12.jpg)

Da parte do servidor está tudo OK. Agora é só configurar a aplicação para utilizar o datasource.

### Configuração da aplicação

Agora nós precisamos configurar nossa aplicação para se comunicar com a base de dados utilizando o datasource configurado no servidor de aplicação. O arquivo central da configuração da JPA ([Java Persistence API](http://docs.oracle.com/javaee/6/tutorial/doc/bnbpy.html)) no projeto, o “META-INF/persistence.xml”, vai sofrer algumas alterações. Observe as linhas destacadas:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
   version="2.0">
   <persistence-unit name="TestePU">
      <provider>org.hibernate.ejb.HibernatePersistence</provider>
      <jta-data-source>java:/teste</jta-data-source>
      <properties>
         <property name="hibernate.hbm2ddl.auto" value="create-drop" />
         <property name="hibernate.show_sql" value="true" />
      </properties>
   </persistence-unit>
</persistence>
{% endhighlight %}

Observe que estou utilizando o [Hibernate](http://www.hibernate.org/) como implementação JPA, já que estamos utilizando o JBoss AS como servidor de aplicação.

No código-fonte da aplicação, sempre for necessário um [EntityManager](http://docs.oracle.com/javaee/6/api/javax/persistence/EntityManager.html) para [manusear entidades JPA](http://docs.oracle.com/javaee/6/tutorial/doc/bnbqw.html), você pode solicitar ao servidor de aplicação que injete-o (isso significa que você não precisa criar o objeto manualmente, o servidor de aplicação cria o objeto para você) anotando sua variável com [@PersistenceContext](http://docs.oracle.com/javaee/6/api/javax/persistence/PersistenceContext.html) e especificando o nome da persistence-unit, como definida no arquivo “META-INF/persistence.xml”:

{% highlight java %}
@PersistenceContext(name="TestePU")
EntityManager entityManager;
{% endhighlight %}

Se sua aplicação possui apenas uma persistence-unit, essa informação pode ser omitida:

{% highlight java %}
@PersistenceContext
EntityManager entityManager;
{% endhighlight %}

### Aplicação de exemplo

Uma boa pedida é escolher uma das [aplicações de exemplo do JBoss AS](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/), alterar suas configurações e executá-la. No [post anterior]({% post_url 2012-07-18-apresentando-o-servidor-de-aplicacao-jboss-as-7 %}), nós compilamos, empacotamos, implantamos e executamos a aplicação de exemplo [helloworld-jsf](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/helloworld-jsf/). Vou aproveitar o arquivo que já baixei e extraí naquele post, mas aqui vamos utilizar a aplicação [greeter](http://www.jboss.org/jdf/quickstarts/jboss-as-quickstart/greeter/).

Entre na pasta da aplicação (no meu caso, “/home/vinicius/jboss-jdf-jboss-as-quickstart-8505020/greeter/”), exclua o arquivo “greeter-quickstart-ds.xml” que está na pasta “src/main/webapp/WEB-INF/” e altere o arquivo “persistence.xml” dentro da pasta “src/main/resources/META-INF/” para que tenha o conteúdo acima.

Pronto! Agora é só implantar a aplicação com o [Maven](http://maven.apache.org/) (caso você não tenha o Maven em seu computador, leia [esse post](http://www.vinyanalista.com.br/blog/2012/07/18/instalacao-do-apache-maven/)):

{% highlight bash %}
$ mvn package jboss-as:deploy
{% endhighlight %}

Se tudo ocorrer conforme o esperado, a aplicação de exemplo poderá ser acessada através do endereço “[http://localhost:8080/jboss-as-greeter/](http://localhost:8080/jboss-as-greeter/)“.

### Dica aos usuários de PostgreSQL

As instruções fornecidas aqui podem ser aplicadas sem maiores problemas a outros bancos de dados. Veja, por exemplo, essa página que ensina [como configurar um datasource do PostgreSQL no JBoss AS](http://blog.xebia.com/2011/07/19/developing-a-jpa-application-on-jboss-as-7/).

Os passos são bastante parecidos, as diferenças ficam por conta do driver JDBC que será implantado ([clique aqui para ir ao site oficial do driver JDBC do PostgreSQL](http://jdbc.postgresql.org/)) e do endereço JDBC informado na configuração do datasource (no exemplo desse link, ele informou “jdbc:postgresql://localhost:5432/library”, perceba que é parecido com o endereço que usamos aqui).

Bem, pessoal, vou ficando por aqui, espero que tenham gostado… até a próxima!