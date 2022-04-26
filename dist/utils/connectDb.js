"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectOldDB = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const connectOldDB = async (collectionName) => {
    try {
        const { connection } = await mongoose_1.connect(config_1.default.V2_MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        let data = await connection.db.collection(collectionName);
        data = await data.find().toArray();
        return data;
    }
    catch (error) {
        throw error;
    }
};
exports.connectOldDB = connectOldDB;
//# sourceMappingURL=connectDb.js.map