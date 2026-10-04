const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  const filterStatus = filterStatusHelper(req.query);
  
  let find = {
    deleted: false
  };
  
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItem: 4
    },
    req.query,
    countProducts
  );
  // End Pagination

  const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id },{ status: status });

  // Express 5 no longer supports the magic string back in the res.redirect() and res.location() methods. 
  // Instead, use the req.get('Referrer') || '/' value to redirect back to the previous page. In Express 4, the res.redirect('back') and res.location('back') methods were deprecated.
  // refer to https://expressjs.com/en/guide/migrating-5/

  //res.redirect("back");
  res.redirect(req.get('Referrer') || '/');
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids }}, { status: "active" } );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids }}, { status: "inactive" } );
      break;
    default:
      break;
  }

  res.redirect(req.get('Referrer') || '/');
};