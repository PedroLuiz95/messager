import handlerMessager from "../../../tasks/HandleMessage"
export default async function handler(req, res) {
  await handlerMessager()
  res.status(200).json()
}