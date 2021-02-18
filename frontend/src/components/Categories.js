import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Form, Col, Button } from 'react-bootstrap'
import {
  toggleCategoryCollapse,
  toggleSubcategoryCollapse,
  toggleWordCheckbox,
  toggleSubcategoryCheckbox,
  toggleCategoryCheckbox,
  toggleAllCheckbox,
} from '../actions/categoryActions'

import {
  addWordByCheckbox,
  removeWord,
  addNewWord,
} from '../actions/wordListActions'

const Categories = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)
  const [checkAll, setCheckAll] = useState(false)
  const [newWord, setNewWord] = useState('')

  const firstUpdate = useRef(true)

  const handleAddButtonClick = () => {
    if (newWord !== '') {
      dispatch(addNewWord(newWord))
      setNewWord('')
    }
  }
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter' && newWord !== '') {
      e.preventDefault()
      dispatch(addNewWord(newWord))
      setNewWord('')
    }
  }

  const allCheckHandler = () => {
    setCheckAll(!checkAll)
  }

  const categoryCheckHandler = (categoryId, checked) => {
    dispatch(toggleCategoryCheckbox(categoryId, checked))
  }

  const subcategoryCheckHandler = (categoryId, subcategoryId, checked) => {
    dispatch(toggleSubcategoryCheckbox(categoryId, subcategoryId, checked))
  }

  const wordCheckHandler = (
    categoryId,
    listItem,
    subcategoryId = undefined
  ) => {
    dispatch(
      toggleWordCheckbox({ categoryId, subcategoryId, itemId: listItem.id })
    )
    if (listItem.checked) {
      dispatch(removeWord(listItem.id))
    } else {
      dispatch(addWordByCheckbox({ word: listItem.word, id: listItem.id }))
    }
  }

  const handleCollapseCategory = (id) => {
    dispatch(toggleCategoryCollapse(id))
  }

  const handleSubcategoryCollapse = (categoryId, subcategoryId) => {
    dispatch(toggleSubcategoryCollapse(categoryId, subcategoryId))
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    dispatch(toggleAllCheckbox(checkAll))
  }, [checkAll])

  // useEffect(() => {
  //   dispatch(toggleAllCheckbox(checkAll))
  // }, [checkAll])

  return (
    <Fragment>
      <h1 className='list-title'>Categories</h1>
      <div className='p-5 categories-container bg-info'>
        <Form className='bg-secondary p-4 m-4'>
          <Form.Row className='pb-4 d-flex justify-content-center'>
            <h2 className='mb-2 text-center'>Create your word list</h2>
            <Col md={8}>
              <Form.Control
                type='text'
                placeholder='new word'
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyPress={handleKeyEnter}
              />
            </Col>

            <Col md={4}>
              <Button className='bg-primary' onClick={handleAddButtonClick}>
                Add
              </Button>
            </Col>
          </Form.Row>
          <Form.Group className='pl-1' controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              checked={checkAll}
              label='all'
              value='all'
              onChange={(e) => allCheckHandler(e)}
            ></Form.Check>
          </Form.Group>
          {categoryList &&
            categoryList.map((category) => {
              if (category.subcategories) {
                return (
                  <div className='category-container' key={uuid()}>
                    <Form.Group
                      className='pl-1 d-flex justify-content-between border-primary pb-2'
                      key={category.id}
                      controlId='formBasicCheckbox'
                    >
                      <Form.Check
                        className='border-bottom'
                        type='checkbox'
                        checked={category.checked}
                        label={category.category}
                        id={category.id}
                        value={category.category}
                        onChange={() =>
                          categoryCheckHandler(category.id, category.checked)
                        }
                      ></Form.Check>
                      <div
                        className='collapse-category-btn mr-4'
                        onClick={() => {
                          handleCollapseCategory(category.id)
                        }}
                      >
                        <i className='fas fa-angle-down fx-1'></i>
                      </div>
                    </Form.Group>
                    {category.show &&
                      category.subcategories.map((subcategory) => {
                        return (
                          <div
                            key={uuid()}
                            className='subcategory-container pl-2'
                          >
                            <Form.Group
                              className='pl-3 d-flex justify-content-between border-bottom pb-1'
                              key={subcategory.id}
                              controlId='formBasicCheckbox'
                            >
                              <Form.Check
                                type='checkbox'
                                checked={subcategory.checked}
                                label={subcategory.subcategory}
                                id={subcategory.id}
                                value={subcategory.subcategory}
                                onChange={() =>
                                  subcategoryCheckHandler(
                                    category.id,
                                    subcategory.id,
                                    subcategory.checked
                                  )
                                }
                              ></Form.Check>
                              <div
                                className='collapse-category-btn mr-4'
                                onClick={() =>
                                  handleSubcategoryCollapse(
                                    category.id,
                                    subcategory.id
                                  )
                                }
                              >
                                <i className='fas fa-angle-down fx-1'></i>
                              </div>
                            </Form.Group>
                            {subcategory.show &&
                              subcategory.list.map((listItem) => {
                                return (
                                  <Form.Group
                                    className='pl-5'
                                    key={listItem.id}
                                    controlId='formBasicCheckbox'
                                  >
                                    <Form.Check
                                      type='checkbox'
                                      checked={listItem.checked}
                                      label={listItem.word}
                                      id={listItem.id}
                                      value={listItem.word}
                                      onChange={() =>
                                        wordCheckHandler(
                                          category.id,
                                          listItem,
                                          subcategory.id
                                        )
                                      }
                                    ></Form.Check>
                                  </Form.Group>
                                )
                              })}
                          </div>
                        )
                      })}
                  </div>
                )
              } else {
                return (
                  <div className='category-container' key={uuid()}>
                    <Form.Group
                      className='pl-1 d-flex justify-content-between border-primary pb-2'
                      key={category.id}
                      controlId='formBasicCheckbox'
                    >
                      <Form.Check
                        className='border-bottom'
                        type='checkbox'
                        checked={category.checked}
                        label={category.category}
                        id={category.id}
                        value={category.category}
                        onChange={() =>
                          categoryCheckHandler(category.id, category.checked)
                        }
                      ></Form.Check>
                      <div
                        className='collapse-category-btn mr-4'
                        onClick={() => {
                          handleCollapseCategory(category.id)
                        }}
                      >
                        <i className='fas fa-angle-down fx-1'></i>
                      </div>
                    </Form.Group>
                    {category.show &&
                      category.list.map((listItem) => (
                        <Form.Group
                          className='pl-5'
                          key={listItem.id}
                          controlId='formBasicCheckbox'
                        >
                          <Form.Check
                            type='checkbox'
                            checked={listItem.checked}
                            label={listItem.word}
                            id={listItem.id}
                            value={listItem.word}
                            onChange={() =>
                              wordCheckHandler(category.id, listItem)
                            }
                          ></Form.Check>
                        </Form.Group>
                      ))}
                  </div>
                )
              }
            })}
        </Form>
      </div>
    </Fragment>
  )
}

export default Categories
