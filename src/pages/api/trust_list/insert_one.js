import handleTrustNumber from "../../../assets/factory/handleTrustNumber"
export default async function handler(req, res) {
  const params = req.body
  await handleTrustNumber('insert',params)
  res.status(200).json()
}
