import { mysqlDb } from "../../../assets/database"
export default async function handler(req, res) {
  const conn = await mysqlDb()
  const out = await conn.query('select * from teste')
  res.status(200).json()
}
