import { House as HouseType } from '@prisma/client'
import { useState, useEffect } from 'react'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { RangeCalendar } from '@mantine/dates'
import {
  Title,
  Input,
  Popover,
  Text,
  Button,
  Image,
  InputWrapper,
} from '@mantine/core'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import houses from '../../data/houses'
import { db } from '~/utils/db.server'
dayjs.extend(duration)
interface House {
  id: string
  picture: string
  type: string
  town: string
  title: string
  price: string
  description: string
  guests: number
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

// export const loader: LoaderFunction = async ({ params }) => {
//   return houses.filter(house => house.id === params.houseId)[0]
// }

type LoaderData = HouseType

export const loader: LoaderFunction = async ({ params }) => {
  const house = await db.house.findUnique({ where: { id: params.houseId } })
  return house
}

export default function Houses() {
  const { picture, town, type, title, price, description, guests } =
    useLoaderData<LoaderData>()
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  const [startDateOpened, setStartDateOpened] = useState(false)
  const [endDateOpened, setEndDateOpened] = useState(false)
  const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] =
    useState(0)
  useEffect(() => {
    setNumberOfNightsBetweenDates(
      dayjs.duration(dayjs(value[1]).diff(dayjs(value[0]))).days(),
    )
  }, [value])
  return (
    <div className="grid grid-cols-10 gap-8">
      <article className="col-span-6">
        <img src={picture} width="100%" alt="House picture" />
        <p>
          {type} - {town}
        </p>
        <p>{title}</p>
      </article>
      <aside className="col-span-4 p-5 border border-solid border-slate-500	">
        <Title order={2}>Choose a Date</Title>
        <div className="flex flex-col gap-1">
          <Popover
            opened={startDateOpened}
            onClose={() => setStartDateOpened(false)}
            target={
              <InputWrapper label="Check In">
                <Input
                  className="date-input-wrapper"
                  onClick={() => setStartDateOpened(o => !o)}
                  component="button"
                  value="input"
                >
                  {value[0]?.toDateString()}
                </Input>
              </InputWrapper>
            }
            position="bottom"
            withArrow
          >
            <div style={{ display: 'flex' }}>
              <RangeCalendar value={value} onChange={setValue} />
            </div>
          </Popover>
          <Popover
            opened={endDateOpened}
            onClose={() => setEndDateOpened(false)}
            target={
              <InputWrapper label="Check Out">
                <Input
                  className="date-input-wrapper"
                  onClick={() => setEndDateOpened(o => !o)}
                  component="button"
                  value="input"
                >
                  {value[1]?.toDateString()}
                </Input>
              </InputWrapper>
            }
            position="bottom"
            withArrow
          >
            <div style={{ display: 'flex' }}>
              <RangeCalendar value={value} onChange={setValue} />
            </div>
          </Popover>
        </div>
        {value[0] && (
          <div>
            <h2>Price per night</h2>
            <p>${price}</p>
            <h2>Total price for booking</h2>
            <p>
              ${(numberOfNightsBetweenDates * parseInt(price, 10)).toFixed(2)}
            </p>
            <Button color="red" fullWidth>
              Reserve
            </Button>
          </div>
        )}
      </aside>
    </div>
  )
}
