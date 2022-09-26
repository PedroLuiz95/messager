import CleanTrustNumbers from "../../../tasks/cleanTrustNumbers"
export default async function handler(req, res) {
  const totalDelete = await CleanTrustNumbers()
  res.status(200).json(totalDelete)
}
