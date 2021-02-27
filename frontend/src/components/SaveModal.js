import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { saveWordList } from '../actions/wordListActions'

const SaveModal = ({ showModal, setShowModal, handleClose, history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const [wordListName, setWordListName] = useState('')
  const response = useSelector((state) => state.saveWordList)
  const { loading, error, success } = response
  const handleSave = () => {
    if (!wordListName) return

    dispatch(saveWordList(wordListName))
  }

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter' && wordListName !== '') {
      handleSave()
    }
  }

  useEffect(() => {
    if (!userInfo && showModal) {
      history.push('/login')
    }
  }, [history, userInfo, showModal])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setWordListName('')
        handleClose()
      }, 2000)
    }
  }, [success, handleClose])

  return (
    <Fragment>
      <Modal
        className='save-modal'
        size='lg'
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Save Your Word List</Modal.Title>
        </Modal.Header>
        <Modal.Body className='save-modal-body'>
          {error && <Message variant='danger'>{error} </Message>}
          {loading ? (
            <Loader />
          ) : success ? (
            <Message variant='success'>
              Word list successfully saved as {wordListName}
            </Message>
          ) : (
            <Fragment>
              <p>
                You can save your word lists so that you can re-use them again
                later.
              </p>
              <p>
                Find it again by clicking{' '}
                <LinkContainer to='/savedWordLists'>
                  <Button>
                    <i className='fas fa-list'></i> saved lists
                  </Button>
                </LinkContainer>{' '}
                in the nav bar.
              </p>
              <InputGroup size='md' className='save-input'>
                <InputGroup.Text id='inputGroup-sizing-md'>
                  Word List Name
                </InputGroup.Text>

                <FormControl
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-md'
                  onChange={(e) => setWordListName(e.target.value)}
                  onKeyPress={handleKeyEnter}
                  onSubmit={handleSave}
                />
              </InputGroup>
              <Button
                className='save-word-list-btn'
                variant='success'
                onClick={handleSave}
              >
                Save
              </Button>
            </Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='success' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default SaveModal
