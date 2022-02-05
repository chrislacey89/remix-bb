import type { MetaFunction, LinksFunction } from 'remix'
import { AppShell } from '@mantine/core'
import houses from '../data/houses'
import House from '../components/House'
import indexCSS from '../styles/index.css'

import Header from '~/components/Header'

export async function action({ request }) {
  console.log('test')
  console.log('🚀 ~ file: Header.tsx ~ line 14 ~ request', request)
}
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexCSS },
    // { rel: 'stylesheet', href: HeaderCSS },
  ]
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
      <h2>Places to stay</h2>

      <div className="houses">
        {houses.map((house, index) => {
          //...
          return <House key={index} {...house} />
        })}
      </div>
    </div>
  )
}
