import express from 'express';
import apiRouterV1 from './api/v1';
import dbPromise from 'db';
import ErrorWithStatus from 'vo/ErrorWithStatus';
import DateUtils from 'utils/DateUtils';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/login', async (req, res, next) => {
  try {
    const {username} = req.body;
    const db = await dbPromise;
    const userInfo = await db.get(`SELECT * FROM user WHERE deleted=0 AND username='${username}'`);
    if(!!userInfo) {
      req.session.regenerate(()=>{
        req.session.logined = true;
        req.session.username = userInfo.username;
        req.session.name = userInfo.name;
        req.session.userId = userInfo.id;
        res.send(req.session);
      });
    } else
      next(new Error('회원정보가 없습니다.'));
  } catch (e) {
    // throw e;
    console.error(e);
    next(new Error('unknown error'));
  }
});

router.post('/logout', async (req, res, next)=>{
  req.session.destroy();
  res.send(true);
})

router.post('/api/v1/user', async (req, res, next) => {
  const {username, password, name} = req.body;
  const registerTime = DateUtils.nowToString();
  try {
    const db = await dbPromise;
    const test = await db.get(`SELECT * FROM USER where username='${username}'`);
    if(!!test) {
      next(new ErrorWithStatus(500, '이미 존재하는 아이디입니다.'));
    }
    const user = await db.run(`INSERT INTO user (username, password, name, registerTime) VALUES ('${username}','${password}','${name}','${registerTime}')`);
    const {id} = await db.get('select last_insert_rowid() as id');
    res.send({id, username, name, registerTime});
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.use('/api/v1', (req, res, next) => {
  if(!req.session || !req.session.logined) {
    next(new ErrorWithStatus(400, '권한이 없습니다.', null));
  }
  next();
}, apiRouterV1);

router.get('/chat/**', function(req, res, next) {
  res.render('index.html');
});

export default router;