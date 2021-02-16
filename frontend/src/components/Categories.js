import React, { Fragment, useState, useEffect } from 'react'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Form, Col, Button } from 'react-bootstrap'

const Categories = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)

  const handleAddButtonClick = () => {
    console.log('add button')
  }
  const handleKeyEnter = () => {
    console.log('handle key enter')
  }

  const [category, setCategory] = useState('')

  return (
    <Fragment>
      <h1 className='list-title'>Categories</h1>
      <div className='category-container p-3'>
        <h3>add to categories</h3>
        <Form>
          <Form.Row className='py-4 d-flex justify-content-center'>
            <Col md={8}>
              <Form.Control
                type='text'
                placeholder='new Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyPress={handleKeyEnter}
              />
            </Col>

            <Col md={4}>
              <Button className='bg-primary' onClick={handleAddButtonClick}>
                Add
              </Button>
            </Col>
          </Form.Row>

          {categoryList &&
            categoryList.map((category) => {
              if (category.subcategories) {
                return (
                  <div className='category-container' key={uuid()}>
                    <Form.Group
                      className='pl-3'
                      key={category.id}
                      controlId='formBasicCheckbox'
                    >
                      <Form.Check
                        type='checkbox'
                        checked={category.checked}
                        label={category.category}
                        id={category.id}
                        value={category.category}
                        // onChange={(e) => onCheckHandler(e)}
                      ></Form.Check>
                    </Form.Group>
                    {category.subcategories.map((subcategory) => {
                      return (
                        <div className='subcategory-container pl-2 bg-primary'>
                          <Form.Group
                            className='pl-3'
                            key={subcategory.id}
                            controlId='formBasicCheckbox'
                          >
                            <Form.Check
                              type='checkbox'
                              checked={subcategory.checked}
                              label={subcategory.subcategory}
                              id={subcategory.id}
                              value={subcategory.subcategory}
                              // onChange={(e) => onCheckHandler(e)}
                            ></Form.Check>
                          </Form.Group>
                          {subcategory.list.map((listItem) => {
                            ;<Form.Group
                              className='pl-3'
                              key={listItem.id}
                              controlId='formBasicCheckbox'
                            >
                              <Form.Check
                                type='checkbox'
                                checked={listItem.checked}
                                label={listItem.listItem}
                                id={listItem.id}
                                value={listItem.listItem}
                                // onChange={(e) => onCheckHandler(e)}
                              ></Form.Check>
                            </Form.Group>
                          })}
                        </div>
                      )
                    })}
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
