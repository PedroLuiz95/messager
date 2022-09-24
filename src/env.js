const dotenv = require('dotenv')

const envFile = {
  dev: '.env.local',
  production : '.env'
}

dotenv.config({
  path: envFile[process.env.NODE_ENV ?? 'production']
})

// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  enviroment : process.env.NODE_ENV
}