const fs = require('fs')

'use strict'
let valueDecoded

const decode = (code) => {
    let _aux = []

    // Criando a primeira coluna
    if (!valueDecoded[0]) {
        for (let value of code) {
            _aux.push(value)
        }
        _aux.sort()
        valueDecoded = _aux.map((value) =>
            value.toString())
    }

    // Criando as outras colunas
    for (let i = code.length; i > 1; i--) {
        for (let i = 0; i < code.length; i++) {
            _aux[i] = code.charAt(i) + valueDecoded[i].toString()
        }
        valueDecoded = _aux.map((value) =>
            value.toString())
        valueDecoded.forEach(() => {
            valueDecoded.sort()
        })
    }
}

try {
    for (let i = 5; i <= 8; i++) {
        let file = `\\decode-${i}`
        let input = fs.readFileSync(__dirname + file + '.in', 'UTF-8')
        let valueCoded = input.slice(input.indexOf('[\'') + 2, input.indexOf('\','))
        let index = Number(input.slice(input.indexOf(', ') + 2, input.indexOf(']')))

        valueDecoded = new Array(valueCoded.length)
        decode(valueCoded)

        console.log(`Entrada: ${input}\nSaída: ${valueDecoded[index]}\n`)
        // Descomente para gerar os arquivos de saída
        // fs.writeFileSync(__dirname + file + '.out', valueDecoded[index], 'UTF-8')
    }
} catch (err) {
    console.log(err.name)
    console.log(err.message)
}
