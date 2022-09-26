import handlerMessager from "../../../tasks/HandleMessage"
export default async function handler(req, res) {
  const template1 = new handlerMessager('mensagem cobrança teste')
  await template1.handler()
  res.status(200).json()
}