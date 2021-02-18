import React, { useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { changeTeamName } from '../actions/settingsActions'

const TeamName = ({ teamName, index, id }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(teamName)

  const handleBlurEvent = (e) => {
    console.log('handle team name blur event')
    dispatch(changeTeamName(name, id))
  }

  return (
    <Col lg={6} xl={12} className='p-md-2 p-xl-3 pb-0 pb-md-0'>
      <Form.Group as={Row} className='d-flex align-items-center'>
        <Col md={4} className='pl-1'>
          <Form.Label className='settings-label'>Team {index + 1}</Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            className='team-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => handleBlurEvent(e)}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  )
}

TeamName.propTypes = {
  teamName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default TeamName
