import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
    name: String,
    description: String,
    isOk: Boolean 
});