import log from "../../../assets/factory/handleLog"
export default async function handler(req, res) {
  if(req.method === 'GET'){
    const out = await log('list_all')
    res.status(200).json(out)

  }else if(req.method === 'POST'){
    try{
      const out = await log('insert',req.body)
      res.status(200).json(out)
      
    }catch(e){
      console.log(e)
      res.status(400).json({error:'Nome duplicado'})
    }

  }else if (req.method === 'DELETE'){
    const out = await log('delete',req.body)
    res.status(200).json(out)
  }
  else{
    res.status(200).json()
  }
}
