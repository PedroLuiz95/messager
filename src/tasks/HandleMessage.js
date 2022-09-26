import getInadimplentNumbers from "../assets/factory/extractNumbers";
import cleanInadimplentNumbers from "../assets/factory/cleanInadimplentNumbers";
import handleMetadata from "../assets/factory/handleMetadata";
import messageTemplateFactory from "../assets/factory/messageTemplate";
import handleSendMessage from "../assets/factory/handleSendMessage";
class HandleMessage {
  constructor(templateMessageName) {
    this.templateMessageName = templateMessageName
  }
  async handler() {
    const inadimplentNumbers = await getInadimplentNumbers()
    const cleanedInadimplentNumbers = await cleanInadimplentNumbers(inadimplentNumbers)
    const templateMessage = await messageTemplateFactory('list', { name: this.templateMessageName })
    let metaData
    if (templateMessage.length === 1) {
      metaData = await handleMetadata(cleanedInadimplentNumbers, templateMessage)
      metaData.map(async (i) => {
        await handleSendMessage(i)
      })
    }
    return
  }
}
export default HandleMessage
