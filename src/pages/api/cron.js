import { CronJob } from "cron";
import HandleMessage from '../../tasks/HandleMessage'
export default async function handler(req, res) {
  console.log('Iniciando Cron')
  const Jobs = []
  const zone = 'America/Sao_Paulo'
  //Envia a tarefa de enviar as mensagens para os numeros inadimplentes
  const period = process.env.EXTRACT_PERIOD || '* * * * *'
  Jobs.push(new CronJob(period,HandleMessage,null,null,zone))
  
  //Inicia todas as tarefas
  Jobs.map((i)=>{
    i.start()
  })
  
  res.status(200).json()
}
