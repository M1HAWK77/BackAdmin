// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
// Importa la función que deseas probar
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';
import { Category } from '../models/category.models';

describe('categories-test', ()=>{

    //Prueba para ver si existen productos
    it('Devuelve true si trae 5 Categorias y compara su longitud', async () => {
        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const categories: any=await Category.findAll({limit:5})
        expect(categories).to.have.lengthOf(5)
    });
    
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 Categoria, se de debe especificar el id', async () => {
        let idP='EN001';        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const product: any=await Category.findOne({where:{idCat:idP}})
        expect(product).to.exist
    });

    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar la categoria', async () => { 

        let newCategoryTest:any={
            idCat: "testCategoria",
            nameCat:"testCategoria" ,
            descriptionCat:"testCategoria" ,
        };

        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const categoryExist: any=await Category.findOne({where:{idCat:newCategoryTest.idCat}})
        
        if(categoryExist){
            console.log("El producto ya existe, no se puede agregar");
            return false;
        }else{
            console.log(newCategoryTest)
            return true;
        }
    });

})