import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { saveWordList } from '../actions/wordListActions'

const SaveModal = ({ showModal, setShowModal, handleClose }) => {
  const dispatch = useDispatch()
  const [wordListName, setWordListName] = useState('')

  const handleSave = () => {
    if (!wordListName) return

    dispatch(saveWordList(wordListName))
  }

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
          <p>
            You can save your word lists so that you can re-use them again
            later.
          </p>
          <p>
            Find it again by clicking{' '}
            <Button>
              <i className='fas fa-list'></i> saved lists
            </Button>{' '}
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
