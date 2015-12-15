---
date: '2015-12-15 12:30:00 GMT-3'
excerpt: 'Precisou reiniciar o computador, estava com pressa e se esbarrou nas atualizações do Windows 10? Pior: ele passou um tempão tentando instalar as atualizações, depois falhou e passou mais outra eternidade desfazendo o trabalho? Veja aqui como ter um pouco mais de controle sobre as atualizações do Windows.'
layout: post
published: true
title: Como configurar as atualizações automáticas do Windows 10
image: /files/2015/12/windows-atualizacoes-00.jpg
---

Precisou reiniciar o computador, estava com pressa e se esbarrou nas atualizações do [Windows][windows] 10?

{% include image.html src="/files/2015/12/windows-atualizacoes-00.jpg" %}

Pior: ele passou um tempão tentando instalar as atualizações, depois falhou e passou mais outra eternidade desfazendo o trabalho?

{% include image.html src="/files/2015/12/windows-atualizacoes-01.jpg" %}

Veja aqui como ter um pouco mais de controle sobre as atualizações do Windows.

## Por que elas são tão frequentes?

Desde que [a Microsoft decidiu oferecer o Windows como um serviço][windows-como-servico], e não mais como um programa tradicional com número de versão, as atualizações são continua e automaticamente baixadas e instaladas pelo sistema operacional, que não consulta o usuário sobre como ou quando fazer isso. O Windows Update se esforça para que os usuários do Windows tenham sempre a versão mais recente dos componentes do sistema.

Isso, no entanto, gera um inconveniente para alguns usuários, que podem enfrentar lentidão na conexão com a Internet ou até do computador como um todo. Sem contar com o inconveniente bem conhecido de não poder contar com o computador em um momento de necessidade (como quando o Windows não reinicia imediatamente para instalar atualizações).

As versões anteriores do Windows ofereciam maior controle sobre o processo de atualização e suas configurações estavam mais acessíveis. O Windows 10 oferece algum controle sobre as atualizações, mas as configurações não estão tão visíveis, vejamos onde encontrá-las. Note que algumas delas não estão disponíveis em todas as [edições do Windows][edicoes-do-windows].

**Observação:** por mais que seja possível adiar ou ignorar as atualizações do Windows, elas continuam sendo necessárias. É importante que regularmente você reserve um tempo para verificar se há novas atualizações e deixar o computador instalá-las. Pode ser que o sistema solicite a obtenção de atualizações, como já aconteceu comigo:

{% include image.html src="/files/2015/12/windows-atualizacoes-02.png" %}

## Configurar a conexão como limitada

Quando você informa ao Windows que a conexão que você está usando é limitada (Wi-Fi ou rede móvel, por exemplo), ele não baixa atualizações automaticamente usando essa conexão.

Para isso, clique no botão **Iniciar**, no canto inferior esquerdo da tela, e depois clique em **Configurações**. Na tela que aparece, clique em **Rede e Internet** e depois em **Wi-Fi**. Depois da lista de redes Wi-Fi disponíveis, clique em **Opções avançadas**. Você chegará à seguinte tela, na qual pode ativar ou desativar a conexão limitada:

{% include image.html src="/files/2015/12/windows-atualizacoes-03.png" %}

Depois de ativar a conexão limitada, se você acessar as configurações do Windows Update (menu **Iniciar**, **Configurações**, **Atualização e segurança**, **Windows Update**), perceberá que o Windows oferece a possibilidade de buscar atualizações apenas quando desejado, clicando no botão **Verificar se há atualizações**:

{% include image.html src="/files/2015/12/windows-atualizacoes-04.png" %}

Para baixar e instalar atualizações com essa configuração ativada, você pode:

1. Ordenar o *download* manualmente, como explicado acima;
2. Desativar a conexão limitada (depois que terminar a atualização, você pode ativá-la de novo); ou
3. Conectar a uma rede que não está configurada como limitada.

## Agendar a reinicialização

Com frequência, após a instalação de atualizações, é preciso reiniciar o computador. Normalmente, o Windows tenta perceber um horário em que você não usa o computador (de madrugada, por exemplo) e reinicia nesse horário. Se preferir, você pode agendar um horário para ele reiniciar.

Para isso, clique no botão **Iniciar**, no canto inferior esquerdo da tela, e depois clique em **Configurações**. Na tela que aparece, clique em **Atualização e segurança** e depois em **Windows Update**. Clique em **Opções avançadas**. Você chegará à seguinte tela, na qual pode selecionar **Avisar antes de agendar reinicialização** em vez de **Automático (recomendado)**:

