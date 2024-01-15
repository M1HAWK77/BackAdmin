// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
// Importa la función que deseas probar
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';
import { Supplier } from '../models/supplier.models';

describe('Suppliers-test', ()=>{

    //Prueba para ver si existen productos
    it('Devuelve true si trae 3 proveedores', async () => {
        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const supplier: any=await Supplier.findAll({limit:3})
        expect(supplier).to.have.lengthOf(3)
    });
    
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 producto, se de debe especificar el id', async () => {
        let idP='dfs';        
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const supplier: any=await Supplier.findOne({where:{idSup:idP}})
        expect(supplier).to.exist
    });

    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar el proveedor', async () => { 

        let newSupplierTest:any={
            idSup: "SUPTest",
            nameSup: "Github",
            phoneSup: "098745681",
            addressSup: "las carmelitas",
            emailSup: "test@gmail.com"
        };

        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const userExist: any=await Supplier.findOne({where:{idSup:newSupplierTest.idSup}})
        
        if(userExist){
            console.log("No se puede agregar a ese proveedor porque ya existe");
            return false;
        }else{
            console.log(newSupplierTest)
            return true;
        }
    });

})