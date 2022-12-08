const header = document.getElementsByTagName("header")[0]
const navWrapper = document.getElementById("nav-wrapper")
const closeButton = header.children[0]
closeButton.addEventListener("click", function(){
    if (header.children.length == 3){
        var element = document.createElement('div')
        element.setAttribute('id', 'black-background')
        element.setAttribute('id', 'black-background')
        fadeout(element)
        header.appendChild(element)        
    }else{
        header.removeChild(document.getElementById("black-background"))
    }
    navWrapper.classList.toggle("active")
    closeButton.classList.toggle("active")
})
function fadeout(element){
    var op = 0
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer)
        }
        element.style.opacity = op
        op += 0.1
    }, 20);
}
