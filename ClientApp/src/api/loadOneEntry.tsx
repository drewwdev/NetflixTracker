export async function loadOneEntry(id: string | undefined) {
  const response = await fetch(`/api/Media/${id}`)
  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
