import express from "express";
import { CartsManager, generateCartFromRequest } from "../carts-manager";
import { productManager } from "./products.routes";

export const cartsRouter = express.Router();

const cartsManager = new CartsManager("./src/carrito.json");

cartsRouter.post("/", (req, res) => {
	let newCart = {};

	try {
		newCart = generateCartFromRequest(req);
	} catch (error) {
		res.status(404).send({ message: error });
	}

	try {
		cartsManager.addCart(newCart);
		res.status(200).send({ message: "New empty cart generated successfully" });
	} catch (error) {
		res.status(500).send({ message: "Oops, something went wrong ... " });
	}
});

cartsRouter.get("/:cid", (req, res) => {
	let products = [];
	const cartID = req.params;

	if (!cartID) {
		res.status(400).send({ message: "Cart id not found in request" });
	}

	try {
		products = cartsManager.productsOnCartById(cartID);
	} catch (error) {
		res.status(500).send({ message: error });
	}

	res
		.status(200)
		.send({ message: "Products queried successfully", products: products });
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
	const { cid, pid } = req.params;

	try {
		cartsManager.existsCartWithID(cid) &&
			productManager.existsProductWithID(pid);
	} catch (error) {
		res.status(400).send({ message: error });
	}

	cartsManager.addProductWithIDtoCartWithID(pid, cid);

	return res
		.status(200)
		.send({ message: `Product with id ${pid} added to cart with id ${cid}` });
});
