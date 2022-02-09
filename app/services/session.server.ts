import { createCookieSessionStorage } from 'remix'
import bcrypt from 'bcryptjs'
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

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'RBB2_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [sessionSecret],
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
  },
})

// you can also export the methods individually for your own usage
// eslint-disable-next-line @typescript-eslint/unbound-method
export const { getSession, commitSession, destroySession } = sessionStorage
