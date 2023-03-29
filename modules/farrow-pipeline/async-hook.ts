import { enable, disable} from "farrow-pipeline/asyncHooks.node";
import { createAsyncPipeline, createContext } from "farrow-pipeline";

// 异步钩子对性能的影响

enable()
// disable()

const asyncPipeline = createAsyncPipeline<number, number>();
asyncPipeline.use((count, next) => {
  return next(count + 1);
});
asyncPipeline.useLazy(async () => {
  return (count, next) => {
    return count * 2
  }
});
const runner = async () => {
  console.log(await asyncPipeline.run(1)); // 4 = (1 + 1) * 2
  console.log(await asyncPipeline.run(5)); // 12 = (5 + 1) * 2  
}

runner()