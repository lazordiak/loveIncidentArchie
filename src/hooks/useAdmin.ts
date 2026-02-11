import { useMemo } from 'react'

export function useAdmin(): boolean {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const adminFlag = params.get('admin')
    const key = params.get('key')
    const expectedKey = import.meta.env.VITE_ADMIN_KEY
    return adminFlag === '1' && !!key && !!expectedKey && key === expectedKey
  }, [])
}
