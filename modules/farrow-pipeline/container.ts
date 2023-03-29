import {
  createPipeline,
  createContainer,
  createContext,
  isContainer,
  assertContainer,
  useContainer,
  runWithContainer,
} from "farrow-pipeline";

const configContext = createContext({
  version: '0.0.1',
  name: '7yue'
})
const container = createContainer({
  config: configContext
})

const contexts = {
  db: createContext('db_address'),
  port: createContext(80)
}

const pipeline = createPipeline<number, number>({
  contexts
});

pipeline.use((c, next) => {
  configContext.set({
    version: '0.0.2',
    name: '7yue'
  })
  return next()
})

pipeline.use((count, next) => {
  const container = useContainer()
  console.log(container.read(configContext)) // { version: '0.0.2', name: '7yue' }
  console.log(container.read(contexts.db), container.read(contexts.port))

  const limit = createContext(10);
  const container0 = createContainer();
  const container1 = createContainer({ limit });

  console.log(container0.read(limit)) // 10 这个 10 是通过 limit ContextSymbol key 拿到的
  console.log(container1.read(limit)) // 10 这个 10 是通过 contextMap  获取到的

  container0.write(limit, 30);
  console.log(container0.read(limit)) // 30


  // // isContainer
  // console.log(isContainer(container0)); // true
  // console.log(isContainer(0)); // false
  // console.log(isContainer({})); // false


  // // assertContainer
  // assertContainer(container0); // safe
  // // assertContainer({}); // throw error
  // // assertContainer(0); // throw error

  return count * 2;
});

console.log(pipeline.run(1), {
  container
}); // 2


/**
 * 在 run 时通过传入 contexts 传入一些配置信息
 * 
 * container 有 read 和 write 两个方法
 * read 传入 context.id 返回获取到存储在  contextMap 中的 context, 否则返回 context[ContextSymbol]
 * write 传 context 和 value, 向 contextMap 对应的 context.id 写入新值
 */