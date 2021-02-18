import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

const Teams = () => {
  const { teams } = useSelector((state) => state.settings)
  return (
    <Container fluid className='d-flex justify-content-center'>
      <div className='teams-container'>
        {teams &&
          teams.map((team) => (
            <div key={team.id} className='game-team-name'>
              {team.name} <span className='team-points'>{team.points}</span>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default Teams
