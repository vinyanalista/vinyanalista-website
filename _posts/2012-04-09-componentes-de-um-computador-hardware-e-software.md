---
date: '2012-04-09 16:44:39 -0300'
date_gmt: '2012-04-09 16:44:39 -0300'
layout: post
published: true
status: publish
title: 'Componentes de um computador: hardware e software'
---

Segundo o dicionário Michaelis, [computar](http://michaelis.uol.com.br/moderno/portugues/index.php?lingua=portugues-portugues&palavra=computar) pode significar calcular, avaliar, contar. Os computadores foram criados a princípio para facilitar operações matemáticas, fornecendo os resultados das mesmas com rapidez e precisão.

Foram também as máquinas que mais evoluíram desde a sua criação, adquirindo várias outras utilidades ao longo do seu desenvolvimento. Hoje, os computadores servem não só para realizar cálculos, eles podem fazer quase tudo que se possa imaginar uma máquina fazendo: textos, imagens, vídeos, músicas, jogos, aplicações multimídia, pesquisas, comunicação instantânea com qualquer lugar do mundo a qualquer dia e qualquer hora.

Pode-se definir então **computador** como uma máquina que trabalha com grande quantidade de informações, capaz de receber, processar, armazenar e transmitir dados.

Nesse post, veremos rapidamente quais são os principais componentes de um computador e como eles são organizados. Esse post é um resumo do primeiro capítulo de um trabalho mais completo, que visa apresentar os componentes do computador, em especial o processador, e que pode ser acessado [aqui](http://www.vinyanalista.com.br/blog/2012/04/08/minha-pesquisa-cientifica-sobre-processadores/).

### Breve história do computador pessoal

Há muito tempo os computadores eram feitos de grandes empresas para grandes empresas. Eram máquinas enormes, que ocupavam muito espaço ([os primeiros](http://www.museudocomputador.com.br/historia_eniac.html) ocupavam uma biblioteca inteira), tinham funcionamento complexo e custavam muito caro. Não eram máquinas que podiam ser usadas por qualquer pessoa.

Com o passar do tempo, os computadores foram se tornando menores, mais baratos e foram surgindo várias facilidades no uso, como o sistema operacional, a interface gráfica e o mouse, que possibilitaram sua popularização, principalmente após a invenção dos primeiros computadores pessoais na década de 70, como o Altair e o Macintosh.

![O Altair 8800, de 1975, foi o primeiro computador pessoal comercializado]({{ site.url }}/files/2012/04/altair-8800-1975.jpg)

![O Macintosh (1984) foi o primeiro computador a usar interface gráfica e mouse.]({{ site.url }}/files/2012/04/macintosh-1984.jpg)

Na década de 80, a IBM, que era então a maior empresa de informática e é, ainda hoje, uma das líderes de mercado, lançou seu modelo de computador pessoal, o IBM PC, que até hoje é o padrão dos computadores pessoais, com vários aperfeiçoamentos, é claro. A sigla PC vem do inglês *Personal Computer*, que significa “Computador Pessoal”.

Em pouco tempo, o IBM PC se tornou o padrão para a criação de novos computadores pessoais.

Há muito tempo a IBM já não é mais a única empresa a fabricar PCs. Foram criados padrões para a fabricação de peças para esses computadores, de sorte que hoje qualquer empresa pequena pode desenvolver produtos para PCs ou mesmo fabricar seus próprios computadores.

Diferentemente do IBM PC, o Macintosh (também chamado por seus usuários de Mac) continuou sendo fabricado e desenvolvido exclusivamente pela sua fabricante, a Apple. Somente ela fabrica hardware e software para esses computadores (ou se alguma outra empresa fabrica, faz isto sobre o controle da Apple). Assim, a Apple desenvolve uma arquitetura “fechada”, pois os usuários de seus computadores só podem comprar os produtos da fabricante e as pessoas não podem montar seus próprios computadores baseados nessa arquitetura.

Foquemo-nos então nos computadores de arquitetura aberta, que são os mais usados atualmente, baseados no IBM PC. Os componentes básicos e o funcionamento desses computadores já devem ser conhecidos por alguém que está começando a estudar programação. Vamos revisar rapidamente os conceitos essenciais.

Os componentes básicos de um computador podem ser divididos em dois grandes grupos: *hardware* e *software*.

### Hardware – os componentes físicos do computador

**Hardware** é um termo em inglês que não tem uma tradução específica, deriva da palavra *hard* em inglês, que significa duro. É usado para definir todos os componentes físicos (mecânicos, magnéticos e eletrônicos) de um computador, ou seja, a máquina propriamente dita. O hardware de um computador pode ser dividido basicamente em quatro categorias: processador, placa-mãe, memória e dispositivos de entrada e saída.

![Alguns componentes de um computador: Monitor (1), placa-mãe (2), processador (3), memória RAM (4), placas de expansão (5), fonte de alimentação (6), unidade de CD/DVD (7), disco rígido (8), teclado (9) e mouse (10)]({{ site.url }}/files/2012/04/componentes-do-computador.png)

O **processador**, também chamado de Unidade Central de Processamento (UCP), do inglês *Central Processing Unit* (CPU), é o principal componente eletrônico de um computador. Ele fica acoplado na placa-mãe e é o responsável pela execução, com auxílio da memória e dos dispositivos de entrada e saída, de todas as operações no computador. Pode ser considerado o “cérebro” do computador.

![Processadores da Intel e da AMD]({{ site.url }}/files/2012/04/processadores.jpg)

A **memória** do computador é formada por todos os dispositivos que são utilizados para armazenar dados e instruções, seja de forma temporária ou permanente. Pode-se dizer que depois do processador, a parte mais importante de um computador é a sua memória. Há diversos dispositivos submetidos a uma hierarquia formando a memória do computador, mas para se ter uma visão inicial simplificada, é possível dividi-los em dois grandes grupos principais: a memória principal e a memória secundária.

A **memória principal** é aquela que é acessada diretamente pelo processador e armazena os dados de forma eletrônica. Apresenta alta velocidade e baixa capacidade de armazenamento. É formada pela **memória RAM** (do inglês *Random Access Memory*, que significa “memória de acesso aleatório”), que armazena as informações que são utilizadas no trabalho do processador; e pela **memória ROM** (*Read Only Memory*, “memória somente para leitura”), que armazena as instruções de inicialização do computador.

![Pente de memória RAM]({{ site.url }}/files/2012/04/memoria-ram.jpg)

A **memória secundária**, também chamada memória de massa, apresenta alta capacidade de armazenamento e baixa velocidade. É usada para gravar grande quantidade de dados por um período longo de tempo e não é acessada diretamente pelo processador. Quando necessita de uma informação armazenada nessa memória, o processador a copia anteriormente para a memória principal. São exemplos de memória de massa as unidades de fita, os disquetes, os discos rígidos, os discos óticos (CDs, DVDs e Blu-rays) e os discos removíveis (pendrives, cartões de memória, etc.).

![O que se pensa ser o disco rígido (abaixo) na verdade é uma "caixa", dentro da qual está protegido o disco rígido (acima).]({{ site.url }}/files/2012/04/disco-rigido.jpg)

Os **dispositivos de entrada e saída** (do inglês *input/output devices*), também chamados de **periféricos**, permitem a comunicação entre o processador e os demais componentes do computador, assim como entre o computador e o meio externo (entre o computador e seus usuários ou entre o computador e outros computadores). Podem ser considerados os “olhos, ouvidos e boca” do processador. Exemplos de periféricos são o [teclado](http://www.ufpa.br/dicas/mic/mic-tecl.htm), o [mouse](http://www.ufpa.br/dicas/mic/mic-e-s.htm#Mouse), o [microfone](http://www.ufpa.br/dicas/mic/mic-e-s.htm#fone), a *webcam* (ou [câmera de vídeo](http://www.ufpa.br/dicas/mic/mic-e-s.htm#fone)), o [monitor](http://www.ufpa.br/dicas/mic/mic-e-s.htm#monitor), a [impressora](http://www.ufpa.br/dicas/mic/mic-e-s.htm#Impressora) e as caixas de som.

Finalmente, há a **placa-mãe**, do inglês *motherboard*, também chamada *mainboard* (inglês para “placa principal”), é a principal placa do computador, responsável pela interconexão de todos os dispositivos que o compõem. Se o processador é o “cérebro” do computador, pode-se comparar a placa-mãe a um “sistema nervoso”.

![Uma placa-mãe]({{ site.url }}/files/2012/04/placa-mae.jpg)

### Software – a inteligência do computador

Para que serviriam todos os circuitos eletrônicos de um computador se não fosse possível fazer nada com eles? Se não receber ordem para realizar alguma atividade, o computador não passa de algumas luzes acesas e circuitos pelos quais passam corrente elétrica. A princípio, os componentes eletrônicos do computador eram operados manualmente, o que era extremamente trabalhoso. Depois, criou-se uma forma de instruí-los a realizar determinada tarefa quando esta lhes fosse solicitada, facilitando o manuseio do computador. Eis que surgiu então o software.

Em contraposição ao hardware, que são os equipamentos, o **software**, ou programa, é a parte lógica do computador, ou seja, o conjunto de dados e instruções passadas para os componentes físicos de um computador para que ele possa executar determinada tarefa, para a qual o software foi projetado.

Software, assim como hardware, é um termo em inglês que não tem tradução, derivando da palavra *soft* em inglês, que significa “mole”. Esse termo surgiu na verdade como uma gíria da informática, sendo usado para distinguir os componentes físicos do computador, as “ferragens” nas quais podemos tocar, dos componentes lógicos do computador, os programas, os quais não podem ser tocados.

A função do software é facilitar a interação dos usuários com os componentes físicos do computador, transformando-o em algo realmente útil. Existe um programa para cada tarefa que se deseja executar utilizando o computador. Para que um computador seja capaz de editar textos, por exemplo, deve possuir um programa editor de textos. Para que ele seja capaz de reproduzir um DVD, deve possuir um programa reprodutor de mídias. Para acessar sites na Internet, é utilizado um navegador, e assim por diante.

Nem todos os programas de computador, no entanto, realizam tarefas específicas. Estes são os chamados aplicativos. Há programas com funções mais gerais.

Há o software operacional (também chamado de **sistema operacional**) que é o software responsável por operacionalizar o computador, ou seja, torná-lo operacional. Ele gerencia a comunicação entre todos os seus componentes (entre hardware e software, entre um aplicativo e outro), e entre estes e o usuário, de forma a tornar o computador uma máquina funcional, capaz de “atender ordens”. Ele também dispõe de recursos para tornar mais fácil a comunicação entre o usuário e o computador, como a interface gráfica.

Há também o **BIOS** (do inglês *Basic Input/Output System*, sistema básico de entrada e saída), que é o primeiro programa a ser executado quando o computador é ligado. Ele reconhece os componentes de hardware instalados, verifica se todos estão funcionando e passa o comando do computador ao sistema operacional, provendo a este informações sobre o hardware da máquina.

Podemos então classificar o software de um computador em dois grupos, diferentes entre si quanto à importância que eles possuem para o funcionamento da máquina e a sua utilidade: básicos e aplicativos.

Os **softwares básicos** de um computador são aqueles essenciais ao seu funcionamento, como o sistema operacional, o BIOS e os programas fornecidos pelo fabricante junto com a máquina. Já os **softwares aplicativos**, ou simplesmente aplicativos, são desenvolvidos para auxiliar o usuário na execução de alguma tarefa ou na obtenção da solução para algum problema, ou seja, são softwares desenvolvidos para uma aplicação específica. Quase todos os programas que não são softwares básicos são softwares aplicativos.

### Referências

Como esse post é uma parte (na verdade, o resumo de uma parte) da [minha pesquisa científica sobre processadores]({% post_url 2012-04-08-minha-pesquisa-cientifica-sobre-processadores %}), pode-se dizer que utiliza as mesmas referências dela. Em especial, posso citar esses livros:

MONTEIRO, Mário A. *Introdução à Organização de Computadores*. 4ª Edição. Rio de Janeiro: LTC Editora, 2001.

MORIMOTO, Carlos E. *Manual de Hardware Completo*. 3ª Edição. Junho de 2002. Disponível na Internet em: <http://www.hardware.com.br/livros/hardware-manual/>. Acessado em: 09/04/2012.

VASCONCELOS, Laércio. *Hardware Total*. 1ª Edição. Editora Makron Books, 2002.

E também essas páginas da Internet:

[Processadores: clock, bits, memória cache e múltiplos núcleos (Parte 1)](http://www.infowester.com/processadores1.php)

[Microinformática – Hardware – Processador](http://www2.ufpa.br/dicas/mic/mic-proc.htm)

[Microinformática – Hardware – Memória](http://www2.ufpa.br/dicas/mic/mic-memo.htm)

[Microinformática – Hardware – Dispositivos de entrada e/ou saída](http://www2.ufpa.br/dicas/mic/mic-e-s.htm)

[Iniciação à Informática (Disciplina de Informática Médica – FMUSP)](http://med.fm.usp.br/dim/apostila/infbas/infbas.htm)