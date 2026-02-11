import type { LoveIncident } from '../types'
import './IncidentModal.css'

interface Props {
  incident: LoveIncident
  isAdmin: boolean
  onClose: () => void
  onDelete: (id: string) => Promise<void>
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function IncidentModal({ incident, isAdmin, onClose, onDelete }: Props) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleDeleteClick = () => {
    if (window.confirm('This will remove the incident from the archive. Proceed?')) {
      onDelete(incident.id)
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">Love Incident Report</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <span className="modal-label">Case ID</span>
            <span className="modal-value modal-value--mono">{incident.id.slice(0, 8).toUpperCase()}</span>
          </div>

          <div className="modal-field">
            <span className="modal-label">Date Filed</span>
            <span className="modal-value">{formatDate(incident.created_at)}</span>
          </div>

          <div className="modal-field">
            <span className="modal-label">Location</span>
            <span className="modal-value modal-value--bold">{incident.location}</span>
          </div>

          {incident.incident_type && (
            <div className="modal-field">
              <span className="modal-label">Incident Type</span>
              <span className="modal-value">{incident.incident_type}</span>
            </div>
          )}

          {incident.era && (
            <div className="modal-field">
              <span className="modal-label">Era</span>
              <span className="modal-value">{incident.era}</span>
            </div>
          )}

          <div className="modal-field">
            <span className="modal-label">Tenderness Level</span>
            <span className="modal-value">{incident.tenderness_level} / 5</span>
          </div>

          {incident.nickname && (
            <div className="modal-field">
              <span className="modal-label">Filed By</span>
              <span className="modal-value">{incident.nickname}</span>
            </div>
          )}

          <div className="modal-story-section">
            <span className="modal-label">Incident Narrative</span>
            <div className="modal-story">{incident.story}</div>
          </div>
        </div>

        <div className="modal-footer">
          {isAdmin && (
            <button className="modal-delete" onClick={handleDeleteClick}>
              Delete Incident
            </button>
          )}
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default IncidentModal
