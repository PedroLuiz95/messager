import { mysqlDb } from "../../assets/database"
export default async function handler() {
  const conn = await mysqlDb()
  const queryToGerNumbers = 'SELECT * FROM numeros_inadimplentes'
  const out = await conn.query(queryToGerNumbers)
  return out[0]
}
