// src/controllers/farmerController.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FarmerService from '../services/farmerService';

class FarmerController {

    async getAllFarmers(req: Request, res: Response) {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return res.status(StatusCodes.OK).json(farmers);
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async getFarmerById(req: Request, res: Response) {
        try {
            const numberId = parseInt(req.params.id, 10);
            const farmer = await FarmerService.getFarmerById(numberId);
            if (!farmer) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Fazendeiro não encontrado' });
            }
            return res.status(StatusCodes.OK).json(farmer);

        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async createFarmer(req: Request, res: Response) {
        try {
            const farmer = await FarmerService.createFarmer(req.body);
            return res.status(StatusCodes.CREATED).json(farmer);
        } catch (error: any) {
            if (error.message === 'CPF ou CNPJ já cadastrado.') {
                return res.status(StatusCodes.CONFLICT).json({ message: error.message });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

        }
    }

    async update(req: Request, res: Response) {
        try {
            const numberId = parseInt(req.params.id, 10);
            const farmer = await FarmerService.updateFarmer(numberId, req.body);
            return res.status(StatusCodes.OK).json(farmer);
        } catch (error: any) {
            console.log(`${JSON.stringify(error.message, null, 2)}`);

            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    async deleteFarmer(req: Request, res: Response) {
        try {
            const numberId = parseInt(req.params.id, 10);
            await FarmerService.deleteFarmer(numberId);
            return res.sendStatus(StatusCodes.NO_CONTENT);
        } catch (error: any) {
            if (error.message === "Fazendeiro não encontrado") {

                return res.status(StatusCodes.NOT_FOUND).json({ messsage: error.message });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}

export default new FarmerController();