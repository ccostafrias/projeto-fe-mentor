const main = document.getElementsByTagName("main")[0]
const rules = document.getElementById("sec-rules")
const cardsChoose = document.querySelectorAll(".card-choose")
const cardGamePlayer = document.querySelector(".card-game")
const cardBotPlayer = document.querySelector(".card-bot")
const wlWrapper = document.getElementById("wl-wrapper")
const wlTxt = wlWrapper.children[0]
const scoreTxt = document.getElementById("score-wrapper").getElementsByTagName("p")[0]
const cardPowerHierarchy = {
    "scissors": {
      "wins": ["paper", "lizard"],
      "loses": ["spock", "rock"]
    },
    "paper": {
      "wins": ["rock", "spock"],
      "loses": ["scissors", "lizard"]
    },
    "rock": {
      "wins": ["lizard", "scissors"],
      "loses": ["paper", "spock"]
    },
    "lizard": {
      "wins": ["spock", "paper"],
      "loses": ["rock", "scissors"]
    },
    "spock": {
      "wins": ["scissors", "rock"],
      "loses": ["lizard", "paper"]
    }
}
let choosedCard = ''
let score = 0
cardsChoose.forEach(element => {
    element.addEventListener("click", function(){
        startGame(element.classList[2])
    })
});

function load(){
    score = localStorage.getItem("score")
    if (score == null){
        score = 0
        setItem("score", 0)
    }
    changeScore()
}

function setItem(item, value){
    localStorage.setItem(item, value)
}

function showRules(){
    rules.classList.toggle('active')
}

function changeScore(){
    scoreTxt.textContent = score
    setItem("score", score)
}

function wlEffectCreate(element){
    for (let i = 0; i < 3; i++) {
        var wlEffect = document.createElement('div')
        element.appendChild(wlEffect)
        wlEffect.classList.add('wl-effect')
        wlEffect.style.width = 250+70*(i)+"px"
        wlEffect.style.height = 250+70*(i)+"px"
        wlEffect.style.opacity = .8 - (3*i/10)
    }
}

function startGame(cardChoosed){
    main.classList.toggle("active")
    cardGamePlayer.classList.add(cardChoosed)
    setTimeout(() =>{
        choosedCard = String(cardChoosed).slice(5)
        var randomCard = Object.keys(cardPowerHierarchy)[Math.round(Math.random()*4)]
        cardBotPlayer.classList.remove("card-standby")
        cardBotPlayer.classList.add(`card-${randomCard}`)
        wlWrapper.classList.toggle("active")
        if (choosedCard == randomCard){
            wlTxt.textContent = "You\u00A0Tied"
        }else if (cardPowerHierarchy[choosedCard]['wins'].indexOf(randomCard) != -1){
            wlTxt.textContent = "You\u00A0Win"
            score ++
            wlEffectCreate(cardGamePlayer.parentElement)
        }else{
            wlTxt.textContent = "You\u00A0Loose"
            score --
            if (score < 0){
                score = 0
            }
            wlEffectCreate(cardBotPlayer.parentElement)
        }
        changeScore()
        // setTimeout(() => {
        // }, 500);
    }, 1000)
}

function endGame(){
    wlWrapper.classList.toggle("active")
    main.classList.toggle('active')
    cardBotPlayer.classList.remove(cardBotPlayer.classList[3])
    cardBotPlayer.classList.add("card-standby")
    cardGamePlayer.classList.remove(cardGamePlayer.classList[2])
    cardGamePlayer.classList
    document.querySelectorAll(".wl-effect").forEach( element => {
        element.remove()
    });
}
