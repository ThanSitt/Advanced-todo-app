import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken'
import {pool} from './db.js';
import { hash } from 'bcrypt';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { sign } = jwt

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "../todo.sql"), "utf-8");
    pool.query(sql)
}

const insertTestUser = (email,password) => {
    hash(password, 10, (error, hashedPassword) => {
            pool.query('insert into account (email, password) values ($1, $2)',
                [email, hashedPassword])
    })
}

const getToken = (email) => {
    return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY)
}

export {initializeTestDb, insertTestUser, getToken}