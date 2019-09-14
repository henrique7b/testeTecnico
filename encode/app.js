const fs = require('fs')

'use strict'
let valueRotated = []

const rotateValue = (decodedValue) => {
    let _aux0 = ""
    let _aux1 = decodedValue

    // Adiciona os valores 'rotacionados' ao array
    for (let i = 0; i < decodedValue.length; i++) {
        _aux0 = _aux1
        valueRotated[i] = _aux0.charAt(_aux0.length - 1) + _aux0.substring(0, _aux0.length - 1)
        _aux1 = valueRotated[i]
    }
    valueRotated.sort()
}

const codify = () => {
    let codifyed = ""

    // Criando o valor que será a saída
    // 'value.charAt(value.length - 1)' está 'simulando' a última coluna de cada linha
    for (value of valueRotated) {
        codifyed += value.charAt(value.length - 1)
    }
    return codifyed
}

const findIndex = (decoded) => {
    // Procura pela palavra decodificada nas palavras rotacionadas, de modo que possa encontrar o índice
    for (let i = 0; i < decoded.length; i++) {
        if (decoded == valueRotated[i]) return i
    }
}

try {
    for (let i = 1; i <= 4; i++) {
        let file = `\\encode-${i}`
        let valueDecoded = fs.readFileSync(__dirname + file + '.in', 'UTF-8')

        rotateValue(valueDecoded)
        let valueCoded = codify()
        let index = findIndex(valueDecoded)

        console.log(`Entrada: ${valueRotated[index]}\nSaída: [\"${valueCoded}\", ${index}]\n`)
        // Descomente para gerar os arquivos de saída
        // fs.writeFileSync(__dirname + file + '.out', '[\"' + valueCoded + '\", ' + index + ']', 'UTF-8')
    }
} catch (err) {
    console.log(err.name)
    console.log(err.message)
}