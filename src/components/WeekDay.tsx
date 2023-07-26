import React from 'react'

const DayNames: { [key: number]: string } = {
  1: 'Mon',
  3: 'Wed',
  5: 'Fri',
}

interface WeekDayProps {
  index: number
}

const WeekDay: React.FC<WeekDayProps> = ({ index }) => {
  return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>
}

export default WeekDay
