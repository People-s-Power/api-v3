/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { connect } from 'mongoose';
import config from './config';

// const options = {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };
// let cachedDB: typeof mongoose = null;
// export const connectDB = async () => {
//   if (cachedDB) return cachedDB;
//   try {
//     const db = await mongoose.connect(config.V2_MONGO_URI, options);
//     cachedDB = db;
//     console.log(`db connected: ${db.connection.host}`);
//     return db;
//   } catch (error) {
//     console.log(error.message);

//     process.exit(1);
//   }
// };

// export const disconnectdb = async () => {
//   await mongoose.disconnect().then(() => console.log(`db disconnected`));
// };

export const connectOldDB = async (collectionName: string): Promise<any[]> => {
  try {
    const { connection } = await connect(config.V2_MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    let data: any = await connection.db.collection(collectionName);
    data = await data.find().toArray();
    return data;
  } catch (error) {
    throw error;
  }
};
