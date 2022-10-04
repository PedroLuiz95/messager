import logFatory from "./handleLog"
import axios from "axios"
const number_client = 'numero'
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export default async function handleSendMessage(metaData) {
  const debub = process.env.SEND_DEBUG_MESSAGE ? parseInt(process.env.SEND_DEBUG_MESSAGE) : 0
  if (debub) {
    metaData[number_client] = process.env.DEBUG_NUMBER
    console.log(metaData)
  }
  await sleep(1000)
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
  const textEncoded = encodeURI(metaData.textMessage)
  const urlParams = new URLSearchParams({
    line: process.env.WHATSAPP_SOURCE_NUMBER,
    destiny: metaData[number_client],
    text: textEncoded
  })
  const bodyParams = new URLSearchParams({
    App: process.env.WHATSAPP_API_APP_NAME,
    AccessKey: process.env.WHATSAPP_API_ACCESS_KEY
  })
  const baseUrl = `${process.env.WHATSAPP_API_BASE_URL}${urlParams}`
  const auth = {
    auth: {
      username: process.env.WHATSAPP_API_AUTH_USERNAME,
      password: process.env.WHATSAPP_API_AUTH_PASSWORD
    }
  }
  let response
  let outResponse
  try {
    response = await axios.post(baseUrl, bodyParams, auth)
    outResponse = {
      message: response.request.res.statusMessage,
      statusCode: response.request.res.statusCode,
      data: response.data
    }
  } catch (error) {
    outResponse = {
      message: 'erro',
      statusCode: 400,
      data: 'erro'
    }
  }
  return outResponse
}