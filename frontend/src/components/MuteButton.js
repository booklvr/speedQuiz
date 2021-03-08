import React, {Fragment, useState} from 'react'
import {Button} from 'react-bootstrap'

const MuteButton = () => {

  const [mute, setMute] = useState(false);

  const handleVolumeClick = () => {
    setMute(!mute);
  }


  return (
    <Fragment>
    {mute === true ? (
      <Button className="mute-btn" onClick={() => handleVolumeClick()}><i className="fas fa-volume"></i></Button>
      ) : (
        <Button className="mute-btn" onClick={() => handleVolumeClick()}><i className="fas fa-volume-mute"></i></Button>
        
      )
    }
    
    
    </Fragment>
  )
}

export default MuteButton
