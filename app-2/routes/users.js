const express = require('express');
const router = express.Router();
const { User,UserValidationSchema } = require('../models/User');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
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
 *                   email:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('users/list', { users });
});

/**
 * @swagger
 * /users/new:
 *   get:
 *     summary: Render form to create a new user
 *     responses:
 *       200:
 *         description: Form to create a new user
 */
router.get('/new', (req, res) => {
  res.render('users/new');
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of users
 */
router.post('/', validate(UserValidationSchema), async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.redirect('/users');
});

/**
 * @swagger
 * /users/{id}/edit:
 *   get:
 *     summary: Render form to edit a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form to edit a user
 */
router.get('/:id/edit', validate(UserValidationSchema), async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', { user });
});

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Update a user
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of users
 */
router.post('/:id', validate(UserValidationSchema), async (req, res) => {
  const { name, email, password } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, password });
  res.redirect('/users');
});

/**
 * @swagger
 * /users/{id}/delete:
 *   get:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the list of users
 */
router.get('/:id/delete', validate(UserValidationSchema), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/users');
});

module.exports = router;