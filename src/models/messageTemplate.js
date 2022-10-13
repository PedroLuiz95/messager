import mongoose from "mongoose";
const document = 'message_template'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  text: {}
})

export default mongoose.models[document] || mongoose.model(document, Schema)