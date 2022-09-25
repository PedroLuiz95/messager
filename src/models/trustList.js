import mongoose from "mongoose";
const document = 'trust_list'

const Schema = new mongoose.Schema({
  phone_number: String,
  date_in: Date,
  date_out:Date
})

export default mongoose.models[document] || mongoose.model(document, Schema)