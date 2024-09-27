import { Router } from 'express';
import farmerRouter from './farmer.routes';
import farmRouter from './farm.routes';
const router = Router();

router.use('/farmer', farmerRouter);
router.use('/farm', farmRouter);

export default router;