import React from 'react'

import Layout from '../components/Layout'
import Resources from '../views/Resources'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps() {
    // Get the characters
    let response = await axios.get('http://localhost:3333/api/characters')
    let characters
    if (response.status !== 200) {
      console.log('Error getting characters!')
      console.log(response)
      characters = []
    } else {
      characters = response.data
    }

    // Get the matches
    response = await axios.get('http://localhost:3333/api/matches')
    let matches
    if (response.status !== 200) {
      console.log('Error getting matches!')
      console.log(response)
      matches = []
    } else {
      matches = response.data
    }

    // Get the videos
    response = await axios.get('http://localhost:3333/api/videos')
    let videos
    if (response.status !== 200) {
      console.log('Error getting videos!')
      console.log(response)
      videos = []
    } else {
      videos = response.data
    }

    // Get the tutorials
    response = await axios.get('http://localhost:3333/api/tutorials')
    let tutorials
    if (response.status !== 200) {
      console.log('Error getting tutorials!')
      console.log(response)
      tutorials = []
    } else {
      tutorials = response.data
    }

    return { characters: characters, matches: matches, videos: videos, tutorials: tutorials }
  }

  render() {
    return (
      <Layout title="MvC:I Resources" page="home">
        <Resources
          characters={this.props.characters}
          matches={this.props.matches}
          videos={this.props.videos}
          tutorials={this.props.tutorials}
        />
      </Layout>
    )
  }
}
