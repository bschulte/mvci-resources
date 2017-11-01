import React from 'react'
import { Row, Col, Button } from 'reactstrap'

const Characters = props => {
  const { characters, characterFilter, onClick, reset } = props
  return (
    <div>
      {characters.map((char, i) => {
        return (
          <img
            className={
              'char-img' +
              (characterFilter && characterFilter.includes(char.id) ? ' active-char' : '') +
              (characterFilter.length > 0 ? ' inactive-char' : '')
            }
            key={i}
            src={'/static/images/icons/' + char.id + '.png'}
            width="100px"
            onClick={() => onClick(char.id)}
          />
        )
      })}
      <Row>
        <Col>
          <Button className="mt-3" color="warning" onClick={reset}>
            <i className="fa fa-refresh" />&nbsp;RESET
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Characters
