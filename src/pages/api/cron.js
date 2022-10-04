// import { CronJob } from "cron";
import cron from "node-cron";
import HandleMessage from '../../tasks/HandleMessage'
import CleanTrustNumbers from "../../tasks/cleanTrustNumbers";
export default async function handler(req, res) {
  console.log('Iniciando Cron')
  const period = process.env.EXTRACT_PERIOD || '* * * * *'
  //Inicializa a tarefa com a template de mensagens 1
  const configHandleMessage = {
    beforeExpire : 'Vencimento -3 dias',
    afterExpire : 'Vencimento +3 dias'
  }
  const template1 = new HandleMessage(configHandleMessage)
  // Jobs.push(new CronJob(period, () => { template1.handler() }), null, null, zone)
  cron.schedule(period, () => { template1.handler() })
  //Cria a tarefa de limpeda dos numeros no desbloqueio de confiança
  // Jobs.push(new CronJob('* * * * *', CleanTrustNumbers, null, null, zone))
  cron.schedule(' * * * * *', CleanTrustNumbers)

  //Inicia todas as tarefas
  // console.log(Jobs.length)

  res.status(200).json()
}
