const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
   user_id: String,
   products: [
    { 
      product_id: String,
      quantity: Number
    }
   ]
  },
  {
    timestamps: true
  }
);

// Tham số thứ 3 là tên collection trong database, nếu không có tham số này thì mongoose sẽ tự động chuyển tên model sang dạng số nhiều và viết thường để làm tên collection
const Cart = mongoose.model('Cart', cartSchema, "carts");

module.exports = Cart;