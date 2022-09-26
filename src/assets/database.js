import mongoose from "mongoose";
import mysql from 'mysql2/promise'
import pgs from 'pg-promise'
//import dotenv from "dotenv"
//dotenv.config({path:".ENV"})
const MONGODB_URI = process.env.DB_CONNECTION_URL;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the DB_CONNECTION_URL environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongoDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
async function mysqlDb() {
  if (global.connection && global.connection.state != 'disconected') {
    return global.connection
  }
  let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })
  global.connection = con
  return con
}
async function postgreSql() {
  if (global.postgreConnection && global.postgreConnection.state != 'disconected') {
    return global.postgreConnection
  }
  const user = process.env.POSTGRES_USERNAME
  const password = process.env.POSTGRES_PASSWORD
  const host = process.env.POSTGRES_HOST
  const port = process.env.POSTGRES_PORT
  const database = process.env.POSTGRES_DATABASE
  const urlConnection = `postgres://${user}:${password}@${host}:${port}/${database}`
  const db = pgs({})(urlConnection)
  global.postgreConnection = db
  return db
}

export { mysqlDb, mongoDb, postgreSql };
