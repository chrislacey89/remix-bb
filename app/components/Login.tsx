import { useState } from 'react'
import { Link, useActionData, json, Form, useSearchParams } from 'remix'
import type { ActionFunction } from 'remix'
import { Button, TextInput, PasswordInput } from '@mantine/core'
import PasswordStrength from './PasswordStrength'
import { db } from '~/utils/db.server'
import { createUserSession, login, register } from '~/utils/session.server'

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
    username: string
    password: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  console.log('⏳⏳⏳:', request)
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo') ?? '/'
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }

  const fields = { username, password }
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  const userExists = await db.user.findFirst({
    where: { username },
  })
  if (userExists) {
    return badRequest({
      fields,
      formError: `User with username ${username} already exists`,
    })
  }
  const user = await register({ username, password })
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    })
  }
  return createUserSession(user.id, redirectTo)
}

export default function Signup() {
  const [searchParams] = useSearchParams()

  const [email, setEmail] = useState('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  return (
    <Form method="post">
      <TextInput
        id="email"
        type="email"
        name="username"
        label="Email"
        placeholder="Email address"
      />
      <PasswordInput
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get('redirectTo') ?? undefined}
      />
      <input type="hidden" name="loginType" value="login" />
      <Button type="submit" color="red" fullWidth className="mt-4">
        Log in
      </Button>
    </Form>
  )
}
