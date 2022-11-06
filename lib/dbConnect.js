import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error('Please define the DB_URI environment variable inside .env.local');
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

async function connect() {
  console.log('db connection started');
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
      console.log('connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
async function disconnect() {
  if (connect.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connect.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
