import { mongoDb } from "../../../assets/database.js"
import number from "../../../models/number"
export default async function handler(req, res) {
  await mongoDb()
  const clientNumber = Math.random()
  const register = {
    userNumber: clientNumber
  }
  number.create(register)
  res.status(200).json(register)
}
