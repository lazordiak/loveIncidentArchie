export interface LoveIncident {
  id: string
  created_at: string
  nickname: string | null
  location: string
  incident_type: string | null
  story: string
  era: string | null
  tenderness_level: number
}

export type NewLoveIncident = Omit<LoveIncident, 'id' | 'created_at'>
