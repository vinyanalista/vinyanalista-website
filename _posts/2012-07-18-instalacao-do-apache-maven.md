---
date: '2012-07-18 02:57:24 -0300'
date_gmt: '2012-07-18 02:57:24 -0300'
layout: post
published: true
status: publish
title: Instala&ccedil;&atilde;o do Apache Maven
---

Olá, pessoal, nesse post vocês vão ver como instalar e executar pela primeira vez o [Apache Maven](http://maven.apache.org/) em seus computadores.

![Maven]({{ site.url }}/files/2012/07/maven1.gif)

O Maven é uma ferramenta que facilita e automatiza bastante o gerenciamento de projetos em Java, auxiliando os desenvolvedores nas etapas de definição, codificação, compilação, testes, empacotamento, implantação, documentação e distribuição da aplicação.

Nesse post, demonstrarei como instalar o Maven e como criar um pequeno projeto, apenas para dar uma noção de como funciona a ferramenta.

Antes de começarmos, é necessário que o Java Development Kit (JDK) esteja instalado no computador onde se deseja executar o Maven. Em [outro post]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}) nesse blog expliquei como instalar o JDK e verificar que ele está funcionando perfeitamente. Se você ainda não possui o JDK, prossiga à leitura daquela página primeiro. Se você não tem certeza se o JDK está instalado em seu computador, execute os testes propostos naquela mesma página e, se for o caso, instale-o.

Só prossiga à leitura desta página quando tiver certeza de que o JDK está instalado e funcionando no seu computador. Também é importante que a variável de ambiente JAVA_HOME esteja configurada.

### Download do Maven

Instalado o JDK, é hora de baixar o Maven. Na [página de downloads do site oficial do Maven](http://maven.apache.org/download.html) estão disponíveis algumas opções. Para os usuários de Windows, eu recomendo o download do arquivo **.zip**, e para os usuários de Linux, eu recomendo o download do arquivo **.tar.gz**, pois esses formatos são os mais comuns nesses dois sistemas.

Se a distribuição Linux que você usa provê um método padrão de instalar o Maven, você pode preferir baixá-lo e instalá-lo por esse método. No tópico seguinte eu forneço instruções para o Debian e o Ubuntu.

No momento da escrita deste post, a versão mais atual do Maven é a 3.0.4. Os links para download direto dos arquivos mencionados acima são esse e esse. No caso do Linux, é possível baixar este arquivo pelo terminal usando o comando wget:

{% highlight bash %}
$ wget http://ftp.unicamp.br/pub/apache/maven/binaries/apache-maven-3.0.4-bin.tar.gz
{% endhighlight %}

### Instalação do Maven

Tanto no Windows quanto no Linux basta descompactar o arquivo baixado que o Maven já pode ser executado a partir daquele local. Assim como acontece com o [JDK](http://www.vinyanalista.com.br/blog/2012/07/18/instalacao-do-apache-maven/www.vinyanalista.com.br/blog/2012/07/10/instalacao-do-java-development-kit-jdk/), é possível instalar em uma localização visível a todos os usuários (como “C:\” no Windows ou “/opt/” no Linux) ou visível apenas ao seu usuário (no meu caso, “C:\Users\Vinicius\Documents” ou “/home/vinicius”). Em ambos os casos, o arquivo descompactado gera uma pasta chamada “apache-maven-3.0.4″ e pode ser excluído após a extração.

É necessário prestar atenção a esse local pois, assim como fizemos na [instalação do JDK]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}), aqui vamos configurar uma variável de ambiente que aponte para a localização do Maven, chamada de M2_HOME.

No Windows, fiz a extração do arquivo na raiz do disco “C:\” e renomeei a pasta “apache-maven-3.0.4″ para apenas “maven”. O caminho para o Maven no meu sistema é, então, “C:\maven”.

No Linux é mais prático fazer a instalação na pasta home do usuário. No terminal, os comandos para download e extração seriam:

{% highlight bash %}
$ cd /home/vinicius/
$ wget http://ftp.unicamp.br/pub/apache/maven/binaries/apache-maven-3.0.4-bin.tar.gz
$ tar zxvf apache-maven-3.0.4-bin.tar.gz
$ rm apache-maven-3.0.4-bin.tar.gz
{% endhighlight %}

É possível instalar também em uma localização global, visível a todos os usuários. Nesse caso, o procedimento é parecido, mas é necessário ter permissões de administrador:

{% highlight bash %}
$ cd /home/vinicius/
$ wget http://ftp.unicamp.br/pub/apache/maven/binaries/apache-maven-3.0.4-bin.tar.gz
# mv apache-maven-3.0.4-bin.tar.gz /opt
# cd /opt
# tar zxvf apache-maven-3.0.4-bin.tar.gz
# rm apache-maven-3.0.4-bin.tar.gz
{% endhighlight %}

No primeiro caso, o caminho para o Maven passa a ser “/home/vinicius/apache-maven-3.0.4″ e, no segundo, “/opt/apache-maven-3.0.4″.

