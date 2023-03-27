import { spawn } from 'child_process'
import { setInterval } from 'timers'
import { createApiClients } from 'farrow/dist/api-client/index.js'

const config = {
  services: [
    {
      src: 'http://localhost:3003/api/greet',
      dist: 'src/api/greet.ts',
    },
  ]
}

const apiClients = createApiClients(config)

/**
 * 只有 __introspection__ 变化时才需要同步，重新生成 api
 */
apiClients.start()

setTimeout(() => {
  // 启动 Vite 服务器
  const child = spawn('vite', [], { stdio: 'inherit' });

  child.on('close', () => {
    console.log('Vite 服务器已关闭');
    apiClients.stop()
  })
}, 500);
