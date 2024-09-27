import { Farmer, Farm } from "@prisma/client";
import FarmerFactory from '../../src/factories/farmerFactory'
import FarmFactory from '../../src/factories/farmFactory'
import CropFactory from "../../src/factories/cropFactory";
import prisma from '../../src/db/prisma';


async function main() {
    const farmers = FarmerFactory.createMany(3);
    const createdFarmers: Farmer[] = [];

    for (const farmer of farmers) {
        const createdFarmer: Farmer = await prisma.farmer.create({
            data: farmer,
        });
        createdFarmers.push(createdFarmer);
    }

    for (const farmer of createdFarmers) {

        const farms = FarmFactory.createMany(2);

        for (const farm of farms) {
            const createdFarm: Farm = await prisma.farm.create({
                data: {
                    ...farm,
                    farmerId: farmer.id,
                }
            });

            const crops = await CropFactory.createMany(4);

            for (const crop of crops) {
                await prisma.crop.create({
                    data: {
                        ...crop,
                        farmId: createdFarm.id,
                    }
                })
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

