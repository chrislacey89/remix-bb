import { Link } from 'remix'
import { Button, Header as MantineHeader } from '@mantine/core'
export default function Header() {
  return (
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
          <Link to="/register">
            <Button variant="subtle" color="dark" size="md" radius="xl">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="subtle" color="dark" size="md" radius="xl">
              Log in
            </Button>
          </Link>
        </nav>
      </div>
    </MantineHeader>
  )
}
