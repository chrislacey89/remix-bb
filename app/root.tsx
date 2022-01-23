import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'
import { MantineProvider, AppShell } from '@mantine/core'
import Header from './components/Header'
import reset from './styles/reset.css'
import tailwindStyles from './styles/tailwind.css'
import global from './styles/global.css'
import headerCSS from './styles/hea'
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: reset },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: global },
  ]
}
export const meta: MetaFunction = () => {
  return { title: 'New Remix App' }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
          theme={{
            colors: {
              // Add your color
              'airbb-red': ['#E9EDFC'],
              'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            },
          }}
        >
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
            <Outlet />
          </AppShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
