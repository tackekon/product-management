const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
  {
    //user_id: String,
    cart_id: String,
    userInfo: {
      fullName:  String,
      phone: String,
      address: String,
    },
    // mảng products gồm nhiều object 
    products: [
      {
        product_id: String,
        price: Number,
        discountPercantage: Number,
        quantity: Number
      }
    ],
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
const Order = mongoose.model('Order', orderSchema, "orders");

module.exports = Order;