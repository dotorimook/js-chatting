import express from 'express';
import userRouter from './user';
import chatRouter from './room';

const router = express.Router();

router.use('/user', userRouter);
router.use('/chat', chatRouter);

export default router;