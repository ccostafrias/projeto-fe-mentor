const calcButtons = [...document.querySelectorAll('.calc-button')]
const calcDisplay = document.querySelector('.calc-display-content')
let isFirstPart = true
let numA = numB = ''
let result

calcButtons.forEach(calcBttn => {
    calcBttn.addEventListener('click', e => {
        console.log(calcBttn.innerHTML)
    })
})

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