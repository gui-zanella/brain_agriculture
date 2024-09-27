import { Farm } from '@prisma/client';
import { faker } from '@faker-js/faker';

class FarmFactory {
    create(): Omit<Farm, 'id'> {
        return {
            name: faker.person.firstName(),
            city: faker.location.city(),
            state: faker.location.state(),
            totalArea: 250,
            arableArea: 150,
            vegetationArea: 100,
            farmerId: 1
             

        };
    }

    createMany(count: number): Omit<Farm, 'id'>[] {
        const farms: Omit<Farm, 'id'>[] = [];
        for (let i = 0; i < count; i++){
            farms.push(this.create());
        }
        return farms;
    }
}

export default new FarmFactory();