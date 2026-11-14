export type BlocoGuia = {
  tipo: "subtitulo" | "paragrafo";
  texto: string;
};

export type Guia = {
  slug: string;
  titulo: string;
  resumo: string;
  corpo: BlocoGuia[];
};

export const guias: Guia[] = [
  {
    slug: "o-que-e-contextualizacao-no-ensino",
    titulo: "O que é contextualização no ensino e por que ela importa",
    resumo:
      "Entenda o que significa contextualizar um conteúdo, por que o contexto ajuda a aprender e quais cuidados evitam que a contextualização vire apenas decoração.",
    corpo: [
      {
        tipo: "paragrafo",
        texto:
          "Contextualizar o ensino é colocar um conceito dentro de uma situação concreta, com personagens, objetos, medidas e acontecimentos que façam sentido para quem está estudando. Em vez de apresentar uma operação matemática solta ou uma lei física sem referência, o professor ou o material didático cria um cenário em que aquele conhecimento precisa ser usado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A ideia não é nova, mas continua importante. Quando um conteúdo aparece apenas como definição, o estudante pode decorar o procedimento sem entender quando aplicá-lo. Quando aparece dentro de uma situação, ele precisa identificar o problema, escolher uma estratégia e interpretar o resultado. Esse movimento é mais próximo do que a vida acadêmica e profissional exige.",
      },
      {
        tipo: "subtitulo",
        texto: "Contextualizar não é facilitar",
      },
      {
        tipo: "paragrafo",
        texto:
          "Existe uma diferença entre tornar um conteúdo acessível e torná-lo fácil demais. Contextualizar bem não significa reduzir a dificuldade nem entregar a resposta. Significa mudar a história ao redor do problema, mantendo o raciocínio necessário. Uma questão sobre proporções continua sendo uma questão sobre proporções, mesmo que as personagens, os objetos e o cenário sejam outros.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Essa distinção é central no Adaptapus. A plataforma orienta a inteligência artificial a preservar dados, alternativas e resposta correta. O contexto muda; o exercício deve permanecer. Se a adaptação altera um número ou simplifica a operação, ela deixa de ser uma variação da questão original e passa a ser outra questão.",
      },
      {
        tipo: "subtitulo",
        texto: "Por que o contexto ajuda a aprender",
      },
      {
        tipo: "paragrafo",
        texto:
          "Um bom contexto oferece pistas para interpretar o problema. Ele indica quais grandezas estão envolvidas, quais unidades fazem sentido e qual pergunta precisa ser respondida. Quando o estudante reconhece a situação, ele consegue imaginar o que está acontecendo e testar se o resultado é plausível. Esse teste de plausibilidade é uma habilidade importante e costuma ficar de fora quando o exercício é apenas simbólico.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Além disso, o contexto pode aumentar o interesse. Estudar um problema ambientado em um jogo, em um esporte ou em uma situação do cotidiano não garante motivação, mas pode tornar a tarefa menos abstrata. O efeito depende de o tema ser realmente relevante para o estudante e de a situação ser coerente, e não apenas um nome trocado no enunciado.",
      },
      {
        tipo: "subtitulo",
        texto: "O risco do contexto artificial",
      },
      {
        tipo: "paragrafo",
        texto:
          "Contextualização ruim aparece quando o tema é colado no enunciado sem participar da situação. Trocar o nome de uma personagem por uma referência a futebol, por exemplo, não cria um contexto de futebol: cria uma questão antiga com uma palavra nova. O estudante percebe isso com facilidade, e o exercício continua tão abstrato quanto antes.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também é preciso cuidado com contextos que introduzem informações enganosas. Se uma questão fala de litros, o novo cenário precisa ter algo que realmente possa ser medido em litros. Se fala de velocidade, precisa fazer sentido falar de distância e tempo. Unidades, grandezas e proporções não são detalhes decorativos: fazem parte do problema.",
      },
      {
        tipo: "subtitulo",
        texto: "Contextualização e personalização",
      },
      {
        tipo: "paragrafo",
        texto:
          "A personalização acrescenta uma camada: além de usar uma situação concreta, o material parte de temas que o estudante já aprecia. Isso pode tornar a leitura mais envolvente, mas exige ainda mais cuidado. Um tema pessoal não autoriza inventar dados, mudar a resposta ou forçar situações implausíveis. O interesse do aluno é o ponto de partida do contexto, não uma licença para alterar o exercício.",
      },
      {
        tipo: "paragrafo",
        texto:
          "No estudo individual, o estudante pode escolher o tema e comparar a versão adaptada com a original. Nesse momento, vale perguntar: a situação faz sentido? Os dados continuam os mesmos? A pergunta final é equivalente? A resposta indicada corresponde ao cálculo? Essas perguntas transformam a adaptação em uma atividade de leitura crítica, e não apenas em consumo de conteúdo.",
      },
      {
        tipo: "subtitulo",
        texto: "Como aplicar na prática",
      },
      {
        tipo: "paragrafo",
        texto:
          "Para usar a contextualização a favor do estudo, comece pelo conceito que precisa ser aprendido. Depois, procure uma situação em que esse conceito apareça naturalmente. Verifique se os dados necessários estão presentes e se a pergunta continua clara. Por fim, resolva a questão e confira se o resultado faz sentido dentro do cenário criado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Se você estuda com apoio de inteligência artificial, peça variações de contexto, mas não peça apenas a resposta. Compare as versões, identifique o que mudou e explique em voz alta o raciocínio. A contextualização se torna útil quando ajuda a pensar melhor sobre o conteúdo, e não quando esconde o esforço de compreendê-lo.",
      },
      {
        tipo: "subtitulo",
        texto: "Conclusão",
      },
      {
        tipo: "paragrafo",
        texto:
          "Contextualizar é dar um cenário significativo a um conhecimento que, de outro modo, pareceria abstrato. A prática funciona quando o contexto é coerente, os dados são preservados e o exercício continua exigindo o mesmo raciocínio. Também exige revisão: nenhum contexto, por mais interessante que seja, substitui a conferência do problema e da resposta.",
      },
    ],
  },
  {
    slug: "como-usar-seus-interesses-para-estudar-matematica",
    titulo: "Como usar seus interesses para estudar Matemática",
    resumo:
      "Um roteiro prático para transformar temas que você gosta em contextos de problemas matemáticos sem perder o raciocínio nem a precisão dos dados.",
    corpo: [
      {
        tipo: "paragrafo",
        texto:
          "Matemática costuma parecer distante quando aparece apenas como sequência de símbolos e regras. Uma forma de aproximar a matéria é usar interesses pessoais como ponto de partida para criar problemas. A estratégia não elimina a necessidade de calcular, mas dá um motivo para interpretar os dados e conferir se a resposta faz sentido.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O caminho mais produtivo não é procurar um problema pronto sobre o seu tema favorito. É aprender a construir o problema você mesmo, partindo de uma operação que precisa ser treinada. Assim, o interesse ajuda a criar o cenário, enquanto a matemática continua sendo o centro da atividade.",
      },
      {
        tipo: "subtitulo",
        texto: "Escolha interesses que rendem bons problemas",
      },
      {
        tipo: "paragrafo",
        texto:
          "Nem todo tema gera bons problemas matemáticos. Esportes, jogos, música, culinária, viagens, compras, construção e tecnologia costumam oferecer situações com quantidades, medidas, tempos, preços e proporções. Já um tema muito abstrato pode exigir uma adaptação forçada. Não há problema em escolher outro interesse: o objetivo é encontrar um contexto em que os números apareçam de forma natural.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Uma dica é listar o que existe dentro do tema. Em um jogo, há pontuação, moedas, tempo, níveis e probabilidades. Em uma cozinha, há massas, volumes, temperaturas e proporções de receita. Em uma viagem, há distância, velocidade, combustível e horários. Essa lista ajuda a identificar quais grandezas podem entrar no problema sem parecerem inventadas.",
      },
      {
        tipo: "subtitulo",
        texto: "Transforme o interesse em variáveis",
      },
      {
        tipo: "paragrafo",
        texto:
          "Depois de escolher o tema, defina o que cada número representa. Se o problema original fala de preço unitário, quantidade e desconto, o novo contexto precisa manter essas três funções. No cenário de jogos, o preço pode virar custo em moedas, a quantidade pode virar número de itens e o desconto pode virar um cupom. O cálculo continua o mesmo.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Esse cuidado evita um erro comum: trocar apenas as palavras e deixar os números sem significado. Se o enunciado diz que uma pessoa comprou três itens, o leitor precisa saber que se trata de três unidades do mesmo item. Se diz que havia 500 mL, o contexto precisa ter um líquido ou uma substância que possa ocupar esse volume. A coerência entre número, unidade e situação é parte do problema.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuidado com o contexto decorativo",
      },
      {
        tipo: "paragrafo",
        texto:
          "Um contexto decorativo é aquele que aparece no início, mas não interfere em nada. Por exemplo: “No campeonato de videogame, João tinha 12 balas e deu 4 para seus amigos”. O campeonato não tem relação com balas, e o problema poderia existir sem ele. Nesse caso, o tema não ajudou a compreender a situação; apenas ocupou espaço.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Para evitar isso, faça a seguinte pergunta: se eu remover o tema, o problema perde alguma coisa? Se a resposta for não, o contexto provavelmente está fraco. Um bom cenário faz com que os objetos, as ações e as medidas pertençam uns aos outros. O estudante consegue imaginar a cena e usar essa imagem para entender o que deve ser calculado.",
      },
      {
        tipo: "subtitulo",
        texto: "Use perguntas para construir o cenário",
      },
      {
        tipo: "paragrafo",
        texto:
          "Uma forma simples de criar contextos é responder a perguntas: quem está na situação? O que está sendo medido? Por que essa medida importa? Qual decisão depende do cálculo? Essas respostas dão corpo ao enunciado e ajudam a manter a naturalidade. Elas também revelam quando falta informação para resolver o problema.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Se você usa uma ferramenta de adaptação, pode pedir que a questão seja reescrita dentro do tema e depois revisar o resultado com essas mesmas perguntas. A ferramenta pode sugerir um cenário, mas a conferência dos dados e da lógica continua sendo sua. Aceitar a primeira versão sem ler é o caminho mais rápido para estudar um problema diferente do original.",
      },
      {
        tipo: "subtitulo",
        texto: "Combine interesse com dificuldade",
      },
      {
        tipo: "paragrafo",
        texto:
          "O tema deve ser interessante, mas o nível de dificuldade precisa continuar adequado. Uma questão de porcentagem não se torna mais fácil porque fala de música; ela apenas fica mais agradável de ler. Se o objetivo é treinar um conteúdo específico, escolha problemas que realmente usem esse conteúdo e não apenas operações já dominadas.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também vale variar. Um mesmo conceito pode ser estudado em contextos diferentes, o que ajuda a perceber o que é essencial e o que é detalhe da história. Se você entende proporção em uma receita, em uma escala de mapa e em uma tabela de preços, sua compreensão fica mais flexível do que se tivesse resolvido dez problemas com o mesmo cenário.",
      },
      {
        tipo: "subtitulo",
        texto: "Uma rotina prática",
      },
      {
        tipo: "paragrafo",
        texto:
          "Escolha um conteúdo para revisar, separe uma questão original e escreva o tema de interesse. Adapte o contexto mantendo os dados e as alternativas. Resolva sem olhar a resposta, confira o cálculo e compare com a versão original. Por fim, anote em uma frase qual foi o raciocínio usado. Esse registro ajuda a reconhecer padrões e a perceber quando a adaptação alterou o exercício.",
      },
      {
        tipo: "subtitulo",
        texto: "Conclusão",
      },
      {
        tipo: "paragrafo",
        texto:
          "Usar interesses para estudar Matemática funciona quando o tema entra na estrutura do problema, e não apenas no título. Mantenha os dados, confira as unidades, preserve o raciocínio e revise a resposta. O interesse deve tornar o estudo mais próximo da sua realidade, mas a Matemática continua sendo o objetivo principal.",
      },
    ],
  },
  {
    slug: "estudando-fisica-e-quimica-com-exemplos-do-dia-a-dia",
    titulo: "Estudando Física e Química com exemplos do dia a dia",
    resumo:
      "Como usar situações cotidianas para compreender conceitos de Física e Química, com cuidados para que a analogia não distorça o conteúdo.",
    corpo: [
      {
        tipo: "paragrafo",
        texto:
          "Física e Química estudam fenômenos que acontecem o tempo todo, mas a linguagem da sala de aula pode esconder essa proximidade. Quando um conceito é apresentado apenas com fórmulas ou nomes técnicos, o estudante pode decorar o procedimento sem perceber onde ele aparece na prática. Exemplos do dia a dia ajudam a criar essa ponte.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A ponte, porém, precisa ser construída com cuidado. Uma situação cotidiana pode ilustrar um conceito e, ao mesmo tempo, simplificar demais as condições envolvidas. O objetivo de usar exemplos não é substituir o modelo científico, mas oferecer uma entrada concreta para ele. Depois do exemplo, é necessário voltar às grandezas, às unidades e às condições que o problema exige.",
      },
      {
        tipo: "subtitulo",
        texto: "Por que o cotidiano ajuda",
      },
      {
        tipo: "paragrafo",
        texto:
          "Uma situação conhecida permite imaginar o que está acontecendo. Ao falar de um carro em movimento, de uma panela no fogo ou de uma solução preparada na cozinha, o estudante consegue relacionar o enunciado a uma experiência. Isso facilita a identificação das grandezas envolvidas e ajuda a avaliar se o resultado é plausível.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Além disso, exemplos próximos tornam mais fácil formular perguntas. Por que a panela esquenta? O que muda quando a chama aumenta? Por que o sal se dissolve mais rápido em água quente? Perguntas desse tipo podem ser transformadas em exercícios com dados e unidades, desde que o fenômeno seja descrito com precisão.",
      },
      {
        tipo: "subtitulo",
        texto: "Física: do movimento à energia",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em Física, o cotidiano oferece muitos pontos de partida. Velocidade média aparece em viagens; aceleração, em veículos que param ou arrancam; energia, em aparelhos elétricos e no movimento de objetos; força, em situações de empurrar, puxar e sustentar. O cuidado está em não confundir o exemplo com o conceito: um carro em uma estrada não é a definição de velocidade média, mas pode ajudar a entender a relação entre distância e tempo.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Quando o exercício pede um cálculo, os dados precisam ser compatíveis. Se a distância está em quilômetros e o tempo em horas, a velocidade resultante estará em quilômetros por hora. Se o tempo estiver em minutos, é preciso converter. A familiaridade do contexto não elimina a necessidade de verificar unidades e arredondamentos. Pelo contrário: é justamente no cenário concreto que um erro de unidade fica mais evidente.",
      },
      {
        tipo: "subtitulo",
        texto: "Química: misturas, concentração e reações",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em Química, a cozinha é um laboratório acessível. Preparar uma solução, dissolver sal, misturar ingredientes e observar mudanças de cor ou temperatura são situações que podem ilustrar conceitos de mistura, concentração, solubilidade e transformação. O exemplo ajuda a lembrar que a Química estuda a composição e as transformações da matéria, não apenas nomes e equações.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também aqui a precisão importa. Concentração em gramas por litro exige que a massa esteja em gramas e o volume em litros. Se o enunciado informa 500 mL, é necessário converter para 0,5 L antes de dividir. Um contexto de receita pode tornar o problema mais interessante, mas não autoriza misturar unidades ou ignorar a proporção entre soluto e solvente.",
      },
      {
        tipo: "subtitulo",
        texto: "Como escolher um bom exemplo",
      },
      {
        tipo: "paragrafo",
        texto:
          "Um bom exemplo do dia a dia precisa ter relação real com o conceito, conter as grandezas necessárias e permitir uma pergunta clara. Se a situação for apenas cenário e não oferecer dados para o cálculo, ela pode servir como introdução, mas não como exercício. Se os dados forem inventados sem coerência, o exemplo pode confundir mais do que explicar.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Vale testar a plausibilidade: a temperatura faz sentido? O volume é possível? A velocidade é razoável para o contexto? O resultado encontrado pode acontecer na prática? Essas perguntas aproximam o estudante do pensamento científico, que não se limita a aplicar uma fórmula, mas avalia se a resposta descreve bem a situação.",
      },
      {
        tipo: "subtitulo",
        texto: "O limite da analogia",
      },
      {
        tipo: "paragrafo",
        texto:
          "Toda analogia tem limites. Um exemplo cotidiano pode mostrar uma semelhança, mas não substitui as condições específicas de um modelo científico. Ao estudar um fenômeno, é importante saber o que foi simplificado: atrito desprezado, temperatura constante, mistura ideal, recipiente isolado. Ignorar essas condições pode levar a conclusões erradas, mesmo que o exemplo pareça familiar.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Por isso, depois de entender o exemplo, volte ao enunciado formal e identifique as grandezas, as unidades e as hipóteses. Se estiver usando uma questão adaptada por inteligência artificial, verifique se o novo contexto preservou essas condições. Uma história envolvente não compensa um dado alterado.",
      },
      {
        tipo: "subtitulo",
        texto: "Conclusão",
      },
      {
        tipo: "paragrafo",
        texto:
          "Exemplos do dia a dia são uma boa porta de entrada para Física e Química porque conectam o conceito a algo que pode ser imaginado. Aproveite essa proximidade, mas mantenha o rigor: confira unidades, dados, condições e plausibilidade. O exemplo ajuda a compreender; a análise cuidadosa é o que transforma compreensão em conhecimento consistente.",
      },
    ],
  },
  {
    slug: "como-usar-inteligencia-artificial-nos-estudos-sem-perder-o-raciocinio",
    titulo: "Como usar inteligência artificial nos estudos sem perder o raciocínio",
    resumo:
      "A IA pode ajudar a criar contextos e variações de exercícios, mas precisa ser usada de um jeito que preserve o esforço de pensar, calcular e verificar.",
    corpo: [
      {
        tipo: "paragrafo",
        texto:
          "Ferramentas de inteligência artificial se tornaram parte da rotina de estudo de muitas pessoas. Elas podem explicar um conceito, criar exemplos, propor questões e revisar textos. O risco aparece quando a ferramenta é usada para entregar a resposta pronta, sem que o estudante tente resolver o problema. Nesse caso, a tarefa termina mais rápido, mas o aprendizado pode não acontecer.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A questão central não é proibir a IA, mas definir como usá-la. Uma boa prática é tratar a ferramenta como alguém que ajuda a montar exercícios e a fazer perguntas, e não como alguém que pensa no seu lugar. O estudante continua responsável por interpretar o enunciado, escolher a estratégia, executar o cálculo e avaliar o resultado.",
      },
      {
        tipo: "subtitulo",
        texto: "Peça contexto, não só resposta",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em vez de pedir a solução de uma questão, peça uma variação de contexto. Diga qual conceito quer treinar e qual tema gostaria de usar. Depois, resolva a versão criada sem consultar a resposta. Só então peça uma conferência. Esse pequeno atraso na obtenção do gabarito preserva o momento mais importante do estudo: a tentativa de resolver.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também é possível pedir que a ferramenta explique um raciocínio passo a passo, mas com uma condição: primeiro escreva sua própria solução. Comparar o seu caminho com o caminho sugerido revela onde está a dúvida. Se você apenas lê a explicação, pode ter a sensação de entendimento sem conseguir reproduzir o processo sozinho.",
      },
      {
        tipo: "subtitulo",
        texto: "Use a IA como geradora de variações",
      },
      {
        tipo: "paragrafo",
        texto:
          "Uma das aplicações mais úteis é criar várias versões de um mesmo exercício. Se você entendeu um problema de porcentagem, pode pedir versões com contextos diferentes e conferir se o raciocínio se mantém. A variação ajuda a separar o que é essencial do que é detalhe da história. Também mostra se você reconhece o mesmo conceito em situações novas.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Ao pedir variações, seja específico. Informe os dados que devem ser preservados, o tipo de pergunta e a quantidade de alternativas. Se a ferramenta mudar os números, o exercício deixa de ser o mesmo. Se inventar informações que alteram a interpretação, a variação não serve. A especificidade do pedido reduz, mas não elimina, a necessidade de revisão.",
      },
      {
        tipo: "subtitulo",
        texto: "Confira contas e dados",
      },
      {
        tipo: "paragrafo",
        texto:
          "Modelos de linguagem podem produzir respostas com aparência confiante e conteúdo errado. Por isso, toda adaptação precisa ser conferida. Refaça os cálculos, verifique as unidades e compare a versão adaptada com a original. Se a questão fala de 150 km em 2 horas, a velocidade média é 75 km/h; se o texto adaptado mudar um desses valores sem justificativa, a resposta também muda.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A conferência não deve se limitar ao resultado final. Verifique se o enunciado continua claro, se a pergunta pede a mesma coisa e se as alternativas incorretas continuam incorretas. Em questões de múltipla escolha, uma alternativa aparentemente correta pode surgir por causa de um dado alterado. A revisão precisa olhar para o conjunto, não apenas para o gabarito.",
      },
      {
        tipo: "subtitulo",
        texto: "Explique com suas palavras",
      },
      {
        tipo: "paragrafo",
        texto:
          "Depois de usar a ferramenta, feche a tela e explique o conceito com suas próprias palavras. Se não conseguir, volte ao material e tente novamente. Esse teste simples mostra se houve compreensão ou apenas reconhecimento. Você pode escrever a explicação em um caderno, gravar um áudio ou ensinar para alguém. O formato importa menos do que a tentativa de reconstruir o raciocínio sem apoio.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também vale resolver uma questão parecida sem consultar nada. A IA pode ter ajudado a entender o caminho, mas a autonomia aparece quando você consegue repetir o processo em outra situação. Use a ferramenta para gerar novas tentativas, não para substituir todas elas.",
      },
      {
        tipo: "subtitulo",
        texto: "Registre os erros",
      },
      {
        tipo: "paragrafo",
        texto:
          "Anote os erros e o motivo de cada um. Foi leitura incorreta? Unidade trocada? Fórmula confundida? Cálculo mental? Ao identificar o padrão, o estudo fica mais direcionado. A IA pode ajudar a criar exercícios para o ponto fraco, mas é você quem decide o que precisa treinar. O registro também evita repetir o mesmo engano sem perceber.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuidado com a confiança excessiva",
      },
      {
        tipo: "paragrafo",
        texto:
          "A linguagem fluente de uma resposta não é prova de que ela está correta. Por isso, desconfie de afirmações muito gerais, de dados sem fonte e de soluções que pulam etapas. Em vez de aceitar a primeira versão, peça que a ferramenta mostre o raciocínio e aponte as suposições. Se algo não fizer sentido, investigue antes de memorizar.",
      },
      {
        tipo: "paragrafo",
        texto:
          "No Adaptapus, essa cautela está explícita: a adaptação é feita por IA e a correção compara a resposta do estudante com a alternativa que a própria IA indicou como correta. O estudante deve revisar o enunciado, os dados e a resolução. A plataforma é apoio ao estudo, não uma autoridade que substitui professor ou material didático.",
      },
      {
        tipo: "subtitulo",
        texto: "Conclusão",
      },
      {
        tipo: "paragrafo",
        texto:
          "A inteligência artificial pode ser uma boa companheira de estudo quando ajuda a variar contextos, formular perguntas e revisar o que você já tentou resolver. O aprendizado acontece no esforço de interpretar, calcular e conferir. Use a ferramenta para ampliar as possibilidades, mas preserve o seu papel de quem pensa, decide e verifica.",
      },
    ],
  },
  {
    slug: "checklist-como-revisar-uma-questao-adaptada",
    titulo: "Checklist: como revisar uma questão adaptada",
    resumo:
      "Um roteiro objetivo para conferir enunciado, dados, alternativas, resposta e resolução de uma questão adaptada por inteligência artificial.",
    corpo: [
      {
        tipo: "paragrafo",
        texto:
          "Uma questão adaptada pode parecer perfeita na primeira leitura e, ainda assim, conter um dado trocado, uma unidade incompatível ou uma alternativa que deixou de fazer sentido. Como a adaptação é feita por inteligência artificial, a revisão não é uma etapa opcional: é parte do uso responsável da ferramenta.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Este checklist foi organizado em três momentos: antes de resolver, durante a leitura e depois da resposta. A ideia é evitar que a conferência se limite ao gabarito. O que importa é verificar se o exercício continua sendo o mesmo e se a nova situação é coerente.",
      },
      {
        tipo: "subtitulo",
        texto: "Antes de resolver",
      },
      {
        tipo: "paragrafo",
        texto:
          "Comece comparando o enunciado original com a versão adaptada. O tema aparece de forma natural ou apenas no título? Os personagens, objetos e ações pertencem ao cenário escolhido? Se o tema puder ser removido sem prejuízo, provavelmente ele está decorativo.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em seguida, confira os dados. Todos os números do enunciado original continuam presentes? As unidades são as mesmas ou foram convertidas corretamente? Nenhuma informação nova foi acrescentada de modo a mudar a interpretação? Uma adaptação não pode facilitar a questão por omissão nem dificultá-la por excesso de informação.",
      },
      {
        tipo: "subtitulo",
        texto: "Durante a leitura",
      },
      {
        tipo: "paragrafo",
        texto:
          "Leia a pergunta final com atenção. Ela pede exatamente o mesmo que a original? Às vezes, o contexto muda tanto que a pergunta passa a solicitar outro tipo de resposta. Nesse caso, a adaptação alterou o exercício, mesmo que os números continuem iguais.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Verifique também as alternativas. No modo ENEM, as cinco alternativas originais devem permanecer na mesma ordem e com o mesmo conteúdo, e a resposta correta deve continuar na mesma posição. No modo livre, a quantidade pode variar, mas é preciso haver pelo menos duas alternativas, apenas uma correta e todas plausíveis.",
      },
      {
        tipo: "subtitulo",
        texto: "Depois de responder",
      },
      {
        tipo: "paragrafo",
        texto:
          "Refaça o cálculo sem olhar a solução apresentada. Compare o seu resultado com a alternativa indicada como correta. Se os dois não coincidirem, investigue: o erro pode estar no seu cálculo, na adaptação ou na indicação do gabarito. Não presuma que a ferramenta está certa só porque a resposta parece organizada.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Confira se o resultado faz sentido dentro do contexto. Uma velocidade absurda, uma concentração impossível ou um preço fora de proporção podem indicar erro de unidade ou de operação. A plausibilidade é uma pista valiosa, especialmente em questões de Física e Química.",
      },
      {
        tipo: "subtitulo",
        texto: "Checklist rápido",
      },
      {
        tipo: "paragrafo",
        texto:
          "Use esta lista curta sempre que revisar uma questão adaptada: o tema participa da situação; os dados numéricos foram preservados; as unidades fazem sentido; a pergunta final é equivalente; as alternativas continuam coerentes; há apenas uma resposta correta; o cálculo confere; o resultado é plausível; a resolução pode ser explicada com suas palavras.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Se alguma dessas respostas for negativa, não use a questão como se estivesse correta. Volte ao enunciado original, refaça a adaptação ou peça uma nova versão. Em uma sala de estudo, avise o administrador ou use o canal de denúncia para que o conteúdo seja analisado.",
      },
      {
        tipo: "subtitulo",
        texto: "O que fazer quando encontrar um erro",
      },
      {
        tipo: "paragrafo",
        texto:
          "Registre o erro de forma objetiva: qual dado foi alterado, qual alternativa ficou inconsistente, qual cálculo não confere. Isso ajuda a entender o padrão e a melhorar a próxima adaptação. Se a questão estiver em uma sala, comunique os participantes para que ninguém estude com base em um enunciado equivocado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Também vale comparar a versão adaptada com o material original e com a explicação do professor. A inteligência artificial pode ajudar a criar contextos, mas a palavra final sobre a correção deve vir de uma fonte confiável. O objetivo do Adaptapus é apoiar o estudo, e a revisão faz parte desse apoio.",
      },
      {
        tipo: "subtitulo",
        texto: "Anote o que aprendeu com a revisão",
      },
      {
        tipo: "paragrafo",
        texto:
          "Ao final da conferência, escreva uma frase sobre o que a adaptação ajudou a perceber. Pode ser uma relação entre grandezas, uma unidade que costuma ser esquecida ou um tipo de contexto que funciona melhor para você. Esse registro transforma a revisão em aprendizado e não apenas em controle de qualidade.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Com o tempo, você passa a reconhecer os próprios sinais de alerta: quando um número parece fora de lugar, quando a pergunta mudou de sentido ou quando a alternativa correta ficou óbvia demais. Essa percepção vale para questões adaptadas por inteligência artificial e também para exercícios de qualquer outra origem.",
      },
      {
        tipo: "subtitulo",
        texto: "Conclusão",
      },
      {
        tipo: "paragrafo",
        texto:
          "Revisar uma questão adaptada é um exercício de leitura crítica. Confira o contexto, os dados, as unidades, as alternativas e a resolução. Se algo não fizer sentido, não ignore. A adaptação só é útil quando preserva o exercício e permite que o estudante aprenda com segurança.",
      },
    ],
  },
];

export function buscarGuia(slug: string) {
  return guias.find((guia) => guia.slug === slug);
}
