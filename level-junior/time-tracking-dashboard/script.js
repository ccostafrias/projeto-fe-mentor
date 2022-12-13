const dateJSON = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
]
const cards = document.querySelectorAll(".card")
const radioInputs = document.querySelectorAll(".radio-date")
let dateRespective = {daily: 'day', weekly: 'week', monthly: 'month'}

function radioEventListener(){
  for (let i = 0; i < radioInputs.length; i++) {
    radioInputs[i].addEventListener("change", function(){
      setCardContent(String(radioInputs[i].parentElement.children[1].textContent).toLowerCase())
    })
  }
}
function setCardContent(date){
  for (let i = 0; i < cards.length; i++){
    var timeCurrent = dateJSON[i]['timeframes'][date]['current']
    cards[i].querySelectorAll(".p-actual")[0].textContent = timeCurrent
    if (timeCurrent == 1){
      cards[i].querySelectorAll(".p-actual")[0].textContent += "hr"
    }else{
      cards[i].querySelectorAll(".p-actual")[0].textContent += "hrs"
    }
    var timePrevious = dateJSON[i]['timeframes'][date]['previous']
    cards[i].querySelectorAll(".p-previous")[0].textContent = "Last " + dateRespective[date] + " - " + timePrevious
    if (timePrevious == 1){
      cards[i].querySelectorAll(".p-previous")[0].textContent += "hr"
    }else{
      cards[i].querySelectorAll(".p-previous")[0].textContent += "hrs"
    }
  }
}