{% include image.html src="/files/2015/12/windows-atualizacoes-05.png" %}

Feito isso, quando o Windows começar a instalar atualizações, você será solicitado a informar um horário para que ele possa reiniciar o computador e continuar a atualização:

{% include image.html src="/files/2015/12/windows-atualizacoes-06.png" %}

{% include image.html src="/files/2015/12/windows-atualizacoes-07.png" %}

## Bloquear atualizações específicas

Se seu problema é causado por apenas uma atualização, uma boa alternativa é impedir que o sistema instale apenas a atualização indesejada. Para isso, a [Microsoft][microsoft] lançou o pacote de solução de problemas **Mostrar ou ocultar atualizações**:

{% include image.html src="/files/2015/12/windows-atualizacoes-08.png" %}

{% include image.html src="/files/2015/12/windows-atualizacoes-09.png" %}

Para mais informações, consulte a [base de dados de conhecimento da Microsoft][microsoft-kb3073930].

## Adiar atualizações

Se você utiliza uma edição profissional do Windows, pode [adiar atualizações][adiar-atualizacoes]. Esse recurso é especialmente útil para quem utiliza o Windows na empresa e precisa de estabilidade: atualizações de segurança são sempre instaladas assim que lançadas, mas recursos novos podem ter sua instalação adiada até que tenham sido bastante testados e a Microsoft possa assegurar o seu correto funcionamento.

Para configurar o Windows Update para adiar atualizações, clique no botão **Iniciar**, no canto inferior esquerdo da tela, e depois clique em **Configurações**. Na tela que aparece, clique em **Atualização e segurança** e depois em **Windows Update**. Clique em **Opções avançadas**. Você chegará à seguinte tela, na qual pode ativar a opção **Adiar atualizações**:

{% include image.html src="/files/2015/12/windows-atualizacoes-05.png" %}

## Configurar atualizações pela política de grupo

Se você utiliza uma edição profissional do Windows, pode configurar as atualizações automáticas por meio da política de grupo da mesma maneira como era possível em versões anteriores do Windows.

Para acessar o editor de política de grupo, abra o menu **Iniciar**, pesquise por **gpedit.msc** e execute o editor de política de grupo como administrador:

{% include image.html src="/files/2015/12/windows-atualizacoes-10.png" %}

Na estrutura de árvore da esquerda, navegue para **Configuração do Computador**, **Modelos Administrativos**, **Componentes do Windows**, **Windows Update**. À direita, localize o item **Configurar Atualizações Automáticas** e clique duas vezes nele:

{% include image.html src="/files/2015/12/windows-atualizacoes-11.png" %}

Na tela que aparece, selecione **Habilitado** e em **Opções** configure como desejar. Você pode selecionar, por exemplo, **Avisar antes de baixar e de instalar qualquer atualização**:

{% include image.html src="/files/2015/12/windows-atualizacoes-12.png" %}

**Observação:** nessa mesma tela, se você selecionar **Desabilitado**, em vez de **Habilitado**, desativará as atualizações do Windows por completo.

Clique em **OK** e feche o editor de política de grupo. Agora acesse as configurações do Windows Update (menu **Iniciar**, **Configurações**, **Atualização e segurança**, **Windows Update**) e clique em **Verificar se há atualizações**:

{% include image.html src="/files/2015/12/windows-atualizacoes-04.png" %}

Logo em seguida, quando o Windows começar a buscar atualizações, clique em **Opções avançadas**. Observe nessa tela a mensagem **Algumas configurações são gerenciadas pela sua organização**:

{% include image.html src="/files/2015/12/windows-atualizacoes-13.png" %}

Observe também que não é possível escolher como as atualizações são instaladas: essa opção está desabilitada, mostrando a configuração escolhida no editor de política de grupo.

Nesse caso, só é possível configurar o Windows Update pelo editor de política de grupo. Caso deseje voltar a configurar o Windows Update por essa tela, volte à tela **Configurar Atualizações Automáticas** no editor de política de grupo, selecione **Não Configurado** e clique em **OK**.

## Configurar atualizações pelo registro

Nas edições profissionais do Windows, também é possível fazer a configuração descrita acima pelo registro. Na verdade, a tela **Configurar Atualizações Automáticas** é apenas uma interface gráfica para essa configuração.

