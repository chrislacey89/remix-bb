import type { MetaFunction } from 'remix'
import { Button } from '@mantine/core'
export const meta: MetaFunction = () => {
  return {
    title: 'Air B&B',
    description: 'Book your dream get away!!',
  }
}

export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <h1>Hello world</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4">
          Button
        </button>
      </div>
      <Button>hello</Button>
    </div>
  )
}
