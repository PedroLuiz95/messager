import { mongoDb } from "../../assets/database.js"
import trust_list from "../../models/trustList"
export default async function handleTrustNumber(option, data = {}) {
  await mongoDb()
  let out
  if (option == 'list_all') {
    out = await get_all_numbers(data)
  } else if (option == 'insert') {
    await inserNumber(data)
  }

  return out
}
async function get_all_numbers(data = {}) {
  const out = await trust_list.find(data)
  return out
}
async function inserNumber(data = {}) {
  const query = {
    phone_number: data.phone_number
  }
  const check = await get_all_numbers(query)
  if (check.length > 0) {
    await trust_list.updateOne(query, { $set: data })
  }else{
    await trust_list.create(data)
  }
}
