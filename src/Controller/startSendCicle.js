import HandleMessage from "../tasks/HandleMessage"
export async function StartSendCicleController() {
  const configHandleMessage = {
    beforeExpire: 'Vencimento -3 dias',
    afterExpire: 'Vencimento +3 dias'
  }
  const template1 = new HandleMessage(configHandleMessage)
  return template1
}