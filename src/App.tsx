import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Timeline from './components/Timeline'

interface EventData {
  [date: string]: number
}

const App: React.FC = () => {
  let startDate = moment().add(-365, 'days')
  let dateRange = [startDate, moment()]

  const getData = async () => {
    const response = await fetch(`https://dpg.gg/test/calendar.json`)
    const data: EventData = await response.json()
    return data
  }

  const [data, setData] = useState<{ date: Moment; value: number }[]>([])

  useEffect(() => {
    getData().then((fetchedData: EventData) => {
      const formattedData = Object.keys(fetchedData).map((date) => ({
        date: moment(date),
        value: fetchedData[date],
      }))
      setData(formattedData)
    })
  }, [])

  return (
    <>
      <Timeline
        range={dateRange}
        data={data}
        colorFunc={({ alpha }) => `rgba(3, 3, 160, ${alpha})`}
      />
    </>
  )
}

export default App
