import { useState } from 'react'
import { Form, Link } from 'remix'

import {
  Button,
  Header as MantineHeader,
  Modal,
  TextInput,
  PasswordInput,
} from '@mantine/core'
import Signup from './Signup'
import Login from './Login'
export async function action({ request }) {
  console.log('test')
  console.log('🚀 ~ file: Header.tsx ~ line 14 ~ request', request)
}

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps) {
  const [signUpOpened, setSignUpOpened] = useState(false)
  const [loginOpened, setLoginOpened] = useState(false)
  const [email, setEmail] = useState('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  return (
    <>
      <Modal opened={signUpOpened} onClose={() => setSignUpOpened(false)}>
        <Signup />
      </Modal>

      <Modal
        opened={loginOpened}
        title="Log in"
        onClose={() => setLoginOpened(false)}
      >
        <Login />
      </Modal>

      <MantineHeader height={80}>
        <div className="flex">
          <Link to="/">
            <a>
              <img
                className="h-12 m-4"
                src="/images/logo-with-text.png"
                alt="logo"
              />
            </a>
          </Link>

          <nav className="flex items-center	ml-auto">
            <Button
              onClick={() => setSignUpOpened(true)}
              variant="subtle"
              color="dark"
              size="md"
              radius="xl"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => setLoginOpened(true)}
              variant="subtle"
              color="dark"
              size="md"
              radius="xl"
            >
              Log in
            </Button>
            <Form method="post">
              <input type="hidden" name="loginType" value="logout" />
              <input type="hidden" name="username" value="logout" />
              <input type="hidden" name="password" value="logout" />
              <input type="hidden" name="redirectTo" value="/" />
              <Button
                type="submit"
                variant="subtle"
                color="dark"
                size="md"
                radius="xl"
              >
                Log Out
              </Button>
            </Form>
          </nav>
        </div>
      </MantineHeader>
    </>
  )
}
