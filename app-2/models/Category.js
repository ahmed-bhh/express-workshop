const mongoose = require('mongoose');
const yup = require('yup');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         name: Electronics
 */
const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

// Validation schema using yup
const CategoryValidationSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required('Category name is required'),
  }),
  params: yup.object({
    id: yup.string().required('Category ID is required'),
  }),
  query: yup.object(),
});

module.exports = {
  Category: mongoose.model('Category', categorySchema),
  CategoryValidationSchema,
};