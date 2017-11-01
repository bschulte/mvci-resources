import React, { Component } from 'react'
import { Button, Input, Row, Col, Label } from 'reactstrap'
import Characters from '../components/Characters'
import axios from 'axios'
import { ToastContainer } from 'react-toastr'

function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(s)
}

class SubmitResource extends Component {
  constructor(props) {
    super(props)

    this.state = {
      charactersSelected: [],
      resourceType: 'Video',
      resourceUrl: '',
      title: '',
      contributionKey: ''
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

  async submitResource(toastr) {
    console.log('Submitting resource')
    const { resourceUrl, title, charactersSelected, resourceType, contributionKey } = this.state

    /////////////////////////////////////////////
    // Perform the validation for the fields
    /////////////////////////////////////////////

    // Check if the URL is valid
    if (!isUrl(resourceUrl)) {
      toastr.warning('URL is not valid')
      return
    }
    // Check if the type is tutorial or match and if we have the proper number of characters selected
    if (resourceType === 'Match' && charactersSelected.length !== 4) {
      toastr.warning('Select all 4 characters used in the match')
      return
    } else if (resourceType === 'Tutorial' && charactersSelected !== 1) {
      toastr.warning('One character must be selected for the tutorial')
      return
    }
    // Check that a title is present for a tutorial or video
    if ((resourceType === 'Tutorial' || resourceType === 'Video') && !title) {
      toastr.warning('Enter a title for the tutorial or video')
      return
    }

    const response = await axios.post('http://api.mvci-resources.com/api/resource', {
      url: resourceUrl,
      title: title,
      characters: charactersSelected,
      type: resourceType,
      contributionKey: contributionKey
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
    let container

    return (
      <div>
        <ToastContainer ref={ref => (container = ref)} className="toast-top-right" />
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
        <hr />
        <Row>
          <Col xs="4">
            <Label for="contribution-key-input">Contribution Key</Label>
            <Input
              type="text"
              name="contribution-key"
              id="contribution-key-input"
              value={this.state.contributionKey}
              onChange={e => this.setState({ contributionKey: e.target.value })}
            />
          </Col>
        </Row>
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
            <Button className="mt-4" color="success" onClick={() => this.submitResource(container)}>
              <i className="fa fa-upload" />&nbsp;SUBMIT
            </Button>
          </Col>
        </Row>

        {/* Instructions */}
        <hr />
        <Row>
          <Col>
            <h4>Instructions</h4>
            <ul>
              <li>
                <strong>Contribution Key</strong>
                <ul>
                  <li>
                    <p>
                      This is a key used to authenticate who's submitting the resource. By default, I'll go through
                      submitted resources and verify them before enabling them for the site. For trusted contributors,
                      I'll give out contribution keys that can be included in the submission to automatically enable the
                      resource for the site.
                    </p>
                    <p>If you'd like to get a contribution key reach out to me via email (address in About page)</p>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Resource Type</strong>
                <ul>
                  <li>Video should be used for full tournaments</li>
                  <li>Match should be used for individual matches with 4 specified characters</li>
                  <li>Tutorials should be for character specific videos or web resources</li>
                </ul>
              </li>
              <li>
                <strong>Resource URL</strong>
                <ul>
                  <li>URL for the resource</li>
                </ul>
              </li>
              <li>
                <strong>Title</strong>
                <ul>
                  <li>
                    Title for the resource. Should be used for Videos and Tutorials to detail what tournament or the
                    type of tutorial the resource is.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Characters/Teams</strong>
                <ul>
                  <li>
                    Characters should be selected for Tutorials (single character) and Matches (all 4 characters).
                    Characters are placed into team 1 and 2 in the order they are selected.
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SubmitResource
