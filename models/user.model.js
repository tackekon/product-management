const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: {
      type: String,
      default: "active"
    },
    requestFriends: Array, // lời mời đã gửi
    acceptFriends: Array, // lời mời đã nhận
    friendList: [ // danh sách bạn bè
      {
        user_id: String,
        room_chat_id: String,
      }
    ],
    statusOnline: String,
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
const User = mongoose.model('User', userSchema, "users");

module.exports = User;