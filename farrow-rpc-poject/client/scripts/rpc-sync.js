import { createApiClients } from 'farrow/dist/api-client/index.js'


const config = {
  services: [
    {
      src: 'http://localhost:3003/api/greet',
      dist: 'src/api/greet.ts',
    },
  ]
}

const apiClients = createApiClients(config)

apiClients.sync()