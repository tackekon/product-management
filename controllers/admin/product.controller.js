const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system.js");


const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.js");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products
module.exports.index = async (req, res) => {
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
    limitItems: 4
    },
    req.query,
    countProducts
  );
  // End Pagination

  // Sort
  let sort ={};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue ;
  } else {
    sort.position = "desc";
  }
  // End Sort  

  const products = await Product.find(find)
  .sort(sort)
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);

  for (const product of products) {
    // Lấy ra thông tin người tạo
    const user = await Account.findOne({
      _id: product.createdBy.account_id
    });
    
    if(user) {
      product.accountFullName = user.fullName;
    }
    
    // Lấy ra thông tin người cập nhật gần nhất
    const updatedBy = product.updatedBy.slice(-1)[0];
    if(updatedBy){
      const userUpdated = await Account.findOne({
        _id: updatedBy.account_id
      });
      
      updatedBy.accountFullName = userUpdated.fullName;
    }
    
  }


  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
  }

  await Product.updateOne({ _id: id },{ 
    status: status,
    $push: { updatedBy: updatedBy }
  });
  
  req.flash("success","Cập nhật trạng thái thành công!");

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

  const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
  }

  switch (type) {
    case "active":
      // ref https://stackoverflow.com/questions/20096885/update-multiple-documents-by-id-set-mongoose
      await Product.updateMany({ _id: { $in: ids }}, { 
        status: "active",
        $push: { updatedBy: updatedBy }
       });
      req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids }}, { 
        status: "inactive",
        $push: { updatedBy: updatedBy }
       });
      req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids }}, 
        { 
          deleted: true,
          //deletedAt: new Date() 
          deletedBy: { 
            account_id : res.locals.user.id,
            deletedAt: new Date() 
          }
        }
      );
      req.flash("success",`Đã xoá thành công ${ids.length} sản phẩm!`);

      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);

        await Product.updateOne ({ _id: id },{
          position: position,
          $push: { updatedBy: updatedBy }
        });

      }
      req.flash("success",`Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }

  res.redirect(req.get('Referrer') || '/');
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    {
    deleted: true,
    //deletedAt: new Date() 
    deletedBy: { 
      account_id : res.locals.user.id,
      deletedAt: new Date() 
    }
  });

  req.flash("success",`Đã xoá thành công sản phẩm!`);

  res.redirect(req.get('Referrer') || '/');
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
   let find = {
      deleted: false
    };
  
    const category = await ProductCategory.find(find);
    const newCategory = createTreeHelper.tree(category);

  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  // console.log(req.body);
  if (req.body.position == "") {
    // Hàm count bị gỡ bỏ trong các phiên bản Mongoose ODM mới, từ V6.x
    // const countProducts = await Product.count ();
    const countProducts = await Product.countDocuments ();
    req.body.position = countProducts + 1 ;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // if(req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }

  req.body.createdBy = { account_id: res.locals.user.id };
  
  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
      const find = {
      deleted: false,
      _id: req.params.id
    }

    const product = await Product.findOne(find);

    const category = await ProductCategory.find({
      deleted: false
    });
    const newCategory = createTreeHelper.tree(category);


    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory

    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id =  req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
 

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }

    await Product.updateOne({_id: id}, {
        // Dấu ... trong đoạn code trên được gọi là Toán tử Spread (Spread Operator) của JavaScript (ES6). Ý nghĩa của nó là "rải" hoặc "sao chép" toàn bộ các cặp thuộc tính (key-value) có bên trong đối tượng req.body vào trong đối tượng cấu hình update của Mongoose.
        ...req.body,
        $push: { updatedBy: updatedBy }
      });
    req.flash("success",`Cập nhật thành công.`);
  } catch (error) {
    req.flash("error",`Cập nhật thất bại.`);
  }


  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

module.exports.detail = async (req, res) => {
  try {
      const find = {
      deleted: false,
      _id: req.params.id
    }

    const product = await Product.findOne(find);

    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product

    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    
  }
};