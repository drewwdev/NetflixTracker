import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { MediaType } from '../../types'
import { loadOneEntry } from '../../api/loadOneEntry'

function GetSingleMedia() {
  const navigate = useNavigate()

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const response = await fetch(`/api/Media/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    if (response.status === 200 || response.status === 204) {
      navigate('/')
    }
  }

  const nullMediaType: MediaType = {
    id: 0,
    showId: '',
    type: '',
    title: '',
    director: '',
    country: '',
    dateAdded: '',
    releaseYear: 0,
    rating: '',
    duration: '',
    listedIn: '',
  }

  const { id } = useParams<{ id: string }>()

  const { data: Media = nullMediaType } = useQuery<MediaType>(
    ['one-media-entry', id],
    () => loadOneEntry(id)
  )

  return (
    <table className="flex-col p-12 border-separate table-auto">
      <thead className="flex-col text-left">
        <tr>
          <th>Show Id</th>
          <th>Type</th>
          <th>Title</th>
          <th>Director</th>
          <th>Country</th>
          <th>Date Added</th>
          <th>Release Year</th>
          <th>Rating</th>
          <th>Duration</th>
          <th>Listed In</th>
        </tr>
      </thead>
      <tbody>
        <tr key={Media.id}>
          <td>{Media.showId}</td>
          <td>{Media.type}</td>
          <td>{Media.title}</td>
          <td>{Media.director}</td>
          <td>{Media.country}</td>
          <td>{new Date(Media.dateAdded).toLocaleString()}</td>
          <td>{Media.releaseYear}</td>
          <td>{Media.rating}</td>
          <td>{Media.duration}</td>
          <td>{Media.listedIn}</td>
          <td>
            <Link to={`/Media/update/${Media.id}`} className="px-12">
              Update
            </Link>
          </td>
          <td>
            <button onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default GetSingleMedia
