// Nós vamos manipular o HTML com o JavaScript

let listaDeNumerosSorteados = []; // para criar uma lista é necessário que coloque o colchetes. A intenção dessa lista é colocar os números que foram sorteados para que não sejam sorteados novamente.
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1;

//Essa função abaixo é referente ao H1 que é o titulo inicial do Jogo
function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag) // a palavra reservada document pega o documento do html e seleciona a parte que queremos usando .querySelector
    campo.innerHTML = texto;// campo é uma referencia a algum campo do HTML e innerHTML permite a gente alterar o conteudo dessse campo/elemento
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // foi inserido aqui o responsiveVoice que vai falar o texto da tela na nossa linguagem numa voz feminina na velocidade (rate) 1.2
}


function exibirMensagemIncial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto')
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100')
}

exibirMensagemIncial();

//Essa função abaixo é para verificar o chute do número que a pessoa vai colocar
function verificarChute() { // função é um trecho do código que executa ou que faz alguma funcionalidade. A função Verificar chute tb foi inserida no HTML na linha 27 que indica que ao clique do botão, precisa rodar a função Verificar Chute
    let chute = document.querySelector ('input').value; //ele vai no botão input que está no index que significa na pagina a parte onde o usurio vai inserir o número que ele quer. O .value indica que ele quer só o valor dela
    if(chute == numeroSecreto) { // o operador == é para uso de comparação e não atribuição
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas >1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; // o simbolo ${tentativas} siginifica que ele está mencionando a variavel tetntivas que está lá em cima no código e depois ele faz novamente uma referencia a palavra tentativa para ver se vai usar no plural ou singular. Toda vez que fazemos uma referencia uma variavel temos que colocar a crase e não a aspas
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled'); // está selecionando no documento pelo ID o reiniciar e esta removendo o atributo de que ele está desabilitado.
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute')
            } else {
                exibirTextoNaTela ('p', 'O número secreto é maior')
            } 
            tentativas ++; // ++ é o simbolo de incremento.
            limparCampo(); // que é para limprar o campo do chute quando colocamos o chute
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1)// Math.random é para gerar numero aleatorio e o parse.int é para transformar esse numero em um numero inteiro. Aqui insiro que o numero escolhido vai de 1 a 4 e quando acabar essas possibilidades, preciso criar uma forma de limpar a lista, onde coloca abaixo:
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;//length é para tamanho da lista
    if (quantidadeDeElementosNaLista == numeroLimite) { // se a qtd de emelementos na lista for igual ao numero Limite, se isso ocorrer, preciso limpar a  lista
        listaDeNumerosSorteados = [] // e aqui eu coloco a lista vazia (para limpar a lista)
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) { // aqui verifico se o numero escolhido esta na lista de numeros sorteados.
        return gerarNumeroAleatorio(); // retorna para que ele escolha um novo numero caso ele ja esteja na lista de numeros sorteados
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // o push coloca o numero sorteado na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// a função abaixo é para ficar limpando o campo quando o usuário insere o chute
function limparCampo() {
    chute = document.querySelector('input'); //variavel de chute vai buscar no documento o input que é o dado que o usuário inserir.
    chute.value = ''; // valor do chute ser uma string vazia
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio (); //precisa que o numero secreto seja sorteado
    limparCampo (); //em seguida que o campo fique vazio
    tentativas = 1; // inciar as tentativas como 1
    exibirMensagemIncial (); //Chamar a função da mensagem inicial
    document.getElementById ('reiniciar').setAttribute('disabled', true)
}



//BONUS
//Na linha 7 no index, foi inserido um código em javaScript capaz de narrar (responsiveVoice) e toda vez que exibir texto na tela, ele vai carregar a escrita e falar. Para isso, vamos mexer na Função ExbibirTextoNaTela