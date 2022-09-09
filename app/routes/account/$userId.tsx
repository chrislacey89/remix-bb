import { House as HouseType } from '@prisma/client'
import { useState, useEffect } from 'react'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { db } from '~/utils/db.server'

export const loader: LoaderFunction = async ({ params }) => {
  const houses = await db.house.findMany({ where: { ownerId: params.userId } })
  return houses
}
type LoaderData = HouseType[]

export default function AccountInfo() {
  const houses = useLoaderData<LoaderData>()
  console.log('🚀 ~ file: $userId.tsx ~ line 15 ~ houses', houses)
  return (
    <>
      <div className="houses">
        <h2>Your houses</h2>

        <div className="list">
          {houses.map((house, index) => {
            return (
              <div className="house" key={index}>
                <img src={house.picture} alt="House picture" />
                <div>
                  <h2>
                    {house.title} in {house.town}
                  </h2>
                  <p>
                    {/* <Link href={`/houses/${house.id}`}>
                      <a>View house page</a>
                    </Link>
                  </p>
                  <p>
                    <Link href={`/host/${house.id}`}>
                      <a>Edit house details</a>
                    </Link> */}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bookings">
        <h2>Your bookings</h2>
      </div>
    </>
  )
}
