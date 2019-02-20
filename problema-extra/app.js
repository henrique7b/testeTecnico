
function separarFormula(par) {
    var str = par;
    var multiplicador = 1;
    var i2 = "";
    var i3 = "";
    var i4 = "";

    do {
        // Idenfitica se a sequência começa com { [ ( ) ] }
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
            } else if (/^\}/.test(str)) {
                multiplicador = (/\}\d+?/.test(str)) ? /\d+?/.exec(str).toString() : "1";
                str = str.slice(/\}\d?/.exec(str).toString().length, str.length);
                i2 = "";
                somarElementos();

            } else if (/^\]/.test(str)) {
                multiplicador = (/\]\d+?/.test(str)) ? /\d+?/.exec(str).toString() : "1";
                str = str.slice(/\]\d?/.exec(str).toString().length, str.length);
                i3 = "";
                somarElementos();

            } else if (/^\)/.test(str)) {
                multiplicador = (/\)\d+?/.test(str)) ? /\d+/.exec(str).toString() : "1";
                str = str.slice(/\)\d?/.exec(str).toString().length, str.length);
                i4 = "";
                somarElementos();
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

function multiplicarElementos(indice) {
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < i; j++) {

        }
    }
}

// Arquivo de entrada
//const fs = require('fs');
//const arquivo = "./teste6";     // Altere o './testen' para n = '1' até '8'

// Manipulação e separação do arquivo de entrada para gerar a saída
var count = 0;
var x = new Array(12);
for (var i = 0; i < x.length; i++) {
    x[i] = new Array(5);
    for (var j = 0; j < 5; j++) {
        x[i][j] = "";
    }
}

var formula = "(C5H5)Fe(CO)2CH3";

// K4[ON(SO3)2]2, (C5H5)Fe(CO)2CH3, Pd[P(C6H5)3]4, {[Co(NH3)4(OH)2]3Co}(SO4)3, C2H2(COOH)2, As2{Be4C5[BCo3(CO2)3]2}4Cu5, C6H12O6, H2O, Mg(OH)2, Mo(CO)6, Fe(C5H5)2

// ok
// H2O, Mg(OH)2

// Pd
// P    [
// C6   [(
// H5   [(
// if (elemento começado com "(")
//      somar
//      multiplicar )3
// if (elemento começado com "[")
//      somar
//      multiplicar ]4
// 



// TODO: Criar multiplicador
// TODO: Organizar elementos


try {
    //formula = fs.readFileSync(arquivo + ".txt", "UTF-8");
    console.log("Entrada: " + formula);

    separarFormula(formula);
    //gerarSaida();

    for (var i = 0; i < x.length; i++) { console.log(x[i].toString()); }

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}