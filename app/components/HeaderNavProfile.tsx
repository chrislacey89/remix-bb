import { useState, useRef, useEffect, MutableRefObject } from 'react'
import { Form, Link } from 'remix'

import {
  Button,
  Header as MantineHeader,
  Modal,
  TextInput,
  PasswordInput,
  Menu,
  MenuItem,
} from '@mantine/core'
import Signup from './Signup'
import Login from './Login'
import NavProfileIcon from './NavProfileIcon'
interface HeaderNavProps {
  authenticated: boolean
}

export default function HeaderNavProfile({ authenticated }: HeaderNavProps) {
  console.log(
    '🚀 ~ file: HeaderNavProfile.tsx ~ line 21 ~ authenticated',
    authenticated,
  )
  const [signUpOpened, setSignUpOpened] = useState(false)
  const [loginOpened, setLoginOpened] = useState(false)
  // todo: update form ref type
  const formRef: unknown = useRef()

  useEffect(() => {
    if (authenticated && signUpOpened) {
      setSignUpOpened(false)
    }
    if (authenticated && loginOpened) {
      setLoginOpened(false)
    }
  }, [signUpOpened, loginOpened, authenticated])

  const loggedInMenu = (
    <Menu
      radius="lg"
      control={
        <nav className="flex items-center	ml-auto">
          <div className="text-base leading-5 text-white box-border">
            <div className="inline relative leading-5 box-border">
              <button
                type="button"
                className="hover:scale-110 transition-shadow outline-none rounded-full inline-flex overflow-visible relative items-center py-1 pr-1 pl-3 m-0 h-10 text-gray-900 no-underline align-middle bg-white border border-gray-400 border-solid appearance-none cursor-pointer select-auto box-border hover:shadow-xs"
                aria-expanded="false"
                aria-label="Main navigation menu. Has notifications."
                id="field-guide-toggle"
                data-testid="cypress-headernav-profile"
              >
                <div className="cursor-pointer box-border">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block overflow-visible w-4 h-4 box-border stroke-[3px] stroke-current"
                  >
                    <g fill="none" fillRule="nonzero" className="box-border">
                      <path d="m2 16h28" className="box-border" />
                      <path d="m2 24h28" className="box-border" />
                      <path d="m2 8h28" className="box-border" />
                    </g>
                  </svg>
                </div>
                <div className="overflow-hidden relative flex-grow-0 flex-shrink-0 ml-3 w-8 h-8 text-gray-600 box-border">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block w-full h-full box-border fill-current"
                  >
                    <path
                      d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
                      className="box-border"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </nav>
      }
    >
      <MenuItem onClick={() => formRef.current.requestSubmit()}>
        <Form ref={formRef} method="post" name="logout" id="logoutForm">
          <input type="hidden" name="loginType" value="logout" />
          <input type="hidden" name="username" value="logout" />
          <input type="hidden" name="password" value="logout" />
          <input type="hidden" name="redirectTo" value="/" />
          Logout
        </Form>
      </MenuItem>
    </Menu>
  )

  const loggedOutMenu = (
    <Menu
      radius="lg"
      control={
        <nav className="flex items-center	ml-auto">
          <div className="text-base leading-5 text-white box-border">
            <div className="inline relative leading-5 box-border">
              <button
                type="button"
                className="hover:scale-110 transition-shadow outline-none rounded-full inline-flex overflow-visible relative items-center py-1 pr-1 pl-3 m-0 h-10 text-gray-900 no-underline align-middle bg-white border border-gray-400 border-solid appearance-none cursor-pointer select-auto box-border hover:shadow-xs"
                aria-expanded="false"
                aria-label="Main navigation menu. Has notifications."
                id="field-guide-toggle"
                data-testid="cypress-headernav-profile"
              >
                <div className="cursor-pointer box-border">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block overflow-visible w-4 h-4 box-border stroke-[3px] stroke-current"
                  >
                    <g fill="none" fillRule="nonzero" className="box-border">
                      <path d="m2 16h28" className="box-border" />
                      <path d="m2 24h28" className="box-border" />
                      <path d="m2 8h28" className="box-border" />
                    </g>
                  </svg>
                </div>
                <div className="overflow-hidden relative flex-grow-0 flex-shrink-0 ml-3 w-8 h-8 text-gray-600 box-border">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="block w-full h-full box-border fill-current"
                  >
                    <path
                      d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
                      className="box-border"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </nav>
      }
    >
      <MenuItem onClick={() => setSignUpOpened(true)}>Sign Up</MenuItem>
      <MenuItem onClick={() => setLoginOpened(true)}>Log In</MenuItem>
    </Menu>
  )

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

      {authenticated ? loggedInMenu : loggedOutMenu}
    </>
  )
}
