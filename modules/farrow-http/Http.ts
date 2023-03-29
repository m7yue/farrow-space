import { Http, createHttpPipeline, Response, Router } from "farrow-http";
import { createContext, useContainer } from 'farrow-pipeline'

/**
 * Http 和 createHttpPipeline 等价
 */

const http = Http(); // a farrow pipeline for HTTP Server
const {
  handle,
  listen,
  server,
  ...router
} = http

// add http middleware
http.use((request) => {
  console.log(request) // type RequestInfo
  // returning response in middleware
  return Response.text(`Hello Farrow`);
});

http.listen(3000);

console.log(router)


/**
 * handle adapter to expressjs/koajs or other web framework in Node.js.
 * handle 可以用来适配 express/koa 等
 * 
 * farrow-koa 和 farrow-express 的 adapter 都是基于此实现的
 */

import { createServer } from "http";

const farrowHttp = Http(); // a pipeline

farrowHttp.use(() => {
  // returning response in middleware
  return Response.text(`Hello From Farrow To Http`);
});

const httpServer = createServer(farrowHttp.handle);
httpServer.listen(3001)


/**
 * listen server 内部也是通过 createServer(handle) 运作的
 */
const serverHttp = Http()
serverHttp.use(() => {
  return Response.text('Hello From Server().listen')
})
serverHttp.server().listen(3002)

/**
 * createHttpPipeline(): router, handle, listen, server
 * 
 * listen => server => node http createServer => handle => router pipeline
 */
