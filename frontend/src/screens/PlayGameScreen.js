import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Teams from '../components/Teams'
import TeamButtons from '../components/TeamButtons'
import CurrentWord from '../components/CurrentWord'
import GameControls from '../components/GameControls'
import Timer from '../components/Timer'

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
    <Container fluid>
      <Teams />
      <TeamButtons />

      <CurrentWord />

      <Row>
        <Col md={2}>
          <Timer />
        </Col>

        <Col md={{ span: 4, offset: 2 }}>
          <GameControls />
        </Col>
        <Col md={{ span: 2, offset: 2 }}>points</Col>
      </Row>
    </Container>
  )
}

export default PlayGameScreen
