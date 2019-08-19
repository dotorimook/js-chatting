import sqlite from 'sqlite';
import path from 'path';

const dbPath = path.join(__dirname, './db.db');

const dbPromise = sqlite.open(dbPath, {Promise});

export default dbPromise;