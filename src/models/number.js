import mongoose from "mongoose";
const document = 'number'

const Schema = new mongoose.Schema({
  number: String,
  date: Date
})

export default mongoose.models[document] || mongoose.model(document, Schema)