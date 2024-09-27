import { Crop } from '@prisma/client';
import prisma from '../../src/db/prisma';

class CropFactory {
    
    async create(): Promise<Omit<Crop, 'id'>> {
        const cropTypes = await prisma.cropType.findMany();
        const randomCropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];

        return {
            name: randomCropType.name,
            cropArea: 10,
            farmId: 0,
            cropTypeId: randomCropType.id
        }
    }

    async createMany(count: number): Promise<Omit<Crop, 'id'>[]> {
        const crops: Omit<Crop, 'id'>[] = [];
        for (let i = 0; i < count; i++) {
            crops.push(await this.create());
        }
        return crops;
    }
}

export default new CropFactory();