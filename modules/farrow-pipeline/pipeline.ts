import { createPipeline } from "farrow-pipeline";

// 1. create
const pipeline = createPipeline<number, number>();

// 2. attach functions
pipeline
.use((count, next) => {
  // return 9
  return next(count + 1);
}, (count, next) => {
  console.log('use 可传多个参数', count)
  return next() // next 不传值，默认为 上一个 input 值
})
.use((count, next) => {
  console.log('链式调用', count)
  return next()
})
.use({
  middleware: (count, next) => {
    console.log('通过 middleware 属性传入')
    return next()
  }
})

pipeline.use((count, next) => {
  // 注意 如果传了 onLast 这里必须调用 next, 但这会影响不带 onLast 的执行, onLast 不是钩子函数，是作为兜底使用
  // return next()
  return count * 2;
});

// 3. run
console.log(pipeline.run(1, {
  onLast: (input) => {
    console.log('onlast', input)
    return 7
  },
  onLastWithContext: false // 默认为 true
})); // 4 = (1 + 1) * 2
console.log(pipeline.run(5)); // 12 = (5 + 1) * 2


/**
 * use 会添加 middlewares
 */


// one pipeline use other pipeline
// take other pipeline.run

const pipeline3 = createPipeline<number, number>();

pipeline3
.use((count, next) => {
  // return 9
  return next(count + 1);
})
.use((count, next) => {
  console.log('链式调用', count)
  return next()
})

const pipeline2 = createPipeline<number, number>()
pipeline2.use(pipeline3)
/**
 * pipeline3 不能有直接返回的中间件，否则再 use 无效
 */
pipeline2.use((count, next) => {
  console.log('-----', count)
  return count
})
pipeline2.run(1)