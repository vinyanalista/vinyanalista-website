---
date: '2017-01-30 08:00:00 GMT-2'
layout: post
published: true
title: pfSense autenticando no Active Directory (AD)
image: /files/2017/01/pfsense-ad-01.png
---

{% include image.html src="/files/2017/01/pfsense-ad-01.png" %}

Se possuímos em uma mesma rede [pfSense][pfsense] e [Active Directory][ad] (AD), algumas possibilidades interessantes surgem, como: permitir que os administradores da rede (e apenas eles) acessem o pfSense com seus *logins* e senhas do AD; permitir acesso remoto via VPN utilizando os mesmos *logins* e senhas do AD; e exigir *login* e senha do AD para que se possa navegar na rede Wi-Fi (ou em qualquer outra rede).

Nesse *post*, você verá como explorar essas possibilidades.

## webConfigurator autenticando no AD

A interface *web* utilizada para configurar o pfSense é chamada de **webConfigurator**.

Para acessá-la, devemos fornecer nome de usuário (*username*) e senha (*password*):

{% include image.html src="/files/2017/01/pfsense-ad-02.png" %}

Podemos configurá-la para que esse acesso utilize as mesmas credenciais do AD.

Para isso, precisaremos criar uma conta de usuário no AD para o pfSense, para que ele possa se conectar ao AD e validar as credenciais fornecidas na tela de *login*:

{% include image.html src="/files/2017/01/pfsense-ad-03.png" %}

Observe que o pfSense precisa de uma conta só para ele porque [o AD, por padrão, não permite conexão anônima (*anonymous bind*)][anonymous-bind]. Essa conta pode ser uma conta de usuário simples, não precisa de privilégios elevados.

Recomendo que você utilize uma senha aleatória gerada pelo *site* [RANDOM.ORG][random.org]. Você pode verificar que ela é segura no *site* [How Secure Is My Password?][how-secure-is-my-password] Desative a alteração de senha no próximo *logon* e também a expiração da senha:

{% include image.html src="/files/2017/01/pfsense-ad-04.png" %}

Agora acesse a interface *web* do pfSense com um usuário local (por [padrão][pfsense-configuracoes-padrao], caso você não tenha alterado após a instalação, nome de usuário **admin** e senha **pfsense**, se você não alterou essa senha, recomendo que altere).

Vá em **System**, **User Manager**, aba **Authentication Servers** e clique no botão **Add**.

Preencha o formulário com as informações sobre o seu domínio (a seguir, apresento exemplos, mas você deve alterar de acordo com a sua realidade):

- **Descriptive name:** AD da MINHACASA
- **Type:** selecione **LDAP**
- **Hostname or IP address:** 10.200.1.30 ou ad.minhacasa.net (endereço IP ou nome de máquina completo do controlador de domínio)
- **Search scope**:
    - **Level:** selecione **Entire Subtree** (pesquisar em toda a árvore do AD)
    - **Base DN:** DC=minhacasa,DC=net
- **Authentication containers:** CN=Users
- Desmarcar a opção **Use anonymous binds to resolve distinguished names**
- **Bind credentials**:
    - **User DN:** CN=pfSense,CN=Users,DC=minhacasa,DC=net
    - **Password:** a senha do usuário criado para o pfSense
- **Initial Template:** selecione **Microsoft AD**

Para as demais opções, o padrão deve ser suficiente. Talvez você precise alterá-las de acordo com a configuração do seu controlador de domínio.

Abaixo você pode ver o formulário completo, depois de preenchido:

{% include image.html src="/files/2017/01/pfsense-ad-05.jpg" %}

Clique em **Save**.

Agora, vamos testar se o pfSense consegue autenticar um usuário do AD.

Para isso, vá em **Diagnostics**, **Authentication**.

Em **Authentication Server**, selecione o AD que você acabou de cadastrar. Informe um nome de usuário e senha e clique em **Test**:

{% include image.html src="/files/2017/01/pfsense-ad-06.png" %}

Se você digitou corretamente o nome de usuário e a senha, o pfSense deve mostrar uma mensagem de sucesso e listar os grupos do usuário, como na imagem acima.

Para que possamos acessar o webConfigurator com nossa conta do AD, ainda faltam mais duas configurações.

Vamos dar permissão a um grupo do AD para acessar todas as configurações (o grupo que contém os administradores de rede, por exemplo, **TI-REDES**).

Vá em **System**, **User Manager**, aba **Groups** e clique no botão **Add**.

Preencha o formulário com as informações sobre o grupo:

- **Group name:** TI-REDES
- **Scope:** selecione **Remote**
- **Description**: Administradores da rede (um texto apenas para informação)

{% include image.html src="/files/2017/01/pfsense-ad-07.png" %}

Clique em **Save**.

De volta à tela que lista os grupos, na linha do grupo que acabamos de criar, clique no ícone do lápis para editar o grupo.

Na sessão **Assigned Privileges**, clique no botão **Add**.

