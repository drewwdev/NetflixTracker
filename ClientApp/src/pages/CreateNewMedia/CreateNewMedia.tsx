import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { submitNewMedia } from '../../api/submitNewMedia'
import { MediaType } from '../../types'

export default function CreateNewMedia() {
  const [newMedia, setNewMedia] = useState<MediaType>({
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

  function handleOnTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedMedia = { ...newMedia, [fieldName]: value }

    setNewMedia(updatedMedia)
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
        <label htmlFor="showId">Show ID</label>
        <input
          type="text"
          name="showId"
          value={newMedia.showId}
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
        <label htmlFor="dateAdded">Date Added</label>
        <input
          type="text"
          name="dateAdded"
          value={newMedia.dateAdded}
          onChange={handleOnTextChange}
        />
      </div>
      <div className="flex">
        <label htmlFor="releaseYear">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          value={newMedia.releaseYear}
          onChange={(e) => {
            setNewMedia({ ...newMedia, releaseYear: parseInt(e.target.value) })
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
        <label htmlFor="listedIn">Listed In</label>
        <input
          type="text"
          name="listedIn"
          value={newMedia.listedIn}
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
