import getInadimplentNumbers from "../assets/factory/extractNumbers";
import cleanInadimplentNumbers from "../assets/factory/cleanInadimplentNumbers";
import handleMetadata from "../assets/factory/handleMetadata";
import messageTemplateFactory from "../assets/factory/messageTemplate";
class HandleMessage {
  constructor(templateMessageName) {
    this.templateMessageName = templateMessageName
  }
  async handler() {
    const inadimplentNumbers = await getInadimplentNumbers()
    const cleanedInadimplentNumbers = await cleanInadimplentNumbers(inadimplentNumbers)
    const templateMessage = await messageTemplateFactory('list', { name: this.templateMessageName })
    let metaData
    if(templateMessage.length === 1){
      metaData = await handleMetadata(cleanedInadimplentNumbers, templateMessage)
    }
    console.log(metaData)
    return
  }
}
export default HandleMessage
