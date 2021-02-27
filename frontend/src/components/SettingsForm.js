import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Row, Col, Container } from 'react-bootstrap'

import TeamName from './TeamName'

import {
  changeNumberOfSeconds,
  changeNumberOfTeams,
} from '../actions/settingsActions'

const SettingsForm = () => {
  const dispatch = useDispatch()

  const settings = useSelector((state) => state.settings)
  const { timer, teams } = settings
  // const timer = useSelector((state) => state.timer)
  // const [minutes, setMinutes] = useState(Math.floor(timer.timeLeft / 60))
  const [seconds, setSeconds] = useState(timer)
  const [numberOfTeams, setNumberOfTeams] = useState(teams.length)

  const handleTimerBlurEvent = () => {
    if (seconds === '' || seconds === 0) {
      setSeconds(timer)
    }
  }

  const handleTeamChangeEvent = (e) => {
    setNumberOfTeams(e.target.value > 15 ? 15 : e.target.value)
  }

  const handleTeamBlurEvent = () => {
    if (numberOfTeams === '' || numberOfTeams === 0) {
      setNumberOfTeams(teams.length)
    }
  }

  useEffect(() => {
    if (seconds !== '' && seconds > 0) {
      dispatch(changeNumberOfSeconds(seconds))
    }
  }, [seconds, dispatch])

  useEffect(() => {
    if (numberOfTeams !== '' && numberOfTeams > 0) {
      dispatch(changeNumberOfTeams(numberOfTeams))
    }
  }, [numberOfTeams, dispatch])

  useEffect(() => {
    setSeconds(timer)
    setNumberOfTeams(teams.length)
  }, [timer, teams.length])

  return (
    <Container>
      <Form>
        <Row>
          <Col lg={6} xl={12} className='p-md-2 p-xl-3 pb-0 pb-md-0'>
            <Form.Group as={Row} className='d-flex align-items-center'>
              <Col md={4} className='pl-1'>
                <Form.Label className='settings-label'>
                  Seconds / Round
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className='p-2'
                  value={seconds}
                  type='number'
                  min={0}
                  onChange={(e) => setSeconds(e.target.value)}
                  onBlur={handleTimerBlurEvent}
                  step={5}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6} xl={12} className='p-md-2 pb-md-0 mb-0 pb-md-0'>
            <Form.Group as={Row} className='d-flex align-items-center'>
              <Col md={4} className='pl-1 pb-0'>
                <Form.Label className='settings-label'>Teams</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className='p-1'
                  min={1}
                  max={15}
                  type='number'
                  value={numberOfTeams}
                  onChange={(e) => handleTeamChangeEvent(e)}
                  onBlur={(e) => handleTeamBlurEvent(e)}
                />
              </Col>
            </Form.Group>
          </Col>
          <h1>Teams</h1>
          <div className='teams-settings-container'>
            {teams.length &&
              teams.map(({ name, id }, index) => (
                <TeamName key={id} index={index} teamName={name} id={id} />
              ))}
          </div>
        </Row>
      </Form>
    </Container>
  )
}

export default SettingsForm
