import express from 'express';
import dbPromise from 'db';
import DateUtils from '../../../../utils/DateUtils';
import ErrorWithStatus from 'vo/ErrorWithStatus';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const users = await db.all(`SELECT username, name FROM user where deleted = 0`);
    res.send(users);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const db = await dbPromise;
    const user = await db.get(`SELECT username, name FROM user where deleted = 0 AND id=${id} LIMIT 1`);
    res.send(user);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.get('', async (req, res, next) => {
  res.send(req.session);
});

export default router;