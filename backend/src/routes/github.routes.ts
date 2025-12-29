import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as controller from '../controllers/github.controller';

const router = Router();

router.use(authMiddleware);

router.get('/users/:username', controller.getGithubUser);
router.get('/users/:username/repos', controller.getGithubRepos);

export default router;
