import { mongoDb } from "../../assets/database.js"
import trust_list from "../../models/trustList"
export default async function handleTrustNumber(option,data={}) {
  await mongoDb()
  let out
  if(option == 'list_all'){
    out = get_all_numbers()
    console.log(out)
  }else if (option == 'insert'){
    await inserNumber(data)
  }

  return out
}
async function get_all_numbers(data={}){
  const out = await trust_list(data)
  return out
}
async function inserNumber(data={}){
  await trust_list.create(data)
}
