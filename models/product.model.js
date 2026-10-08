const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: 
    { type: String,
      default : ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
      type: String, 
      slug: "title",
      unique: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

// Tham số thứ 3 là tên collection trong database, nếu không có tham số này thì mongoose sẽ tự động chuyển tên model sang dạng số nhiều và viết thường để làm tên collection
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;