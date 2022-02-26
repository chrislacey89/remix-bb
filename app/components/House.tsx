import { Link } from 'remix'

interface HouseProps {
  id: string
  picture: string
  type: string
  town: string
  title: string
  price: number
  description: string
  guests: number
}

export default function House({ id, picture, type, town, title }: HouseProps) {
  return (
    <div>
      <Link to={`/houses/${id}`}>
        <img src={picture} width="100%" alt="House picture" />
        <p>
          {type} - {town}
        </p>
        <p>{title}</p>
      </Link>
    </div>
  )
}
