import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListGroup, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import SaveModal from './SaveModal'
import {
  removeWord,
  resetSaveModal,
  saveWordList,
} from '../actions/wordListActions'
import { uncheckWordByBtn } from '../actions/categoryActions'

const WordList = ({ loading, savedWordListId, history }) => {
  const dispatch = useDispatch()
  const wordList = useSelector((state) => state.wordList)
  const [showModal, setShowModal] = useState(false)
  const { loading: loadingSave, error, success } = useSelector(
    (state) => state.saveWordList
  )
  const [message, setMessage] = useState('')

  const handleSave = () => {
    dispatch(saveWordList(undefined, savedWordListId))
  }

  const handleClose = () => setShowModal(false)
  const handleShow = () => {
    dispatch(resetSaveModal())
    setShowModal(true)
  }

  const deleteBtnHandler = (id) => {
    dispatch(removeWord(id))
    dispatch(uncheckWordByBtn(id))
  }

  useEffect(() => {
    if (success) {
      setMessage('Save Successful')

      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }, [success])

  return (
    <Fragment>
      <SaveModal
        setShowModal={setShowModal}
        handleClose={handleClose}
        showModal={showModal}
        history={history}
      />
      <h1 className='list-title'>WordList</h1>

      <div className='p-5 categories-container bg-info'>
        {message && <Message variant='success'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}

        <ListGroup className='bg-secondary p-4 m-4 word-list'>
          {message ? (
            <Message>{message}</Message>
          ) : loadingSave ? (
            <Loader />
          ) : savedWordListId ? (
            <Fragment>
              <Button className='save-icon-btn' onClick={handleSave}>
                <i className='fas fa-save'></i> save
              </Button>
              <Button className='save-icon-btn' onClick={handleShow}>
                <i className='fas fa-save'></i> save as...
              </Button>
            </Fragment>
          ) : (
            <Button className='save-icon-btn' onClick={handleShow}>
              <i className='fas fa-save'></i> save
            </Button>
          )}

          {loading ? (
            <Loader />
          ) : (
            wordList.length > 0 &&
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
            ))
          )}
        </ListGroup>
      </div>
    </Fragment>
  )
}

export default WordList
