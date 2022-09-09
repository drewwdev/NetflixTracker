import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { MediaType } from '../../types'
import { submitUpdatedMedia } from '../../api/submitUpdatedMedia'

async function loadOneEntry(id: string | undefined) {
  const response = await fetch(`/api/Media/${id}`)
  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function UpdateSingleMedia() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useQuery<MediaType>(['one-media-entry', id], () => loadOneEntry(id), {
    onSuccess: function (data) {
      setMedia(data)
    },
  })

  const [media, setMedia] = useState<MediaType>({
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
  })

  const updateMedia = useMutation(submitUpdatedMedia, {
    onSuccess: function () {
      navigate('/')
    },
  })

  function handleOnTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedMedia = { ...media, [fieldName]: value }

    setMedia(updatedMedia)
  }

  function handleFormSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    updateMedia.mutate(media)
  }

  return (
    <div className="flex flex-col w-1/3">
      <div className="flex">
        <label htmlFor="showId">Show ID</label>
        <input
          type="text"
          name="showId"
          value={media.showId}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          value={media.type}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={media.title}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="director">Director</label>
        <input
          type="text"
          name="director"
          value={media.director}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={media.country}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="dateAdded">Date Added</label>
        <input
          type="text"
          name="dateAdded"
          value={new Date(media.dateAdded).toLocaleString()}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="releaseYear">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          value={media.releaseYear}
          onChange={(e) => {
            setMedia({ ...media, releaseYear: parseInt(e.target.value) })
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          name="rating"
          value={media.rating}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          name="duration"
          value={media.duration}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="listedIn">Listed In</label>
        <input
          type="text"
          name="listedIn"
          value={media.listedIn}
          onChange={handleOnTextChange}
        />
      </div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleFormSubmit}
      >
        Submit
      </button>
    </div>
  )
}

export default UpdateSingleMedia
