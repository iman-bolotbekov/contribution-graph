import React from 'react'
import Month from './Month'
import WeekDay from './WeekDay'
import Cell from './Cell'
import moment from 'moment'

interface TimelineProps {
  colorFunc: ({ alpha }: { alpha: number }) => string
  range: moment.Moment[]
  data: { date: moment.Moment; value: number }[]
}

const Timeline: React.FC<TimelineProps> = ({ range, data, colorFunc }) => {
  let days = Math.abs(range[0].diff(range[1], 'days'))
  let cells = Array.from(new Array(days))
  let weekDays = Array.from(new Array(7))
  let months = Array.from(new Array(Math.floor(days / 7)))

  let min = Math.min(0, ...data.map((d) => d.value))
  let max = Math.max(...data.map((d) => d.value))

  let colorMultiplier = 1 / (max - min)

  let startDate = range[0]
  console.log(`StartDate:${startDate}`)
  const DayFormat = 'DDMMYYYY'

  const getTooltipText = (contribution: number, date: moment.Moment) => {
    const formattedDate = date.format('dddd MMM D, YYYY')
    if (contribution === 0) {
      return `No Contribution\n${formattedDate}`
    } else if (contribution >= 1 && contribution <= 9) {
      return `1-9 Contribution\n${formattedDate}`
    } else if (contribution >= 30) {
      return `30+ Contribution\n${formattedDate}`
    } else {
      return `${contribution} Contribution\n${formattedDate}`
    }
  }

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} />
          ))}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'day')
            let dataPoint = data.find(
              (d) =>
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
            )
            let alpha = dataPoint ? colorMultiplier * dataPoint.value : 0
            let color = colorFunc({ alpha })
            let tooltipText = dataPoint
              ? getTooltipText(dataPoint.value, dataPoint.date)
              : null

            return <Cell key={index} color={color} tooltip={tooltipText} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Timeline
