function rotacionarPalavra(palavra) {
    var str = "";
    var strAux = palavra;
    var data = "";

    // Rotacionando os valores e os adicionando ao array
    for (var i = 0; i < palavra.length; i++) {
        str = strAux;
        txtAux[i] = str.charAt(str.length - 1) + str.substr(0, str.length - 1);
        strAux = txtAux[i];
    }

    // Organizando os valores do array
    txtAux.sort();

    // Criando o valor que será atribuído a saída do arquivo. "txtAux[i].charAt(palavra.length - 1)" está 'simulando' a última coluna de cada linha
    for (var i = 0; i < palavra.length; i++) { data += txtAux[i].charAt(palavra.length - 1); }
    codificarPalavra(palavra, data);
}

function codificarPalavra(palavra, data) {

    // Ciando uma RE para identificar o valor obtido na entrada "./encode-n" e poder salvar o valor codificado
    var re = new RegExp(palavra, "g");

    for (var i = 0; i < palavra.length; i++) {

        // Criando a codificação
        m[txtAux[i], i];
        if (re.test(txtAux[i])) {
            m[txtAux[i], i] = data;
            console.log("Entrada: " + txtAux[i] + " | Saída: [\"" + m[txtAux[i], i] + "\", " + i + "]");
            fs.writeFileSync(nomeArquivo + ".out", "[\"" + m[txtAux[i], i] + "\", " + i + "]", "UTF-8")
        }
    }
}

const fs = require('fs');
const nomeArquivo = "./encode-4";   // Altere o './encode-n' para n = '1', '2', '3' ou '4'. './encode-1' foi utilizado apenas como testes
var txt = "";
var m = [];
var txtAux = [];

try {
    txt = fs.readFileSync(nomeArquivo + ".in", 'UTF-8');
    rotacionarPalavra(txt);

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
