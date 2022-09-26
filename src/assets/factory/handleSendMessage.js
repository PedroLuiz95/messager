import logFatory from "./handleLog"
export default async function handleSendMessage(metaData){
  const returnMessage = await sendMessage(metaData)
  const query = {
    date : new Date(Date.now()),
    data : {
      body : metaData,
      output : returnMessage
    }
  }
  await logFatory('insert',query)
}
async function sendMessage(metaData){
  console.log(metaData)
  return metaData
}