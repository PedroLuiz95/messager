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

    arrVariableInsideTextClean.map((j) => {
      const value = specialVariable(variables[j], j)
      if (value) {
        i = i.replace(`\$\{${j}\}`, value)
      } else {
        i = i.replace(`\$\{${j}\}`, '')
      }
    })
    textVet.push(i)
  }
  return textVet
}
function specialVariable(text, key) {
  const data_vencimento = 'data_vencimento'
  const cpf = 'cpf'
  const allowdKeys = [data_vencimento, cpf]
  if (allowdKeys.includes(key)) {
    if (key === data_vencimento) {
      const date = new Date(text)
      return date.toLocaleDateString("pt-BR")
    }else if(key === cpf){
      let newCpf = "CPF"
      try {
        newCpf = text.replace(/^(...).*(..)$/,'$1.xxx.xxx-$2')
      } catch (error) {}
      return newCpf
    }
  }
  return text
}