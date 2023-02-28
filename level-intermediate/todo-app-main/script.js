const toggleButton = document.querySelector('.bttn-tggl-scheme')

toggleButton.addEventListener('mouseup', toggleScheme)
toggleButton.addEventListener('keyup', e => {
  if (document.activeElement == e.target) {
    if (e.code === 'Enter' || e.code === 'Space') {
      toggleScheme()
    }
  }
})

function getScheme(scheme) {
    if (!scheme) {
        localStorage.setItem('scheme', 'light')
        return 'light'
    } else {
        return scheme
    }
}

const theme = {
    dark: {
        '--bg-image': `url('./images/bg-desktop-dark.jpg')`,
        '--bg-color': 'var(--very-dark-blue)',
        '--font-color': 'var(--very-dark-grayish-blue)',
        '--primary-color': 'var(--very-dark-desaturated-blue)',
        '--secundary-color': 'var(--light-grayish-blue)'
    },
    light: {
        '--bg-image': `url('./images/bg-desktop-light.jpg')`,
        '--bg-color': 'var(--very-light-gray)',
        '--font-color': 'var(--light-grayish-blue-light)',
        '--primary-color': 'var(--white)',
        '--secundary-color': 'var(--very-dark-grayish-blue-light)'
    }
};

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener('change', e => {
        actualScheme = e.matches ? "dark" : "light";
        localStorage.setItem('scheme', actualScheme)
        setScheme(actualScheme)
    })


function setScheme(scheme) {
    //   moonIcon.setAttribute('name', scheme == 'dark' ? 'moon' : 'moon-outline')
    Object.keys(theme['dark']).forEach(key => {
        document.documentElement.style.setProperty(
            key, theme[scheme][key]
        )
    })
}

function toggleScheme() {
    if (actualScheme == 'light') {
        actualScheme = 'dark'
    } else {
        actualScheme = 'light'
    }
    localStorage.setItem('scheme', actualScheme)
    setScheme(actualScheme)
}

let actualScheme = getScheme(localStorage.getItem('scheme'))
setScheme(actualScheme)

//Items

const input = document.querySelector('#input-todo')
const check = document.querySelector('#input-check')
const itemsWrapper = document.querySelector('.todo-items')
const items = new Array

itemsWrapper.addEventListener('click', e => {
    if (e.target.classList.contains('bttn-close')) {
        const itemText = e.target.previousElementSibling.textContent
        const itemIndex = items.findIndex(item => item.content == itemText)
        items.splice(itemIndex, 1)
        setItems()
    }

    if (e.target.classList.contains()){
        
    }
})

input.addEventListener('keyup', e => {
    if (e.key == 'Enter') submitItem()
})

function submitItem() {
    items.push({
        content: input.value,
        completed: check.checked
    })

    input.value = ''
    setItems()
}

function getItems() {
    const localItems = localStorage.getItem('items')
    if (!localItems){
        localStorage.setItem('items', '[]')
    } else {
        JSON.parse(localItems).map(item => items.push(item))
        setItems()
    }
}

function setItems(itemsTo = items) {
    const actualState = document.querySelector(`[name='states']:checked`)
    const stateBoolean = actualState.dataset.state === 'true' ? true : false
    if (actualState.dataset.state !== 'all') {
        itemsTo = itemsTo.filter(item => item.completed === stateBoolean)
    }

    let count = 0
    itemsWrapper.innerHTML = itemsTo
        .map(item => {
            count++
            return `<div class="todo-item card">
                        <input type="checkbox" name="item-${count}" id="item-${count}" ${item.completed ? 'checked' : ''}>
                        <p class="todo-item-text">${item.content}</p>
                        <ion-icon name="close" class="bttn-close"></ion-icon>
                    </div>`
        })
    
    const todoCounter = document.querySelector('.todo-count')
    todoCounter.textContent = `${itemsTo.length} items left`
    check.checked = false

    localStorage.setItem('items', JSON.stringify(items))
}

const states = [...document.querySelectorAll(`[name='states']`)]
states.forEach(state => {
    state.addEventListener('change', () => setItems(items))
})

const clearBttn = document.querySelector('.todo-clear-bttn')
clearBttn.addEventListener('click', clearItems)

function clearItems(){
    items.forEach(item => {
        if (item.completed === true){
            const index = items.findIndex(a => a === item)
            items.splice(index, 1)
        }
    })
    setItems()
}

getItems()