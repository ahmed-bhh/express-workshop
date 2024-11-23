const express = require('express');
const router = express.Router();
const { Category,CategoryValidationSchema } = require('../models/Category');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
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
 */
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('categories/list', { categories });
});

/**
 * @swagger
 * /categories/new:
 *   get:
 *     summary: Render form to create a new category
 *     responses:
 *       200:
 *         description: Form to create a new category
 */
router.get('/new', (req, res) => {
  res.render('categories/new');
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of categories
 */
router.post('/', validate(CategoryValidationSchema), async (req, res) => {
  const { name } = req.body;
  await Category.create({ name });
  res.redirect('/categories');
});

/**
 * @swagger
 * /categories/{id}/edit:
 *   get:
 *     summary: Render form to edit a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form to edit a category
 */
router.get('/:id/edit', validate(CategoryValidationSchema), async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('categories/edit', { category });
});

/**
 * @swagger
 * /categories/{id}:
 *   post:
 *     summary: Update a category
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
 *     responses:
 *       302:
 *         description: Redirect to the list of categories
 */
router.post('/:id', validate(CategoryValidationSchema), async (req, res) => {
  const { name } = req.body;
  await Category.findByIdAndUpdate(req.params.id, { name });
  res.redirect('/categories');
});

/**
 * @swagger
 * /categories/{id}/delete:
 *   get:
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of categories
 */
router.get('/:id/delete', validate(CategoryValidationSchema), async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/categories');
});

module.exports = router;