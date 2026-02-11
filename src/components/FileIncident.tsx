import { useState } from 'react'
import { supabase } from '../supabase'
import type { NewLoveIncident, LoveIncident } from '../types'
import FiledConfirmation from './FiledConfirmation'
import './FileIncident.css'

const INCIDENT_TYPES = [
  'First date',
  'Friendship',
  'Solitary revelation',
  'Career',
  'Family',
  'Strangers',
  'Other',
]

const ERAS = [
  'Tonight',
  'This year',
  'Years ago',
  'Childhood',
  'Prefer not to say',
]

interface Props {
  onFiled: () => void
  onViewArchive: () => void
}

function FileIncident({ onFiled, onViewArchive }: Props) {
  const [nickname, setNickname] = useState('')
  const [location, setLocation] = useState('')
  const [incidentType, setIncidentType] = useState('')
  const [otherType, setOtherType] = useState('')
  const [era, setEra] = useState('Tonight')
  const [tendernessLevel, setTendernessLevel] = useState(3)
  const [story, setStory] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filed, setFiled] = useState<LoveIncident | null>(null)

  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const resolvedType = incidentType === 'Other' ? otherType.trim() : incidentType

  const validate = () => {
    const errors: string[] = []
    if (!location.trim()) errors.push('Location is required.')
    if (!story.trim()) errors.push('Story is required.')
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ location: true, story: true })

    const errs = validate()
    if (errs.length > 0) {
      setError(errs.join(' '))
      return
    }

    setSubmitting(true)
    setError(null)

    const record: NewLoveIncident = {
      nickname: nickname.trim() || null,
      location: location.trim(),
      incident_type: resolvedType || null,
      story: story.trim(),
      era: era || null,
      tenderness_level: tendernessLevel,
    }

    const { data, error: err } = await supabase
      .from('love_incidents')
      .insert(record)
      .select()
      .single()

    setSubmitting(false)

    if (err || !data) {
      setError('Submission failed. The municipal tenderness system encountered an error. Please try again.')
      console.error(err)
      return
    }

    setFiled(data as LoveIncident)
    onFiled()
  }

  const handleFileAnother = () => {
    setNickname('')
    setLocation('')
    setIncidentType('')
    setOtherType('')
    setEra('Tonight')
    setTendernessLevel(3)
    setStory('')
    setFiled(null)
    setError(null)
    setTouched({})
  }

  if (filed) {
    return (
      <FiledConfirmation
        incident={filed}
        onFileAnother={handleFileAnother}
        onViewArchive={onViewArchive}
      />
    )
  }

  return (
    <form className="file-form" onSubmit={handleSubmit} noValidate>
      <h2 className="file-form-title">Incident Report</h2>
      <p className="file-form-instruction">
        Please complete the following fields to record your love incident with the Department of Tenderness.
        Fields marked with * are required.
      </p>

      <div className="file-form-notice">
        <span className="file-form-notice-text">
          Current Processing Time for Love Incidents: 2–3 Business Days
        </span>
        <span className="file-form-notice-sub">
          (Expedited vulnerability not available)
        </span>
      </div>

      {error && <div className="file-form-error">{error}</div>}

      {/* Nickname */}
      <div className="field">
        <label className="field-label" htmlFor="fi-nickname">Reporting Party (Nickname)</label>
        <input
          id="fi-nickname"
          className="field-input"
          type="text"
          placeholder="Optional — alias, initials, pseudonym"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          maxLength={100}
        />
      </div>

      {/* Location */}
      <div className="field">
        <label className="field-label" htmlFor="fi-location">Location of Incident *</label>
        <input
          id="fi-location"
          className={`field-input ${touched.location && !location.trim() ? 'field-input--error' : ''}`}
          type="text"
          placeholder="e.g., 'under the Manhattan Bridge'"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, location: true }))}
          maxLength={200}
          required
        />
        {touched.location && !location.trim() && (
          <span className="field-error-msg">This field is required by municipal regulation.</span>
        )}
      </div>

      {/* Incident Type */}
      <div className="field">
        <label className="field-label" htmlFor="fi-type">Incident Classification</label>
        <select
          id="fi-type"
          className="field-select"
          value={incidentType}
          onChange={e => setIncidentType(e.target.value)}
        >
          <option value="">— Not specified —</option>
          {INCIDENT_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {incidentType === 'Other' && (
          <input
            className="field-input field-input--sub"
            type="text"
            placeholder="Please specify incident type"
            value={otherType}
            onChange={e => setOtherType(e.target.value)}
            maxLength={100}
          />
        )}
      </div>

      {/* Era */}
      <div className="field">
        <label className="field-label">Temporal Era of Incident *</label>
        <div className="field-radio-group">
          {ERAS.map(e => (
            <label key={e} className={`field-radio ${era === e ? 'field-radio--active' : ''}`}>
              <input
                type="radio"
                name="era"
                value={e}
                checked={era === e}
                onChange={() => setEra(e)}
              />
              {e}
            </label>
          ))}
        </div>
      </div>

      {/* Tenderness Level */}
      <div className="field">
        <label className="field-label">Tenderness Level * &nbsp;({tendernessLevel}/5)</label>
        <div className="field-tenderness">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              className={`field-tenderness-btn ${tendernessLevel === n ? 'field-tenderness-btn--active' : ''}`}
              onClick={() => setTendernessLevel(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="field-tenderness-labels">
          <span>Mild</span>
          <span>Devastating</span>
        </div>
      </div>

      {/* Story */}
      <div className="field">
        <label className="field-label" htmlFor="fi-story">Incident Narrative *</label>
        <textarea
          id="fi-story"
          className={`field-textarea ${touched.story && !story.trim() ? 'field-input--error' : ''}`}
          placeholder="Describe the incident in your own words. Include relevant emotional details."
          value={story}
          onChange={e => setStory(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, story: true }))}
          rows={5}
          maxLength={3000}
          required
        />
        {touched.story && !story.trim() && (
          <span className="field-error-msg">A narrative is required to complete the filing.</span>
        )}
        <span className="field-char-count">{story.length}/3000</span>
      </div>

      <button
        type="submit"
        className="file-submit"
        disabled={submitting}
      >
        {submitting ? 'Filing...' : 'File Love Incident'}
      </button>
    </form>
  )
}

export default FileIncident
