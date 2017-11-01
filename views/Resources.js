import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Characters from '../components/Characters'
import Matches from '../components/Matches'
import Videos from '../components/Videos'

class Resources extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characterFilter: [],
      matchPage: 1,
      filteredMatches: props.matches,
      currentMatches: props.matches.slice(0, 10)
    }

    this.filterByCharacter = this.filterByCharacter.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  filterByCharacter(charName) {
    if (!charName) {
      console.log('Clearing character filter')
      var newFilter = []
    } else if (this.state.characterFilter.includes(charName)) {
      console.log('deselecting character:', charName)
      var newFilter = this.state.characterFilter.filter(char => char !== charName)
    } else {
      console.log('Filtering by char:', charName)
      var newFilter = this.state.characterFilter.concat(charName)
    }

    // Filter the matches now
    this.setState(
      {
        characterFilter: newFilter
      },
      () => {
        this.setState(
          {
            filteredMatches: this.props.matches.filter(match => {
              if (this.state.characterFilter.length === 0) return true
              for (let id of this.state.characterFilter) {
                if (match.char1 !== id && match.char2 !== id && match.char3 !== id && match.char4 !== id) return false
              }
              return true
            })
          },
          // Get the first page after changing the match filter
          () => this.getPage(1)
        )
      }
    )
  }

  // Get the new proper page to display from the data
  getPage(pageNum, e) {
    if (e) e.preventDefault()
    // On a button click (when we have the 'e' object) and the page
    // is the same as our current page just return since we're already on that page
    if (e && pageNum === this.state.matchPage) return

    this.setState({
      currentMatches: this.state.filteredMatches.slice((pageNum - 1) * 10, pageNum * 10),
      matchPage: pageNum
    })
  }

  render() {
    const { characterFilter } = this.state
    return (
      <div>
        <Characters
          characterFilter={characterFilter}
          characters={this.props.characters}
          onClick={this.filterByCharacter}
          reset={() => this.filterByCharacter(null)}
        />
        <Row>
          <Col>
            <Matches
              matches={this.state.currentMatches}
              filter={this.state.characterFilter}
              page={this.state.matchPage}
              maxPages={Math.ceil(this.state.filteredMatches.length / 10)}
              getPage={this.getPage}
            />
          </Col>
          <Col>
            <Videos videos={this.props.videos} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Resources
