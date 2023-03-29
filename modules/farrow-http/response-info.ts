import { Http, Response, useRes } from "farrow-http";


import {
  ResponseInfo,
  merge, type,

  string, json, html, text, redirect, stream, file, vary, cookie, cookies, header, headers, status, buffer, empty, attachment, custom
} from 'farrow-http/dist/responseInfo'

// console.log(type('text')) // { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }

/**
  {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: { type: 'string', value: 'hello Farrow' }
  }
*/
// console.log(text('hello Farrow'))

const http = Http(); // a pipeline

// add http middleware
http.use((request) => {
  const nodeRes = useRes()
  console.log('Node.js 原生 response 对象:', nodeRes)

  const resposne =  Response.text('Hello Farrow')
  console.log(resposne)
  // returning response in middleware

  const someHeader = {
    'a': 1
  }
  const finalResposne = Response.headers(someHeader).merge(resposne)
  console.log(finalResposne)

  return finalResposne
});

http.listen(3000);

// merge 结果类型为 ResponseInfo
// type 结果或 mime Content-Type

// 通过 requestInfo 获取最终的响应头，响应 body 等信息，最终通过 http res.end 返回