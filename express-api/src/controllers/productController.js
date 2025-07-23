/*WILL USE MOCK DATA WHILE DATABASE IS NOT IMPLEMENTED */
import Product from "../models/Product.js";
import { mapDbErrorToStatusCode } from "../utils/dbErrorHelper.js";

const products = [
    new Product("57e95887-dc12-4a11-a801-352e658147d1", 'Laptop', 1999.99, 'High-performance laptop for developers'),
    new Product("9c5765fc-9504-41e0-a536-7b759da1fe92", 'Smartphone', 899.49, 'Latest model smartphone'),
    new Product("9cc3ea34-390a-4036-bf49-a27997a4c125", 'Headphones', 129.99, 'Noise-cancelling over-ear headphones'),
    new Product("23a689c9-999c-43ea-b1e5-c196aae6811a", 'Monitor', 299.00, '27-inch 4K monitor'),
];

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
export const createProduct = (req, res) => {
    //TODO: Create a product in DB
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = {
        /*SEQUALIZE WILL LATER GENERATE A UUID WHEN CREATING A PRODUCT
        I dont feel like installing uuid package rn*/
        name,
        price,
        description
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
}

//MARK: UPDATE A PRODUCT
export const updateProductById = (req, res) => {
    //TODO: Update a specific product in DB
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const existingProduct = products[productIndex];

    const updatedProduct = {
        ...existingProduct,
        name: req.body.name ?? existingProduct.name,
        price: req.body.price ?? existingProduct.price,
        description: req.body.description ?? existingProduct.description
    };

    products[productIndex] = updatedProduct;

    res.json(updatedProduct)
}

//MARK: DELETE A PRODUCT
export const deleteProductById = (res, req) => {
    //TODO: Deleta aspecific product from db
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
}