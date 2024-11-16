const mongoose = require('mongoose');

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
  name: { type: String, unique: true },
});

module.exports = mongoose.model('Category', categorySchema);