import prisma from "../db/prisma";

class CropRepository {


    async getCropByNameAndFarmId(name: string, farmId: number) {
        return prisma.crop.findFirst({
            where: { name, farmId }
        });
    }

    async createCrop(data: any) {
        return prisma.crop.create({
            data: {
                name: data.name,
                cropArea: data.cropArea,
                cropTypeId: data.cropTypeId,
                farmId: data.farmId
            }
        });
    }


}

export default new CropRepository();