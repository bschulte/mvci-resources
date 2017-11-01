import Head from 'next/head'
import Navbar from '../components/Navbar'
import stylesheet from 'styles/index.scss'
import { Container, Row, Col } from 'reactstrap'

export default ({ children, title = 'This is the default title', page }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    </Head>
    <Container fluid>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} className="main">
          <header>
            <Navbar activePage={page} />
          </header>
          {children}

          {/* <footer id="page-footer">
            &copy;{' '}
            <a href="http://zephyrcoding.com" target="_blank">
              Zephyrcoding.com
            </a>
          </footer> */}
        </Col>
      </Row>
    </Container>
  </div>
)
