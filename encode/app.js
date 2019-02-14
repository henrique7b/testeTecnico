// Codificando:
// 1. Criar uma matriz com a string de tamanho n x n, (n = string.length)
// 2. A linha consecultiva da matriz deve ser composta pela rotação de um elemento da linha anterior (abcd > dabc > cdab > bcda)
// 3. Ordenar as linhas da matriz alfabeticamente (abcd, bcda, cdab, dabc)
// 4. A saída deverá ser, por exemplo: matriz["abcd", 0] = dabc

function criarArray(palavra) {
    var str = "";
    var strAux = palavra;
    var data = "";

    // Rotacionando os valores
    for (var i = 0; i < palavra.length; i++) {
        str = strAux;
        txtAux[i] = str.charAt(str.length - 1) + str.substr(0, str.length - 1);
        strAux = txtAux[i];
    }
    // Organizando os valores
    txtAux.sort();

    // Criando o valor que será atribuído a saída do arquivo, exemplo: matriz[abracadabra, 2] = "rdarcaaaabb";
    for (var i = 0; i < palavra.length; i++) {
        data += txtAux[i].charAt(palavra.length - 1);
    }
    saidaArquivo(data, palavra);
}

function saidaArquivo(data, palavra) {
    var re = new RegExp(palavra, "g");

    for (var i = 0; i < palavra.length; i++) {
        m[txtAux[i], i];
        if (re.test(txtAux[i])) {
            m[txtAux[i], i] = data;
            console.log("| Linha: " + txtAux[i] + " | Coluna: " + i + " | Conteúdo: " + m[txtAux[i], i] + " |");
            fs.writeFileSync(nomeArquivo + ".out", "[\"" + m[txtAux[i], i] + "\", " + i + "]", "UTF-8")
        }
    }
}

const fs = require('fs');
const nomeArquivo = "./encode-1";   // Faça a alteração de n 'encode-n' manualmente (1 até 4), de acordo com os arquivos existentes no diretório
var txt = "";
var m = [];
var txtAux = [];

try {
    txt = fs.readFileSync(nomeArquivo + ".in", 'UTF-8');
    criarArray(txt);

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
