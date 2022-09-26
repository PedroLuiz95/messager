export default async function handleMetadata(data, textTemplate) {
  const arrOut = []
  const message = textTemplate[0].text
  for (let i in data) {
    const nowNumber = data[i]
    const outText = replateText(nowNumber, message)
    arrOut.push({ ...nowNumber, textMessage: outText })
  }
  return arrOut
}
function replateText(variables, text) {
  const variablesInsideText = text.match(/\$\{(\w+)\}/g)
  const arrVariableInsideTextClean = variablesInsideText.map((i) => {
    return i.replace(/[\$\{\}]/g, '')
  })
  arrVariableInsideTextClean.map((i) => {
    const value = variables[i]
    if (value) {
      text = text.replace(`\$\{${i}\}`, value)
    } else {
      text = text.replace(`\$\{${i}\}`, '')
    }
  })
  return text

}