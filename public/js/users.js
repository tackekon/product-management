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
const refuseFriend = (button) => {
  button.addEventListener("click" , () => {
    // lấy ra class là 'box-user' và add thêm class là 'refuse'
    button.closest(".box-user").classList.add("refuse");

    const userId = button.getAttribute("btn-refuse-friend");
    
    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
}

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0 ){
  listBtnRefuseFriend.forEach( button => {
    refuseFriend(button);
  });
}
// End Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn
// btn-accept-friend
const acceptFriend = (button) => {
  button.addEventListener("click" , () => {
    button.closest(".box-user").classList.add("accepted");

    const userId = button.getAttribute("btn-accept-friend");
    
    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
}
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0 ) {
  listBtnAcceptFriend.forEach( button => {
    acceptFriend(button);
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

// SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUsersAccept = document.querySelector("[data-users-accept]");
if(dataUsersAccept) {
  const userId = dataUsersAccept.getAttribute("data-users-accept");
  
  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    if(userId === data.userId) {
      // Vẽ user ra giao diện
      const div = document.createElement("div");
      div.classList.add("col-6");

      div.innerHTML = `
        <div class="box-user">
          <div class="inner-avatar">
            <img src="/images/avatar.png" alt="${data.infoUserA.fullName}">
          </div>
          <div class="inner-info">
            <div class="inner-name">
              ${data.infoUserA.fullName}
            </div>
            <div class="inner-buttons">
              <button 
                class="btn btn-sm btn-primary mr-1"
                btn-accept-friend="${data.infoUserA._id}"
              >
                Chấp nhận
              </button>
              <button
                class="btn btn-sm btn-secondary mr-1"
                btn-refuse-friend="${data.infoUserA._id}"
              >
                Xóa
              </button>
              <button
                class="btn btn-sm btn-secondary mr-1"
                btn-deleted-friend=""
                disabled=""
              >
                Đã xoá
              </button>
              <button
                class="btn btn-sm btn-primary mr-1"
                btn-accepted-friend=""
                disabled=""
              >
                Đã chấp nhận
              </button>
            </div>
          </div>
        </div>
      `;
      dataUsersAccept.appendChild(div);
      // End Vẽ user ra giao diện

      // Huỷ lời mời kết bạn
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);
      // End Huỷ lời mời kết bạn

      // Chấp nhận lời mời kết bạn
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
      // End Chấp nhận lời mời kết bạn

    }
});
}

// End SERVER_RETURN_INFO_ACCEPT_FRIEND