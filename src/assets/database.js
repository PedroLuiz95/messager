import mongoose, { mongo } from "mongoose";
import mysql from 'mysql2/promise'
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
    host: '172.19.2.221',
    user: 'root',
    password: 'senha123',
    database: 'maxx_mk'
  })
  global.connection = con
  return con
}

export { mysqlDb, mongoDb };