Selecione o privilégio **WebCfg - All pages** e clique em **Save**:

{% include image.html src="/files/2017/01/pfsense-ad-08.jpg" %}

De volta à tela anterior, clique em **Save**.

Finalmente, vamos dizer que o AD é onde o pfSense deve buscar os usuários.

Clique na aba **Settings**. Em **Authentication Server**, selecione o AD. Clique em **Save**:

{% include image.html src="/files/2017/01/pfsense-ad-09.png" %}

Faça *log out* do webConfigurator e entre de novo, dessa vez utilizando sua conta do AD (deve ser uma conta pertencente ao grupo configurado). Deve funcionar.

Se você fizer um teste utilizando uma conta do AD sem permissões previamente concedidas, o pfSense informará que não há uma página configurada para o usuário e oferecerá somente a opção de fazer *log out*:

{% include image.html src="/files/2017/01/pfsense-ad-10.png" %}

Você pode conceder diferentes permissões a diferentes grupos de usuários, por exemplo:

- Técnicos do Suporte (grupo **TI-SUPORTE**) podem acessar a lista de concessões DHCP para verificar qual endereço IP determinado computador recebeu, além de poder enviar comandos [Wake-on-LAN][wake-on-lan] para ligar computadores pela rede, para isso são necessárias as permissões:
    - WebCfg - Status: DHCP leases
    - WebCfg - Services: Wake-on-LAN

{% include image.html src="/files/2017/01/pfsense-ad-11.jpg" %}

- Programadores (grupo **TI-DESENV**, assim nomeado porque o pfSense não aceita um nome de grupo maior que 16 caracteres) podem acessar as configurações do portal de captura (*captive portal*) para personalizar as páginas HTML do portal de captura, para isso são necessárias as permissões:
    - WebCfg - Services: Captive portal
    - WebCfg - Services: Captive portal: Edit Zones
    - WebCfg - Services: Captive portal: File Manager
    - WebCfg - Services: Captive portal Zones

{% include image.html src="/files/2017/01/pfsense-ad-12.jpg" %}

Observe que, depois de tudo isso, ainda é possível entrar no webConfigurator com o usuário local **admin** do pfSense. Por isso, é importante mudar a senha dele.

## VPN autenticando no AD

No *post* anterior, vimos [como configurar uma VPN utilizando pfSense e OpenVPN][vpn]. Recomendo que você siga todo aquele passo a passo e faça o teste da VPN utilizando o usuário local criado no tutorial especificamente para testar a VPN.

Vejamos agora como ajustar aquela configuração para que seja possível conectar à VPN informando *login* e senha do AD.

No pfSense, vá em **VPN**, **OpenVPN**, aba **Servers**.

Clique no ícone do lápis para editar o servidor OpenVPN.

No campo **Backend for authentication**, em vez de **Local Database**, selecione o AD:

{% include image.html src="/files/2017/01/pfsense-ad-13.jpg" %}

Clique no botão **Save**, ao final da página.

Agora vamos obter a configuração que deve ser usada com o cliente OpenVPN. Diferente do [tutorial anterior][vpn], em que baixamos do pfSense o instalador com cliente e configuração já prontos, aqui vamos baixar do pfSense apenas a configuração.

Vá em **VPN**, **OpenVPN**, aba **Client Export**.

Na linha referente a um usuário local qualquer (seguindo o exemplo do [*post* anterior][vpn], **vinyanalista**), clique no botão **Others**, abaixo de **Inline Configurations**, para baixar um arquivo contendo a configuração do cliente OpenVPN:

{% include image.html src="/files/2017/01/pfsense-ad-14.jpg" %}

Ele deve se chamar algo como **firewall-udp-1194-vinyanalista-config.ovpn**. Você pode renomeá-lo para, por exemplo, **vpn-da-minhacasa.ovpn**.

No computador cliente (veremos aqui instruções para [Windows][windows]), baixe e instale o *software* cliente do [*site* do OpenVPN][openvpn]. A instalação é bem simples: no famoso estilo *next*, *next*, *next*. Recomendo, se possível, remover qualquer versão mais antiga, incluindo arquivos de configuração (para referência, no momento da escrita o cliente oficial do OpenVPN se encontra na versão 2.4.0, lançada em [dezembro de 2016][openvpn-2.4.0]).

Terminada a instalação, copie o arquivo de configuração para a pasta onde o cliente OpenVPN guarda suas configurações:

{% include image.html src="/files/2017/01/pfsense-ad-15.jpg" %}

No computador que eu utilizei, o caminho para essa pasta foi **C:\Arquivos de Programas\OpenVPN\config**.

Depois disso, é só iniciar o cliente OpenVPN, como explicado no [*post* anterior][vpn], e informar o usuário e a senha do AD para se conectar à VPN.

Deve funcionar normalmente.

