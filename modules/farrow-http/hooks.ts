import { Http, Response, useReq, useRequest, useRes, useRequestInfo, useResponse} from "farrow-http";

const http = Http(); // a pipeline
const {
  handle,
  listen,
  server,
  ...router
} = http

// add http middleware
http.use(() => {
  let req = useReq() // node http IncomingMessage
  console.log('===req===', req)

  let request = useRequest()
  console.log('===request===', request)

  console.log(req === request) // true


  let res = useRes() // node serverResponse
  console.log('===res===', res)

  let response = useResponse()
  console.log('===response===', response)

  console.log(res === response) // true


  const requestInfo = useRequestInfo() // farrow RequestInfo
  console.log('===requestInfo===', requestInfo)


  return Response.text(`Hello Farrow`);
});

http.listen(3007);