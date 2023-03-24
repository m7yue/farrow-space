import { useState, useEffect } from 'react'
import { api as GreetApi } from './api/greet'

function App() {
  const [greet, setGreet] = useState('')

  useEffect(() => {
    const task = async () => {
      const result = await GreetApi.greet({
        name: `Farrow + React + Vite`,
      })
      setGreet(result.greet)
    }
    task().catch((error) => {
      console.log('error', error)
    })
  }, [])

  if (!greet) return null

  return (
    <div>{greet}</div>
  )
}

export default App
