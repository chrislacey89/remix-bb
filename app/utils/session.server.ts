import bcrypt from 'bcryptjs'
import { createCookieSessionStorage, redirect } from 'remix'
import { db } from './db.server'

type LoginForm = {
  username: string
  password: string
}

export async function register({ username, password }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10)
  return db.user.create({
    data: { username, passwordHash },
  })
}

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { username },
  })
  if (!user) return null
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isCorrectPassword) return null
  return user
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RBB_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

export async function requireUserId(request: Request) {
  const session = await getUserSession(request)
  return session.get('userId')
}

export async function getUser(request: Request) {
  const redirectTo: string = new URL(request.url).pathname

  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    })
    return user
  } catch {
    await logout(request)
  }
}

export async function logout(request: Request) {
  const redirectTo: string = new URL(request.url).pathname
  console.log('⏳⏳⏳', redirectTo)

  const session = await storage.getSession(request.headers.get('Cookie'))
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function createUserSession(request: Request, userId: string) {
  const redirectTo: string = new URL(request.url).pathname
  console.log(
    '🐨🐨🐨 ~ file: session.server.ts ~ line 94 ~ redirectTo',
    redirectTo,
  )

  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}
