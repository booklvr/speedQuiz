import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, ListGroup } from 'react-bootstrap'
import { removeWord } from '../actions/wordListActions'
import { uncheckWord } from '../actions/categoryActions'

const WordList = () => {
  const dispatch = useDispatch()
  const wordList = useSelector((state) => state.wordList)

  const deleteBtnHandler = (id) => {
    dispatch(removeWord(id))
    dispatch(uncheckWord(id))
  }

  return (
    <Fragment>
      <h1 className='list-title'>WordList</h1>
      <div className='p-5 categories-container bg-info'>
        <ListGroup className='p-5 bg-secondary' variant='flush'>
          {wordList.length > 0 &&
            wordList.map(({ word, id }) => (
              <ListGroup.Item
                className='d-flex justify-content-between mx-2'
                key={id}
              >
                {word}
                <div
                  className='remove-btn'
                  onClick={() => deleteBtnHandler(id)}
                >
                  <i className='fas fa-times'></i>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </Fragment>
  )
}

export default WordList
