import React, { useState } from 'react'

interface CellProps {
  color: string
  tooltip: string | null
}

const Cell: React.FC<CellProps> = ({ color, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  let style = {
    backgroundColor: color,
  }

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div
      className="timeline-cells-cell"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  )
}

export default Cell
