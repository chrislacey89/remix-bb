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
import { useState } from 'react'
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

export const loader: LoaderFunction = async ({ params }) => {
  return houses.filter(house => house.id === params.houseId)[0]
}

export default function Houses() {
  const { picture, town, type, title } = useLoaderData<House>()
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ])

  const [startDateOpened, setStartDateOpened] = useState(false)
  const [endDateOpened, setEndDateOpened] = useState(false)

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
                  onClick={() => setStartDateOpened(o => !o)}
                  component="button"
                  value="input"
                >
                  {value[0]?.toDateString()}
                </Input>
              </InputWrapper>
            }
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
            width={260}
            position="bottom"
            withArrow
          >
            <div>
              <RangeCalendar value={value} onChange={setValue} />
            </div>
          </Popover>
        </div>
      </aside>
    </div>
  )
}
