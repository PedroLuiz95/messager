import { postgreSql } from "../../../assets/database"
export default async function handler(req, res) {
  const conn = await postgreSql()
  const out = await conn.query('select * from numeros_inadimplentes')
  console.log(out[0])
  
  res.status(200).json()
}
