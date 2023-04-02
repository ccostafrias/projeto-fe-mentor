const calcButtons = [...document.querySelectorAll('.calc-button')]
const calcDisplay = document.querySelector('.calc-display-content')
let isFirstPart = true
let hasComma = false
let numA = numB = ''
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
    }
}

function writeNum(n) {
    if (calcDisplay.innerHTML == '0' && n != '.') calcDisplay.innerHTML = ''

    if (n == '.') {
        if (!hasComma) {
            calcDisplay.innerHTML += '.'
            hasComma = !hasComma
        }
    } else {
        calcDisplay.innerHTML += n
    }

    if (isFirstPart) {
        numA = calcDisplay.innerHTML
    } else {
        numB = calcDisplay.innerHTML
    }
}

function del() {
    calcDisplay.innerHTML = '0'
    hasComma = false

    if (isFirstPart) { 
        numA = 0
    } else {
        numB = 0
    }
}

function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b
            break
        case '-':
            return a - b
            break
        case 'x':
            return a * b
            break
        case '/':
            return a / b
            break
    }
}