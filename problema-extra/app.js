// Identificando o tipo de fórmula
function separarFormula() {

    if (!formula) return;

    if (/\(.*\)/.test(formula)) {
        console.log("if com ( )");
        elemento = /\(.*\)\d+?/.exec(formula).toString();                                       // Definindo o elemento
        multi = (/\)\d+/.test(formula)) ? /\)\d+/.exec(formula).toString().substring(1) : "1";  // Multiplicador

        formula = formula.replace(elemento, "");                                                // Removendo o elemento da fórmula
        elemento = elemento.substring(1, elemento.indexOf(/\)/.exec(elemento).toString()));     // Retirando caracteres especiais do elemento
        multi = Number(multi);                                                                  // Tratando o dado para ser alocado como number

        tratarFormula(elemento, multi);
    }

    if (/\[.*\]/.test(formula)) {                               // Método não testado
        console.log("if com [ ]");
        formula = /\[.*\]/.exec(formula).toString();
        multi = (/\]\d+/.test(formula)) ? /\]\d+/.exec(formula).toString().substring(1) : "1";

        elemento = formula.replace(formula, "");
        formula = formula.substring(1, formula.length - 1);
        multi = Number(multi);

        tratarFormula(formula, multi);
    }

    if (/\{.*\}/.test(formula)) {
        console.log("if com { }");
        formula = /\{.*\}/.exec(formula).toString();
        multi = (/\}\d+/.test(formula)) ? /\}\d+/.exec(formula).toString().substring(1) : "1";

        elemento = formula.replace(formula, "");
        formula = formula.substring(1, formula.length - 1);
        multi = Number(multi);

        console.log("formula: " + formula + typeof formula);
        console.log("multiplicador: " + multi + typeof multi);
        tratarFormula(formula, multi);
    }

    if (/^[\w]+/.test(formula)) {
        console.log("if sem c. especial");
        elemento = /.*/.exec(formula).toString();

        formula = formula.replace(elemento, "");
        tratarFormula(elemento, "1");
    }


    //TODO: implementar/alterar tratamentos para fórmulas como Mg(OH)2


    separarFormula(elemento);
}

// Organização e contagem dos valores
function tratarFormula(par, multiplicador) {
    var str = par;
    var num = multiplicador;

    do {
        if (/[\w]+\d/.test(str)) {
            console.log("if 2");

            // Verificar como irá ficar quando ocorrer mais de 2 números em caps

            if (/^[A-Z][A-Z]/.test(str)) {  // if não testado
                console.log("if 2.1");
                x[count++] = [/^[A-Z]/.exec(str), 1];
                x[count++] = [/\D\d/.exec(str), /\d+/.exec(str) * num];
                str = str.slice(2);                                         // Corrigir o slice
            }
            if (/^[A-Z][a-z]/.test(str)) {  // if não testado
                console.log("if 2.2");
                x[count++] = [/^\D+/.exec(str), /\d+/.exec(str) * num];
                str = str.slice(1);                                         // Corrigir o slice
            }
            if (/^[A-Z]/.test(str)) {
                console.log("if 2.3");
                x[count++] = [/^[A-Z]/.exec(str), /\d+/.exec(str) * num];
                str = str.slice(/\D+\d+/.exec(str).toString().length);
            } else throw "Erro no bloco tratarFormula()";
        }
        console.log("<< while >>");
    } while (str);
}

//function gerarSaida(par) { }

// Arquivo de entrada
const fs = require('fs');
//const arquivo = "./teste2";     // Altere o './testen' para n = '1' até '8'

// Manipulação e separação do arquivo de entrada para gerar a saída
var count = 0;
var x = [];
var formula = "Mg(OH)2";
var elemento = "";
var multi = 1;

try {
    //formula = fs.readFileSync(arquivo + ".txt", "UTF-8");
    console.log("Entrada: " + formula);
    separarFormula();

    console.log("-----");
    for (var i = 0; i < count; i++) { console.log(x[i].toString()); }
    //gerarSaida(str);
} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
