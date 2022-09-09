import { MediaType } from '../types'

export async function submitNewMedia(mediaToCreate: MediaType) {
  const response = await fetch('/api/Media', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(mediaToCreate),
  })

  return response.json()
}
