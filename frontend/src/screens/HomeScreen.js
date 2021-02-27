import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories'
import WordList from '../components/WordList'
import Settings from '../components/Settings'
import Message from '../components/Message'
import InstructionModal from '../components/InstructionModal'
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
  const [showModal, setShowModal] = useState(false)

  if (!savedWordListId && savedLists) {
    dispatch(resetLists())
  }

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  useEffect(() => {
    if (savedWordListId) {
      dispatch(getSavedWordListById(savedWordListId))
    }
  }, [savedWordListId, dispatch])

  useEffect(() => {
    if (savedLists && savedWordListId) {
      dispatch(replaceLists(savedLists))
    }
  }, [dispatch, savedLists, savedWordListId])

  return (
    <Container fluid={true}>
      <InstructionModal
        handleCloseModal={handleCloseModal}
        handleShowModal={handleShowModal}
        showModal={showModal}
      />
      <Row className='d-flex justify-content-around'>
        <Col md={12} xl={4} className='order-xl-last mb-lg-4'>
          <Settings handleShowModal={handleShowModal}/>
        </Col>
        {error ? (
          <Col md={8}>
            <Message variant='danger'>{error}</Message>
          </Col>
        ) : (
          <Fragment>
            <Col md={6} xl={4}>
              <Categories loading={loading} />
            </Col>
            <Col md={6} xl={4}>
              <WordList
                loading={loading}
                savedWordListId={savedWordListId}
                history={history}
              />
            </Col>
          </Fragment>
        )}
      </Row>
    </Container>
  )
}

export default HomeScreen
