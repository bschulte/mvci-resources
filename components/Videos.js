import React from 'react'
import { Table } from 'reactstrap'
const Videos = props => {
  return (
    <div>
      <h3>Tournaments</h3>
      <Table>
        <thead />
        <tbody>
          {props.videos.map((video, index) => {
            return (
              <tr key={index}>
                <td>
                  <a href={video.url} target="_blank">
                    {video.title}
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Videos
