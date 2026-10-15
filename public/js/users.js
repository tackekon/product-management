// Chức năng gửi yêu cầu
//btn-add-friend
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