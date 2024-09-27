import { Farmer } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

class FarmerFactory {
    create(): Omit<Farmer, 'id'> {
        return {
            cpfOrCnpj: cpf.generate(),
            name: faker.person.fullName()
        };
    }

    createMany(count: number): Omit<Farmer, 'id'>[] {
        const farmers: Omit<Farmer, 'id'>[] = [];
        for (let i = 0; i < count; i++) {
            farmers.push(this.create());
        }
        return farmers;
    }
}

export default new FarmerFactory();