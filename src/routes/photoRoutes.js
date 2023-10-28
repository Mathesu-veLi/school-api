import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import photoController from '../controllers/PhotoController';


const router = new Router();

router.post('/', loginRequired, photoController.store);
router.put('/', loginRequired, photoController.update);
router.delete('/', loginRequired, photoController.delete);

export default router;
