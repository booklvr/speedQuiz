import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListGroup, Button } from 'react-bootstrap'
import SaveModal from './SaveModal'
import { removeWord } from '../actions/wordListActions'
import { uncheckWord } from '../actions/categoryActions'

const WordList = () => {
  const dispatch = useDispatch()
  const wordList = useSelector((state) => state.wordList)
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const deleteBtnHandler = (id) => {
    dispatch(removeWord(id))
    dispatch(uncheckWord(id))
  }

  return (
    <Fragment>
      <SaveModal
        setShowModal={setShowModal}
        handleClose={handleClose}
        showModal={showModal}
      />
      <h1 className='list-title'>WordList</h1>
      <div className='p-5 categories-container bg-info'>
        <ListGroup className='bg-secondary p-4 m-4 word-list'>
          <Button className='save-icon-btn' onClick={handleShow}>
            <i className='fas fa-save'></i> save
          </Button>
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
