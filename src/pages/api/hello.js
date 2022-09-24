import db from "../../assets/database.js"
import number from "../../models/number"
export default async function handler(req, res) {
  await db()
  number.create({
    number:'1'
  })
  res.status(200).json({ name: 'John Doe' })
}
