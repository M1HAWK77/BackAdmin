import { Product } from "./product.models";
import { Category } from "./category.models";
import { User } from "./user.models";
import { Supplier } from "./supplier.models";
import { ProductRegistration } from "./productRegistration.models";
import { ProductOutput } from "./productOutput.models";
import { DetailOutput } from "./detailProductOutput.models";
import { DetailRegistration } from "./detailProductRegistration.models";

//@Associations

//Its difficult to understand but

//Product
//“The product in the table has a foreign key called idCatBelong, and a category could have some products, but a product could only have one category.”
Category.hasMany(Product, { foreignKey: "idCatBelong", onUpdate: 'CASCADE' });

//User Register and Output products
ProductRegistration.belongsTo(User, { foreignKey: "dniUserReceive", onUpdate: 'CASCADE' });
ProductOutput.belongsTo(User, { foreignKey: "dniUserOutput", onUpdate: 'CASCADE' });

//Supplier in Register products
ProductRegistration.belongsTo(Supplier, {foreignKey: 'idSup', onUpdate: 'CASCADE'});

//Product Registration Detail
Product.hasMany(DetailRegistration, {foreignKey: 'idProductBelong', onUpdate: 'CASCADE'});
ProductRegistration.hasMany(DetailRegistration, {foreignKey:'idRegistrationBelong', onUpdate: 'CASCADE'});

//Product Output Detail
Product.hasMany(DetailOutput, {foreignKey: 'idProductBelong', onUpdate: 'CASCADE'});
ProductOutput.hasMany(DetailOutput, {foreignKey:'idOutputBelong', onUpdate: 'CASCADE'});


export{
    Product,
    Category,
    User,
    Supplier,
    ProductRegistration,
    DetailRegistration,
    ProductOutput,
    DetailOutput
}