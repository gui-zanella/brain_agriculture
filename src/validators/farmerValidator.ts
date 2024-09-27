import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Farmer } from '../interfaces/Farmer';

export function validateFarmData(farm: any): string | null {
    const { arableArea, vegetationArea, totalArea } = farm;

    if (typeof arableArea !== 'number' || arableArea < 0) {
        return 'Área agricultável deve ser um número positivo';
    }
    if (typeof vegetationArea !== 'number' || vegetationArea < 0) {
        return 'Área de vegetação deve ser um número positivo';
    }
    if (typeof totalArea !== 'number' || totalArea < 0) {
        return 'Área total deve ser um número positivo';
    }

    if (arableArea + vegetationArea > totalArea) {
        return 'A soma da área agricultável e vegetação não pode ser maior que a área total da fazenda';
    }
    return null;
}

export function validateFarmerData(farmer: Farmer): string | null {
    const { name, cpfOrCnpj, farms } = farmer;

    if (!name) {
        return 'Nome do produtor não pode estar vazio';
    }
    if (!cpf.isValid(cpfOrCnpj) && !cnpj.isValid(cpfOrCnpj)) {
        return 'CPF ou CNPJ inválido';
    }

    for (const farm of farms) {
        const { name, city, state } = farm;

        if (!name) {
            return 'Nome da fazenda não pode estar vazio';
        }
        if (!city) {
            return 'Cidade não pode estar vazia';
        }
        if (!state) {
            return 'Estado não pode estar vazio';
        }

        const validatorFarm = validateFarmData(farm);
        if (validatorFarm) {
            return validatorFarm;
        }
    }

    return null;
}