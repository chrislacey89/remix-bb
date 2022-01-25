import { useState } from 'react'
import { Link } from 'remix'
import {
  Button,
  Header as MantineHeader,
  Modal,
  TextInput,
  PasswordInput,
} from '@mantine/core'
import PasswordStrength from './PasswordStrength'
export default function Header() {
  const [signUpOpened, setSignUpOpened] = useState(false)
  const [loginOpened, setLoginOpened] = useState(false)
  const [email, setEmail] = useState('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  return (
    <>
      <Modal opened={signUpOpened} onClose={() => setSignUpOpened(false)}>
        <div>
          <form>
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Email address"
              value={email}
              onChange={event => setEmail(event.currentTarget.value)}
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
            <Button color="red" fullWidth className="mt-4">
              Log in
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        opened={loginOpened}
        title="Log in"
        onClose={() => setLoginOpened(false)}
      >
        <div>
          <form>
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Email address"
            />
            <PasswordInput
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Button color="red" fullWidth className="mt-4">
              Log in
            </Button>
          </form>
        </div>
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
          </nav>
        </div>
      </MantineHeader>
    </>
  )
}
