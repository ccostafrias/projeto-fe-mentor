const main = document.getElementsByTagName("main")[0]
const rules = document.getElementById("sec-rules")
const cardsChoose = document.querySelectorAll(".card-choose")
const cardGamePlayer = document.querySelector(".card-game")
const wlWrapper = document.getElementById("wl-wrapper")
const scoreTxt = document.getElementById("score-wrapper").getElementsByTagName("p")[0]
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
        localStorage.setItem("score", 0)
    }
    scoreTxt.textContent = score
}

function showRules(){
    rules.classList.toggle('active')
}

function startGame(cardChoosed){
    main.classList.toggle("active")
    cardGamePlayer.classList.add(cardChoosed)
    setTimeout(() =>{
        wlWrapper.classList.toggle("active")
    }, 1000)
}
