import React, { Component } from 'react'
import { Button, Input, Row, Col, Label } from 'reactstrap'
import Characters from '../components/Characters'
import toastr from 'toastr'
import axios from 'axios'

class SubmitResource extends Component {
  constructor(props) {
    super(props)

    this.state = {
      charactersSelected: [],
      resourceType: 'Video',
      resourceUrl: '',
      title: ''
    }

    this.addCharacter = this.addCharacter.bind(this)
    this.submitResource = this.submitResource.bind(this)
  }

  addCharacter(charName) {
    // Check if there's already 2 entries of the character in the selected array
    // This is because we can have a max of 2 of the same characters per match (1 on each team)
    const num = this.state.charactersSelected.reduce((count, char) => {
      if (char === charName) count++
      return count
    }, 0)
    console.log('Number of times the character is in selected:', num)

    if (num <= 2) {
      const newChars = this.state.charactersSelected.concat(charName)
      console.log('added char:', charName)
      this.setState({ charactersSelected: newChars })
    } else {
      console.log('deselecting character')
      const newChars = this.state.charactersSelected.filter(char => char !== charName)
      this.setState({ charactersSelected: newChars })
    }
  }

  async submitResource() {
    console.log('Submitting resource')
    const { resourceUrl, title, charactersSelected, resourceType } = this.state
    const response = await axios.post('http://localhost:3333/api/resource', {
      url: resourceUrl,
      title: title,
      characters: charactersSelected,
      type: resourceType
    })

    if (response.status !== 200) {
      console.error(response)
      toastr.error('Error submitting resource')
    } else {
      this.setState({ charactersSelected: [], title: '', resourceUrl: '' })
      toastr.success('Submitted resource properly')
    }
  }

  handleKeyUp(e) {
    console.log('Checking key press:', e)
    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        console.log('Detected ctrl+enter')
      }
    }
  }

  render() {
    return (
      <div>
        <Characters
          characterFilter={this.state.charactersSelected}
          characters={this.props.characters}
          onClick={this.addCharacter}
          reset={() => this.setState({ charactersSelected: [] })}
        />
        <hr />
        {this.state.charactersSelected.length > 0 && (
          <Row>
            <Col xs="6">
              <h3>Team 1</h3>
              {console.log(this.state.charactersSelected[0])}
              {this.state.charactersSelected[0] && (
                <img src={'/static/images/icons/' + this.state.charactersSelected[0] + '.png'} width="75px" />
              )}
              {this.state.charactersSelected[1] && (
                <img src={'/static/images/icons/' + this.state.charactersSelected[1] + '.png'} width="75px" />
              )}
            </Col>
            <Col xs="6">
              <h3>Team 2</h3>
              {this.state.charactersSelected[2] && (
                <img src={'/static/images/icons/' + this.state.charactersSelected[2] + '.png'} width="75px" />
              )}
              {this.state.charactersSelected[3] && (
                <img src={'/static/images/icons/' + this.state.charactersSelected[3] + '.png'} width="75px" />
              )}
            </Col>
          </Row>
        )}
        <Row>
          <Col xs="2">
            <Label for="resource-type-input">Resource Type</Label>
            <Input
              type="select"
              name="resource-type"
              id="resource-type-input"
              value={this.state.resourceType}
              onChange={e => this.setState({ resourceType: e.target.value })}
            >
              <option>Video</option>
              <option>Match</option>
              <option>Tutorial</option>
            </Input>
          </Col>
          <Col xs="5">
            <Label for="resource-url-input">Resource URL</Label>
            <Input
              type="text"
              name="resource-url"
              id="resource-url-input"
              value={this.state.resourceUrl}
              onChange={e => this.setState({ resourceUrl: e.target.value })}
            />
          </Col>
          <Col>
            <Label for="title-input">Title</Label>
            <Input
              type="text"
              name="title"
              id="title-input"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="mt-4" color="success" onClick={this.submitResource}>
              <i className="fa fa-upload" />&nbsp;SUBMIT
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SubmitResource
