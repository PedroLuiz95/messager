import { mysqlDb } from "../../assets/database.js"
import number from "../../models/number"
export default async function handler(req, res) {
  const conn = await mysqlDb()
  const out = await conn.query('select * from teste')
  console.log(out[0])
  res.status(200).json()
}
