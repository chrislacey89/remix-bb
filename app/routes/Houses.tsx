import type { LinksFunction } from 'remix'
import { Outlet } from 'remix'
import { AppShell } from '@mantine/core'
import Header from '../components/Header'
import housesCSS from '../styles/houses.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: housesCSS }]
}

export default function Houses() {
  return <Outlet />
}
