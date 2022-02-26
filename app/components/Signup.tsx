import { useState, useRef } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { Link, useActionData, json, Form, useSearchParams } from 'remix'
import type { ActionFunction } from 'remix'
import { Button, TextInput, PasswordInput } from '@mantine/core'
import { DevTool } from '@hookform/devtools'
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
const signupSchema = z
  .object({
    username: z.string().email().required,
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
  })

type Schema = z.infer<typeof signupSchema>
export default function Signup() {
  const [searchParams] = useSearchParams()

  const [passwordValue, setPasswordValue] = useState<string>('')

  const {
    register: hookformRegister,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(signupSchema) })

  const email = hookformRegister('username', { required: true })

  return (
    <>
      <Form method="post">
        <TextInput
          id="email"
          ref={email.ref}
          name="username"
          type="email"
          label="Email"
          placeholder="Email address"
          onChange={email.onChange}
          onBlur={email.onBlur}
        />
        <PasswordStrength
          passwordValue={passwordValue}
          onPasswordChange={event => {
            setPasswordValue(event.currentTarget.value)
          }}
        />
        <PasswordInput
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          placeholder="Enter your password again"
        />
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('redirectTo') ?? undefined}
        />

        <input type="hidden" name="loginType" value="register" />
        <Button type="submit" color="red" fullWidth className="mt-4">
          Sign up
        </Button>
      </Form>
      <DevTool control={control} />
    </>
  )
}
