const countNotifications = document.getElementById("notification-counter")
const notificationsSection = document.getElementsByTagName("section")[0]
const buttonSubmit = document.getElementById("notification-button")
let cards = document.querySelectorAll(".notification-card")
let notificationsActives = 0
let countCards = -1
let nicksAvatar = ["mark-webber", "angela-gray", "jacob-thompson", "rizky-hasanuddin", "kimberly-smith", "nathan-peterson", "anna-kim"]
let nicksProfile = ["Mark Webber", "Angela Gray", "Jacob Thompson", "Rizky Hasanuddin", "Kimberly Smith", "Nathan Peterson", "Anna Kim"]
let notificationMessage = {follow: 'followed you', react: 'reacted to your post', joinGroup: 'has joined your group', leftGroup: 'left the group', privateMessage: "sent you a private message", comment: "commented on your picture"}

function getFormValue(index){
    return document.getElementsByClassName("select-wrapper")[index].children[1].value
}
function load(){
    buttonSubmit.addEventListener("click", function(){
        notification("true", getFormValue(2), getFormValue(1), getFormValue(4), getFormValue(0), getFormValue(3), getFormValue(6), getFormValue(5))
    })
    notification("false", "anna-kim", "*", "Chess Club", "leftGroup", "2 weeks")
    notification("false", "nathan-peterson", "*", "5 end-game strategies to increase your win rate", "react", "2 weeks")
    notification("false", "kimberly-smith", "*", "*", "comment", "1 week days", "*", "./assets/images/image-chess.webp")
    notification("false", "rizky-hasanuddin", "*", "*", "privateMessage", "5 days", "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.")
    notification("true", "jacob-thompson", "*", "Chess Club", "joinGroup", "1 day")
    notification("true", "angela-gray", "*", "*", "follow", "5m")
    notification("true", "mark-webber", "*", "My first tournament today!", "react", "1m")
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
function notification(active = "true", avatarImg = "", profileNick = "Error", titlePost = "404", messageType = "follow", dateMessage = "1s", messagePrivate = "", imgPost = ""){
    var notificationCard = cards[0].cloneNode(true)
    if (nicksAvatar.indexOf(avatarImg) == -1){
        notificationCard.getElementsByClassName("notification-avatar")[0].src = avatarImg
        notificationCard.getElementsByClassName("profile-perfil")[0].textContent = profileNick
    }else{
        notificationCard.getElementsByClassName("notification-avatar")[0].src = "./assets/images/avatar-" + avatarImg + ".webp"
        notificationCard.getElementsByClassName("profile-perfil")[0].textContent = nicksProfile[nicksAvatar
        .indexOf(avatarImg)]
    }
    notificationCard.getElementsByClassName("notification-avatar")[0].addEventListener('error', function handleError(){
        notificationCard.children[0].src = "./assets/images/avatar-none.png"
    })
    notificationCard.getElementsByClassName("notification-message")[0].textContent = notificationMessage[messageType]
    if (messageType == "react" || messageType == "joinGroup" || messageType == "leftGroup"){
        notificationCard.getElementsByClassName("post-title")[0].textContent = titlePost
    }else{
        notificationCard.getElementsByClassName("post-title")[0].remove()
    }
    if (messageType == "privateMessage"){
        notificationCard.getElementsByClassName("private-messsage")[0].textContent = messagePrivate
    }else{
        notificationCard.getElementsByClassName("private-messsage")[0].remove()
    }
    if (messageType == "comment"){
        notificationCard.getElementsByClassName("notification-post-img")[0].src = imgPost
    }else{
        notificationCard.getElementsByClassName("notification-post-img")[0].remove()
    }
    notificationCard.getElementsByClassName("notification-date")[0].textContent = dateMessage + " ago"
    notificationCard.classList.remove("template")
    if (active == "true"){
        notificationCard.classList.add("active")
    }
    notificationCard.style.order = countCards
    countCards --
    notificationsSection.appendChild(notificationCard)
    addListener(notificationCard)
    count()
}