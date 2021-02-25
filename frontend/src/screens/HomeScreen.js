import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories'
import WordList from '../components/WordList'
import Settings from '../components/Settings'
// import Meta from '../components/Meta'

import {
  getSavedWordListById,
  replaceLists,
  resetLists,
} from '../actions/wordListActions'

const HomeScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const savedWordListId = match.params.id

  const getSavedLists = useSelector((state) => state.getSavedWordListById)
  const { loading, error, savedLists } = getSavedLists

  if (!savedWordListId && savedLists) {
    console.log('reset the fucker')
    dispatch(resetLists())
  }

  useEffect(() => {
    if (savedWordListId) {
      dispatch(getSavedWordListById(savedWordListId))
    }
  }, [savedWordListId, dispatch])

  useEffect(() => {
    if (savedLists && savedWordListId) {
      dispatch(replaceLists(savedLists))
    }
  }, [dispatch, savedLists])

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
          <WordList savedWordListId={savedWordListId} history={history} />
        </Col>
      </Row>
    </Container>
  )
}

export default HomeScreen
