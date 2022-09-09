import React from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { MediaType } from '../../types'

function GetMediaList() {
  const { data: Media = [] } = useQuery<MediaType[]>(
    'media',
    async function () {
      const response = await fetch('/api/Media')
      return response.json()
    }
  )

  const navigate = useNavigate()
  const handleRowClick = (Media: MediaType) => {
    navigate(`/Media/${Media.id}`)
  }

  return (
    <div>
      <Link
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        to="/Media/create"
      >
        Create New Media
      </Link>

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
          {Media.map(function (Media: MediaType) {
            return (
              <tr
                key={Media.id}
                className="flex-col cursor-pointer even:bg-gray-200"
                onClick={() => handleRowClick(Media)}
              >
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GetMediaList
