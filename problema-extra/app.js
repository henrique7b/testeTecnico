// Identificar o tipo de fórmula
function separarFormula(par) {

    if (!par) return;

    if (/\{.*\}/.test(par)) {
        console.log("if 1.1");
        formula = /\{.*\}/.exec(par).toString();
        multi = (/\}\d+/.test(par)) ? /\}\d+/.exec(par).toString() : 1;

        formula = formula.substring(1, formula.length - 1);
        multi = Number(multi.substring(1));
        console.log("formula: " + formula + typeof formula);
        console.log("multiplicador: " + multi + typeof multi);
        tratarFormula(formula, multi);
    }

    if (/\[.*\]/.test(par)) {
        console.log("if 1.2");
        formula = /\[.*\]/.exec(par).toString();
        multi = (/\]\d+/.test(par)) ? /\]\d+/.exec(par).toString() : 1;

        formula = formula.substring(1, formula.length - 1);
        multi = Number(multi.substring(1));
        console.log("formula: " + formula + typeof formula);
        console.log("multiplicador: " + multi + typeof multi);
        tratarFormula(formula, multi);
    }

    if (/\(.*\)/.test(par)) {
        console.log("if 1.3");
        formula = /\(.*\)/.exec(par).toString();
        multi = (/\)\d+/.test(par)) ? /\)\d+/.exec(par).toString() : 1;

        formula = formula.substring(1, formula.length - 1);
        multi = Number(multi.substring(1));
        console.log("formula: " + formula + typeof formula);
        console.log("multiplicador:" + multi + typeof multi);
        tratarFormula(formula, multi);
    }

    if (/^[\w]+/.test(par)) {
        console.log("if 1.3");
        formula = /^[\w]+/.exec(par).toString();

        console.log("formula: " + formula + typeof formula);
        tratarFormula(formula, 1);
    }



    //TODO: criar maneira para reencaminhar a palavra após alguma parte ter sido removida dela

}

// Organização e contagem dos valores
function tratarFormula(par, multiplicador) {
    var str = par;
    var multi = multiplicador;

    do {
        if (/[\w]+\d/.test(str)) {
            console.log("if 2");
            if (/^[A-Z][A-Z]/.test(str)) {
                console.log("if 2.1");
                x[count++] = [/^[A-Z]/.exec(str), 1];                       // Verificar como irá ficar quando ocorrer mais de 2 números em caps
                x[count++] = [/\D\d/.exec(str), /\d+/.exec(str) * multi];   // Usar \D ?
                str = str.slice(2);                                         // Corrigir o slice
                console.log(str);
            }
            if (/^[A-Z][a-z]/.test(str)) {
                console.log("if 2.2");
                x[count++] = [/^\D+/.exec(str), /\d+/.exec(str) * multi];
                str = str.slice(1);                                         // Corrigir o slice
                console.log(str);
            }
            if (/^[A-Z]/.test(str)) {
                console.log("if 2.3");
                x[count++] = [/^[A-Z]/.exec(str), /\d+/.exec(str) * multi];
                str = str.slice(/\D+\d+/.exec(str).toString().length);
                console.log(str);
            } else throw "Sequência inválida / não definida";
        }
        console.log("<< while >>");
    } while (str);
}

//function gerarSaida(par) { }

// Arquivo de entrada
const fs = require('fs');
const arquivo = "./teste1";     // Altere o './testen' para n = '1' até '8'

// Manipulação e separação do arquivo de entrada para gerar a saída
var count = 0;
var x = [];
var txt = "C6H12O6";
var formula = "";
var formulaAux = "";
var multi = 1;

try {
    //txt = fs.readFileSync(arquivo + ".txt", "UTF-8");
    console.log("Entrada: " + txt);
    separarFormula(txt);

    console.log("-----");
    for (var i = 0; i < count; i++) { console.log(x[i].toString()); }
    //gerarSaida(str);
} catch (err) {
    console.log(err.name);
    console.log(err.message);
}