import React, { useEffect } from 'react'
import uuid from 'react-uuid'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import { getAllWordLists, deleteWordList } from '../actions/wordListActions'

const SavedWordListsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { error, loading, wordLists } = useSelector(
    (state) => state.savedWordLists
  )

  const wordListDelete = useSelector((state) => state.deleteWordList)
  const { loading: loadingDelete, error: errorDelete, success } = wordListDelete

  const { userInfo } = useSelector((state) => state.userLogin)

  const handleRowClick = (id) => {
    console.log('clicked the row with id', id)
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    if (window.confirm('Are you sure?')) {
      dispatch(deleteWordList(id))
    }
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getAllWordLists())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, success, loadingDelete, errorDelete])

  return (
    <Container>
      <h1>Saved Word Lists</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created At</th>
            <th># of words</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {wordLists &&
            wordLists.map((wordList, index) => (
              <tr key={uuid()} onClick={() => handleRowClick(wordList._id)}>
                <td>{index + 1}</td>
                <td>{wordList.name}</td>
                <td>{moment(wordList.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                <td>{wordList.wordList.length}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={(e) => handleDelete(e, wordList._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default SavedWordListsScreen
