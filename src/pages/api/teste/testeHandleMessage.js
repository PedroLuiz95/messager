import handlerMessager from "../../../tasks/HandleMessage"
export default async function handler(req, res) {
  const configHandleMessage = {
    beforeExpire: 'mensagem cobrança teste',
    afterExpire: 'Depois de vencer'
  }
  const template1 = new handlerMessager(configHandleMessage)
  await template1.handler()
  res.status(200).json()
}