import { Http, Response, RequestInfo, useReq } from "farrow-http";

const http = Http(); // a pipeline

// add http middleware
http.use((request) => {
  console.log(request) // type RequestInfo
  const {
    pathname,
    method,
    query,
    body,
    headers,
    cookies
  } = request

  const nodeReq = useReq()
  console.log('Node.js 原生 request 对象:', nodeReq)
  // returning response in middleware
  return Response.text(JSON.stringify(request, null, 2));
});

http.listen(3000);
