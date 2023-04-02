const calcButtons = [...document.querySelectorAll('.calc-button')]
const calcDisplay = document.querySelector('.calc-display-content')
const calcDisplayOperations = document.querySelector('.calc-display-math')
let isFirstPart = true
let isFinish = false
let hasComma = false
let numA = 0
let numB = null
let operator = null
let result

calcButtons.forEach(calcBttn => {
    calcBttn.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
    const button = e.target.closest('.calc-button')
    const type = button.dataset.type

    if (type === 'number') {
        const num = button.textContent
        writeNum(num)
    } else if (type === 'del') {
        del()
    } else if (type === 'operation') {
        const signal = button.textContent
        operate(signal)
    } else if (type === 'reset') {
        reset()
    } else if (type === 'equals') {
        calculate(numA, operator, numB)
    } else if (type === 'modificator') {
        const modificator = button.dataset.mod
        modify(modificator)
    }
}

function writeNum(n) {
    if (isFinish) {
        isFinish = false
        reset()
    }

    if (calcDisplay.innerHTML == '0' && n != '.') calcDisplay.innerHTML = ''

    if (n == '.') {
        if (!hasComma) {
            calcDisplay.innerHTML += '.'
            hasComma = true
        }
    } else {
        calcDisplay.innerHTML += n
    }

    saveNums()
}

function del() {
    calcDisplay.innerHTML = '0'
    hasComma = false

    saveNums()
}

function reset() {
    calcDisplay.innerHTML = '0'
    calcDisplayOperations.innerHTML = ''
    hasComma = false
    isFirstPart = true
    numA = 0
    numB = null
}

function saveNums() {
    if (isFirstPart) { 
        numA = Number(calcDisplay.innerHTML)
    } else {
        numB = Number(calcDisplay.innerHTML)
    }
}

function operate(signal) {
    if (isFinish) {
        isFinish = false
        isFirstPart = true
    }
    if (isFirstPart) {
        operator = signal
        hasComma = false
        isFirstPart = false
        numB = '0'
        calcDisplayOperations.innerHTML = `${numA} ${operator}`
        calcDisplay.innerHTML = '0'
    } else {
        calculate(numA, operator, numB)
    }
}

function modify(modificator, result) {
    const num = Number(calcDisplay.innerHTML)
    switch (modificator) {
        case '!':
            if (num >= 0) {
                let modified = num + 1
                for (let i = 1; i < num + 1; i++) {
                    modified *= i        
                }
                result = modified / (num + 1)
            } else {
                result = NaN
            }
            break
        case '%':
            result = num / 100
            if (result % Math.floor(result) !== 0) hasComma = true
            break
        case '^':
            result = num ** 2
            break
        case '±':
            result = 0 - num
            break
    }

    calcDisplay.innerHTML = result
    saveNums()
}

function calculate(a, operator, b, result) {
    if (!b && b !== 0) return
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            result = a + b
            break
        case '-':
            result = a - b
            break
        case 'x':
            result = a * b
            break
        case '/':
            result = a / b
            break
    }

    calcDisplay.innerHTML = result
    calcDisplayOperations.innerHTML = `${numA} ${operator} ${numB} =`
    isFinish = true
    numA = result
}