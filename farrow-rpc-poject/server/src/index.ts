import path from 'path'
import { Http, Response } from 'farrow-http'
import { cors, CorsOptionsDelegate } from 'farrow-cors'
import { services } from './api'

// create http server
const http = Http()

http.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// attach service for api
http.use(services)

// start listening
http.listen(3003, () => {
  console.log('server started at http://localhost:3003')
})
