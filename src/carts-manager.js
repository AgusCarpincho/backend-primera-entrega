import { v4 as uuidv4 } from "uuid";

export function generateCartFromRequest(aRequest) {
	if (JSON.parse(aRequest.body.products).length != 0) {
		throw new Error(
			"Products structure must not have any information. Bad information sended in request"
		);
	}

	const newCart = {
		id: uuidv4(),
		products: JSON.parse(aRequest.body.products),
	};
}

export class CartsManager {
	#path;
	#carts;
	constructor(aPath) {
		this.#path = aPath;
		this.#carts = [];
	}
	addCart(aCart) {
		if (!aCart) throw new Error("Cart doesnt exists");
		if (!aCart.products)
			throw new Error("Cart must have a structure of products");

		this.#carts.push(aCart);
	}
	productsOnCartById(aCartID) {
		const cart = this.#carts.find((cart) => cart.id.includes(aCartID));
		return [...cart.products];
	}
}
