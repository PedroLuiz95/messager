// import { CronJob } from "cron";
import cron from "node-cron";
import CleanTrustNumbers from "../../tasks/cleanTrustNumbers";
import { StartSendCicleController } from "../../Controller/startSendCicle";
export default async function handler(req, res) {
  console.log('Iniciando Cron')
  const period = process.env.EXTRACT_PERIOD || '* * * * *'
  //Inicializa a tarefa com a template de mensagens 1
  const template1 = await StartSendCicleController()
  // Jobs.push(new CronJob(period, () => { template1.handler() }), null, null, zone)
  cron.schedule(period, () => { template1.handler() })
  //Cria a tarefa de limpeda dos numeros no desbloqueio de confiança
  // Jobs.push(new CronJob('* * * * *', CleanTrustNumbers, null, null, zone))
  cron.schedule(' * * * * *', CleanTrustNumbers)

  //Inicia todas as tarefas
  // console.log(Jobs.length)

  res.status(200).json()
}
