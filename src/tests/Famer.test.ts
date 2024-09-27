import request from 'supertest';
import app from '../app';
import FarmerController from '../controllers/farmerController';
import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prisma';
import factories from '../factories/farmerFactoryForTest'

const server = app.listen();
afterAll(() => server.close());
describe('FarmerController.getFarmerById', () => {
    it('should return 200 and the farmer data if the farmer is found', async () => {
        const mockFarmer = factories.buildList(1);
        await prisma.farmer.create({
            data: {
                name: mockFarmer[0].name,
                cpfOrCnpj: mockFarmer[0].cpfOrCnpj
            }
        });

        const response = await request(server).get('/farmer/1');

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual(mockFarmer[0].name);
        expect(response.body.cpfOrCnpj).toEqual(mockFarmer[0].cpfOrCnpj);
    });

    it('should return 404 if the farmer is not found', async () => {


        const response = await request(server).get('/farmer/999');

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body).toEqual({ message: "Fazendeiro não encontrado" });
    });
});