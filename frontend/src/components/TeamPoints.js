import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import { editTeamPoints } from '../actions/gameActions'

const TeamPoints = ({ team: { id, points, name }, index }) => {
  const dispatch = useDispatch()
  const { teamIndex } = useSelector((state) => state.game)
  const [teamPoints, setTeamPoints] = useState(points)

  const handleEditTeamPoints = (e) => {
    if (isNaN(e.target.value)) return

    if (e.target.value === '') {
      setTeamPoints(e.target.value)
    } else {
      dispatch(editTeamPoints(+e.target.value, id))
    }
  }

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
