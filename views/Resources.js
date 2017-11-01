import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Characters from '../components/Characters'
import Matches from '../components/Matches'
import Videos from '../components/Videos'
import Tutorials from '../components/Tutorials'

class Resources extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characterFilter: [],
      matchPage: 1,
      filteredMatches: props.matches,
      currentMatches: props.matches.slice(0, 10),

      tutorialPage: 1,
      filteredTutorials: props.tutorials,
      currentTutorials: props.tutorials.slice(0, 10)
    }

    this.filterByCharacter = this.filterByCharacter.bind(this)
    this.getMatchPage = this.getMatchPage.bind(this)
    this.getTutorialPage = this.getTutorialPage.bind(this)
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

    // Filter the matches and tutorials
    this.setState(
      {
        characterFilter: newFilter,
        filteredMatches: this.props.matches.filter(match => {
          if (newFilter.length === 0) return true
          for (let id of newFilter) {
            if (match.char1 !== id && match.char2 !== id && match.char3 !== id && match.char4 !== id) return false
          }
          return true
        }),

        filteredTutorials: this.props.tutorials.filter(tutorial => {
          if (newFilter.length === 0) return true
          if (!newFilter.includes(tutorial.char1)) return false
          else return true
        })
      },
      // Get the first page after changing the match filter
      () => {
        this.getMatchPage(1)
        this.getTutorialPage(1)
      }
    )
  }

  // Get the new proper page to display from the data
  getMatchPage(pageNum, e) {
    if (e) e.preventDefault()
    // On a button click (when we have the 'e' object) and the page
    // is the same as our current page just return since we're already on that page
    if (e && pageNum === this.state.matchPage) return

    this.setState({
      currentMatches: this.state.filteredMatches.slice((pageNum - 1) * 10, pageNum * 10),
      matchPage: pageNum
    })
  }

  // Get the new proper page to display from the data
  getTutorialPage(pageNum, e) {
    if (e) e.preventDefault()
    // On a button click (when we have the 'e' object) and the page
    // is the same as our current page just return since we're already on that page
    if (e && pageNum === this.state.tutorialPage) return

    this.setState({
      currentTutorials: this.state.filteredTutorials.slice((pageNum - 1) * 10, pageNum * 10),
      tutorialPage: pageNum
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
          <Col xs="5">
            <Matches
              matches={this.state.currentMatches}
              filter={this.state.characterFilter}
              page={this.state.matchPage}
              maxPages={Math.ceil(this.state.filteredMatches.length / 10)}
              getPage={this.getMatchPage}
            />
          </Col>
          <Col xs="3">
            <Videos videos={this.props.videos} />
          </Col>
          <Col xs="4">
            <Tutorials
              tutorials={this.state.currentTutorials}
              filter={this.state.characterFilter}
              page={this.state.tutorialPage}
              maxPages={Math.ceil(this.state.filteredTutorials.length / 10)}
              getPage={this.getTutorialPage}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Resources
