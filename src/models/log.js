import mongoose from "mongoose";
const document = 'log'

const Schema = new mongoose.Schema({
  data:{},
  date:Date
})

export default mongoose.models[document] || mongoose.model(document, Schema)