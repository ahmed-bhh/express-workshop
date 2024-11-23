const mongoose = require('mongoose');
const yup = require('yup');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category id of the product
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         name: iPhone 12
 *         price: 999
 *         category: 60d0fe4f5311236168a109cb
 */
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

// Validation schema using yup
const ProductValidationSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required('Product name is required').min(3, 'Product name is too short').max(10, 'Product name is too long'),
    price: yup.number().required('Product price is required'),
    category: yup.string().required('Product category is required'),
  }),
  params: yup.object({
    id: yup.string().required('Product ID is required'),
  }),
  query: yup.object(),
});

module.exports = {
  Product: mongoose.model('Product', productSchema),
  ProductValidationSchema,
};