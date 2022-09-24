import { mysqlDb } from "../assets/database"
export default async function handler() {
  const conn = await mysqlDb()
  const out = await conn.query('select * from teste')
  await conn.query(`insert into teste  VALUES('${new Date(Date.now())}')`)
  console.log(out[0])
}
