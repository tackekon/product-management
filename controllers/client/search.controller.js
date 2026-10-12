const Product = require('../../models/product.model');
const productHelper = require('../../helpers/products');

// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newProducts = []

  if(keyword){
    // i là không phân biệt chữ hoa, thường
    const regex = new RegExp(keyword, "i");
    const products  = await Product.find({
      title: regex,
      deleted: false,
      status: "active"
    });


    newProducts = productHelper.priceNewProducts(products);

  }

  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products : newProducts
  });
  
}