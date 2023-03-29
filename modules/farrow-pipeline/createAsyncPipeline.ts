import { createAsyncPipeline, createContext } from "farrow-pipeline";

const asyncPipeline = createAsyncPipeline<number, number>();
asyncPipeline.use((count, next) => {
  return next(count + 1);
});
/**
 * 这里的 thunk 执行时没有带任何参数
 * 这里实现可能就拿不到之前给我的值，从而进行新的增强
 */
asyncPipeline.useLazy(async () => {
  // 要返回一个新的中间件吗
  return (count, next) => {
    return count * 2
  }
});
const runner = async () => {
  console.log(await asyncPipeline.run(1)); // 4 = (1 + 1) * 2
  console.log(await asyncPipeline.run(5)); // 12 = (5 + 1) * 2  
}

runner()
