import { Nullable } from 'farrow-schema'
import { Http, Router, Response } from 'farrow-http'
import path from 'path'

const http = Http()

const router = Router() // a pipeline

console.log(router)

const {
  // pipeline
  use,
  run,
  middleware,
  useLazy,

  get,
  post,
  put,
  head,
  patch,
  // delete,
  options,

  capture,
  route,
  serve,
  match,
} = router

// Capture the response body if the specific type is matched, should returning response in callback function.
// 捕获结果，重新返回
capture('string', (stringBody) => {
  return Response.text(`capture: ${stringBody.value}`)
})

// http://localhost:3000/foo
// 可以处理所有 HTTP Method
// route 函数内新建 routePipeline, pipeline.use(routePipeline)
route('/foo').use(() => {
  return Response.text('foo')
})


/**
 * Serve static assets.
 * 提供静态资源服务
 * 
 * 如果输入路径是目录，会自动拼接 index.html
 * 
 * http://localhost:3000/static
 * http://localhost:3000/static/a.txt
 */
serve('/static', path.join(__dirname, './static'))


const schema = {
  pathname: '/detail/:id',
  method: 'POST',
  params: {
    id: Number,
  },
  query: {
    a: Number,
    b: String,
    c: Boolean,
  },
  body: Nullable({
    a: Number,
    b: String,
    c: Boolean,
    d: {
      a: Number,
      b: String,
      c: Boolean,
    },
  }),
  headers: {
    a: Number,
    b: String,
    c: Boolean,
  },
  cookies: {
    a: Number,
    b: String,
    c: Boolean,
  },
}

/**
 * 返回一个匹配特定请求的 match pipeline
 * 
 * 会根据传递给 match 的 Schema 来确定 RequestInfo 的类型
 */

// requestSchema
match(schema).use((request) => {
  return Response.json(request)
})

// urlSchema, http://localhost:3000/string/arg
match({
  url: '/string/<arg:string>', // urlSchema
})
.use((request) => {
  return Response.json({
    type: 'string',
    arg: request.params.arg,
  })
})

/**
 * get, post 这些都会转成 match 调用（urlSchema）
 */
get('/name').use(() => {
  return Response.text('7yue')
})

http.use(router)

http.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000');
});


/**
 * APipeline.use(BPipeline)
 * 
 * Router(): routerPipeline
 * router.route(): routePipeline, routerPipleine.use(routerPipeline)
 */