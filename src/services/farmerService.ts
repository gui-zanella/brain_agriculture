// src/services/farmerService.ts
import FarmerRepository from '../repositories/farmerRepository';
import FarmRepository from '../repositories/farmRepository';
import CropRepository from '../repositories/cropRepository';
import CropTypeRepository from '../repositories/cropTypeRepository';
import { Farmer } from '../interfaces/Farmer';
import { validateFarmerData, validateFarmData } from '../validators/farmerValidator';

class FarmerService {

    async createOrUpdateFarm(farm: any, farmerId: number) {
        const existingFarm = await FarmRepository.getFarmByNameAndFarmerId(farm.name, farmerId);
        if (existingFarm) {
            return existingFarm;
        } else {
            return await FarmRepository.createFarm({
                name: farm.name,
                city: farm.city,
                state: farm.state,
                arableArea: farm.arableArea,
                vegetationArea: farm.vegetationArea,
                totalArea: farm.totalArea,
                farmerId: farmerId
            });
        }
    }

    async createOrUpdateCrop(crop: any, farmId: number) {
        const cropData = await CropRepository.getCropByNameAndFarmId(crop.name, farmId);
        if (cropData) {
            if (!cropData.cropTypeId) {
                throw new Error(`Cultura não encontrada ${crop.name}`);
            }
            return cropData;
        } else {
            const cropTypeId = await CropTypeRepository.getCropTypeIdByName(crop.name);
            if (!cropTypeId) {
                throw new Error(`Tipo de cultura não encontrado para ${crop.name}`);
            }
            return await CropRepository.createCrop({
                name: crop.name,
                cropArea: crop.cropArea,
                cropTypeId: cropTypeId,
                farmId: farmId
            });
        }
    }

    async getAllFarmers() {
        return FarmerRepository.getAllFarmers();
    }

    async getFarmerById(id: number) {
        return FarmerRepository.getFarmerById(id);
    }

    async createFarmer(data: Farmer) {

        const validationError = validateFarmerData(data);
        if (validationError) {
            throw new Error(validationError);
        }

        const existingFarmer = await FarmerRepository.getFarmerByCpfOrCnpj(data.cpfOrCnpj);
        if (existingFarmer) {
            throw new Error('CPF ou CNPJ já cadastrado.');
        }

        for (const farm of data.farms) {
            const updatedFarm = await this.createOrUpdateFarm(farm, farm.farmerId);
            farm.id = updatedFarm.id;

            for (const crop of farm.crops) {
                const updatedCrop = await this.createOrUpdateCrop(crop, farm.id);
                crop.id = updatedCrop.id;
                crop.cropTypeId = updatedCrop.cropTypeId;
                crop.farmId = updatedCrop.farmId;
            }
        }

        return FarmerRepository.createFarmer(data);
    }

    async updateFarmer(id: number, data: Farmer) {
        const validationError = validateFarmerData(data);
        if (validationError) {
            throw new Error(validationError);
        }


        for (const farm of data.farms) {

            for (const crop of farm.crops) {
                const updatedCrop = await this.createOrUpdateCrop(crop, farm.id);
                crop.cropTypeId = updatedCrop.cropTypeId;
            }
        }

        const existingFarmer = await FarmerRepository.getFarmerById(id);

        if (existingFarmer) {
            return FarmerRepository.updateFarmer(id, data);
        } else {
            return FarmerRepository.createFarmer(data);
        }
    }

    async deleteFarmer(id: number) {
        return FarmerRepository.deleteFarmer(id);
    }
}

export default new FarmerService();