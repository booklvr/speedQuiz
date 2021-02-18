import React from 'react'

const GameTeamName = ({ name, id, points, current }) => {
  return (
    <div className='gameTeamName'>
      {name} <span className='teamPoints'>{points}</span>
    </div>
  )
}

export default GameTeamName
