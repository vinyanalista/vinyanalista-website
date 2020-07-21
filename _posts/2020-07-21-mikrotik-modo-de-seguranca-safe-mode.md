---
date: 2020-07-21 09:00:00 GMT-3
image: '/files/2020/07/RB952Ui-5ac2nD-TC.png'
layout: post
published: true
title: 'MikroTik: modo de segurança (Safe Mode)'
---

{% include image.html src="/files/2020/07/RB952Ui-5ac2nD-TC.png" style="max-width: 256px;" %}

No [_post_ anterior][mikrotik], apresentei o roteador e ponto de acesso sem fio doméstico [MikroTik hAP ac lite TC][mikrotik]. Hoje, vamos falar sobre um de seus vários recursos: o modo de segurança.

Enquanto manuseia o MikroTik, pode ocorrer de você alterar alguma configuração e fazer com que ele se torne inacessível. Geralmente, isso ocorre por acidente, mas não há como desfazer a última alteração depois que o acesso é perdido. Por exemplo, você está alterando as configurações do _firewall_ e insere uma nova regra que acaba por impedir seu acesso.

O MikroTik traz um recurso chamado **modo de segurança** (_safe mode_) que pode ser usado para prevenir situações assim. Com o modo de segurança ativado, se o roteador percebe que o acesso ao computador foi perdido, ele automaticamente descarta as alterações feitas após a ativação do modo de segurança e se reinicia.

O modo de segurança pode ser ativado e desativado pelo botão **Safe Mode** que fica na barra superior do WinBox:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-01.jpg" %}

Quando o modo de segurança está **desativado**, o botão tem a aparência normal de um botão, como na figura acima.

Antes de fazer uma configuração que você desconfia que pode fazer você perder o acesso, ative o modo de segurança clicando no botão **Safe Mode**.

Quando o modo de segurança está **ativado**, o botão aparece pressionado (escuro, fundo):

{% include image.html src="/files/2020/07/mikrotik-safe-mode-02.jpg" %}

Após fazer as configurações que você precisa fazer, se tudo estiver funcionando, lembre-se de desativar o modo de segurança. Para isso, clique de novo no botão **Safe Mode**, que volta à aparência normal de um botão, indicando que o modo de segurança foi desativado.

## Testando o modo de segurança

Para ver na prática como o modo de segurança funciona, vamos ativá-lo e inserir uma regra no _firewall_ do MikroTik para nos bloquear, o que deve fazer com que o roteador se reinicie.

Verifique qual é o seu endereço IP. No Linux, isso pode ser feito com o comando:

```
$ ip -c a
```

{% include image.html src="/files/2020/07/mikrotik-safe-mode-03.jpg" %}

No meu caso, o MikroTik forneceu ao meu computador via [DHCP] o endereço `10.0.0.254`.

Abra uma janela do terminal e deixe um **[ping]** rodando para o MikroTik:

```
$ ping 10.0.0.1
PING 10.0.0.1 (10.0.0.1) 56(84) bytes of data.
64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=2.21 ms
64 bytes from 10.0.0.1: icmp_seq=2 ttl=64 time=2.36 ms
64 bytes from 10.0.0.1: icmp_seq=3 ttl=64 time=2.25 ms
64 bytes from 10.0.0.1: icmp_seq=4 ttl=64 time=2.77 ms
```

Abra o WinBox e ative o modo de segurança como explicado acima.

Agora é seguro ajustar as configurações do MikroTik.

No menu à esquerda, abra o submenu **IP** e clique em **Firewall**:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-04.jpg" %}

Na janela **Firewall**, que se abre no WinBox, na aba **Filter Rules** (regras do filtro), clique no botão **Add** (adicionar):

{% include image.html src="/files/2020/07/mikrotik-safe-mode-05.jpg" %}

Na caixa de diálogo **New Firewall Rule** (nova regra de _firewall_), na aba **General** (geral), no campo **Chain** selecione **input** (entrada) e em **Src. Address** (endereço de origem), informe o endereço IP do seu computador (no meu caso, `10.0.0.254`):

{% include image.html src="/files/2020/07/mikrotik-safe-mode-06.jpg" %}

Mude para a aba **Action** (ação). No campo **Action**, selecione **reject** (rejeitar) e clique em **OK**:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-07.jpg" %}

A regra é adicionada ao final da lista. Mova-a para o início da lista:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-08.png" %}

Feito isso, o _firewall_ do MikroTik começa a bloquear a comunicação com seu computador, fazendo com que o roteador fique inacessível.

Pelo comando **ping**, é possível ver a perda de acesso:

```
64 bytes from 10.0.0.1: icmp_seq=250 ttl=64 time=19.1 ms
64 bytes from 10.0.0.1: icmp_seq=251 ttl=64 time=6.87 ms
From 10.0.0.1 icmp_seq=252 Destination Net Unreachable
From 10.0.0.1 icmp_seq=253 Destination Net Unreachable
From 10.0.0.1 icmp_seq=254 Destination Net Unreachable
From 10.0.0.1 icmp_seq=255 Destination Net Unreachable
```

O WinBox também fechará sua janela e voltará para a tela de _login_:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-09.png" %}

Mas nesse caso, como o modo de segurança estava ativado, basta você esperar alguns segundos enquanto o MikroTik se reinicia e logo poderá acessá-lo novamente. Observando o comando **ping** é possível saber quando o MikroTik voltou:

```
From 10.0.0.1 icmp_seq=280 Destination Net Unreachable
From 10.0.0.1 icmp_seq=281 Destination Net Unreachable
64 bytes from 10.0.0.1: icmp_seq=282 ttl=64 time=9.52 ms
64 bytes from 10.0.0.1: icmp_seq=283 ttl=64 time=16.2 ms
```

Tome cuidado para não fechar a janela do WinBox com o modo de segurança ativado. Nesse caso, o MikroTik perguntará se deseja sair **aplicando** as alterações:

{% include image.html src="/files/2020/07/mikrotik-safe-mode-10.jpg" %}

[mikrotik]: {% post_url 2020-07-20-primeiros-passos-com-o-mikrotik-hap-ac-roteador-profissional-para-a-rede-de-casa %}
[dhcp]:     https://pt.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol
[ping]:     https://man7.org/linux/man-pages/man8/ping.8.html
