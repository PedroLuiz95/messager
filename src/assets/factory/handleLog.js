import { mongoDb } from "../database.js"
import table from "../../models/log"
export default async function logFatory(option, data = {}) {
  await mongoDb()
  let out
  if (option === 'insert') out = await insert(data)
  if (option === 'list_all') out = await getAll()
  if (option === 'list') out = await getOne(data)
  if (option === 'list_filter') out = await getFilter(data)
  if (option === 'delete') out = await deleteMessage(data)
  return out
}
async function getAll(data = {}) {
  const out = await table.find()
  return out
}
async function getOne(data = {}) {
  const out = await table.find(data)
  return out
}
async function getFilter(data = {}){
  const out = await table.find(data)
  return out
}
async function insert(data = {}) {
  const query = {
    name: data.name
  }
  await table.create(data)

}
async function deleteMessage(data) {
  const query = {
    name: data.name
  }
  return await table.deleteOne(query)
}
