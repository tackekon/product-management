const User = require("../../models/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {

  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({ _id: userId});
  
  // mảng chứa danh sách requestFriends
  const requestFriends = myUser.requestFriends;

  // mảng chứa danh sách acceptFriends
  const acceptFriends = myUser.acceptFriends;

  // chỉ lấy user theo điều kiện (không phải user locals và không nằm trong mảng requestFriends và acceptFriends)
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } }, // not equal, không lấy chính user đó
      { _id: { $nin: requestFriends } }, // not in
      { _id: { $nin: acceptFriends } } // not in
    ],
    status: "active",
    deleted: false
  }).select("id avatar fullName");


  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users
  });
}

// [GET] /users/request
module.exports.request = async (req, res) => {

  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({ _id: userId});
  
  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends } ,
    status: "active",
    deleted: false
  }).select("id avatar fullName");
  
  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users

  });

}