Se você utiliza a versão mais recente do Ubuntu (no momento da escrita deste post, a 12.04), pode preferir instalar o Maven através do pacote [maven](http://packages.ubuntu.com/maven) usando o utilitário **apt-get**, incluído na distribuição.

Usuários do Debian podem obter nos repositórios oficiais da versão estável (atualmente o Debian Squeeze 6.0) uma versão anterior do Maven (não garanto que funcione da mesma maneira que a atual), através do pacote [maven2](http://packages.debian.org/maven2) usando o utilitário **apt-get**, incluído na distribuição. Usuários mais experientes do Debian podem tentar instalar o Maven 3.0.4 (versão mais recente até o momento da escrita) através do pacote [maven](http://packages.debian.org/maven) dos repositórios da próxima versão do Debian, que ainda está em teste.

### Configuração da variável M2_HOME

De maneira análoga à [instalação do JDK]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}), aqui vamos criar uma variável de ambiente M2_HOME que informe para os demais aplicativos do sistema a localização do Maven. Depois vamos atualizar o valor da variável de ambiente PATH para que possamos invocar o Maven diretamente da linha de comando, sem precisar informar sua localização completa sempre que quisermos fazer isso.

No Windows, o procedimento é bem semelhante ao [descrito no post anterior]({% post_url 2012-07-10-instalacao-do-java-development-kit-jdk %}), só mudando os nomes das variáveis e os valores:

![maven2]({{ site.url }}/files/2012/07/maven2.jpg)

![maven3]({{ site.url }}/files/2012/07/maven3.jpg)

No Linux, se você instalou o Maven apenas para o seu usuário,  abra com o seu editor de preferência o arquivo “~/.bashrc” e acrescente as seguintes linhas no final do arquivo (você deve substituir, se necessário, a localização do Maven, que no nosso exemplo foi “/home/vinicius/apache-maven-3.0.4″):

{% highlight bash %}
export M2_HOME="/home/vinicius/apache-maven-3.0.4"
export PATH="$PATH:$M2_HOME/bin"
{% endhighlight %}

Se você instalou o Maven para todos os usuários, a alteração deve ocorrer no arquivo “/etc/profile”. Abra esse arquivo com o seu editor de preferência e acrescente as seguintes linhas no final do arquivo (você deve substituir, se necessário, a localização do Maven, que no nosso exemplo foi “/opt/apache-maven-3.0.4″):

{% highlight bash %}
export M2_HOME="/opt/apache-maven-3.0.4"
export PATH="$PATH:$M2_HOME/bin"
{% endhighlight %}

### Teste do Maven

As instruções a seguir servem para Windows e Linux. Para testar a instalação do Maven, abra uma nova janela de terminal e execute o comando a seguir, que deve exibir  informações sobre a instalação do Maven no seu computador:

{% highlight bash %}
$ mvn -v
{% endhighlight %}

A saída deve ser algo parecido com isso:

{% highlight text %}
Apache Maven 3.0.4 (r1232337; 2012-01-17 08:44:56+0000)
Maven home: /home/vinicius/apache-maven-3.0.4
Java version: 1.7.0_147-icedtea, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-7-openjdk-i386/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.0.0-12-generic", arch: "i386", family: "unix"
{% endhighlight %}

Como teste, também vamos criar um pequeno projeto Java, compilá-lo, empacotá-lo e executá-lo. Em alguma pasta à qual você tenha acesso (aqui utilizarei minha pasta pessoal no Linux, “/home/vinicius”), execute o seguinte comando:

{% highlight bash %}
$ mvn archetype:generate \
-DgroupId=br.com.vinyanalista.tutorial \
-DartifactId=projeto.exemplo \
-DarchetypeArtifactId=maven-archetype-quickstart \
-DinteractiveMode=false
{% endhighlight %}

A primeira execução do Maven demora um pouco. Isso porque ele vai baixar algumas bibliotecas e plugins necessárias ao projeto. No meu computador, esse processo demorou cerca de 6 minutos. Outros projetos reaproveitam as bibliotecas e plugins já baixados, por isso esse é um processo demorado que ocorre apenas uma vez.

Perceba que foi criada uma pasta “projeto.exemplo”. Essa pasta contém o nosso projeto. Vamos entrar nela e mandar o Maven compilar e empacotar o projeto:

{% highlight bash %}
$ cd projeto.exemplo
$ mvn package
{% endhighlight %}

Na verdade, ordenamos apenas que o Maven empacotasse o projeto. No entanto, como a compilação deve ocorrer antes para que o projeto possa ser empacotado, o Maven executa a compilação automaticamente antes de realizar o empacotamento do projeto de fato. O comando acima deu origem a uma pasta target e, dentro dela, um arquivo .jar contendo o projeto compilado e empacotado.

Vamos executar a classe principal do projeto:

{% highlight bash %}
$ java -cp target/projeto.exemplo-1.0-SNAPSHOT.jar br.com.vinyanalista.tutorial.App
{% endhighlight %}

Se uma mensagem do tipo “Hello, World!” apareceu na tela, então tudo funcionou conforme o esperado e o Maven está devidamente instalado e funcionando em seu computador.

Então, é isso, pessoal. Por hora, vou ficando por aqui. Em outro post, falarei mais sobre o Maven, como gerenciar seus projetos Java utilizando essa ferramenta,  explicando inclusive os arquivos gerados nesse exemplo e como alterá-los conforme suas necessidades. Deixo como referências o blog [Maven 3 Tutorial](http://maven3tutorial.blogspot.com.br/), bastante completo e didático, com várias informações sobre o uso do Maven, e o blog da [Caelum](http://www.caelum.com.br/), também bastante completo e didático, que contém [um post dedicado a falar apenas sobre o Maven](http://blog.caelum.com.br/processo-de-build-com-o-maven/).

Abraço a todos, e até a próxima!