import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import { editTeamPoints } from '../actions/gameActions'

const TeamPoints = ({ team: { id, points, name }, index }) => {
  const dispatch = useDispatch()
  const { teamIndex } = useSelector((state) => state.game)
  const [teamPoints, setTeamPoints] = useState('')
  const firstUpdate = useRef(true)

  const handleEditTeamPoints = (e) => {
    if (isNaN(e.target.value)) return
    setTeamPoints(e.target.value)
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    dispatch(editTeamPoints(+teamPoints, id))
  }, [teamPoints, dispatch, id])

  useEffect(() => {
    setTeamPoints(points)
  }, [points])

  return (
    <div
      className={
        index === teamIndex
          ? 'individual-team-point-container current'
          : 'individual-team-point-container'
      }
    >
      <div className='team-name'>{name}</div>
      <FormControl
        className='team-points'
        value={teamPoints}
        onChange={(e) => handleEditTeamPoints(e)}
      ></FormControl>
    </div>
  )
}

export default TeamPoints
