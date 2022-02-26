import { House as HouseType } from '@prisma/client'
import { useLoaderData } from 'remix'
import type { LoaderFunction, LinksFunction, MetaFunction } from 'remix'
import House from '../components/House'
import indexCSS from '../styles/index.css'
import { db } from '~/utils/db.server'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexCSS },
    // { rel: 'stylesheet', href: HeaderCSS },
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: 'Air B&B',
    description: 'Book your dream get away!!',
  }
}

export const loader: LoaderFunction = async () => {
  const houses = await db.house.findMany()

  return houses
}
type LoaderData = HouseType[]

export default function Index() {
  const houses = useLoaderData<LoaderData>()
  console.log('🚀 ~ file: index.tsx ~ line 49 ~ houses', houses)
  return (
    <div className="container">
      <h2>Places to stay</h2>

      <div className="houses">
        {houses.map((house, index) => {
          //...
          return <House key={index} {...house} />
        })}
      </div>
    </div>
  )
}
