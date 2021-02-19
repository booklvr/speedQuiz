import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Teams from '../components/Teams'
import TeamButtons from '../components/TeamButtons'
import CurrentWord from '../components/CurrentWord'
import GameControls from '../components/GameControls'
import Timer from '../components/Timer'
import Points from '../components/Points'
import Modals from '../components/Modals'

// import { resetPoints } from '../actions/settingsActions'

import { loadGame } from '../actions/gameActions'

const PlayGameScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(resetPoints())
    // setShuffledWordList(() => {
    //   return shuffleArray([...wordList])
    // })
    dispatch(loadGame())
  }, [])

  return (
    <Container fluid className='play-game-container'>
      <Modals />
      <Teams />
      <TeamButtons />

      <CurrentWord />

      <Row d-flex className='justify-content-between'>
        <Col>
          <Timer />
        </Col>
        <Col>
          <GameControls />
        </Col>
        <Col>
          <Points />
        </Col>
      </Row>
    </Container>
  )
}

export default PlayGameScreen
