interface HouseProps {
  picture: string
  type: string
  town: string
  title: string
}

export default function House({ picture, type, town, title }: HouseProps) {
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
