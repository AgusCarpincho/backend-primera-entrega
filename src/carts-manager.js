const { v4 } = require("uuid");
const fs = require("fs");

function generateNewEmptyCart() {
	const newCart = {
		id: v4(),
		products: [],
	};
	return newCart;
}

class CartsManager {
	/*
	I took the decision of cache every single object to let it available for reading. I assume that the RAM is not a problem
	*/
	#path;
	#carts;
	constructor(aPath) {
		this.#path = aPath;
		this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
	}
	addCart(aCart) {
		if (!aCart) throw new Error("Cart doesnt exists");
		if (!aCart.products)
			throw new Error("Cart must have a structure of products");

		this.#carts.push(aCart);

		fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
	}
	productsOnCartById(aCartID) {
		const cart = this.#carts.find((cart) => cart.id.includes(aCartID));
		if (!cart) throw new Error(`Cart with id ${aCartID} doesn't exists`);
		if (cart.products.length == 0)
			throw new Error("There are no products in the cart");
		return [...cart.products];
	}
	existsCartWithID(aCartID) {
		return this.#carts.some((cart) => cart.id.includes(aCartID));
	}
	addProductWithIDtoCartWithID(productId, cartId) {
		const cart = this.#carts.find((cart) => cart.id.includes(cartId));

		if (cart.products.some((product) => product.id.includes(productId))) {
			let product = cart.products.find((product) =>
				product.id.includes(productId)
			);
			product.quantity++;
		} else {
			cart.products.push({ id: productId, quantity: 1 });
		}
		fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
	}
}

module.exports = { CartsManager, generateNewEmptyCart };
