module.exports = (objectPagination, query, countProducts) => {
  if(query.page){
    objectPagination.currentPage = parseInt(query.page);
  };

  // objectPagination.skip = vị trí bắt đầu lấy = (trang hiện tại -1) * số lượng phần tử mỗi trang
  objectPagination.skip = (objectPagination.currentPage - 1)* objectPagination.limitItem;
  
  // tổng số trang (làm tròn lên) = tổng sp / số lượng phần tử mỗi trang
  const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
  objectPagination.totalPage = totalPage;

  return objectPagination;
}