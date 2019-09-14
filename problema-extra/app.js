//
// ATENÇÃO ATENÇÃO ATENÇÃO
// Esse APP está extremamente mal feito, mal otimizado e não funciona em todos os casos
// Ele foi feito de forma rápida e sem planejamento, e não foi reformulado
//


function separarFormula(par) {
    var str = par;
    var multi = 1;
    var i2 = "";
    var i3 = "";
    var i4 = "";

    do {
        // Idenfitica se a sequência começa com { [ (
        if (/^\W/.test(str)) {
            if (/^\{/.test(str)) {
                i2 = "{";
                str = str.slice(1, str.length);
            } else if (/^\[/.test(str)) {
                i3 = "[";
                str = str.slice(1, str.length);
            } else if (/^\(/.test(str)) {
                i4 = "(";
                str = str.slice(1, str.length);

                // Idenfitica se a sequência começa com } ] )
            } else if (/^\}/.test(str)) {
                multi = (/^\}\d+?/.test(str)) ? /\d+?/.exec(str).toString() : "1";
                if (/^\}\d+/.test(str)) {
                    multiplicarElementos("{", multi);
                    somarElementos();
                } else if (/^\}/.test(str)) multiplicarElementos("(", multi);
                str = str.slice(/\}\d?/.exec(str).toString().length, str.length);
                i2 = "";

            } else if (/^\]/.test(str)) {
                multi = (/^\]\d+?/.test(str)) ? /\d+?/.exec(str).toString() : "1";
                if (/^\]\d+/.test(str)) {
                    multiplicarElementos("[", multi);
                    somarElementos();
                } else if (/^\]/.test(str)) multiplicarElementos("(", multi);
                str = str.slice(/\]\d?/.exec(str).toString().length, str.length);
                i3 = "";

            } else if (/^\)/.test(str)) {
                multi = (/^\)\d+?/.test(str)) ? /\d+/.exec(str).toString() : "1";
                if (/^\)\d+/.test(str)) {
                    multiplicarElementos("(", multi);
                    somarElementos();
                } else if (/^\)/.test(str)) multiplicarElementos("(", multi);
                str = str.slice(/\)\d?/.exec(str).toString().length, str.length);
                i4 = "";
            }

            // Idenfitica se a sequência começa com Ab
        } else if (/^[A-Z][a-z]/.test(str)) {
            if (/^[A-Z][a-z]\d/.test(str)) {                                            // Verifica se o elemento tem número
                x[count][0] = /\D+/.exec(str).toString();                               // Armazena o elemento
                x[count][1] = Number(/\d+/.exec(str).toString());                       // Armazena o número
                x[count][2] = i2;                                                       // Identificador utilizado para multiplicar { }
                x[count][3] = i3;                                                       // Identificador utilizado para multiplicar [ ]
                x[count++][4] = i4;                                                     // Identificador utilizado para multiplicar ( )
                str = str.slice(/\D+\d+/.exec(str).toString().length, str.length);      // Remove os elementos adicionados ao array da sequência (str)
            } else if (/^[A-Z][a-z]/.test(str)) {                                       // Verifica se o elemento NÃO tem número
                x[count][0] = /^[A-Z][a-z]/.exec(str).toString();                       // Armazena o elemento
                x[count][1] = 1;                                                        // Como o elemento não tem número, será considerado como 1
                x[count][2] = i2;                                                       // Identificador utilizado para multiplicar { }
                x[count][3] = i3;                                                       // Identificador utilizado para multiplicar [ ]
                x[count++][4] = i4;                                                     // Identificador utilizado para multiplicar ( )
                str = str.slice(/^[A-Z][a-z]/.exec(str).toString().length, str.length); // Remove o elemento processado da fórmula temporária (str)
            }

            // Idenfitica se a sequência começa com A (segue o mesmo padrão acima)
        } else if (/^[A-Z]/.test(str)) {
            if (/^[A-Z]\d/.test(str)) {
                x[count][0] = /\D/.exec(str).toString();
                x[count][1] = Number(/\d+/.exec(str).toString());
                x[count][2] = i2;
                x[count][3] = i3;
                x[count++][4] = i4;
                str = str.slice(/\D\d+/.exec(str).toString().length, str.length);
            } else if (/^[A-Z]/.test(str)) {
                x[count][0] = /\D/.exec(str).toString();
                x[count][1] = 1;
                x[count][2] = i2;
                x[count][3] = i3;
                x[count++][4] = i4;
                str = str.slice(/\D/.exec(str).toString().length, str.length);
            }
        }
    } while (str);
    somarElementos();
}

function somarElementos() {
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < i; j++) {
            if (x[i][0] == x[j][0]) {
                x[j][1] += x[i][1];
                x.splice(i, 1);
                count--;
                i--;
            }
            if (!x[i][0]) return;
        }
    }
}

function multiplicarElementos(tipo, multiplicador) {
    for (var i = 0; i < x.length; i++) {
        for (var j = 2; j < 5; j++) {
            if (x[i][j] == tipo) {
                x[i][1] *= multiplicador;
                x[i][j] = "";
            }
            if (!x[i][0]) return;
        }
    }
}

function gerarSaida() {
    for (var i = 0; i < x.length; i++) {
        if (x[i][0]) resultado += x[i][0] + ": " + x[i][1] + ", ";
        else {
            resultado = resultado.substring(0, resultado.length - 2);

            console.log("Entrada: " + formula + " | Saída: " + resultado);
            // fs.writeFileSync(arquivo + ".out", resultado, "UTF-8");
            return;
        }
    }
}

// Arquivo de entrada
const fs = require('fs');
const arquivo = "\\teste2";     // Altere o './testen' para n = '1' até '8'

// Manipulação e separação do arquivo de entrada para gerar a saída
var count = 0;
var x = new Array(10);
for (var i = 0; i < x.length; i++) {
    x[i] = new Array(5);
    for (var j = 0; j < 5; j++) {
        x[i][j] = "";
    }
}

var formula = "";
var resultado = "";

try {
    formula = fs.readFileSync(__dirname + arquivo + ".in", "UTF-8");
    separarFormula(formula);
    gerarSaida();

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
