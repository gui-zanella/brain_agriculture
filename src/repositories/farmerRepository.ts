import prisma from "../db/prisma";

class FarmerRepository {

    async getAllFarmers() {
        return prisma.farmer.findMany({
            include: {
                farms: {
                    include: {
                        crops: true,
                    }
                },
            }
        });
    }

    async getFarmerById(id: number) {
        return prisma.farmer.findUnique({
            where: { id }, include: {
                farms: {
                    include: {
                        crops: true,
                    }
                },
            }
        });
    }

    async getFarmerByCpfOrCnpj(cpfOrCnpj: string) {
        return prisma.farmer.findFirst({
            where: { cpfOrCnpj }
        });
    }

    async createFarmer(data: any) {
        return prisma.farmer.create({
            data: {
                name: data.name,
                cpfOrCnpj: data.cpfOrCnpj,
                farms: {
                    create: data.farms.map((farm: any) => ({
                        name: farm.name,
                        city: farm.city,
                        state: farm.state,
                        arableArea: farm.arableArea,
                        vegetationArea: farm.vegetationArea,
                        totalArea: farm.totalArea,
                        crops: {
                            create: farm.crops.map((crop: any) => ({
                                name: crop.name,
                                cropArea: crop.cropArea,
                                cropType: {
                                    connect: { id: crop.cropTypeId }
                                }
                            })),
                        },
                    })),
                },
            },
            include: {
                farms: {
                    include: {
                        crops: true,
                    },
                },
            },
        });
    }


    async updateFarmer(id: number, data: any) {
        return prisma.$transaction(async (prisma) => {
            await prisma.crop.deleteMany({
                where: {
                    farm: {
                        farmerId: id
                    }
                }
            });

            await prisma.farm.deleteMany({
                where: { farmerId: id }
            });

            const updatedFarmer = await prisma.farmer.update({
                where: { id },
                data: {
                    name: data.name,
                    cpfOrCnpj: data.cpfOrCnpj,
                    farms: {
                        create: data.farms.map((farm: any) => ({
                            name: farm.name,
                            city: farm.city,
                            state: farm.state,
                            arableArea: farm.arableArea,
                            vegetationArea: farm.vegetationArea,
                            totalArea: farm.totalArea,
                            crops: {
                                create: farm.crops.map((crop: any) => ({
                                    name: crop.name,
                                    cropArea: crop.cropArea,
                                    cropType: {
                                        connect: { id: crop.cropTypeId }
                                    }
                                })),
                            },
                        })),
                    },
                },
                include: {
                    farms: {
                        include: {
                            crops: true,
                        },
                    },
                },
            });

            return updatedFarmer;
        });
    }

    async deleteFarmer(id: number) {
        try {
            const res = await prisma.farmer.delete({ where: { id } });
            return res;
        } catch (error: any) {
            if (error.name == "PrismaClientKnownRequestError" && error.code == "P2025") {
                throw new Error("Fazendeiro não encontrado");
            }
            console.log(`\n ERROR.NAME: ${JSON.stringify(error.name)}\n
                            ERROR.CODE: ${JSON.stringify(error.code)} \n`);
            throw error;

        }



    }
}

export default new FarmerRepository();