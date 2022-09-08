import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { MediaType } from '../types'

function MediaList() {
  const { data: Media = [] } = useQuery<MediaType[]>(
    'media',
    async function () {
      const response = await fetch('/api/Media')
      return response.json()
    }
  )

  return (
    <div>
      <Link to="/CreateNewMedia">Create New Media</Link>

      <table className="flex-col justify-center">
        <tbody>
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
          {Media.map(function (Media: MediaType) {
            return (
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
                  <button className="px-12">Update</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MediaList
