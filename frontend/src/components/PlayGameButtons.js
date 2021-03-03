import React from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { resetAll } from '../actions/settingsActions'

const PlayGameButtons = ({ handleShowModal }) => {
  const wordList = useSelector((state) => state.wordList)
  const dispatch = useDispatch()
  const handleReset = () => {
    dispatch(resetAll())
  }

  return (
    <Container className=''>
      <Row>
        <Col lg={4} xl={12} className='py-2 d-flex'>
          <LinkContainer to='/play'>
            <Button
              className='flex-grow-1 bg-success'
              disabled={wordList.length ? false : true}
            >
              Play
            </Button>
          </LinkContainer>
        </Col>

        <Col lg={4} xl={12} className='py-2 d-flex'>
          <Button className='flex-grow-1 btn-info' onClick={handleShowModal}>
            how to play
          </Button>
        </Col>
        <Col lg={4} xl={12} className='py-2 d-flex'>
          <Button
            className='flex-grow-1 btn-danger'
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

// PlayGameButtons.propTypes = {
//   setNumberOfTeams: PropTypes.func.isRequired,
//   handleShowModal: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired,
// }

export default PlayGameButtons
