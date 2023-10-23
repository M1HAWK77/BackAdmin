"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOutput = exports.ProductOutput = exports.DetailRegistration = exports.ProductRegistration = exports.Supplier = exports.User = exports.Category = exports.Product = void 0;
const product_models_1 = require("./product.models");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_models_1.Product; } });
const category_models_1 = require("./category.models");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return category_models_1.Category; } });
const user_models_1 = require("./user.models");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_models_1.User; } });
const supplier_models_1 = require("./supplier.models");
Object.defineProperty(exports, "Supplier", { enumerable: true, get: function () { return supplier_models_1.Supplier; } });
const productRegistration_models_1 = require("./productRegistration.models");
Object.defineProperty(exports, "ProductRegistration", { enumerable: true, get: function () { return productRegistration_models_1.ProductRegistration; } });
const productOutput_models_1 = require("./productOutput.models");
Object.defineProperty(exports, "ProductOutput", { enumerable: true, get: function () { return productOutput_models_1.ProductOutput; } });
const detailProductOutput_models_1 = require("./detailProductOutput.models");
Object.defineProperty(exports, "DetailOutput", { enumerable: true, get: function () { return detailProductOutput_models_1.DetailOutput; } });
const detailProductRegistration_models_1 = require("./detailProductRegistration.models");
Object.defineProperty(exports, "DetailRegistration", { enumerable: true, get: function () { return detailProductRegistration_models_1.DetailRegistration; } });
//@Associations
//Its difficult to understand but
//Product
//“The product in the table has a foreign key called idCatBelong, and a category could have some products, but a product could only have one category.”
category_models_1.Category.hasMany(product_models_1.Product, { foreignKey: "idCatBelong", onUpdate: 'CASCADE' });
//User Register and Output products
productRegistration_models_1.ProductRegistration.belongsTo(user_models_1.User, { foreignKey: "dniUserReceive", onUpdate: 'CASCADE' });
productOutput_models_1.ProductOutput.belongsTo(user_models_1.User, { foreignKey: "dniUserOutput", onUpdate: 'CASCADE' });
//Supplier in Register products
productRegistration_models_1.ProductRegistration.belongsTo(supplier_models_1.Supplier, { foreignKey: 'idSup', onUpdate: 'CASCADE' });
//Product Registration Detail
product_models_1.Product.hasMany(detailProductRegistration_models_1.DetailRegistration, { foreignKey: 'idProductBelong', onUpdate: 'CASCADE' });
productRegistration_models_1.ProductRegistration.hasMany(detailProductRegistration_models_1.DetailRegistration, { foreignKey: 'idRegistrationBelong', onUpdate: 'CASCADE' });
//Product Output Detail
product_models_1.Product.hasMany(detailProductOutput_models_1.DetailOutput, { foreignKey: 'idProductBelong', onUpdate: 'CASCADE' });
productOutput_models_1.ProductOutput.hasMany(detailProductOutput_models_1.DetailOutput, { foreignKey: 'idOutputBelong', onUpdate: 'CASCADE' });
