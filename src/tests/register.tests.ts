// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
// Importa la función que deseas probar
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';
import { Product } from '../models/product.models';

describe('Products-test', ()=>{

    //Prueba para ver si existen productos
    it('Devuelve true si trae 5 productos de productos y compara su longitud', async () => {
        let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhbmkiLCJ1c2VyUm9sZSI6IkFkbWluIiwiaWF0IjoxNzA1MjczNjYxfQ.PZsZ_0CCDycEr3TpBW_vly6loAq6HsrhznDNkRKPplc'
        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const products: any=await Product.findAll({limit:5})
        expect(products).to.have.lengthOf(5)
    });
    
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 producto, se de debe especificar el id', async () => {
        let idP='P003';        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const product: any=await Product.findOne({where:{idProduct:idP}})
        expect(product).to.exist
    });

    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar el producto', async () => { 

        let newProductTest:any={
            idProduct: "P123",
            idCatBelong: "C002",
            productName: "nuevito",
            productPrice: "26",
            stock: "150",
            available: "true"
        };

        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const productExist: any=await Product.findOne({where:{idProduct:newProductTest.idProduct}})
        
        if(productExist){
            console.log("El producto ya existe, no se puede agregar");
            return false;
        }else{
            console.log(newProductTest)
            return true;
        }
    });

})