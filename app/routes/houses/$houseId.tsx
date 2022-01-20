import type { LoaderFunction, ActionFunction, MetaFunction } from 'remix'
import { Link, useLoaderData, useCatch, redirect, useParams } from 'remix'
import houses from '../../data/houses'
interface House {
  id: string
  picture: string
  type: string
  town: string
  title: string
}

export const meta: MetaFunction = ({ data }: { data: House | undefined }) => {
  if (!data) {
    return {
      title: 'No house',
      description: 'No house found',
    }
  }
  return {
    title: `${data.title}`,
    description: 'Rent this beautiful home!',
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return houses.filter(house => house.id === params.houseId)[0]
}

export default function Houses() {
  const { picture, town, type, title } = useLoaderData<House>()

  return (
    <div>
      <img src={picture} width="100%" alt="House picture" />
      <p>
        {type} - {town}
      </p>
      <p>{title}</p>
    </div>
  )
}
