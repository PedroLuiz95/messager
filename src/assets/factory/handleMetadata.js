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
    const value = specialVariable(variables[i], i)
    if (value) {
      text = text.replace(`\$\{${i}\}`, value)
    } else {
      text = text.replace(`\$\{${i}\}`, '')
    }
  })
  return text
}
function specialVariable(text, key) {
  const data_vencimento = 'data_vencimento'
  const allowdKeys = [data_vencimento]
  if (allowdKeys.includes(key)) {
    if (key === data_vencimento) {
      const date = new Date(text)
      return date.toLocaleDateString("pt-BR")
    }
  }
  return text
}