const countNotifications = document.getElementById("notification-counter")
const notificationsSection = document.getElementsByTagName("section")[0]
let cards = document.querySelectorAll(".notification-card")
let notificationsActives = 0
let countCards = -1
let nicksAvatar = ["mark-webber", "angela-gray", "jacob-thompson", "rizky-hasanuddin", "kimberly-smith", "nathan-peterson", "anna-kim"]
let nicksProfile = ["Mark Webber", "Angela Gray", "Jacob Thompson", "Rizky Hasanuddin", "Kimberly Smith", "Nathan Peterson", "Anna Kim"]
let notificationMessage = {follow: 'followed you', react: 'reacted to your post', joinGroup: 'has joined your group', leftGroup: 'left the group',privateMessage: "sent you a provate message", comment: "commented on your picture"}

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
function notification(avatarImg = "", profileNick = "Error", titlePost = "Sexo com animais", messageType = "follow"){
    /*var notificationCard = cards[Math.round(Math.random() * 6)].cloneNode(true)*/
    var notificationCard = cards[1].cloneNode(true)
    notificationCard.getElementsByClassName("notification-avatar")[0].src = "./assets/images/avatar-" + avatarImg + ".webp"
    notificationCard.getElementsByClassName("notification-avatar")[0].addEventListener('error', function handleError(){
        notificationCard.children[0].src = "./assets/images/avatar-none.png"
    })
    notificationCard.getElementsByClassName("profile-perfil")[0].textContent = profileNick
    notificationCard.getElementsByClassName("notification-message")[0].textContent = notificationMessage[messageType]
    if (messageType == "react" || messageType == "joinGroup" || messageType == "leftGroup"){
        notificationCard.getElementsByClassName("post-title")[0].textContent = titlePost
    }
    notificationCard.classList.add("active")
    notificationCard.style.order = countCards
    countCards --
    notificationsSection.appendChild(notificationCard)
    addListener(notificationCard)
    count()
}