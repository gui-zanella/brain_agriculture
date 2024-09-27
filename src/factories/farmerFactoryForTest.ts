import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { cpf } from 'cpf-cnpj-validator';

export default Factory.define('Farmer').attrs({
    name:() => faker.person.firstName(),
    cpfOrCnpj: () => cpf.generate()
})
