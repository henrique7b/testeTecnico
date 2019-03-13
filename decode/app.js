function decodificar(codigo, count) {
    let strAux = [];

    // Criando a primeira coluna
    if (!valoresDecodificados[0]) {
        for (let i = 0; i < codigo.length; i++) {
            strAux[i] = codigo.charAt(i);
        }
        strAux.sort();
        for (let i = 0; i < codigo.length; i++) {
            valoresDecodificados[i] = strAux[i].toString();
        }
    }

    for (let i = count; i > 1; i--) {
        // Criando as outras colunas
        for (let i = 0; i < codigo.length; i++) {
            strAux[i] = codigo.charAt(i);
            strAux[i] += valoresDecodificados[i].toString();
        }
        for (let i = 0; i < codigo.length; i++) {
            valoresDecodificados[i] = strAux[i].toString();
        }
        for (let i = 0; i < codigo.length; i++) {
            valoresDecodificados.sort();
        }
    }
}

// Inicio do código
const fs = require('fs');
const nomeArquivo = "./decode-8";   // Altere o './decode-n' para n = '5', '6', '7' ou '8'. './decode-8' foi utilizado apenas como testes
var valorCodificado;
var indice;
var dados;
var valoresDecodificados;

// Tratamento dos valores obtidos
try {
    dados = fs.readFileSync(nomeArquivo + ".in", "UTF-8");
    valorCodificado = dados.slice(dados.indexOf("['") + 2, dados.indexOf("',"));
    indice = Number(dados.slice(dados.indexOf(", ") + 2, dados.indexOf("]")));
    // Decodificação dos valores
    valoresDecodificados = new Array(valorCodificado.length);
    decodificar(valorCodificado, valorCodificado.length);
    // Gerando a saída
    console.log("Entrada: " + dados + " | Saída: " + valoresDecodificados[indice]);
    fs.writeFileSync(nomeArquivo + ".out", valoresDecodificados[indice], "UTF-8");

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
