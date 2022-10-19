import HandleMessage from "../tasks/HandleMessage"
export async function StartSendCicleController() {
  const configHandleMessage = {
    beforeExpire: 'Vencimento -3 dias',
    afterExpire: 'Vencimento +3 dias'
  }
  return new HandleMessage(configHandleMessage)
}