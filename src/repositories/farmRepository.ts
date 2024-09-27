import prisma from "../db/prisma";

class FarmRepository {

    async getAllFarms() {
        return prisma.farm.findMany({
            include: {
                crops: true,
            }
        });
    }

    async getFarmById(id: number) {
        return prisma.farm.findUnique({
            where: { id: id }, include: {
                crops: true,
            }
        });
    }

    async getFarmByNameAndFarmerId(name: string, farmerId: number) {
        return prisma.farm.findFirst({
            where: { name, farmerId }, include: {
                crops: true,
            }
        });
    }



    async getFarmByName(name: string) {
        return prisma.farm.findFirst({
            where: { name }
        });
    }

    async createFarm(data: any) {
        return prisma.farm.create({ data });
    }

    async updateFarm(id: number, data: any) {
        return prisma.farm.update({ where: { id: id }, data });
    }

    async deleteFarm(id: number) {
        return prisma.farm.delete({ where: { id: id } });
    }
}

export default new FarmRepository();