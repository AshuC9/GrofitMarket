const axios = require('axios');
import Noty from 'noty'
let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cart-counter');

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Item is added to cart',
            progressBar: false,
        }).show();
    })
}
addToCart.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		let item = JSON.parse(btn.dataset.item);
		updateCart(item)
	});
});
