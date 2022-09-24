import { CronJob } from "cron";
import Extraction from '../../tasks/extraction'
export default async function handler(req, res) {
  const Jobs = []
  const zone = 'America/Sao_Paulo'
  Jobs.push(new CronJob('* * * * *',Extraction,null,null,zone))
  Jobs.map((i)=>{
    i.start()
  })
  
  res.status(200).json()
}
