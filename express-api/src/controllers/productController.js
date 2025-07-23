/*WILL USE MOCK DATA WHILE DATABASE IS NOT IMPLEMENTED */
import Product from "../models/Product.js";
import { productSchema, updateProductSchema } from "../schemas/productSchema.js";
import { mapDbErrorToStatusCode } from "../utils/dbErrorHelper.js";

const products = [
    new Product("57e95887-dc12-4a11-a801-352e658147d1", 'Laptop', 1999.99, 'High-performance laptop for developers'),
    new Product("9c5765fc-9504-41e0-a536-7b759da1fe92", 'Smartphone', 899.49, 'Latest model smartphone'),
    new Product("9cc3ea34-390a-4036-bf49-a27997a4c125", 'Headphones', 129.99, 'Noise-cancelling over-ear headphones'),
    new Product("23a689c9-999c-43ea-b1e5-c196aae6811a", 'Monitor', 299.00, '27-inch 4K monitor'),
];

//MARK: GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    }
    catch (error) {
        const statusCode = mapDbErrorToStatusCode(error.code);
        res.status(statusCode).json({ error: error.message })
    }
}

//MARK: GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id); // Busca pelo Product.id

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        const statusCode = mapDbErrorToStatusCode(error.code);
        res.status(statusCode).json({ error: error.message });
    }
}

//MARK: CREATE A PRODUCT
export const createProduct = async (req, res) => {
    try {
        // Valida req.body com base no ../schemas/productSchema.js
        const validatedData = await productSchema.validate(req.body, { abortEarly: false });

        const newProduct = await Product.create(validatedData);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = error.errors;
            return res.status(400).json({ error: messages });
        }

        const statusCode = mapDbErrorToStatusCode(error.code);
        res.status(statusCode).json({ error: error.message });
    }
}

//MARK: UPDATE A PRODUCT
export const updateProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }


        const validatedData = await updateProductSchema.validate(req.body, { abortEarly: false });

        await product.update(validatedData);

        res.json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.errors });
        }
        const statusCode = mapDbErrorToStatusCode(error.code);
        res.status(statusCode).json({ error: error.message });
    }
}

//MARK: DELETE A PRODUCT
export const deleteProductById = async (res, req) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await product.destroy();
        return res.status(204).send();
    } catch (error) {
        const statusCode = mapDbErrorToStatusCode(error.code);
        res.status(statusCode).json({ error: error.message });
    }
}