import { useState, useEffect } from 'react'
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
import HeaderNavProfile from './HeaderNavProfile'
import { useStore } from '~/store/store'
export async function action({ request }) {
  console.log('test')
  console.log('🚀 ~ file: Header.tsx ~ line 14 ~ request', request)
}

export default function Header() {
  const [signUpOpened, setSignUpOpened] = useState(false)
  const [loginOpened, setLoginOpened] = useState(false)
  const { authenticated } = useStore()
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
            <HeaderNavProfile authenticated={authenticated} />
          </nav>
        </div>
      </MantineHeader>
    </>
  )
}
