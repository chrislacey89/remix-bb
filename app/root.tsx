import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  json,
  useSearchParams,
  Link,
  Form,
  useLoaderData,
} from 'remix'
import type {
  ActionFunction,
  LoaderFunction,
  LinksFunction,
  MetaFunction,
} from 'remix'

import { MantineProvider, AppShell } from '@mantine/core'
import Header from './components/Header'
import reset from './styles/reset.css'
import tailwindStyles from './styles/tailwind.css'
import global from './styles/global.css'
import { authenticator } from '~/services/auth.server'
// import headerCSS from './styles/header'
import { db } from '~/services/db.server'
// import {
//   requireUserId,
//   getUserId,
//   createUserSession,
//   login,
//   register,
// } from '~/utils/session.server'

import { register } from '~/services/session.server'

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

function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames must be at least 3 characters long`
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`
  }
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    loginType: string
    username: string
    password: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const loginType = form.get('loginType')
  const username = form.get('username')
  const password = form.get('password')
  const redirectTo = '/'

  if (
    typeof loginType !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    console.error('!!! error')
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }

  const fields = { loginType, username, password }
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })
  console.log('about to switch')
  switch (loginType) {
    case 'login': {
      console.log('🧝🏻‍♂️🧝🏻‍♂️', loginType)

      return authenticator.authenticate('user-pass', request, {
        successRedirect: '/',
        failureRedirect: '/',
      })
    }
    case 'register': {
      console.info('register')
      const userExists = await db.user.findFirst({
        where: { username },
      })
      console.log('user exists:', userExists)
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists`,
        })
      }
      console.info('registering...')
      const user = await register({ username, password })
      if (!user) {
        return badRequest({
          fields,
          formError: `Something went wrong trying to create a new user.`,
        })
      }
      console.info('creating user...')
      return authenticator.authenticate('user-pass', request, {
        successRedirect: '/',
        failureRedirect: '/',
      })
      // return createUserSession(user.id, '/')
    }
    case 'logout': {
      console.info('loggingout')
      return authenticator.logout(request, { redirectTo: '/' })

      // return createUserSession(user.id, '/')
    }
    default: {
      console.log('err')
      return badRequest({
        fields,
        formError: `Login type invalid`,
      })
    }
  }
}

type LoaderData = { authenticated: boolean }

// export const loader: LoaderFunction = async ({ request }) => {
// todo: fix these 3 lines with proper auth check
// const userId = await getUserId(request)
// console.log('🚀 ~ file: root.tsx ~ line 148 ~ userId', userId)
// const loggedIn = userId !== null
// if (!userId) {
// eslint-disable-next-line @typescript-eslint/no-throw-literal
//   throw new Response('Unauthorized', { status: 401 })
// }
// return { authenticated: loggedIn }
// }

export default function App() {
  // const { authenticated } = useLoaderData<LoaderData>()

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
            header={<Header authenticated={true} />}
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
