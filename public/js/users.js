// Chức năng gửi yêu cầu
// btn-add-friend
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
  if(listBtnAddFriend.length > 0 ){
    listBtnAddFriend.forEach( button => {
      button.addEventListener("click" , () => {
        // lấy ra class là 'box-user' và add thêm class là 'add'
        button.closest(".box-user").classList.add("add");
        const userId = button.getAttribute("btn-add-friend");
        
        socket.emit("CLIENT_ADD_FRIEND", userId);
      });
    });
  }
// End Chức năng gửi yêu cầu

// Chức năng huỷ gửi yêu cầu
// btn-cancel-friend
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
  if(listBtnCancelFriend.length > 0 ){
    listBtnCancelFriend.forEach( button => {
      button.addEventListener("click" , () => {
        // lấy ra class là 'box-user' và add thêm class là 'add'
        button.closest(".box-user").classList.remove("add");

        const userId = button.getAttribute("btn-cancel-friend");
        
        socket.emit("CLIENT_CANCEL_FRIEND", userId);
      });
    });
  }
// End Chức năng huỷ gửi yêu cầu

// Chức năng từ chối kết bạn
// btn-refuse-friend
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
  if(listBtnRefuseFriend.length > 0 ){
    listBtnRefuseFriend.forEach( button => {
      button.addEventListener("click" , () => {
        // lấy ra class là 'box-user' và add thêm class là 'refuse'
        button.closest(".box-user").classList.add("refuse");

        const userId = button.getAttribute("btn-refuse-friend");
        
        socket.emit("CLIENT_REFUSE_FRIEND", userId);
      });
    });
  }
// End Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn
// btn-accept-friend
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0 ) {
  listBtnAcceptFriend.forEach( button => {
    button.addEventListener("click" , () => {
      // lấy ra class là 'box-user' và add thêm class là 'accepted'
      button.closest(".box-user").classList.add("accepted");

      const userId = button.getAttribute("btn-accept-friend");
      
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// End Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if(badgeUsersAccept){
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}

// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND