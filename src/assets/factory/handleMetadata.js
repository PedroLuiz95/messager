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
  const textVet = []
  for (let i of text) {
    const variablesInsideText = i.match(/\$\{(\w+)\}/g)
    let arrVariableInsideTextClean = []
    if (variablesInsideText != null) {
      arrVariableInsideTextClean = variablesInsideText.map((i) => {
        return i.replace(/[\$\{\}]/g, '')
      })
    }
    arrVariableInsideTextClean.map((i) => {
      const value = specialVariable(variables[i], i)
      if (value) {
        i = i.replace(`\$\{${i}\}`, value)
      } else {
        i = i.replace(`\$\{${i}\}`, '')
      }
    })
    textVet.push(i)
  }
  return textVet
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