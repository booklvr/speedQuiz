import React, { Fragment } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Categories from '../components/Categories'
import WordList from '../components/WordList'
import Settings from '../components/Settings'
// import Meta from '../components/Meta'

const HomeScreen = () => {
  return (
    <Container fluid={true}>
      <Row className='d-flex justify-content-around'>
        <Col md={12} xl={4} className='order-xl-last mb-lg-4'>
          <Settings />
        </Col>
        <Col md={6} xl={4}>
          <Categories />
        </Col>
        <Col md={6} xl={4}>
          <WordList />
        </Col>
      </Row>
    </Container>
  )
}

export default HomeScreen
