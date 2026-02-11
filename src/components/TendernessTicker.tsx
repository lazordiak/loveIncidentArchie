import { useState } from 'react'
import './TendernessTicker.css'

const BULLETINS = [
  'ARCHIVE UPDATE: Tenderness levels remain stable across all boroughs',
  '311 Update: Reports of sudden affection fluctuation in Bushwick under investigation',
  'In case of emotional emergency, remain where you are and dial 1-333-ILY2',
  'NOTICE: New zoning laws for PDA coming up August 2026',
  'Tenderness and Affection training workshops NOW OPEN in Staten Island',
  'DOT outreach to Jersey City shows signs of bearing fruit, satellite office established',
]

function TendernessTicker() {
  const [bulletin] = useState(() => BULLETINS[Math.floor(Math.random() * BULLETINS.length)])
  return (
    <div className="ticker">
      <span className="ticker-label">DEPARTMENT BULLETIN:</span>
      <marquee
        className="ticker-marquee"
        behavior="scroll"
        direction="left"
        scrollamount={4}
      >
        {bulletin}
      </marquee>
    </div>
  )
}

export default TendernessTicker
