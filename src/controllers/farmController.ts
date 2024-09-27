import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FarmService from '../services/farmService';

class FarmController {

    async getAllFarms(req: Request, res: Response) {
        const farms = await FarmService.getAllFarms();
        res.status(StatusCodes.OK).json(farms);
    }

    async getFarmById(req: Request, res: Response) {
        const farmId = parseInt(req.params.id, 10);
        if (isNaN(farmId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid farmer ID' });
        }
        const farm = await FarmService.getFarmById(farmId);
        if(!farm){
            return res.status(StatusCodes.NOT_FOUND).json({error: "Fazenda não encontrada"});
        }
        res.status(StatusCodes.OK).json(farm);
    }

    async createFarm(req: Request, res: Response) {
        const farm = await FarmService.createFarm(req.body);
        res.status(StatusCodes.CREATED).json(farm);
    }

    async updateFarm(req: Request, res: Response) {
        const farmId = parseInt(req.params.id, 10);
        if (isNaN(farmId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid farmer ID' });
        }
        const farm = await FarmService.updateFarm(farmId, req.body);
        res.status(StatusCodes.OK).json(farm);
    }

    async deleteFarm(req: Request, res: Response) {
        const farmId = parseInt(req.params.id, 10);
        if (isNaN(farmId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid farmer ID' });
        }
        await FarmService.deleteFarm(farmId);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}

export default new FarmController();