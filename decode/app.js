function decodificar(palavra, count) {

    if (count == 1) return;

    // Criando a primeira coluna
    if (!str[0]) {
        for (var i = 0; i < palavra.length; i++) { strAux[i] = palavra.charAt(i); }
        strAux.sort();
        for (var i = 0; i < palavra.length; i++) { str[i] = strAux[i].toString(); }
    }

    // Criando as outras colunas
    for (var i = 0; i < palavra.length; i++) {
        strAux[i] = palavra.charAt(i);
        strAux[i] += str[i].toString();
    }
    for (var i = 0; i < palavra.length; i++) { str[i] = strAux[i].toString(); }
    for (var i = 0; i < palavra.length; i++) { str.sort(); }

    contador--;
    decodificar(palavra, contador);
}

// Variáveis para a manipulação do arquivo
const fs = require('fs');
const nomeArquivo = "./decode-8";   // Altere o './decode-n' para n = '5', '6', '7' ou '8'. './decode-8' foi utilizado apenas como testes
var txt;
var indice;
var data;

// Preparando o arquivo para ser processado
try {
    data = fs.readFileSync(nomeArquivo + ".in", "UTF-8");
    txt = data.slice(data.indexOf("['") + 2, data.indexOf("',"));
    indice = Number(data.slice(data.indexOf(", ") + 2, data.indexOf("]")));

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}

// Variáveis para a decodificação da palavra
var str = new Array(txt.length);
var strAux = [];
var contador = txt.length;

try {
    decodificar(txt, contador);
    fs.writeFileSync(nomeArquivo + ".out", str[indice], "UTF-8");
    console.log("Entrada: " + data + " | Saída: " + str[indice]);

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}