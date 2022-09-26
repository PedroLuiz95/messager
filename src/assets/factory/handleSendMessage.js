import logFatory from "./handleLog"
import axios from "axios"
export default async function handleSendMessage(metaData) {
  const returnMessage = await sendMessage(metaData)
  const query = {
    date: new Date(Date.now()),
    data: {
      body: metaData,
      output: returnMessage
    }
  }
  await logFatory('insert', query)
}
async function sendMessage(metaData) {
  const urlParams = new URLSearchParams({
    line: process.env.WHATSAPP_SOURCE_NUMBER,
    destiny: metaData.numero,
    text: encodeURI(metaData.textMessage)
  })
  
  const bodyParams = new URLSearchParams({
    App : process.env.WHATSAPP_API_APP_NAME,
    AccessKey : process.env.WHATSAPP_API_ACCESS_KEY
  })
  const baseUrl = `${process.env.WHATSAPP_API_BASE_URL}${urlParams}`
  const auth = {
    auth : {
      username : process.env.WHATSAPP_API_AUTH_USERNAME,
      password : process.env.WHATSAPP_API_AUTH_PASSWORD
    }
  }
  const response = await axios.post(baseUrl,bodyParams,auth)
  const outResponse = {
    message : response.request.res.statusMessage,
    statusCode : response.request.res.statusCode,
    data : response.data
  }
  console.log(outResponse)
  return outResponse
}