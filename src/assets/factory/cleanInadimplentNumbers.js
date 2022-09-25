import handleTrustNumber from "./handleTrustNumber"
export default async function cleanInadimplentNumbers(arrayNumbers) {
  const now = new Date(Date.now())
  const queryTrustNumbers = {
    date_out: { $gte: now }
  }
  const trustNumbers = await handleTrustNumber('list_all',queryTrustNumbers)
  const cleanNumbers = compareAndCleanNumbers(arrayNumbers,trustNumbers)
  return cleanNumbers
}
function compareAndCleanNumbers(allNumbers,trustNumbers){
  const nowNumberKey = 'numero'
  const auxAllNumbers = allNumbers
  for (let i in trustNumbers){
    const nowTrustNumber = trustNumbers[i]
    for (let j in allNumbers){
      const nowNumber = allNumbers[j]
      //Aqui é feita a comparação com o vetor que vem do mysql, a chave do numero pode alterar
      if(nowTrustNumber.phone_number.localeCompare(nowNumber[nowNumberKey])){
        const index = auxAllNumbers.indexOf(nowNumber)
        if(index != -1 ){
          auxAllNumbers.splice(index,1)
        }
      }
    }
  }
  return auxAllNumbers
}