import React from 'react'

import Layout from '../components/Layout'
import SubmitResource from '../views/SubmitResource'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps() {
    const response = await axios.get('http://localhost:3333/api/characters')
    if (response.status !== 200) {
      console.log('Error getting characters!')
      console.log(response)
      return {}
    } else {
      const characters = response.data
      return { characters: characters }
    }
  }

  render() {
    return (
      <Layout title="MvC:I Submit" page="submit">
        <SubmitResource characters={this.props.characters} />
      </Layout>
    )
  }
}
