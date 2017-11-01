import React from 'react'
import { Table, Row, Col } from 'reactstrap'
import Pagination from './TablePagination'

const Tutorials = props => {
  return (
    <div>
      <Row>
        <Col>
          <h3 className="pull-left mt-4">Tutorials</h3>
          <Pagination className="pull-right" page={props.page} maxPages={props.maxPages} getPage={props.getPage} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Character</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {props.tutorials.map((tutorial, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={'/static/images/icons/' + tutorial.char1 + '.png'} width="50px" />
                    </td>
                    <td>
                      <a href={tutorial.url} target="_blank">
                        {tutorial.title}
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

export default Tutorials
