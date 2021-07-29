import * as express from 'express';
import chirpsRouter from './chirps';
import usersRouter from './users';

const router = express.Router();

router.use('/api/chirps', chirpsRouter);
router.use('/api/users', usersRouter);

export default router;