import express from "express";
export const cartsRouter = express.Router();

cartsRouter.post("/", (req, res) => {
	throw new Error("Must implement");
});

cartsRouter.get("/:cid", (req, res) => {
	throw new Error("Must implement");
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
	throw new Error("Must implement");
});
