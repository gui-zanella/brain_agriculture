import prisma from "../db/prisma";

class CropTypeRepository {
    async getCropTypeIdByName(name: string) {
        const cropType = await prisma.cropType.findUnique({
            where: { name }
        });
        return cropType ? cropType.id : null;
    }
}

export default new CropTypeRepository();