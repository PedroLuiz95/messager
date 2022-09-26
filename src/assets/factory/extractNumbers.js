import { postgreSql } from "../../assets/database"
export default async function handler() {
  const conn = await postgreSql()
  const queryToGerNumbers = 'SELECT * FROM numeros_inadimplentes'
  const out = await conn.query(queryToGerNumbers)
  console.log(out)
  return out
}
