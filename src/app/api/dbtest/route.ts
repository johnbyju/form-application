import mongoose from 'mongoose';

const MONGODB_URL ='MONGODB_URL=mongodb+srv://johnbyju3:8098046498byju@cluster0.ddymr.mongodb.net/backstage?retryWrites=true&w=majority';


declare global {
    var mongoose: {
      conn: mongoose.Connection | null;
      promise: Promise<mongoose.Connection> | null;
    };
  }

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL environment variable is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      dbName: 'form-application',
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URL, options).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  console.log('Successfully connected to MongoDB');
  return cached.conn;
};
