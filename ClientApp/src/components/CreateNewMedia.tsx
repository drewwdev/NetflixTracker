import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MediaType } from '../types'

export default function CreateNewMedia() {
  const [newMedia, setNewMedia] = useState<MediaType>({
    show_id: '',
    type: '',
    title: '',
    director: '',
    country: '',
    date_added: '',
    release_year: 0,
    rating: '',
    duration: '',
    listed_in: [],
  })

  function handleOnTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedMedia = { ...newMedia, [fieldName]: value }

    setNewMedia(updatedMedia)
  }

  async function submitNewMedia(mediaToCreate: MediaType) {
    const response = await fetch('/api/Media', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mediaToCreate),
    })

    return response.json()
  }

  const navigate = useNavigate()
  const submitCreatedNewMedia = useMutation(submitNewMedia, {
    onSuccess: function () {
      navigate('/')
    },
  })

  function handleFormSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    submitCreatedNewMedia.mutate(newMedia)
  }

  return (
    <div className="flex flex-col w-1/3">
      <div className="flex">
        <label htmlFor="show_id">Show ID</label>
        <input
          type="text"
          name="show_id"
          value={newMedia.show_id}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          value={newMedia.type}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={newMedia.title}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="director">Director</label>
        <input
          type="text"
          name="director"
          value={newMedia.director}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={newMedia.country}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="date_added">Date Added</label>
        <input
          type="text"
          name="date_added"
          value={newMedia.date_added}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="release_year">Release Year</label>
        <input
          type="number"
          name="release_year"
          value={newMedia.release_year}
          onChange={(e) => {
            setNewMedia({ ...newMedia, release_year: parseInt(e.target.value) })
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          name="rating"
          value={newMedia.rating}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          name="duration"
          value={newMedia.duration}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="listed_in">Listed In</label>
        <input
          type="text"
          name="listed_in"
          value={newMedia.listed_in}
          onChange={handleOnTextChange}
        />
      </div>
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  )
}
