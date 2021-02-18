import React, { Fragment } from 'react'

import { useSelector } from 'react-redux'
import { Jumbotron, Button } from 'react-bootstrap'

const CurrentWord = () => {
  const {
    wordList,
    wordIndex,
    timer: { start },
  } = useSelector((state) => state.game)
  return (
    <Jumbotron fluid className='word-container'>
      {(start && <Button>Start</Button>) ||
        (wordList.length && (
          <h1 className='current-word text-center'>
            {wordList[wordIndex].word}
          </h1>
        ))}
    </Jumbotron>
  )
}

export default CurrentWord
