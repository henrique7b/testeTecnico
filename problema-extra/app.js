// Identificando o tipo de fórmula
function separarFormula() {
    let multi = 1;
    let elemento = "";

    if (!formula) return;

    if (/\(.*\)/.test(formula)) {                                                                   // Verifica se a sequência contém ( )
        if (/\(\w+\)\d+/.test(formula)) {
            elemento = /\(\w+\)\d+/.exec(formula).toString();                                       // Verifica se o elemento tem multiplicador
            multi = (/\)\d+/.test(formula)) ? /\)\d+/.exec(formula).toString().substring(1) : "1";  // Multiplicador
        } else elemento = /\(\w+\)/.exec(formula).toString();                                       // Definindo o elemento

        formula = formula.replace(elemento, "");                                                    // Removendo o elemento da fórmula
        elemento = elemento.substring(1, elemento.indexOf(/\)/.exec(elemento).toString()));         // Retirando caracteres especiais do elemento

    } else if (/\[.*\]/.test(formula)) {                                                            // Verifica se a sequência contém [ ]
        if (/\[\w+\]\d+/.test(formula)) {
            elemento = /\[\w+\]\d+/.exec(formula).toString();
            multi = (/\]\d+/.test(formula)) ? /\]\d+/.exec(formula).toString().substring(1) : "1";
        } else elemento = /\[\w+\]/.exec(formula).toString();

        formula = formula.replace(elemento, "");
        elemento = elemento.substring(1, elemento.indexOf(/\]/.exec(elemento).toString()));

    } else if (/\{.*\}/.test(formula)) {                                                            // Verifica se a sequência contém { }
        if (/\{\w+\}\d+/.test(formula)) {
            elemento = /\{\w+\}\d+/.exec(formula).toString();
            multi = (/\}\d+/.test(formula)) ? /\}\d+/.exec(formula).toString().substring(1) : "1";
        } else elemento = /\{\w+\}/.exec(formula).toString();

        formula = formula.replace(elemento, "");
        elemento = elemento.substring(1, elemento.indexOf(/\}/.exec(elemento).toString()));

    } else if (/^[\w]+/.test(formula)) {
        elemento = /.*/.exec(formula).toString();
        formula = formula.replace(elemento, "");
    }

    tratarFormula(elemento, multi);
    separarFormula();
}

// Organização e contagem dos valores
function tratarFormula(par, multiplicador) {
    let str = par;

    do {
        if (/[\w]+/.test(str)) {

            // Captura e armazena elementos Ab
            if (/^[A-Z][a-z]/.test(str)) {
                if (/^[A-Z][a-z]\d/.test(str)) {                                                                    // Verifica se o elemento tem número
                    x[count++] = [/\D+/.exec(str).toString(), Number(/\d+/.exec(str).toString() * multiplicador)];  // Caso o o elemento tenha número, ele será multiplicado
                    str = str.slice(/\D+\d+/.exec(str).toString().length);
                } else if (/^[A-Z][a-z]/.test(str)) {                                                               // Verifica se o elemento NÃO tem número
                    x[count++] = [/^[A-Z][a-z]/.exec(str).toString(), 1 * multiplicador];                           // O multiplicador padrão será 1
                    str = str.slice(/^[A-Z][a-z]/.exec(str).toString().length);                                     // Remove o elemento processado da fórmula temporária (str)
                }
            } else
                // Captura e armazena elementos A
                if (/^[A-Z]/.test(str)) {
                    if (/^[A-Z]\d/.test(str)) {
                        x[count++] = [/\D/.exec(str).toString(), Number(/\d+/.exec(str).toString() * multiplicador)];
                        str = str.slice(/\D\d+/.exec(str).toString().length);
                    } else if (/^[A-Z]/.test(str)) {
                        x[count++] = [/\D/.exec(str).toString(), 1 * multiplicador];
                        str = str.slice(/\D/.exec(str).toString().length);
                    }
                }
        }
        somarElementos(multiplicador);
    } while (str);
}

// Verifica se existem elementos iguais e realiza a soma ou a remoção
function somarElementos(multiplicador) {
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < i; j++) {
            if (x[i][0] == x[j][0]) {
                x[i][1] /= multiplicador;
                x[j][1] = (x[j][1] + x[i][1]) * multiplicador;
                x.splice(i, 1);
                count--;
                i--;
            }
        }
    }
}

function gerarSaida() {
    let straux = "";
    for (var i = 0; i < x.length; i++) {
        straux += x[i][0] + ": " + x[i][1] + ", ";
    }
    straux = straux.substring(0, straux.length - 2);
    console.log("Saída: " + straux);
}

// Arquivo de entrada
const fs = require('fs');
const arquivo = "./teste6";     // Altere o './testen' para n = '1' até '8'

// Manipulação e separação do arquivo de entrada para gerar a saída
var count = 0;
var x = [];
var formula = "";

//necessário adicionar o multiplicador externo - 4,6,7,8
//as saídas não estão sendo geradas na mesma ordem que estão os exemplos no PDF

try {
    formula = fs.readFileSync(arquivo + ".txt", "UTF-8");
    console.log("Entrada: " + formula);

    separarFormula();
    gerarSaida();

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
