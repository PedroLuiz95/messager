import messageTemplateFactory from "../../../assets/factory/messageTemplate"
export default async function handler(req, res) {
  if(req.method === 'GET'){
    const out = await messageTemplateFactory('list_all')
    res.status(200).json(out)

  }else if(req.method === 'POST'){
    try{
      const out = await messageTemplateFactory('insert',req.body)
      res.status(200).json(out)
      
    }catch(e){
      console.log(e)
      res.status(400).json({error:'Nome duplicado'})
    }

  }else if (req.method === 'DELETE'){
    const out = await messageTemplateFactory('delete',req.body)
    res.status(200).json(out)
  }
  else{
    res.status(200).json()
  }

}
