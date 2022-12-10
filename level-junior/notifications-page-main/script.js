const countNotifications = document.getElementById("notification-counter")
const notificationsSection = document.getElementsByTagName("section")[0]
let cards = document.querySelectorAll(".notification-card")
let notificationsActives = 0
let countCards = -1

function load(){
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("active")){
            addListener(cards[i])
        }
    }
}
function addListener(element){
    element.addEventListener("click", function(){
        if (element.classList.contains("active")){
            element.classList.remove("active")
        }
        count()
    })
}
function count(){
    cards = document.querySelectorAll(".notification-card")
    notificationsActives = 0
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("active")){
            notificationsActives ++
        }
    }
    countNotifications.innerHTML = notificationsActives
}
function markAsRead(){
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("active")){
            cards[i].classList.remove("active")
        }
    }
    count()
}
function notification(){
    var notificationCard = cards[Math.round(Math.random() * 6)].cloneNode(true)
    /*var notificationCard = document.createElement("div")
    notificationCard.classList.add("notification-card")
    notificationCard.classList.add("active")*/
    notificationCard.classList.add("active")
    notificationCard.style.order = countCards
    countCards --
    notificationsSection.appendChild(notificationCard)
    addListener(notificationCard)
    count()
}