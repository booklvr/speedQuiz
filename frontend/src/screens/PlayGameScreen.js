import React, { Fragment, useState, useEffect } from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Teams from '../components/Teams'
import TeamButtons from '../components/TeamButtons'

import { resetPoints } from '../actions/settingsActions'

const PlayGameScreen = () => {
  const dispatch = useDispatch()
  const { teams } = useSelector((state) => state.settings)

  useEffect(() => {
    dispatch(resetPoints())
  }, [])

  return (
    <Container fluid>
      <Teams />
    </Container>
  )
}

export default PlayGameScreen
