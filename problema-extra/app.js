// Identificando o tipo de fórmula
function separarFormula() {
    let multi = 1;
    let elemento = "";

    if (!formula) return;

    if (/\(.*\)/.test(formula)) {
        console.log("if com ( )");
        elemento = /\(.*\)\d+?/.exec(formula).toString();                                       // Definindo o elemento
        multi = (/\)\d+/.test(formula)) ? /\)\d+/.exec(formula).toString().substring(1) : "1";  // Multiplicador
        formula = formula.replace(elemento, "");                                                // Removendo o elemento da fórmula
        elemento = elemento.substring(1, elemento.indexOf(/\)/.exec(elemento).toString()));     // Retirando caracteres especiais do elemento

    } else if (/\[.*\]/.test(formula)) {
        console.log("if com [ ]");
        elemento = /\[.*\]\d+?/.exec(formula).toString();
        multi = (/\]\d+/.test(formula)) ? /\]\d+/.exec(formula).toString().substring(1) : "1";
        formula = formula.replace(elemento, "");
        elemento = elemento.substring(1, elemento.indexOf(/\]/.exec(elemento).toString()));

    } else if (/\{.*\}/.test(formula)) {
        console.log("if com [ ]");
        elemento = /\{.*\}\d+?/.exec(formula).toString();
        multi = (/\}\d+/.test(formula)) ? /\}\d+/.exec(formula).toString().substring(1) : "1";
        formula = formula.replace(elemento, "");
        elemento = elemento.substring(1, elemento.indexOf(/\}/.exec(elemento).toString()));

    } else if (/^[\w]+/.test(formula)) {
        console.log("if sem c. especial");
        elemento = /.*/.exec(formula).toString();
        formula = formula.replace(elemento, "");
    }

    multi = Number(multi);              // Tratando o dado para ser alocado como number
    tratarFormula(elemento, multi);
    separarFormula();
}

// Organização e contagem dos valores
function tratarFormula(par, multiplicador) {
    let str = par;
    let num = multiplicador;

    do {
        if (/[\w]+/.test(str)) {

            // Sequência Ab
            if (/^[A-Z][a-z]/.test(str)) {
                if (/^[A-Z][a-z]\d/.test(str)) {
                    console.log("if 1.1");
                    x[count++] = [/\D+/.exec(str).toString(), Number(/\d+/.exec(str).toString() * multiplicador)];
                    str = str.slice(/\D+\d+/.exec(str).toString().length);
                } else if (/^[A-Z][a-z]/.test(str)) {
                    console.log("if 1.2");
                    x[count++] = [/\D+/.exec(str).toString(), 1 * multiplicador];
                    str = str.slice(/\D+/.exec(str).toString().length);
                }
            }

            // Sequência AB
            if (/^[A-Z]/.test(str)) {
                if (/^[A-Z]\d/.test(str)) {
                    console.log("if 2.1");
                    x[count++] = [/\D/.exec(str).toString(), Number(/\d+/.exec(str).toString() * multiplicador)];
                    str = str.slice(/\D\d+/.exec(str).toString().length);
                } else if (/^[A-Z]/.test(str)) {
                    console.log("if 2.2");
                    x[count++] = [/\D/.exec(str).toString(), 1 * multiplicador];
                    str = str.slice(/\D/.exec(str).toString().length);
                }
            }
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
var x = [];                         //+ K4[ON(SO3)2]2, (C5H5)Fe(CO)2CH3, Pd[P(C6H5)3]4, {[Co(NH3)4(OH)2]3Co}(SO4)3, + C2H2(COOH)2, As2{Be4C5[BCo3(CO2)3]2}4Cu5 
var formula = "";                   //C6H12O6, H2O, Mg(OH)2, Mo(CO)6, Fe(C5H5)2

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
