import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import TeamPoints from './TeamPoints'

const Teams = () => {
  const { teams, teamIndex } = useSelector((state) => state.game)

  return (
    <div className='team-points-container'>
      {teams &&
        teams.map((team, index) => (
          <TeamPoints key={team.id} team={team} index={index}>
            {team.name} <span className='team-points'>{team.points}</span>
          </TeamPoints>
        ))}
    </div>
  )
}

export default Teams
