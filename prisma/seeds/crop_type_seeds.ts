import prisma from '../../src/db/prisma';

async function main() {
    const cropTypes = [
        { name: 'Soja' },
        { name: 'Milho' },
        { name: 'Algodão' },
        { name: 'Café' },
        { name: 'Cana de Açúcar' },

    ];

    for (const cropType of cropTypes) {

        try {
            await prisma.cropType.create({
                data: cropType,
            });
        } catch (error: any) {
            if (error.code === 'P2002') {
                console.log(`CropType with name ${cropType.name} already exists. Skipping...`);
            } else {
                throw error;
            }
        }
    }

    console.log('Seed data for crop types created successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