Para [Android][android], as instruções são bem semelhantes: baixe e instale o *software* cliente pela [Play Store][openvpn-android] e baixe pelo pfSense o arquivo de configuração clicando no botão **Android**, abaixo de **Inline Configurations**. Esse arquivo deve se chamar algo como **firewall-udp-1194-vinyanalista-android-config.ovpn**. Você pode renomeá-lo para, por exemplo, **vpn-da-minhacasa-android.ovpn** e utilizá-lo no cliente OpenVPN, como mostrado no [*post* anterior][vpn]. Lembre-se de agora utilizar usuário e senha do AD.

### Restringindo o acesso à VPN a um grupo do AD

Configurando a VPN como foi explicado acima, qualquer pessoa pode se conectar à VPN utilizando suas credenciais do AD. Que tal adicionar um certo controle permitindo que apenas usuários pertencentes a determinado grupo se conectem?

Para isso, crie no AD um grupo chamado **PFSENSE-VPN**. Adicione a esse grupo os usuários que poderão se conectar à VPN.

No pfSense, vá em **System**, **User Manager**, aba **Authentication Servers** e clique no botão **Add**.

Preencha esse formulário com as mesmas informações que você informou antes, como se fosse cadastrar o AD de novo (de certa forma, é o que estamos fazendo, mas aqui seremos mais específicos). Ainda não clique em **Save**.

Mude o nome (**Descriptive name**) para **AD da MINHACASA - grupo PFSENSE-VPN**.

Ative a opção **Enable extended query** e preencha o campo **Query** com:

```
&(objectCategory=user)(memberOf=CN=PFSENSE-VPN,CN=Users,DC=minhacasa,DC=net)
```

Agora sim clique em **Save**.

Vá em **VPN**, **OpenVPN**, aba **Servers**.

Clique no ícone do lápis para editar o servidor OpenVPN.

No campo **Backend for authentication**, selecione **AD da MINHACASA - grupo PFSENSE-VPN**.

Clique no botão **Save**, ao final da página.

Teste essa configuração tentando se conectar à VPN com um usuário que pertence e outro que não pertence ao grupo **PFSENSE-VPN**. Deve funcionar só no primeiro caso.

Você pode no AD tornar o grupo **TI-REDES** membro do grupo **PFSENSE-VPN**. Assim, por transitividade, todos os administradores da rede ganham permissão para usar a VPN, sem a necessidade de ter que adicioná-los um por um ao grupo **PFSENSE-VPN**.

## Rede Wi-Fi autenticando no AD

Que tal prover para os funcionários da empresa uma rede Wi-Fi, mas só liberar o acesso mediante o fornecimento de *login* e senha do AD?

Como ainda não fiz um *post* sobre como gerenciar uma rede Wi-Fi com o pfSense, decidi deixar esse tópico para o próximo *post*.

<a href="#author">Siga-me</a> para ser notificado quando ele for publicado.

No final das contas, percebi que este *post* acabou sendo uma atualização do [anterior][vpn], acrescentando a integração com o Active Directory. No próximo *post*, teremos como novidade a rede Wi-Fi, incluindo a autenticação dela no AD.

## Referências

Muito do que escrevi aqui aprendi na tentativa e erro e evoluindo conforme as demandas que iam surgindo no trabalho. Mas claro que comecei lendo alguns textos:

- [Tutorial PFFense 2.0: Active Directory -> User Manager][referencia-1] (sic)
- [pfSense 2.0 e OpenVPN Autenticando no Windows 2008 : Thiago Melo][referencia-2]
- [ldap authentication against security group: PFSENSE][referencia-3]

[pfsense]:                      https://www.pfsense.org/
[ad]:                           https://technet.microsoft.com/pt-br/library/jj206711.aspx
[pfsense-configuracoes-padrao]: https://doc.pfsense.org/index.php/Installing_pfSense#pfSense_Default_Configuration
[anonymous-bind]:               https://technet.microsoft.com/pt-br/library/cc816788(v=ws.10).aspx
[random.org]:                   https://www.random.org/passwords/?num=5&len=15&format=html
[how-secure-is-my-password]:    https://howsecureismypassword.net/
[wake-on-lan]:                  https://pt.wikipedia.org/wiki/Wake-on-LAN
[vpn]:                          {% post_url 2016-06-26-como-criar-uma-vpn-pfsense-openvpn %}
[windows]:                      https://www.microsoft.com/pt-br/windows/
[openvpn]:                      https://openvpn.net/index.php/download/community-downloads.html
[openvpn-2.4.0]:                https://community.openvpn.net/openvpn/wiki/ChangesInOpenvpn24
[android]:                      https://www.android.com/intl/pt-BR_br/
[openvpn-android]:              https://play.google.com/store/apps/details?id=net.openvpn.openvpn
[referencia-1]:                 https://forum.pfsense.org/index.php?topic=44689.0
[referencia-2]:                 http://thiago.oxente.org/2011/11/09/pfsense-2-0-e-openvpn-e-autenticando-no-windows-2008/
[referencia-3]:                 https://www.reddit.com/r/PFSENSE/comments/3hkm3x/ldap_authentication_against_security_group/

