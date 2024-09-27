import { Router } from "express";
import  FarmerController  from "../controllers/farmerController";

const router = Router();


router.get('/', FarmerController.getAllFarmers);
router.post('/', FarmerController.createFarmer);
router.get('/:id', FarmerController.getFarmerById);
router.put('/:id', FarmerController.update);
router.delete('/:id', FarmerController.deleteFarmer);


export default router;