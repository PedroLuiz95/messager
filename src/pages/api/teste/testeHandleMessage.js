import handlerMessager from "../../../tasks/HandleMessage"
export default async function handler(req, res) {
  const configHandleMessage = {
    beforeExpire: 'Vencimento -3 dias',
    afterExpire: 'Vencimento +3 dias'
  }
  const template1 = new handlerMessager(configHandleMessage)
  await template1.handler()
  res.status(200).json()
}