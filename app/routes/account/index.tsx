import { House as HouseType } from '@prisma/client'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from 'remix'
import { db } from '~/utils/db.server'

export default function Index() {
  return (
    <div className="container">
      <div>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
