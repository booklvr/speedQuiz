import React from 'react'
import { Modal, Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from 'prop-types'

import SettingsForm from './SettingsForm'
import Categories from './Categories'
import WordList from './WordList'
import PlayGameScreen from '../screens/PlayGameScreen'

const InstructionModal = ({ handleCloseModal, showModal }) => {
  // const timer = useSelector((state) => state.timer)

  // const reload = () => window.location.reload()

  return (
    <Modal
      className='instruction-modal'
      show={showModal}
      onHide={handleCloseModal}
      // onExited={reload}
      animation={true}
      size='xl'
      aria-labelledby='contained-modal-title-center'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-center'>Speed Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <h3 className='text-center mt-4'>Speed Quiz</h3>
        <p className='mb-2 px-5 mx-5 text-center'>
          Speed Quiz is a charades type game for the classroom.
        </p>
        <p className='mb-2 px-5 mx-5 text-center'>
          It's a great way to test your students knowledge of the new vocabulary
          you are teaching.
        </p>

        <h3 className='text-center my-5'>Setup the game</h3>
        <Container className='instruction-group'>
          <Row>
            <Col md={6}>
              <h4>Step 1 -- game settings</h4>
              <p>
                First decide how many much time you will give the teams for each
                round and how many teams you will need.
              </p>
              <h4 className='step-two-title'>Step 2 -- edit names</h4>
              <p>
                You can play with as many as 15 teams, and you can edit the team
                names.
              </p>
            </Col>
            <Col md={6}>
              <SettingsForm />
            </Col>
          </Row>
        </Container>

        <Container className='instruction-group'>
          <Row>
            <Col md={12}>
              <h4>Step 3 -- Create your word list</h4>
              <ul>
                <li>
                  You can add words from the columns or you can adding your own
                  words using the new word form.
                </li>
                <li>
                  You can select or deselect words by clicking on their
                  category, subcategory, or by the individual words.
                </li>
                <li>
                  You can save your word lists by clicking save. Click the{' '}
                  <LinkContainer to='/savedWordLists'>
                    <Button>
                      <i className='fas fa-list'></i> Saved Lists
                    </Button>
                  </LinkContainer>{' '}
                  link in the navbar to check out your saved word lists.
                </li>
                <li>
                  Once you have saved a word list you can edit it and click{' '}
                  <Button className='save-modal'>save</Button> to save your
                  changes or click{' '}
                  <Button className='save-modal'>save as...</Button> to save it
                  under a new name.
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Categories isModal={true} />
            </Col>
            <Col md={6}>
              <WordList />
            </Col>
            <p>
              After you have created your word list click{' '}
              <LinkContainer to='/play'>
                <Button className='btn-success' style={{ cursor: 'default' }}>
                  Play
                </Button>
              </LinkContainer>{' '}
              to begin the game.
            </p>
          </Row>
        </Container>
        <h3 style={{ textAlign: 'center' }}>How to play</h3>
        <Container className='instruction-group'>
          <h4>Instructions</h4>
          <Row>
            <Col md={4}>
              <ul>
                <li>
                  Press <Button>Start</Button> to begin the round.
                </li>
                <li>
                  At least one player of the current team must face away from
                  the screen.
                </li>
                <li>
                  The remaining players must describe the word or use actions to
                  help the player or players facing away from the screen to
                  guess the word.
                </li>
                <li>
                  Any player may say <Button variant='danger'>skip</Button> if
                  the word is too hard
                </li>
              </ul>
            </Col>
            <Col md={8}>
              <PlayGameScreen insideInstructionModal={true} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul>
                <li>
                  The team gets a point for every word they guess correctly
                </li>
                <li>
                  *** Please not that in the actual game a pop window will
                  appear at the beginning and end of every round will let you
                  know which team is next, or how many points, correct, words,
                  and skipped words the team won in the previous round.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

InstructionModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default InstructionModal
