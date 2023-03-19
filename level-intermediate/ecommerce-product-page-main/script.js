const minicases = [...document.querySelectorAll('.mini-showcase')]
const showcase = document.querySelector('.big-showcase')
const countDiv = document.querySelector('.count')
const countBttns = [...document.querySelectorAll('.count-add')]
const showcaseFull = document.querySelector('.showcase-full')
const closeBttns = [...document.querySelectorAll('.close-bttn')]
const cartBttn = document.querySelector('.cart-bttn')
const cartPop = document.querySelector('.cart-pop')
const addCart = document.querySelector('.add-cart')
const passBttns = [...document.querySelectorAll('.pass')]
const navMenu = document.querySelector('.nav-hamburguer')

const product = {
    name: 'Fall Limited Edition Sneakers',
    url: 'edition-sneakers/',
    price: 125
}

let productsCount = 1
let cart = new Array

minicases.forEach(minicase => {
    minicase.addEventListener('click', handleClickCase)    
});

function handleClickCase(e) {
    [...e.target.closest('.showcase-wrapper').querySelectorAll('.mini-showcase')]
        .forEach(minicase => minicase.classList.remove('active'))

    const [,i] = [...e.target.classList]
        .find(classy => classy.match(/^(showcase)\-\d+$/))
        .split('-')

    e.target
        .closest('.showcase-wrapper').previousElementSibling.style
        .setProperty('background-image', `url('./images/image-product-${i}.jpg')`)

    e.target.classList.add('active')
}

countBttns.forEach(bttn => bttn.addEventListener('click', handleClickAddBttn))
function handleClickAddBttn(e) {
    const walk = this.dataset.walk
    console.log(walk)

    productsCount = parseInt(countDiv.innerHTML) + parseInt(walk)
    if (productsCount < 1) productsCount = 1;

    countDiv.textContent = productsCount
}

showcase.addEventListener('click', e => {
    console.log(e.target)
    if (e.target.classList.contains('big-showcase') || e.target.classList.contains('pass-images') || e.target.classList.contains('pass-wrapper')) handleClickShowcase()
})
function handleClickShowcase(e) {
    showcaseFull.classList.toggle('active')
}

closeBttns.forEach(closeBttn => {
    closeBttn.addEventListener('click', handleClose)
})
function handleClose(e) {
    const parent = this.dataset.parent
    document.querySelector(parent).classList.toggle('active')
}

cartBttn.addEventListener('click', handkeClickShowCart)
function handkeClickShowCart(e) {
    cartPop.classList.toggle('active')

    attCart()
}

function attCart() {
    const content = cartPop.querySelector('.cart-content')
    if (!cart.length) {
        content.classList.add('empty')
        content.innerHTML = 'Your cart is empty'
    } else {
        content.classList.remove('empty')
        content.innerHTML = '<div class="cart-items"></div>'
        const items = content.querySelector('.cart-items')
        cart.forEach(item => {
            items.innerHTML += `
                <div class="cart-item">
                    <div class="product-avatar showcase-1"></div>
                    <div class="product-prices">
                      <p>${item.name}</p>
                      <p><span class="product-price">${toLocale(item.price)} x ${item.count}</span><span class="product-final-price">${toLocale(item.price*item.count)}</span></p>
                    </div>
                    <button><img src="images/icon-delete.svg" alt="trash icon" class="bttn-trash"></button>
                </div>
            `
        })
        const totalCart = cart.reduce((tot, item) => { return tot + item.count }, 0)
        document.documentElement.style.setProperty('--content', `'${totalCart}'`)
        content.innerHTML += `<button class="bttn-checkout bttn">Checkout</button>`
    }

    function toLocale(n) {
        return n.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }
}

addCart.addEventListener('click', handleClickAddCart)
function handleClickAddCart(e) {
    if (!cart.filter(item => item.name === product.name).length) cart.push(Object.assign({}, product))
    const actualProduct = cart.find(item => item.name === product.name)
    if (!actualProduct['count']) actualProduct['count'] = 0
    actualProduct['count'] += productsCount

    attCart()
}

window.addEventListener('mouseup', e => {
    if (!e.target.closest('.cart-pop') && !e.target.closest('.cart-bttn')) cartPop.classList.remove('active')
})

cartPop.addEventListener('click', handleClickRemoveProduct)

function handleClickRemoveProduct(e) {
    if (e.target.closest('.bttn-trash')) {
        const index = cart.findIndex(item => item.name === product.name)
        cart.splice(index, 1)

        attCart()
    }
}

window.onload = () => { attCart() }

passBttns.forEach(passBttn => {
    passBttn.addEventListener('click', handleClickPassBttn)
})

function handleClickPassBttn(e) {
    const [,,imageIndex] = getComputedStyle(e.target.closest('.big-showcase'))
        .getPropertyValue('background-image')
        .match(/(image-product-)\d+/g)
        .toString()
        .split('-')

    let pass = parseInt(imageIndex) + parseInt(e.target.closest('.pass').dataset.walk)
    if (pass < 1) pass = 4
    if (pass > 4) pass = 1

    e.target.closest('.big-showcase')
        .style.setProperty('background-image', `url('./images/image-product-${pass}.jpg')`)

    const minicases = [...e.target.closest('.big-showcase').nextElementSibling.children]
    minicases.forEach(minicase => minicase.classList.remove('active'))
    minicases[pass-1].classList.add('active')
}

navMenu.addEventListener('click', handleClickNavMenu)

function handleClickNavMenu(e) {
    document.querySelector('.nav-list').classList.toggle('active')
}