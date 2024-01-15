// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
// Importa la función que deseas probar
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';
import { ProductOutput } from '../models/productOutput.models';

describe('output-test', ()=>{

    it('Devuelve true si trae 2 salidas de productos', async () => {
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const products: any=await ProductOutput.findAll({limit:2})
        expect(products).to.have.lengthOf(2)
    });
    
})