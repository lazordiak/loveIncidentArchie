import type { LoveIncident } from '../types'
import './FiledConfirmation.css'

interface Props {
  incident: LoveIncident
  onFileAnother: () => void
  onViewArchive: () => void
}

function FiledConfirmation({ incident, onFileAnother, onViewArchive }: Props) {
  return (
    <div className="filed">
      <div className="filed-stamp">FILED</div>

      <div className="filed-receipt">
        <div className="filed-receipt-row">
          <span className="filed-receipt-label">Case ID:</span>
          <span className="filed-receipt-value">{incident.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="filed-receipt-row">
          <span className="filed-receipt-label">Location:</span>
          <span className="filed-receipt-value">{incident.location}</span>
        </div>
        <div className="filed-receipt-row">
          <span className="filed-receipt-label">Tenderness:</span>
          <span className="filed-receipt-value">{incident.tenderness_level}/5</span>
        </div>
      </div>

      <p className="filed-message">
        Thank you. Your tenderness has been recorded in the civic archive.
      </p>
      <p className="filed-message-sub">
        The Department of Tenderness appreciates your cooperation.
      </p>

      <div className="filed-actions">
        <button className="filed-btn filed-btn--primary" onClick={onViewArchive}>
          View Archive
        </button>
        <button className="filed-btn" onClick={onFileAnother}>
          File Another Incident
        </button>
      </div>
    </div>
  )
}

export default FiledConfirmation
