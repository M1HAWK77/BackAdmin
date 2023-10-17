import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';

/*Use pattern define because it's the same with the pattern extend Model
in this case have a class is irrelevant since sequelize doesn't admit
getters or setters*/

export const Category= connection.define('category',{
    idCat:{
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    nameCat:{
        type: DataTypes.STRING(30)
    },
    descriptionCat:{
        type: DataTypes.STRING(100)
    }
    
})
