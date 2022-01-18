import type { MetaFunction, LinksFunction } from 'remix'
import { Button } from '@mantine/core'
import houses from '../data/houses'
import House from '../components/House'
import indexCSS from '../styles/index.css'
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexCSS }]
}

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
      </div>
      <h2>Places to stay</h2>

      <div className="houses">
        {houses.map((house, index) => {
          //...
          return <House key={index} {...house} />
        })}
      </div>

      <Button>hello</Button>
    </div>
  )
}
