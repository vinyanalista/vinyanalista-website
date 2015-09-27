---
date: '2015-09-27 16:00:00 GMT-3'
layout: post
published: true
title: Dicas de Git
image: /files/2015/09/git.png
---

Quem não já teve dúvidas ao usar o [sistema de controle de versão Git](https://git-scm.com/)? Aqui apresento uma compilação de algumas dúvidas que já tive e das soluções que eu encontrei.

{% include image.html src="/files/2015/09/git.png" %}

Quase sempre quando tenho uma dúvida, faço uma busca no [Google](https://www.google.com.br/) e encontro outras pessoas que já tiveram a mesma dúvida que eu no [Stack Overflow](http://stackoverflow.com/). Lá, encontro outras pessoas que propoem soluções para a dúvida apresentada. Nem sempre a solução marcada como a correta é a que resolve meu problema. Aqui, mostrarei apenas as soluções que de fato me foram úteis.

Vale observar que as dicas que eu apresento aqui são para usos um tanto "exóticos" do Git, que fogem do uso diário, mais básico. Se deseja aprender a usar o Git, recomendo esses cursos (em inglês) da [Code School](https://www.codeschool.com/):

- [Try Git](https://try.github.io/)
- [Git Real](http://gitreal.codeschool.com/)

Algumas dicas podem depender de qual versão do Git você usa. Para verificar qual versão do Git está instalada no seu computador, execute o comando:

```
git --version
```

### A linha de comando do Git no Windows está muito lenta

Usar o Git pela linha de comando no [Linux](http://www.vivaolinux.com.br/linux/) é bastante natural. No [Windows](http://www.microsoft.com/pt-br/windows), na minha opinião, a melhor opção é clicar com o botão direito na pasta e clicar em **Git Bash**.

De uma hora pra outra, talvez você perceba que o Git no Windows se torna lento. A execução de qualquer comando que envolva o Git demora mais do que o normal.

Para alguns casos, a solução pode ser desinstalar o Git, reiniciar o Windows (a solução clássica para vários problemas do Windows) e instalar o Git de novo. De preferência, instalar [a versão mais nova](https://git-scm.com/download/win), disponível no *site* do Git, que pode conter correções para *bugs* conhecidos.

No meu caso, o que tornou o Git um pouco mais ágil no Windows foi executar esses comandos:

```
git config --global core.preloadindex true
git config --global core.fscache true
git config --global gc.auto 256
```

**Referência:**

- [Git/Bash is extremely slow in Windows 7 x64 - Stack Overflow](http://stackoverflow.com/questions/4485059/git-bash-is-extremely-slow-in-windows-7-x64)

### Como alterar um *commit*

Se você quer alterar o último *commit* (arquivos e/ou mensagem), esse é o caso mais simples:

1. Faça quaisquer alterações desejadas nos arquivos;

2. Use `git add -A .` para considerá-las; e

3. Execute `git commit --amend` para alterar o último *commit* incluindo as alterações então feitas. Um editor de texto será apresentado e você terá a oportunidade de alterar a mensagem do *commit*. Ao salvar e sair do editor de texto, o *commit* terá sido alterado.

Se você deseja alterar um *commit* anterior, terá que usar o comando `git rebase`.

Antes de começar, verifique o ID SHA1 do *commit* que deseja alterar usando `git log` ou `gitk`.

Se você quiser alterar, por exemplo, o *commit* de ID `bbc643cd`, execute:

```
git rebase --interactive bbc643cd^
```

Um editor de texto será apresentado para que você indique as ações que deseja realizar. Procure a linha referente ao *commit* que deseja alterar e substitua `pick` por `edit`. Ao salvar e sair do editor de texto, o Git deixará os arquivos do seu repositório como estavam após esse *commit*.

Então, você pode prosseguir como se esse tivesse sido o último *commit* (como expliquei acima, fazendo mudanças, adicionando via `git add` e finalizando com `git commit --amend`). Quando terminar, execute:

```
git rebase --continue
```

Se você deseja alterar apenas a mensagem do *commit*, e não os arquivos, simplifique o processo usando a ação `reword` ao invés de `edit`. Essa ação está disponível a partir do Git 1.6.6.

Observe que isso altera o histórico do seu repositório desse *commit* em diante.

Se o(s) *commit(s)* alterado(s) existe(m) apenas localmente (você ainda não executou `git push`), não é necessário fazer mais nada. Caso contrário, para enviar a(s) alteração(ões) para o repositório remoto, você deve forçar o envio:

```
git push --force
```

Outras pessoas que clonaram seu repositório antes da(s) alteração(ões) podem ter problemas com seus clones, portanto use esse recurso com cuidado.

**Referência:**

- [How to modify a specified commit in git? - Stack Overflow](http://stackoverflow.com/questions/1186535/how-to-modify-a-specified-commit-in-git)

### Como desfazer um *commit*

Para desfazer um *commit* (tomemos como exemplo o último, cuja referência é `HEAD`), há duas opções:

- desfazer o *commit*, mas manter os arquivos alterados (*soft reset*):

```
git reset --soft HEAD~
```

- desfazer o *commit* descartando também as alterações (*hard reset*):

```
git reset --hard HEAD~
```

Para desfazer o penúltimo *commit*, você pode usar `HEAD~2`, como em:

```
git reset --soft HEAD~2
```

Para desfazer o antepenúltimo *commit*, você pode usar `HEAD~3`, e assim sucessivamente.

Para desfazer todos os *commits* até certo *commit*, você pode informar seu ID SHA1, como em:

```
git reset --soft id_sha1_do_commit
```

Se os *commits* desfeitos existem apenas localmente (você ainda não executou `git push`), caso mais simples, não há mais nada a fazer.

Se os *commits* desfeitos já foram enviados previamente para o repositório remoto, você deve forçar o envio das alterações:

```
git push --force
```

Observe que, excluindo *commits* dessa maneira, você altera o histórico do repositório definitivamente: os *commits* excluídos de fato deixam de existir no histórico, é como se eles nunca tivessem sequer acontecido. Assim, outras pessoas que clonaram seu repositório antes dessa exclusão podem ter problemas com seus clones.

Uma maneira menos destrutiva de desfazer as alterações de um *commit*, mantendo esse *commit* no histórico, é usar o comando `git revert`, como em:

```
git revert id_sha1_do_commit
```

Assim, tanto o *commit* como a sua reversão aparecerão no histórico. A reversão pode ser enviada para o repositório remoto normalmente usando o comando `git push`. Outras pessoas que clonaram seu repositório antes da reversão não terão problemas. Para recebê-la, podem usar normalmente o comando `git pull`.

**Referências:**

- [How do you undo the last commit? - Stack Overflow](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)
- [Delete commits from a branch in Git - Stack Overflow](http://stackoverflow.com/questions/1338728/delete-commits-from-a-branch-in-git)

### Como criar um *branch*

[Criar um *branch*](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) pode ser útil se você deseja trabalhar isoladamente em uma funcionalidade ou *bug*, ou ainda se várias pessoas trabalham no mesmo repositório.

Primeiro, você deve criar o *branch* localmente, em seu computador:

```
git checkout -b meu_novo_branch
```

Isso cria um novo *branch* local chamado `meu_novo_branch`, sincronizado com o *branch* no qual você estava trabalhando antes (`master`, por exemplo).

Esse *branch* passa a existir remotamente quando você o envia:

```
git push -u origin meu_novo_branch
```

Nesse exemplo, `origin` é o nome do repositório remoto, mas pode ser outro nome, como `upstream`.

O comando acima cria um *branch* remoto com o mesmo nome do *branch* local e já faz a associação entre ambos, de forma que o comando `git pull` já saberá o que fazer quando for invocado no futuro para atualizar esse *branch*.

**Referência:**

- [How do you create a remote Git branch? - Stack Overflow](http://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch)

### Como criar um *branch* a partir de um *commit*

Como eu disse na dica anterior, normalmente quando criamos um novo *branch* ele é sincronizado com o *branch* no qual você estava trabalhando antes. No entanto, também podemos criar um *branch* sincronizado com um *commit* qualquer.

Para isso, você pode informar o ID SHA1 do *commit* ao criar o *branch*:

```
git branch meu_novo_branch id_sha1_do_commit
```

Ou usar uma referência simbólica (como o penúltimo *commit*, `HEAD~2`):

```
git branch meu_novo_branch HEAD~2
```

O comando acima criará um *branch* local sincronizado com o penúltimo *commit*.

**Referência:**

- [Branch from a previous commit using git - Stack Overflow](http://stackoverflow.com/questions/2816715/branch-from-a-previous-commit-using-git)

### Como criar um *branch* vazio

A partir do Git 1.7.2, é possível também criar um *branch* sem nenhuma relação com os demais, começando do zero, com uma linha do tempo nova e independente.

Para criar um *branch* vazio chamado `meu_novo_branch`, execute o comando:

```
git checkout --orphan meu_novo_branch
```

Perceba que os arquivos são deixados pelo Git. Se não quiser esses arquivos no seu novo *branch* independente, remova-os:

```
git rm -rf .
```

Então, você pode adicionar novos arquivos e fazer o primeiro *commit*:

```
git add -A .
git commit -m 'Primeiro commit'
```

**Referência:**

- [In git, is there a simple way of introducing an unrelated branch to a repository? - Stack Overflow](http://stackoverflow.com/questions/1384325/in-git-is-there-a-simple-way-of-introducing-an-unrelated-branch-to-a-repository)
- [How to Create a New and Empty Branch in Git](http://bitflop.com/tutorials/how-to-create-a-new-and-empty-branch-in-git.html)

### Como excluir um *branch*

Você pode excluir um *branch* local e/ou remotamente.

Para excluir o *branch* **local** `meu_branch`, por exemplo, execute:

```
git branch -D meu_branch
```

Para excluir o *branch* **remoto** `meu_branch`, por exemplo, se você usa o Git 1.7.0 ou mais recente, execute:

```
git push origin --delete meu_branch
```

A exclusão de *branches* remotos é possível a partir do Git 1.5.0. Se você utiliza uma versão anterior à 1.7.0, o comando é diferente:

```
git push origin :meu_branch
```

**Referência:**

- [Delete a Git branch both locally and remotely](http://stackoverflow.com/questions/2003505/delete-a-git-branch-both-locally-and-remotely)

### Como criar um *fork* de um projeto meu no GitHub?

O [GitHub](https://github.com/) só permite criar *forks* de projetos de outras pessoas. E se eu quiser criar um *fork* de um projeto próprio, meu?

O melhor que podemos fazer é criar um novo repositório para o *fork* e, localmente, adicionar o repositório do projeto original como um repositório remoto. [Esse tutorial](http://kroltech.com/2014/01/quick-tip-how-to-fork-your-own-repo-in-github/#.VLJLyIqG-Nt) (em inglês) explica como fazer isso.

Vejamos, por exemplo, como criar um *fork* `meu_fork` do projeto `projeto_original`, ambos pertencentes ao usuário `meu_nome_de_usuario`:

1. No GitHub, crie um novo repositório para o *fork* (no exemplo, chamaremos esse repositório de `meu_fork`).

2. Obtenha um clone local desse repositório:

```
git clone https://github.com/meu_nome_de_usuario/meu_fork.git
```

3. Adicione o repositório do projeto original (no exemplo, `projeto_original`) como um repositório remoto (vamos chamá-lo de `upstream`) do repositório local recém clonado:

```
git remote add upstream https://github.com/meu_nome_de_usuario/repositorio_original.git
```

4. Baixe uma cópia do repositório do projeto original para o seu repositório local:

```
git pull upstream master
```

5. Envie os arquivos do seu repositório local para o repositório `meu_fork` no GitHub:

```
git push origin master
```

O GitHub não reconhecerá o projeto `meu_fork` como um *fork* de fato do projeto `projeto_original`, mas, na prática, fizemos ele ser exatamente isso.

**Referência:**

- [How can I fork my own GitHub repository? - Stack Overflow](http://stackoverflow.com/questions/3772684/how-can-i-fork-my-own-github-repository)

### Como se livrar de mudanças do tipo "old mode 100755 new mode 100644"

Pode acontecer (na verdade, é bastante comum se você usa Windows e Linux no mesmo computador) de, ao executar `git status` ou `gitk` para saber como está seu repositório local, você perceber vários arquivos listados como modificados, quando na verdade você não trabalhou neles. O Git descreve essas alterações como:

```
old mode 100755
new mode 100644
```

Isso acontece quando o Git não consegue determinar com precisão o [modo do arquivo](http://www.vivaolinux.com.br/artigo/Entendendo-as-permissoes-de-arquivos-%28chmod%29) (um conceito mais conhecido dos usuários do Linux) e entende que houve uma mudança de modo.

Uma possível solução (a mais prática, na minha opinião) é configurar o Git para ignorar mudanças no modo do arquivo:

```
git config core.filemode false
```

Após a execução desse comando, um novo `git status` ou `gitk` deve mostrar somente os arquivos que de fato foram alterados.

**Referência:**

- [How do I remove files saying “old mode 100755 new mode 100644” from unstaged changes in Git? - Stack Overflow](http://stackoverflow.com/questions/1257592/how-do-i-remove-files-saying-old-mode-100755-new-mode-100644-from-unstaged-cha)

### Como manter o fim de linha dos arquivos de texto

Outro problema comum para quem usa diferentes sistemas operacionais (ou para projetos cujos desenvolvedores usam diferentes sistemas) é o [fim de linha](http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/) dos arquivos de texto: no Windows, ele é representado pelos [caracteres ASCII](https://pt.wikipedia.org/wiki/ASCII) `CR` (*Carriage Return*) e `LF` (*Line Feed*); no [Unix](http://www.unix.org/what_is_unix.html), no Linux e no [Mac OS X](http://www.apple.com/br/osx/what-is/), ele é representando apenas pelo caractere `LF`.

Pode acontecer de, ao executar `git status` ou `gitk` para saber como está seu repositório local, você perceber vários arquivos listados como modificados, quando na verdade você não trabalhou neles. Até mesmo o conteúdo dos arquivos, visualmente falando, é idêntico.

O que aconteceu debaixo do pano que fez o Git mostrar esses arquivos como modificados foi uma mudança nos caracteres que representam o fim de linha (que comumente acontece após uma mudança de sistema operacional).

Escrever sobre isso renderia [outro *post* inteiro](http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/), mas vou tentar focar aqui na solução.

Em primeiro lugar, você deve alterar a configuração global do Git em seu computador. Há o comando `git config --global core.autocrlf`, que é usado para definir como o Git deve tratar os fins de linha:

- No Mac OS X e no Linux, você deve atribuir a essa configuração o valor `input`:

```
git config --global core.autocrlf input
```

- No Windows, você deve atribuir a essa configuração o valor `true`:

```
git config --global core.autocrlf true
```

Além disso, se você utiliza o Git 1.7.2 ou mais recente, pode configurar, para cada repositório, e para cada arquivo, como o Git trata os fins de linha. Para isso, você deve adicionar ao repositório um arquivo de texto chamado `.gitattributes`, que faz lembrar uma tabela com duas colunas. Em cada linha:

- à esquerda, você deve inserir o nome de arquivo (ou padrão de nome de arquivo) que o Git deve identificar; e
- à direita, você deve configurar como o Git deve tratar esse arquivo (ou padrão de arquivo).

Aqui está um arquivo `.gitattributes` de exemplo, que você pode usar como um ponto de partida para seus repositórios (pode deixar os comentários, o Git os ignora):

```
# Configuração padrão
* text=auto

# Arquivos cujos fins de linha devem sempre ser convertidos para o padrão do
# sistema em uso
*.c text
*.h text

# Arquivos cujos fins de linha devem sempre ser CRLF (padrão do Windows)
*.bat text eol=crlf

# Arquivos cujos fins de linha devem sempre ser LF (padrão do Unix, Linux e Mac
# OS X)
*.sh text eol=lf

# Arquivos binários que não devem ser modificados
*.png binary
*.jpg binary
```

É uma boa prática que esse arquivo seja sempre adicionado já no primeiro ou segundo *commit*, de forma a prevenir problemas futuros. Uma vez no repositório, esse arquivo é compartilhado por todos os desenvolvedores, que não mais enfrentarão problemas com os fins de linha dos arquivos.

Se você tem um repositório com vários arquivos e *commits* que ainda não tem um arquivo `.gitattributes`, aqui está a melhor maneira de adicioná-lo (sugerida pela própria [ajuda do GitHub](https://help.github.com/articles/dealing-with-line-endings/), com base em uma resposta no [Stack Overflow](http://stackoverflow.com/a/1511273/1657502)):

1. Crie um arquivo `.gitattributes`, como o do exemplo acima, e faça um *commit* com ele:

```
git add .gitattributes
git commit -m "Arquivo .gitattributes"
```

2. Salve quaisquer outros arquivos alterados, para garantir que não perderá trabalho:

```
git add . -u
git commit -m "Salvando os arquivos antes de atualizar os fins de linha"
```

3. Remova cada arquivo do repositório:

```
git rm --cached -r .
```

4. Reescreva os arquivos, dessa vez com os fins de linha desejados:

```
git reset --hard
```

5. Adicione todos os seus arquivos de volta (aproveite a oportunidade para verificar se houve arquivos que não tiveram seus fins de linha substituídos, quando deveriam):

```
git add .
```

6. Faça um *commit* com as alterações:

```
git commit -m "Problemas com fins de linha nunca mais!"
```

**Referências:**

- [Git - how to keep CRLF endings for specific files only? - Stack Overflow](http://stackoverflow.com/questions/19551037/git-how-to-keep-crlf-endings-for-specific-files-only)
- [What's the best CRLF (Carriage Return Line Feed) handling strategy with git? - Stack Overflow](http://stackoverflow.com/questions/170961/whats-the-best-crlf-carriage-return-line-feed-handling-strategy-with-git)
- [Trying to fix line-endings with git filter-branch, but having no luck - Stack Overflow](http://stackoverflow.com/questions/1510798/trying-to-fix-line-endings-with-git-filter-branch-but-having-no-luck)
- [Dealing with line endings - User Documentation](https://help.github.com/articles/dealing-with-line-endings/)
- [Mind the End of Your Line ∙ Adaptive Patchwork](http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/)

### Como visualizar o histórico de mudanças de um arquivo

Para visualizar o histórico do repositório como um todo, os comandos mais básicos são, para linha de comando:

```
git log
```

Ou, para interface gráfica:

```
gitk
```

Para visualizar o histórico de um arquivo em particular (`nome_do_arquivo`, por exemplo), para mim foi suficiente o comando:

```
gitk nome_do_arquivo
```

Na referência, há outras sugestões de comandos mais elaborados.

**Referência:**

- [View the change history of a file using Git versioning - Stack Overflow](http://stackoverflow.com/questions/278192/view-the-change-history-of-a-file-using-git-versioning)
