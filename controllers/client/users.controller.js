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