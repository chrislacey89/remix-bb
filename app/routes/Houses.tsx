import { Outlet } from 'remix'
import { AppShell } from '@mantine/core'
import Header from '../components/Header'
export default function Houses() {
  return (
    <AppShell
      padding="md"
      header={<Header />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  )
}
