---
date: '2012-07-10 01:01:10 -0300'
date_gmt: '2012-07-10 01:01:10 -0300'
layout: post
published: true
status: publish
title: Instalação do Java Development Kit (JDK)
---

Para começar a programar em [Java](http://www.oracle.com/technetwork/java/index.html), seja para [Desktop](http://www.oracle.com/technetwork/java/javase/), [Web](http://www.oracle.com/technetwork/java/javaee/) ou [celular](http://developer.android.com/), devemos instalar no computador o Java Development Kit (abreviadamente, JDK), que nada mais é que um conjunto de ferramentas que nos auxilia a compilar, testar e documentar programas escritos na linguagem Java. Ele também traz embutido o Java Runtime Environment (JRE), assim não é necessário instalar os dois para desenvolver e executar programas Java.

A seguir, forneço instruções para instalar, configurar e executar a versão mais recente do JDK (atualmente, a **1.7.0_05**) em sistemas Windows e Linux.

{% include image.html src="/files/2012/07/java.jpg" %}

<!--more-->

### Download e instalação do JDK

O primeiro passo é baixar o JDK. Vá até a [página de downloads do Java SE](http://www.oracle.com/technetwork/java/javase/downloads/), aceite o contrato de licença e escolha a versão do JDK apropriada para o seu sistema:

{% include image.html src="/files/2012/07/jdk7_1.jpg" %}

#### Download e instalação do JDK no Windows

No Windows, o instalador do JDK facilita bastante o processo de instalação. Baixe do site do JDK a versão do instalador apropriada para o seu sistema (Windows de 32 ou de 64 bits) e execute-o em seguida.

Normalmente, aceitar as opções padrão, avançando em todas as telas, deve funcionar. Atente-se apenas à pasta na qual o JDK será instalado (no meu computador, o padrão oferecido foi “C:\Program Files (x86)\Java\jdk1.7.0_05″).

#### Download e instalação do JDK no Linux (distribuições específicas)

Se a distribuição Linux que você usa provê um método padrão de instalar o JDK, é recomendado você seguir as instruções fornecidas para instalar o JDK na sua distribuição. Se sua distribuição não provê o JDK, ou se você prefere se assegurar de instalar em seu computador a versão oficial mais recente, pode seguir as instruções de instalação genéricas, que devem servir para qualquer distribuição (veja mais adiante).

A versão estável do [Debian](http://wiki.debian.org/Java/) (atualmente o Debian Squeeze 6.0) não oferece a versão mais atual do JDK em seus repositórios oficiais. Se desenvolver para a versão mais recente da linguagem não for um requisito, o usuário pode instalar o OpenJDK 6 (equivalente aberto do JDK 6) através do pacote [openjdk-6-jdk](http://packages.debian.org/openjdk-6-jdk) usando o utilitário `apt-get`, incluído na distribuição. Usuários mais experientes do Debian podem tentar instalar o OpenJDK 7 (a partir da versão 7, o JDK e o OpenJDK [são completamente equivalentes](http://jdk7.java.net/java-se-7-ri/)) através do pacote [openjdk-7-jdk](http://packages.debian.org/openjdk-7-jdk) dos repositórios da próxima versão do Debian, que ainda está em teste.

Desde a versão 11.10, o [Ubuntu](https://help.ubuntu.com/community/Java) já oferece em seus repositórios oficiais o OpenJDK 7, que pode ser instalado através do pacote [openjdk-7-jdk](http://packages.ubuntu.com/openjdk-7-jdk) usando o utilitário `apt-get`, incluído na distribuição.

Usuários de distribuições que utilizam o sistema de empacotamento RPM (como RedHat, CentOS, Fedora, Mandriva, openSUSE, etc.) podem instalar a versão mais recente do JDK através do pacote RPM disponibilizado na [página de downloads do Java SE](http://www.oracle.com/technetwork/java/javase/downloads/).

#### Download e instalação do JDK no Linux (qualquer distribuição)

Se sua distribuição não provê um meio padrão de instalar o JDK (ou se por qualquer motivo você não quer instalá-lo por esse meio), há na [página de downloads do Java SE](http://www.vinyanalista.com.br/blog/2012/07/10/instalacao-do-java-development-kit-jdk/www.oracle.com/technetwork/java/javase/downloads/) um arquivo **.tar.gz** que contém o JDK compactado. Uma vez extraído o conteúdo desse arquivo, o JDK já pode ser executado, e esse procedimento de instalação deve funcionar em qualquer distribuição Linux.

Para instalar o JDK dessa maneira, baixe-o da [página de downloads do Java SE](http://www.vinyanalista.com.br/blog/2012/07/10/instalacao-do-java-development-kit-jdk/www.oracle.com/technetwork/java/javase/downloads/) utilizando o navegador de sua preferência ou o comando **wget** no terminal (a seguir, forneço o link para download direto da versão do JDK usada nesse tutorial):

{% highlight bash %}
$ cd /home/vinicius/
$ wget http://download.oracle.com/otn-pub/java/jdk/7u5-b05/jdk-7u5-linux-i586.tar.gz
{% endhighlight %}

No Linux, é possível instalar o JDK em um local global, de forma que todos os usuários do sistema possam utilizá-lo (requer permissão de administrador), ou na sua pasta pessoal, de forma que apenas você possa utilizá-lo (não requer permissão, além de ser mais simples para iniciantes).

Para demonstrar como instalar o JDK numa localização global, vou utilizar a pasta “/opt”. Para fazer isso, mova o arquivo baixado (no nosso exemplo aqui, “jdk-7u5-linux-i586.tar.gz”) para essa pasta e lá extraia seu conteúdo. O caminho para o JDK será então “/opt/jdk1.7.0_05″ (se atente a esse caminho). Após a extração, o arquivo baixado pode ser excluído. Os comandos de terminal para realizar esses procedimentos são:

{% highlight bash %}
# mv /home/vinicius/jdk-7u5-linux-i586.tar.gz /opt
# cd /opt
# tar zxvf jdk-7u5-linux-i586.tar.gz
# rm jdk-7u5-linux-i586.tar.gz
{% endhighlight %}

Para instalar o JDK na sua pasta pessoal o procedimento é parecido. No meu caso, como já baixei o JDK nessa pasta, apenas precisei descompactá-lo. O comando que utilizei para isso foi:

{% highlight bash %}
$ tar zxvf jdk-7u5-linux-i586.tar.gz
{% endhighlight %}

Nesse caso, o caminho para o JDK será “/home/vinicius/jdk1.7.0_05″.

### Configuração da variável JAVA_HOME

A variável de ambiente JAVA_HOME é utilizada por alguns programas (como o Maven, o Eclipse e o JBoss AS, por exemplo) para determinar a localização do JDK ou do JRE instalado no computador. Essa etapa é opcional a usuários comuns de programas Java que apenas desejam instalar o ambiente de execução (JRE). Mas já que se trata da instalação do JDK, é costume não apenas definir o valor dessa variável, como acrescentar o caminho do JDK na variável de ambiente PATH, para que possamos invocar as ferramentas do JDK de qualquer pasta. Do contrário, todas as vezes em que quisermos invocar essas ferramentas teremos que digitar o caminho completo para elas.

A seguir, instruções para configurar essas variáveis tanto no Windows quanto no Linux.

#### Configuração da variável JAVA_HOME no Windows

Caso sua Área de Trabalho apresente o ícone do Meu Computador, clique com o botão direito nesse ícone e clique em Propriedades. Caso contrário, abra o Menu Iniciar, clique em Painel de Controle e, na janela que se abre, procure a opção Sistema.

{% include image.html src="/files/2012/07/jdk7_2.jpg" %}

Na janela Sistema, clique na opção Configurações avançadas do sistema, no painel esquerdo.

{% include image.html src="/files/2012/07/jdk7_3.jpg" %}

Na caixa de diálogo Propriedades do Sistema, clique no botão Variáveis de Ambiente.

{% include image.html src="/files/2012/07/jdk7_4.jpg" %}

Na caixa de diálogo Variáveis de Ambiente, na seção Variáveis do sistema, clique no botão Novo.

{% include image.html src="/files/2012/07/jdk7_5.jpg" %}

Informe JAVA_HOME como nome da variável e no campo valor digite a localização do JDK (no meu caso, ele foi instalado em “C:\Program Files (x86)\Java\jdk1.7.0_05″). Quando acabar de digitar esses valores, clique em OK.

{% include image.html src="/files/2012/07/jdk7_6.jpg" %}

De volta à caixa de diálogo Variáveis de Ambiente, também na seção Variáveis do sistema, procure na lista a variável Path, selecione-a e clique no botão Editar.

{% include image.html src="/files/2012/07/jdk7_7.jpg" %}

Posicione o cursor no início do valor da variável, insira o texto “%JAVA_HOME\bin;” (não inclua as aspas e não esqueça do ponto-e-vírgula) e clique em OK.

{% include image.html src="/files/2012/07/jdk7_8.jpg" %}

De volta à caixa de diálogo Variáveis de Ambiente, clique em OK. Em seguida, você pode fechar a janela Sistema. A partir de agora, qualquer nova janela de terminal aberta ou comando invocado refletirá essas alterações.

#### Configuração da variável JAVA_HOME no Linux

Se você instalou o JDK utilizando o mecanismo preferido de sua distribuição, é importante verificar se [a variável JAVA_HOME](http://www.cyberciti.biz/faq/linux-unix-set-java_home-path-variable/) já foi definida e se já é possível invocar os utilitários do JDK da linha de comando. Para isso, passe ao próximo tópico, realize os testes, e apenas se encontrar erros, volte a ler este.

Se você instalou o JDK para todos os usuários, abra com o seu editor de preferência o arquivo “/etc/profile” e acrescente as seguintes linhas no final (você deve substituir, se necessário, a localização do JDK, que no nosso exemplo foi “/opt/jdk1.7.0_05″):

{% highlight bash %}
export JAVA_HOME="/opt/jdk1.7.0_05"
export CLASSPATH="$JAVA_HOME/lib"
export PATH="$PATH:$JAVA_HOME/bin"
export MANPATH="$MANPATH:$JAVA_HOME/man"
{% endhighlight %}

Se você instalou o JDK apenas para o seu usuário, a alteração deve ocorrer no arquivo “~/.bashrc”. Abra esse arquivo com o seu editor de preferência e acrescente as seguintes linhas no final (você deve substituir, se necessário, a localização do JDK, que no nosso exemplo foi “/home/vinicius/jdk1.7.0_05″):

{% highlight bash %}
export JAVA_HOME="/home/vinicius/jdk1.7.0_05"
export CLASSPATH="$JAVA_HOME/lib"
export PATH="$PATH:$JAVA_HOME/bin"
export MANPATH="$MANPATH:$JAVA_HOME/man"
{% endhighlight %}

Em qualquer um dos dois casos, as alterações serão aplicadas a qualquer nova janela de terminal aberta.

### Teste do JDK

As instruções a seguir servem para Windows e Linux. Para testar a instalação do JDK, abra uma janela de terminal e execute o comando a seguir, que deve informar a versão do JDK instalado no seu computador:

{% highlight bash %}
$ javac -version
{% endhighlight %}

Como teste, também podemos criar um pequeno programa Java, compilá-lo e executá-lo. Em alguma pasta à qual você tenha acesso (aqui utilizarei minha pasta pessoal no Linux, “/home/vinicius”), crie um arquivo de texto simples chamado “Teste.java”. Abra esse arquivo com um editor de texto e insira o seguinte conteúdo:

{% highlight java %}
public class Teste {
    public static void main(String args[]) {
        System.out.println("Olá!");
    }
}
{% endhighlight %}

Agora no terminal, entre nessa pasta e invoque o compilador do Java (**javac**) passando o arquivo que você acabou de criar como parâmetro:

{% highlight bash %}
$ cd /home/vinicius/
$ javac Teste.java
{% endhighlight %}

Perceba que um arquivo “Teste.class” é criado como resultado da compilação. Ainda no terminal, invoque a máquina virtual Java (**java**) passando o nome da classe compilada como parâmetro:

{% highlight bash %}
$ java Teste
{% endhighlight %}

Se a mensagem “Olá!” apareceu na tela, tudo está funcionando perfeitamente.

### Plugin do Java para o navegador Firefox

Se você pretende utilizar o JDK para desenvolver Applets, é interessante verificar se o plugin do Java funciona adequadamente no seu navegador. Aqui, fornecerei instruções para o Firefox.

No Windows, o instalador do JDK já se encarrega de instalar e configurar o plugin do Java para o navegador Firefox.

No Linux, esse plugin acompanha o JDK, mas é necessário criar um link simbólico na pasta onde o Firefox está instalado para que o navegador consiga localizar o plugin. Para isso, supondo que o JDK encontra-se em “/opt/jdk1.7.0_5/” e o Firefox em “/usr/lib/mozilla”, basta executar o seguinte comando no terminal:

{% highlight bash %}
# ln -s /opt/jdk1.7.0_5/jre/lib/i386/libnpjp2.so /usr/lib/mozilla/plugins/
{% endhighlight %}

Para verificar que o navegador reconhece o plugin, digite na aba de endereços “about:plugins” e tecle Enter. O plugin do Java deve aparecer na lista de plugins instalados:

{% include image.html src="/files/2012/07/jdk7_9.jpg" %}

É possível também verificar na [página de teste do Java](http://www.java.com/pt_BR/download/testjava.jsp) se a versão do plugin instalada no seu sistema corresponde à mais atual:

{% include image.html src="/files/2012/07/jdk7_10.jpg" %}

Espero que esse post possa ser útil a programadores Java iniciantes de uma maneira em geral. Agradeço previamente opiniões e críticas construtivas. Ofereço o espaço para perguntas também. Abraço a todos e até a próxima!