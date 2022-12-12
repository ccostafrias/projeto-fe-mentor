const buttonReset = document.querySelectorAll("input[type=button]")[0]
const paymentBill = document.getElementById("payment-bill")
const paymentPeople = document.getElementById("payment-people")
const tipPerson = document.getElementById("tip-person")
const totalPerson = document.getElementById("total-person")
const radioElements = document.querySelectorAll(".input-radio")
let tipValue = ''
let billValue = ''
let peopleValue = ''
let tipPersonValue = ''
let billPersonValue = ''

function addListenerRadio(){
    /*Adicionando listenerEvent para os 'tip-buttons'*/
    for (let i = 0; i < radioElements.length; i++) {
        if (i != 5){
            radioElements[i].addEventListener("change", function(){
                tipValue = radioElements[i].parentElement.children[0].textContent.slice(0, -1)
                changeDisplay()
            })
        }else{
            radioElements[5].parentElement.children[0].addEventListener("keyup", function(){
                tipValue = pickInputValue(radioElements[5].parentElement.children[0])
                changeDisplay()
            })
            radioElements[5].parentElement.children[0].addEventListener("focus", function(){
                tipValue = pickInputValue(radioElements[5].parentElement.children[0])
                changeDisplay()
            })
        }
    
    }
    /*Adicionando listenerEvent para o 'payment-bill'*/
    paymentBill.addEventListener("keyup", function(){
        billValue = paymentBill.value
        changeDisplay()
    })
    /*Adicionando listenerEvent para o 'payment-people'*/
    paymentPeople.addEventListener("keyup", function(){
        peopleValue = paymentPeople.value
        changeDisplay()
    })

}

function pickInputValue(element){
    return element.value
}

function changeDisplay(){
    if (peopleValue == '0' || billValue == '0'){
        if (peopleValue == '0'){
            document.querySelectorAll(".warning-advice")[1].classList.add("active")
            blockButton()
        }else{
            document.querySelectorAll(".warning-advice")[1].classList.remove("active")
        }
        if (billValue == '0'){
            document.querySelectorAll(".warning-advice")[0].classList.add("active")
            blockButton()
        }else{
            document.querySelectorAll(".warning-advice")[0].classList.remove("active")
        }
    }else{
        document.querySelectorAll(".warning-advice")[0].classList.remove("active")
        document.querySelectorAll(".warning-advice")[1].classList.remove("active")
        if (tipValue != '' &&  billValue != '' && peopleValue != ''){
            buttonReset.style.opacity = 1
            buttonReset.style.cursor = "pointer"
            tipPersonValue = Number((billValue * (tipValue/100)) / peopleValue)
            billPersonValue = Number(billValue / peopleValue)
            tipPerson.textContent = "$" + tipPersonValue.toFixed(2)
            totalPerson.textContent = "$" + (tipPersonValue + billPersonValue).toFixed(2)
            
        }else{
            blockButton()
        }
    }
}

function reset(){
    if (buttonReset.style.cursor != "not-allowed"){
        for (let i = 0; i < radioElements.length; i++) {
            radioElements[i].checked = false
            if (i == 5){
                radioElements[5].parentElement.children[0].value = ''
            }
        }
        document.getElementById("payment-bill").value = ''
        document.getElementById("payment-people").value = ''
        blockButton()
        tipValue = ''
        billValue = ''
        peopleValue = ''
        tipPersonValue = ''
        billPersonValue = ''
    }
}

function blockButton(){
    buttonReset.style.opacity = .5
    buttonReset.style.cursor = "not-allowed"
    tipPerson.textContent = "$0.00"
    totalPerson.textContent = "$0.00"
}