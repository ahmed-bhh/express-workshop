const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { Category, ProductValidationSchema } = require('../models/Category');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const products = await Product.find().populate('category');
  res.render('products/list', { products });
});

/**
 * @swagger
 * /products/new:
 *   get:
 *     summary: Render form to create a new product
 *     responses:
 *       200:
 *         description: Form to create a new product
 */
router.get('/new', async (req, res) => {
  const categories = await Category.find();
  res.render('products/new', { categories });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of products
 */
router.post('/', validate(ProductValidationSchema), async (req, res) => {
  const { name, price, category } = req.body;
  await Product.create({ name, price, category });
  res.redirect('/products');
});

/**
 * @swagger
 * /products/{id}/edit:
 *   get:
 *     summary: Render form to edit a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form to edit a product
 */
router.get('/:id/edit', validate(ProductValidationSchema), async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = await Category.find();
  res.render('products/edit', { product, categories });
});

/**
 * @swagger
 * /products/{id}:
 *   post:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of products
 */
router.post('/:id', validate(ProductValidationSchema), async (req, res) => {
  const { name, price, category } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, category });
  res.redirect('/products');
});

/**
 * @swagger
 * /products/{id}/delete:
 *   get:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of products
 */
router.get('/:id/delete', validate(ProductValidationSchema), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;