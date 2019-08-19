import express from 'express';
import dbPromise from 'db';
import DateUtils from 'utils/DateUtils';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const newFileName = `${DateUtils.nowToString('TIMESTAMP')}_${file.originalname}`;
    cb(null, newFileName);
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/rooms', async (req, res, next) => {
  try {
    const {userId} = req.session;
    const db = await dbPromise;
    const rooms = await db.all(`SELECT t1.*, COUNT(t3.userId) as userNum FROM room t1 LEFT JOIN userRoom t2 ON t1.id = t2.roomId LEFT JOIN userRoom t3 ON t1.id = t3.roomId WHERE t1.deleted=0 AND t2.deleted=0 AND t2.userId =${userId} GROUP BY t1.id`);
    res.send(rooms);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.post('', async (req, res, next) => {
  const {title} = req.body;
  const createTime = DateUtils.nowToString();
  try {
    const db = await dbPromise;
    const {userId} = req.session;
    const room = await db.run(`INSERT INTO room (title, createTime) VALUES ('${title}','${createTime}')`);
    const {id} = await db.get('select last_insert_rowid() as id');
    const userRoom = await db.run(`INSERT INTO userRoom (userId, roomId, createTime, deleted) VALUES (${userId}, ${id}, '${createTime}', 0)`);
    res.send({id, title, createTime});
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.get('/room/:id', async (req,res,next) => {
  try {
    const {id, lastId} = req.params;
    const db = await dbPromise;
    const chats = await db.all(`SELECT t1.*, t2.name FROM chat t1 LEFT JOIN user t2 ON t1.userId = t2.id WHERE t1.deleted=0 AND t2.deleted=0 AND roomId=${id} ${!lastId? '' : `AND id > ${lastId}`}`);
    res.send(chats);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.get('/room/:id/info', async (req,res,next) => {
  try {
    const {id} = req.params;
    const db = await dbPromise;
    const room = await db.get(`SELECT t1.*, COUNT(userId) as userNum FROM room t1 LEFT JOIN userRoom t2 ON t1.id = t2.roomId WHERE t1.deleted=0 AND t2.deleted=0 AND t1.id = ${id}`);
    const io = req.app.get('socket');
    // console.log(io.sockets);
    // io.of('/chat').to(id).emit('chat', 'hi');
    // io.of('/chat').emit('chat', 'a');
    // // console.log(id);
    // io.of('/chat').in(id).emit('chat', 'b');
    // io.of('/chat').in('10').emit('chat', 'c');
    // io.to(id).emit('chat', 'hie');
    
    res.send(room);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.get('/room/:roomId/invitableUsers', async(req, res, next) => {
  try {
    const db = await dbPromise;
    const {roomId} = req.params;
    const {userId} = req.session;
    const users = await db.all(`SELECT t1.id, t1.username, t1.name, t1.registerTime FROM user t1 LEFT JOIN (SELECT * FROM userRoom WHERE deleted = 0 AND roomId=${roomId}) t2 ON t1.id = t2.userId WHERE (t2.deleted = 1 OR t2.id is null) AND t1.id != ${userId}`);
    res.send(users);
  } catch (e) {
  console.error(e);
  next(new Error('에러가 발생했습니다.'));
}
});

router.post('/room/:roomId/invite/:userId', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const {roomId, userId} = req.params;
    const createTime = DateUtils.nowToString();
    const userRoomInfo = await db.get(`SELECT * FROM userRoom WHERE userId=${userId} AND roomId=${roomId}`);
    if(!userRoomInfo) {
      const userRoom = await db.run(`INSERT INTO userRoom (userId, roomId, createTime, deleted) VALUES (${userId}, ${roomId}, '${createTime}', 0)`);
    } else if(userRoomInfo.deleted === 0) {
      next(new Error('user is already in'));
    } else {
      const userRoom = await db.run(`UPDATE SET delete = 0 WHERE id = ${id}`);
    }      
    res.send(true);
  } catch (e) {
    console.error(e);
    next(new Error('에러가 발생했습니다.'));
  }
});

router.put('/room/:roomId/exit', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const {roomId} = req.params;
    const {userId} = req.session;
    await db.run(`UPDATE userRoom SET deleted = 1 WHERE userId=${userId} AND roomId=${roomId}`);
    res.send(true);
  } catch (e) {
    throw e;
  }
});

router.post('/room/:roomId/text', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const {roomId} = req.params;
    const {type = 'text', content} = req.body;
    const createTime = DateUtils.nowToString();
    const {userId} = req.session;

    await db.run(`INSERT INTO chat (roomId, userId, type, content, createTime) VALUES (${roomId}, ${userId}, '${type}', '${content}', '${createTime}')`);
    const {id} = await db.get('select last_insert_rowid() as id');
    const io = req.app.get('socket');
    io.sockets.in(roomId).emit('chat', {id, userId, type, content, createTime, deleted:0});
    res.send({id, userId, roomId, type, content, createTime, deleted:0});
  } catch (e) {
    throw e;
  }
});

router.post('/room/:roomId/image', upload.single('image'), async (req, res, next) => {
  try {
    const db = await dbPromise;
    const {roomId} = req.params;
    const createTime = DateUtils.nowToString();
    const type = 'image', content = req.file.filename;
    const {userId} = req.session;

    await db.run(`INSERT INTO chat (roomId, userId, type, content, createTime) VALUES (${roomId}, ${userId}, '${type}', '${content}', '${createTime}')`);
    const {id} = await db.get('select last_insert_rowid() as id');
    const io = req.app.get('socket');
    io.sockets.in(roomId).emit('chat', {id, userId, type, content, createTime, deleted:0});
    res.send({id, userId, roomId, type, content, createTime, deleted:0});
  } catch (e) {
    throw e;
  }
});

export default router;