const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema(
  { 
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
  },
  {
    timestamps: true
  }
);

// Tham số thứ 3 là tên collection trong database, nếu không có tham số này thì mongoose sẽ tự động chuyển tên model sang dạng số nhiều và viết thường để làm tên collection
const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, "settings-general");

module.exports = SettingGeneral;