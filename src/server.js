import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Products API endpoints
app.use("/api/products", productsRouter);

// Carts API endpoints
app.use("/api/carts", cartsRouter);

app.listen(port, () => {
	console.log(`Server running in http://localhost:${port}`);
});
