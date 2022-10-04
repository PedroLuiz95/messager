import getInadimplentNumbers from "../assets/factory/extractNumbers";
import cleanInadimplentNumbers from "../assets/factory/cleanInadimplentNumbers";
import handleMetadata from "../assets/factory/handleMetadata";
import messageTemplateFactory from "../assets/factory/messageTemplate";
import handleSendMessage from "../assets/factory/handleSendMessage";

class HandleMessage {
  constructor(templateMessageConfig) {
    this.templateMessageConfig = templateMessageConfig
  }
  async handler() {
    const modes = ['beforeExpire', 'afterExpire']
    for (let i in modes) {
      const nowMode = modes[i]
      const inadimplentNumber = await getInadimplentNumbers(nowMode)
      const cleanedInadimplentNumbers = await cleanInadimplentNumbers(inadimplentNumber)
      const templateMessage = await messageTemplateFactory('list', {
        name: this.templateMessageConfig[nowMode]
      })
      let metaData
      if (templateMessage.length === 1) {
        metaData = await handleMetadata(cleanedInadimplentNumbers, templateMessage)
        for( let index in metaData){
          const i = metaData[index]
          await handleSendMessage(i)
        }
      }
    }
    return
  }
}
export default HandleMessage
