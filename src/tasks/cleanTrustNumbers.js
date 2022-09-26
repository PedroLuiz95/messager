import trustList from "../models/trustList";
export default async function CleanTrustNumbers(){
  const query = {
    date_out : {$lte : new Date(Date.now())} 
  }
  const pastNumbers = await trustList.deleteMany(query)
  return pastNumbers
}