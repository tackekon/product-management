const Role = require("../../models/role.model");

const systemConfig = require("../../config/system.js");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
      deleted:false
    };
    
    const records = await Role.find(find)

    res.render("admin/pages/role/index", {
      pageTitle:"Nhóm quyền",
      records: records
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    let find = {
      deleted:false
    };
    
    const records = await Role.find(find)

    res.render("admin/pages/role/create", {
      pageTitle:"Tạo Nhóm quyền",

    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
}