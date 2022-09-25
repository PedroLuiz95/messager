const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const axios = require('axios')
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(80, async (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:80')
    try{
      if(process.env.HANDLE_ON_START == '0'){
        await axios.get('http://localhost/api/cron')
      }
    }catch(e){
      
    }
  })
})