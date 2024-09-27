import FarmRepository from "../repositories/farmRepository";

class FarmService {

    async getAllFarms() {
        return FarmRepository.getAllFarms();
    }

    async getFarmById(id: number) {
        return FarmRepository.getFarmById(id);
    }

    async createFarm(data: any) {
        return FarmRepository.createFarm(data);
    }

    async updateFarm(id: number, data: any) {
        return FarmRepository.updateFarm(id, data);
    }

    async deleteFarm(id: number) {
        return FarmRepository.deleteFarm(id);
    }

}

export default new FarmService();