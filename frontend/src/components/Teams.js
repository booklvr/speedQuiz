import React from 'react'
import { useSelector } from 'react-redux'
import TeamPoints from './TeamPoints'

const Teams = () => {
  const { teams } = useSelector((state) => state.game)

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
