import { MediaType } from '../types'

export async function submitUpdatedMedia(meditToUpdate: MediaType) {
  const response = await fetch(`/api/Media/${meditToUpdate.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(meditToUpdate),
  })

  return response.json()
}
