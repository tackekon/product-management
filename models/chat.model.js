const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
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
const Chat = mongoose.model('Chat', chatSchema, "chats");

module.exports = Chat;