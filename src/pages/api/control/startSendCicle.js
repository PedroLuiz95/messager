import { StartSendCicleController } from "../../../Controller/startSendCicle"
export default async function handler(req, res) {
  const template = await StartSendCicleController()
  await template.handler()
  res.status(200).json()
}