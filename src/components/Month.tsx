import React from 'react'
import moment from 'moment'

interface MonthProps {
  startDate: moment.Moment
  index: number
}

const Month: React.FC<MonthProps> = ({ startDate, index }) => {
  let date = moment(startDate).add(index * 7, 'day')
  let monthName = date.format('MMM')

  return <div className={`timeline-months-month ${monthName}`}>{monthName}</div>
}

export default Month
