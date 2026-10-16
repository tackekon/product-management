const User = require("../../models/user.model");

module.exports = (res) => {
  global._io.once('connection', (socket) => {
    // Chức năng gửi yêu cầu
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userId); // Id của B

      // Thêm id của A vào acceptFriends của B
      const exitUserAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });
      if(!exitUserAinB) {
        await User.updateOne({
          _id: userId
        }, {
          $push: {acceptFriends: myUserId }
        });
      }

      // Thêm id của B vào requestFriends của A
      const exitUserBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });
      if(!exitUserBinA) {
        await User.updateOne({
          _id: myUserId
        }, {
          $push: {requestFriends: userId }
        });
      }


    });

    // Chức năng huỷ gửi yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userId); // Id của B

      // Xoá id của A vào acceptFriends của B
      const exitUserAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });
      if(exitUserAinB) {
        await User.updateOne({
          _id: userId
        }, {
          $pull: {acceptFriends: myUserId } // pull là xoá 
        });
      }

      // Xoá id của B vào requestFriends của A
      const exitUserBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });
      if(exitUserBinA) {
        await User.updateOne({
          _id: myUserId
        }, {
          $pull: {requestFriends: userId }
        });
      }
    });

  });
}
  
