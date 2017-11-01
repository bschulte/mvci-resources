import React from 'react'
import { Table, Row, Col } from 'reactstrap'
import Pagination from './TablePagination'

const Matches = props => {
  return (
    <div>
      <Row>
        <Col>
          <h3 className="pull-left mt-4">Matches</h3>
          <Pagination className="pull-right" page={props.page} maxPages={props.maxPages} getPage={props.getPage} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Characters</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {props.matches.map((match, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={'/static/images/icons/' + match.char1 + '.png'} width="50px" />
                      <img src={'/static/images/icons/' + match.char2 + '.png'} width="50px" />
                      <img src={'/static/images/icons/' + match.char3 + '.png'} width="50px" />
                      <img src={'/static/images/icons/' + match.char4 + '.png'} width="50px" />
                    </td>
                    <td>
                      <a href={match.url} target="_blank">
                        Match Link
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default Matches
