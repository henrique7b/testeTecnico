function rotacionarPalavra(valorRotacionar) {
    let str = "";
    let strAux = valorRotacionar;
    let codificacao = "";

    // Rotacionando os valores e os adicionando ao array
    for (let i = 0; i < valorRotacionar.length; i++) {
        str = strAux;
        valoresRotacionados[i] = str.charAt(str.length - 1) + str.substr(0, str.length - 1);
        strAux = valoresRotacionados[i];
    }

    // Organizando os valores do array
    valoresRotacionados.sort();

    // Criando o valor que será atribuído a saída do arquivo (codificacao será a palavra codificada)
    // "txtAux[i].charAt(palavra.length - 1)" está 'simulando' a última coluna de cada linha
    for (let i = 0; i < valorRotacionar.length; i++) {
        codificacao += valoresRotacionados[i].charAt(valorRotacionar.length - 1);
    }

    gerarSaida(codificacao, valorRotacionar);
}

function gerarSaida(valorCodificado, valorInicial) {
    // Comparando o valor de entrada (valorInicial) com o valor armazenado no array (valoresRotacionados)
    for (let i = 0; i < valorInicial.length; i++) {
        if (valorInicial == valoresRotacionados[i]) {
            console.log("Entrada: " + valoresRotacionados[i] + " | Saída: [\"" + valorCodificado + "\", " + i + "]");
            fs.writeFileSync(nomeArquivo + ".txt", "[\"" + valorCodificado + "\", " + i + "]", "UTF-8")     // valorCodificado = texto de saída, i = índice
        }
    }
}

// Início do código
const fs = require('fs');
const nomeArquivo = "./encode-1";   // Altere o './encode-n' para n = '1', '2', '3' ou '4'. './encode-1' foi utilizado apenas como testes
var valorCodificar = "";
var valoresRotacionados = [];

try {
    valorCodificar = fs.readFileSync(nomeArquivo + ".in", 'UTF-8');
    rotacionarPalavra(valorCodificar);

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}