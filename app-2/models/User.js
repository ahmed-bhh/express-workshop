const mongoose = require('mongoose');
const yup = require('yup');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Validation schema using yup
const UserValidationSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required('User name is required'),
    email: yup.string().email('Invalid email').required('User email is required'),
    password: yup.string().required('User password is required'),
  }),
  params: yup.object({
    id: yup.string().required('User ID is required'),
  }),
  query: yup.object(),
});

module.exports = {
  User: mongoose.model('User', userSchema),
  UserValidationSchema,
};