Abra o **menu Iniciar**, pesquise por **regedit** e execute o editor de registro como administrador:

{% include image.html src="/files/2015/09/inicializacao-rapida-5.png" %}

Navegue até a chave de registro **HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU**. Caso essas duas últimas chaves não existam, você terá que criá-las: navegue até a chave **HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows**, dentro dela crie uma chave **WindowsUpdate** e, dentro desta, uma chave **AU**.

Modifique (se necessário, antes, crie) o valor **AUOptions**, do tipo **REG_DWORD** para um dos valores a seguir:

- 2 - Avisar antes de baixar e de instalar qualquer atualização;
- 3 - Baixar automaticamente as atualizações e avisar quando elas estiverem prontas para serem instaladas; ou
- 4 - Baixar automaticamente e agendar a instalação.

Clique em **OK** e feche o editor de registro:

{% include image.html src="/files/2015/12/windows-atualizacoes-14.png" %}

Agora acesse as configurações do Windows Update (menu **Iniciar**, **Configurações**, **Atualização e segurança**, **Windows Update**) e clique em **Verificar se há atualizações**:

{% include image.html src="/files/2015/12/windows-atualizacoes-04.png" %}

Logo em seguida, quando o Windows começar a buscar atualizações, clique em **Opções avançadas**. Observe nessa tela a mensagem **Algumas configurações são gerenciadas pela sua organização**:

{% include image.html src="/files/2015/12/windows-atualizacoes-13.png" %}

Observe também que não é possível escolher como as atualizações são instaladas: essa opção está desabilitada, mostrando a configuração correspondente ao valor existente na chave de registro.

## Desativar o serviço do Windows Update

Uma solução extrema é desativar o serviço do Windows Update, de modo que o Windows não busca nem baixa atualizações. É possível ativar esse serviço novamente em um momento oportuno para que o sistema possa se atualizar.

**Observação:** essa não é a melhor opção para contornar problemas com as atualizações do Windows. Fazendo isso, seu sistema não receberá atualização alguma, nem mesmo as relativas a segurança. Considere utilizar uma das alternativas anteriores.

Para desativar o serviço do Windows Update, abra o menu **Iniciar**, pesquise por **services.msc** e execute o gerenciador de serviços como administrador:

{% include image.html src="/files/2015/12/windows-atualizacoes-15.png" %}

Na lista de serviços, procure pelo serviço **Windows Update** (ele deve ser um dos últimos) e clique duas vezes nele:

{% include image.html src="/files/2015/12/windows-atualizacoes-16.png" %}

Na tela que aparece, em **Tipo de inicialização** selecione **Desativado** e clique em **OK**:

{% include image.html src="/files/2015/12/windows-atualizacoes-17.png" %}

Pronto, pode fechar o gerenciador de serviços.

## Referências

As páginas nas quais encontrei as informações necessárias para redigir esse tutorial foram:

- [What You Need to Know About Windows Update on Windows 10][referencia-1]
- [How to Prevent Windows 10 From Automatically Downloading Updates][referencia-2]
- [How to turn off Windows Update in Windows 10][referencia-3]
- [What Does "Defer Upgrades" in Windows 10 Mean?][referencia-4]
- [How to block unwanted Windows Updates in Windows 10][referencia-5]

Espero que possa ter ajudado! Dúvidas nos comentários!

[windows]: http://www.microsoft.com/pt-br/windows
[windows-como-servico]: http://blogs.windows.com/windowsexperience/2015/01/21/the-next-generation-of-windows-windows-10/
[edicoes-do-windows]: https://www.microsoft.com/pt-br/windows/windows-10-editions
[microsoft]: http://www.microsoft.com.br/
[microsoft-kb3073930]: https://support.microsoft.com/pt-br/kb/3073930
[adiar-atualizacoes]: http://windows.microsoft.com/pt-br/windows-10/defer-upgrades-in-windows-10
[referencia-1]: http://www.howtogeek.com/223068/what-you-need-to-know-about-windows-update-on-windows-10/
[referencia-2]: http://www.howtogeek.com/224471/how-to-prevent-windows-10-from-automatically-downloading-updates/
[referencia-3]: http://www.thewindowsclub.com/turn-off-windows-update-in-windows-10
[referencia-4]: http://www.howtogeek.com/223083/what-does-"defer-upgrades"-in-windows-10-mean/
[referencia-5]: http://www.thewindowsclub.com/block-unwanted-windows-updates-in-windows-10
