// Xử lý Front End Admin, folder public là FE.
// Button Status
// Class tự định nghĩa dùng ngoặc vuông [button-status]
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
  let url = new URL(window.location.href);
  
  buttonStatus.forEach(button => {
    button.addEventListener("click",  () => {
      const status = button.getAttribute("button-status");

      if(status) {
        url.searchParams.set("status", status);
      }   else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    // lấy keyword trong form search
    const keyword = e.target.elements.keyword.value;
    //console.log(e.target.elements.keyword.value);
    if(keyword) {
        //set keyword vào url
        url.searchParams.set("keyword", keyword);
      }   else {
        //xoá keyword trên url
        url.searchParams.delete("keyword");
      }

      window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click",() => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
};
// End Pagination