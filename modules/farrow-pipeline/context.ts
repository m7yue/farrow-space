import {
  createContext,
  isContext,
  assertContext,
  createPipeline,
  useContainer
} from "farrow-pipeline";

/**
 * pipeline 和 createContext 中通过全局的 run 和 hooks 进行的关联
 * pipeline run 时，执行 runHooks, 每一次的 run 都是临时修改 hooks (主要是 useContainer), 执行完成后又把 hooks 改回默认 useContainer
 * 这样就达到了只在特定作用域下执行 useContainer
 */

/**
 * useContainer 是怎么注册的
 * 
 * createHooks： hooks, run
 * 通过闭包函数去修改共享内存变量，也就是存储的 hooks, hooks 中包含 useContainer
 * 
 * 通过闭包机制共享内存，但是这样的代码追溯和理解起来需要关注闭包内提供了哪些修改的接口
 */

const pipeline = createPipeline<number, number>();
const context = createContext<number | null>(0);


pipeline.use((count, next) => {
  /**
   * id
   * create
   * use
   * get
   * set
   * assert
   */
  const {
    id: contextId,
    create: contextCreate,
    use: contextUse,
    get: contextGet,
    set: contextSet,
    assert: contextAssert
  } = context

  console.log(context.use().value); // 0
  console.log(context.get()); // 0
  
  context.set(1)
  console.log(context.use().value)//1
  console.log(context.get())//1
  
  context.set(null);
  console.log(context.use().value); // null
  console.log(context.get()); // null
  // context.assert(); // throw error
  
  // TODO: 和文档的值不一样, newContext 拿到的还是原来的
  // 需要执行 container.write 才能起作用
  const newContext = context.create(2);
  /**
  const read: Container['read'] = (context) => {
    const target = contextMap.get(context.id)
    if (target) {
      return target[ContextSymbol]
    }
    return context[ContextSymbol]
  }
   */
  // console.log(newContext.id === context.id) // true
  console.log(newContext.use().value)
  // console.log(context.get())
  // console.log(newContext.get())


  // isContext
  console.log(isContext(context)) // true
  console.log(isContext(0)) // false


  // assertContext
  assertContext(context); // safe
  // assertContext(0); // throw error

  return count * 2;
});

console.log(pipeline.run(1)); // 2
