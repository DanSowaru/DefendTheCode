# Defend The Code

## Este projeto é um jogo rápido de luta estilo JRPG em turnos construído utilizando HTML, CSS e JavaScript vanilla, como tarefa apresentada para o curso de Desenvolvimento Web Fullstack do programa de Bolsas Santander junto à instituição Let's Code.

<!--ts-->

- [Sobre](#Sobre)
- [Como Jogar](#como-jogar)
- [Código do Jogo](#codigo-do-jogo)
- [Planos de melhorias](#planos-de-melhorias)
<!--te-->

<h4> Status: Estável, em Construção</h4>

### Features

- [x] Comportamento reativo do personagem adversário
- [x] Mecânicas de Ataque, Bloqueio e Cura implementadas
- [x] Animação de ataque rudimentar
- [x] Fim de jogo em caso de vitória ou derrota

### Pré-requisitos

Ter instalado browser Chrome, Opera ou Firefox. Edge não, não gosto do Edge. Não abra meu jogo no Edge, eu lhe proíbo.

### Tecnologias

Html, Css e JavaScript vanilla.

### Autor

Danilo M. Soares

# Sobre

Na hora de escolher o que fazer no projeto, uma ideia que ja tava na minha cabeça há tempos foi apresentada como opção - fazer um jogo.
Eu ja tinha ha um tempo atras feito o mesmo jogo, mas rodando no conole do java, sem visual, com o pouco que eu sabia de Ifs e Elses e objetos pra armazenar os atributos e métodos dos personagens.
A Escolha foi óbvia. Usar este jogo para implementar cada vez mais mais funcionalidades conforme eu as for aprendendo.

# Como Jogar

Basta abrir a HTML em seu navegador de preferência menos o Edge e apertar o botão Start! para começar. No jogo você encarnaa personagem à esquerda na tela e enfrentará o personagem à direita, que chamaremos de Player1 e Player2 respectivamente.
Primeiramente, cada personagem possui atributos que serão usados pra definir as ações do jogo. Um valor base de Vida, Ataque, Bloqueio e Curas.

Seu objetivo é derrotar o Player2 em uma luta onde cada personagem fará uma ação de cada vez, alternando entre os dois Players intercaladamente.
O jogador pode escolher um dos três botões disponíveis em sua vez para agir. Ele pode escolher Atacar, Bloquear ou Curar.

Clicar em Atacar, fará o jogador tentar realizar um ataque, com um chance de errar e não causar nada ao adversário. caso acerte, o adversário terá seus pontos de vida reduzidos em um valor aleatório gerado baseado no valor de Ataque de quem atacou, mais o valor rolado em um dado de 6 lados no background. O valor total gerado será subtraído do Bloqueio do adversário e o resultado será subtraído da Vida de quem recebe o ataque.

Clicar em Bloquear fará com que o jogador resigne de atacar naquela rodada para fortalecer sua defesa na próxima rodada, adicionado o valor de um dado rolado ao Bloqueio da próxima rodada. Esta jogada é útil caso o jogador queira esperar para recuperar seus pontos de Cura.

Clicar em Curar gastará um ponto de cura para repor um valor aleatório gerado no dado de volta á sua vida. Ambos começam com 1 ponto de cura e vão sendo recuperados aleatoriamente durante a partida.

Os dois jogadors começam com 30 de vida e quem chegar a 0 primeiro perde a partida.

# Código do Jogo

Inicialmente seria usada uma abordagem de Orientação à Objeto para criar os personagens no código, onde cada um seria seu objeto com seus atributos comentados como atributos do objeto, e as ações seria seus métodos individuais, mas para fim de praticar os conceitos de programação estruturada apresentados em aula, os atributos se tornaram variáveis soltas e as acções do jogo de tornam funções isoladas, cada um com sua responsabilidade.

Todas as funções tem um log do console informando que foram ativadas. Isso funcionou tanto para debugging durante o desenvolvimento que acabou sendo implementado como feature do jogo provendo um log dos eventos transcorridos para o jogador.

Uma variável chamada activePlayer é usada para testar sempre quem é o jogador ativo naquele turno e com isso as funções conseguem executar suas ações para o jogador correto em cada turno e fazendo as alterações nos locais corretos do DOM também.

Breve explicação das funções:

changeActivePlayer() => altera o valor de activePlayer entre 1 e 2 que influenciará o comportamento das outras funções que testam quem é o ativo e quem é o passivo. Inicia a função battleTurn() e decide aleatoriamente se algum personagem receberá um ponto extra de Cura.

battleTurn() => Expõe ou esconde os botões de ação do jogador, dependendo do valor de activePlayer. Se for o Player2 o ativo, aciona a função enemyTurn().

didAnyoneLoseYet() => Testa se algum valor de Life já está igual ou menor que zero. se sim, apresenta um modal com a devida tela de vitória ou derrota e um botão de Jogar de Novo que recarrega a página.

playerTurn() => faz nada kkk mas deixei aí pra futuras implementações

enemyTurn() => Uma mini IA reativa ao contexto dos valores atuais do Player2. Testa se é oportuno a ele usar seu ponto de cura, caso esteja com vida menor que 20. Senão, se estiver sem pontos de Cura, aleatoriamente decide Bloquear mais para esperar o refill do ponto de cura. Senão, apenas ataca.

diceRoll() => gerador de número aleatório inteiro entre 1 e 6.

playerCure() => Rola um valor entre 1 e 6 adiciona ao valor total de vida de quem usou a função, e subtrai 1 do valor de Curas disponíveis.

playerBlock() => Há duas variaveis booleanas que representam um Block de cada jogador ativados. Essa função retorna true para a variavel de quem ativou e na próxima rodada, na vez do jogador oposta, ela adiciona um valor aleatório do dado ao valor do Block do jogador quem ativou, zera o valor gerado e retorna false o status de bloqueio para que tudo volte ao estado original.

playerAttack() => Essa é a mais longa. Primeiro, ela chama a função responsável pela animação do personagem, gera um valor de dado de 1 a 6, soma ao valor base de ataque de quem ativou o ataque, subtrai o valor do block adversário, testa se esse resultado final é menor ou igual a zero, se sim, sai da função e troca o jogador ativo, se não, testa se o receptor estava com o bloquio ativo, se sim, subtrai ainda o valor do bloqueio extra. Testa novamente se ainda está acima de zero com mesmas ações do teste anterior.
Caso o valor final finalzaço ainda seja positivo, rola um dado pra ver se o jogador acertou ou não o golpe. caso positivo, subtrai da vida do adversário, caso negativo, chama a função missedAnimation() e termina a função. Ambos os casos, chama a função de trocar o jogador ativo.

missedAnimation() => expõe uma janelinha mal estilizada com o texto MISSED ATTACK na tela.

attackAnimation() => Usa o setTimeout para alternar as imagens do jogador ativo, simulando uma breve animação de 4 quadros.

- Eu sei que as funções normalmente devem ser nomeadas com verbos como boa prática, foi uma escolha intencional os nomes como estão.

# Planos de melhorias

Algumas mudanças ficaram de fora pelo curto tempo, mas que eu planejo implementar para melhorar a apresentação e funcionamento geral.

- Implementar objetos para cada personagem em vez de variáveis soltas; Este jogo vai ficar muito mais limpo se cada personagem for seu próprio objeto com atributos e métodos internos.
- Implementar diálogos entre os personagens e permitir que seja possível vencer o jogo usando os diálogos, convencendo o inimigo a se render.
- Revisar e melhorar a apresentação visual e layout geral do jogo.
- Implementar a possibilidade do jogador conseguir inserir os valores dos atributos do personagem, em vez de gerados aleatoriamente.
- Fazer o dado aparecer durante o jogo, na tela de forma explícita ao jogador.
- Implementar o log de batalha na janela, não mais no console do navegador, e com mensagens mais sensíveis ao contexto geral, não só ao evento.
- Inserir mais animações, como de bloqueio, de acerto de golpe, de cura e outros mais.

Caso queira me ajudar a me tornar um programador melhor ou humano melhor, me contate em prof.danilomotasoares@gmail.com !
