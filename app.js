const listProducts = document.querySelector('.list-products')
const listCart = document.querySelector('.list-cart')
const cart = document.querySelector('.cart')
let productsCart = []

loadEventListener()
function loadEventListener() {

    listProducts.addEventListener('click', agregarProduct)

    cart.addEventListener('click', deleteProduct)
}

function agregarProduct(e) {
    if (e.target.classList.contains('add-product-cart')) {
        const product = e.target.parentElement.parentElement
        readProduct(product)
    }

}

function deleteProduct(e) {

    if (e.target.classList.contains('delete-item')) {

        const productId = e.target.getAttribute('data-id')
        
        productsCart = productsCart.filter(product => product.id !== productId)

        carritoHtml()
    }
    
}

function readProduct(product) {

    const productInfo = {
        image: product.querySelector('img').src,
        type: product.querySelector('.text-color-opacity').textContent,
        name: product.querySelector('.product-bottom p strong').textContent,
        price: product.querySelector('.text-color-red').textContent,
        id: product.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = productsCart.some(product => product.id === productInfo.id)
    if (existe) {
        const products = productsCart.map(product=>{
            if (product.id === productInfo.id) {
                product.cantidad++
                return product
            }else{
                return product
            }
        })
        productsCart=[...products]
    }else{
        productsCart = [...productsCart, productInfo]
    }

    carritoHtml()

}

function carritoHtml() {

    limpiarHtml()

    productsCart.forEach(product => {
        const { name, cantidad, price, id } = product
        const itemCart = document.createElement('div')
        itemCart.classList.add('item-card')
        itemCart.innerHTML = `
        <h4>${name}</h4>
        <div class="item-bottom">
          <div class="item-information">
            <p>X${cantidad}</p>
            <p>${price}</p>
            <p>$${(+price.slice(1, 4) * cantidad).toFixed(2)}</p>
          </div>
          <div class="btn-item-card">
            <button class="delete-item" data-id='${id}'>X</button>
          </div>
          
        </div>
        `
        listCart.appendChild(itemCart)

    })


}

function limpiarHtml() {

    while (listCart.firstChild) {
        listCart.removeChild(listCart.firstChild)
    }
}