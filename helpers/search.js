module.exports = (query) => {
  let objectSearch = {
    keyword: ""
  }

  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    // "i" không phân biệt hoa/thường
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  return objectSearch;
}