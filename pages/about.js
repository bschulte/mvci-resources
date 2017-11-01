import Layout from '../components/Layout'
import { Row, Col } from 'reactstrap'

export default () => (
  <Layout title="MvC:I Resources-About" page="about">
    <Row>
      <Col className="text-center">
        <h4>Marvel vs Capcom: Infinite Resources</h4>
        <p>
          This site is dedicated to the collection of resources for MvC:I players. The goal is to provide a one-stop
          shop for players to come and learn more about characters and the game
        </p>
        <p>
          If you have any questions or want a contribution key send an email to: mvci.resources {'{ dot }'} gmail{' '}
          {'{ dot }'} com
        </p>
      </Col>
    </Row>
  </Layout>
)
