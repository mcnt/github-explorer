import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import * as controller from '../controllers/user.controller';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/', controller.getUsers);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

export default router;
