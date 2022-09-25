import getInadimplentNumbers from "../assets/factory/extractNumbers";
import cleanInadimplentNumbers from "../assets/factory/cleanInadimplentNumbers";
export default async function handler() {
  const inadimplentNumbers = await getInadimplentNumbers()
  const cleanedInadimplentNumbers = await cleanInadimplentNumbers(inadimplentNumbers)
  console.log(cleanedInadimplentNumbers)
  return 
}
