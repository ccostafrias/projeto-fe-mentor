const minicases = [...document.querySelectorAll('.mini-showcase')]
const showcase = document.querySelector('.big-showcase')
const countDiv = document.querySelector('.count')
const countBttns = [...document.querySelectorAll('.count-add')]
const showcaseFull = document.querySelector('.showcase-full')
const cartBttn = document.querySelector('.icon-cart')
const cartPop = document.querySelector('.cart-pop')
const addCart = document.querySelector('.add-cart')

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
    minicases.forEach(minicase => minicase.classList.remove('active'))
    const i = minicases.indexOf(e.target)
    showcase.style.setProperty('background-image', `url('./images/image-product-${i+1}.jpg')`)
    e.target.classList.add('active')
}

countBttns.forEach(bttn => bttn.addEventListener('click', handleClickAddBttn))
function handleClickAddBttn(e) {
    const walk = e.target.dataset.walk

    productsCount = parseInt(countDiv.innerHTML) + parseInt(walk)
    if (productsCount < 1) productsCount = 1;

    countDiv.textContent = productsCount
}

showcase.addEventListener('click', handleClickShowase)
function handleClickShowase(e) {
    showcaseFull.classList.toggle('active')
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
                </div>
            `
        })
    }

    function toLocale(n) {
        return (n.toFixed(2)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }
}

addCart.addEventListener('click', handleClickAddCart)
function handleClickAddCart(e) {
    if (!cart.includes(product)) cart.push(product);
    const actualProduct = cart
        .find(item => item.name === product.name)
    if (!actualProduct['count']) actualProduct['count'] = 0
    actualProduct['count'] += productsCount

    attCart()
}