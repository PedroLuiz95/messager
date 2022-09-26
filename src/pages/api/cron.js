import { CronJob } from "cron";
import HandleMessage from '../../tasks/HandleMessage'
import CleanTrustNumbers from "../../tasks/cleanTrustNumbers";
export default async function handler(req, res) {
  console.log('Iniciando Cron')
  const Jobs = []
  const zone = 'America/Sao_Paulo'
  //Envia a tarefa de enviar as mensagens para os numeros inadimplentes
  const period = process.env.EXTRACT_PERIOD || '* * * * *'
  //Inicializa a tarefa com a template de mensagens 1
  const template1 = new HandleMessage('mensagem cobrança teste')
  Jobs.push(new CronJob(period,()=>{template1.handler()}),null,null,zone)
  
  //Cria a tarefa de limpeda dos numeros no desbloqueio de confiança
  Jobs.push(new CronJob('* * * * *',CleanTrustNumbers,null,null,zone))

  //Inicia todas as tarefas
  Jobs.map((i)=>{
    i.start()
  })
  
  res.status(200).json()
}
