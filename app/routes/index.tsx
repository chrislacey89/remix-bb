import type { MetaFunction, LinksFunction } from 'remix'
import { Button, AppShell, Navbar } from '@mantine/core'
import houses from '../data/houses'
import House from '../components/House'
import indexCSS from '../styles/index.css'
import HeaderCSS from '../styles/header.css'

import Header from '~/components/Header'
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
    <AppShell
      padding="md"
      header={<Header />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
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
    </AppShell>
  )
}
