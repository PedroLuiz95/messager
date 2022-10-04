import { mongoDb } from "../../assets/database.js"
import message_template from "../../models/messageTemplate"
export default async function messageTemplateFactory(option, data = {}) {
  await mongoDb()
  let out
  if (option === 'insert') out = await insert(data)
  if (option === 'list_all') out = await getAll()
  if (option === 'list') out = await getOne(data)
  if (option === 'delete') out = await deleteMessage(data)
  return out
}
async function getAll(data = {}) {
  const out = await message_template.find()
  return out
}
async function getOne(data = {}) {
  const out = await message_template.find(data)
  return out
}
async function insert(data = {}) {
  const query = {
    name: data.name
  }
  data.text = convertNewLine(data.text)
  await message_template.create(data)

}
async function deleteMessage(data) {
  const query = {
    name: data.name
  }
  return await message_template.deleteOne(query)
}
function convertNewLine(text) {
  text = text.replace(/\n/g, '\\n')
  return text
}
