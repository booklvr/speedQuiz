import {
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_COLLAPSE,
  TOGGLE_WORD_CHECKBOX,
  TOGGLE_SUBCATEGORY_CHECKBOX,
  TOGGLE_CATEGORY_CHECKBOX,
  UNCHECK_WORD,
  TOGGLE_ALL_CHECKBOX,
} from '../constants/categoryConstants'
import {
  ADD_SUBCATEGORY_BY_CHECKBOX,
  REMOVE_SUBCATEGORY_BY_CHECKBOX,
} from '../constants/wordListConstants'

export const toggleCategoryCollapse = (id) => (dispatch) => {
  dispatch({ type: TOGGLE_CATEGORY_COLLAPSE, payload: id })
}

export const toggleSubcategoryCollapse = (categoryId, subcategoryId) => (
  dispatch
) => {
  dispatch({
    type: TOGGLE_SUBCATEGORY_COLLAPSE,
    payload: { categoryId, subcategoryId },
  })
}

export const toggleWordCheckbox = ({ categoryId, subcategoryId, itemId }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: TOGGLE_WORD_CHECKBOX,
    payload: { categoryId, subcategoryId, itemId },
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
}

export const toggleSubcategoryCheckbox = (
  categoryId,
  subcategoryId,
  checked
) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_SUBCATEGORY_CHECKBOX,
    payload: { categoryId, subcategoryId },
  })

  const categories = getState().categoryList
  const wordList = getState().wordList
  categories.forEach((category) => {
    if (category.id === categoryId) {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.id === subcategoryId) {
          if (checked) {
            let listItemIds = subcategory.list.map((listItem) => listItem.id)
            dispatch({
              type: REMOVE_SUBCATEGORY_BY_CHECKBOX,
              payload: listItemIds,
            })
          } else {
            let wordListIds = wordList.map((word) => word.id)
            let newArray = subcategory.list.filter(
              (listItem) => !wordListIds.includes(listItem.id)
            )
            dispatch({
              type: ADD_SUBCATEGORY_BY_CHECKBOX,
              payload: newArray,
            })
          }
        }
      })
    }
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const toggleCategoryCheckbox = (categoryId, checked) => (
  dispatch,
  getState
) => {
  dispatch({
    type: TOGGLE_CATEGORY_CHECKBOX,
    payload: categoryId,
  })

  const categories = getState().categoryList
  const wordList = getState().wordList
  categories.forEach((category) => {
    if (category.id === categoryId) {
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          if (checked) {
            let listItemIds = subcategory.list.map((listItem) => listItem.id)
            dispatch({
              type: REMOVE_SUBCATEGORY_BY_CHECKBOX,
              payload: listItemIds,
            })
          } else {
            let wordListIds = wordList.map((word) => word.id)
            let newArray = subcategory.list.filter(
              (listItem) => !wordListIds.includes(listItem.id)
            )
            dispatch({
              type: ADD_SUBCATEGORY_BY_CHECKBOX,
              payload: newArray,
            })
          }
        })
      } else {
        if (checked) {
          let listItemIds = category.list.map((listItem) => listItem.id)
          dispatch({
            type: REMOVE_SUBCATEGORY_BY_CHECKBOX,
            payload: listItemIds,
          })
        } else {
          let wordListIds = wordList.map((word) => word.id)
          let newArray = category.list.filter(
            (listItem) => !wordListIds.includes(listItem.id)
          )
          dispatch({
            type: ADD_SUBCATEGORY_BY_CHECKBOX,
            payload: newArray,
          })
        }
      }
    }
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const toggleAllCheckbox = (checked) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALL_CHECKBOX,
    payload: checked,
  })

  const categories = getState().categoryList
  const wordList = getState().wordList
  categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        if (!checked) {
          let listItemIds = subcategory.list.map((listItem) => listItem.id)
          dispatch({
            type: REMOVE_SUBCATEGORY_BY_CHECKBOX,
            payload: listItemIds,
          })
        } else {
          let wordListIds = wordList.map((word) => word.id)
          let newArray = subcategory.list.filter(
            (listItem) => !wordListIds.includes(listItem.id)
          )
          dispatch({
            type: ADD_SUBCATEGORY_BY_CHECKBOX,
            payload: newArray,
          })
        }
      })
    } else {
      if (!checked) {
        let listItemIds = category.list.map((listItem) => listItem.id)
        dispatch({
          type: REMOVE_SUBCATEGORY_BY_CHECKBOX,
          payload: listItemIds,
        })
      } else {
        let wordListIds = wordList.map((word) => word.id)
        let newArray = category.list.filter(
          (listItem) => !wordListIds.includes(listItem.id)
        )
        dispatch({
          type: ADD_SUBCATEGORY_BY_CHECKBOX,
          payload: newArray,
        })
      }
    }
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const uncheckWord = (id) => (dispatch, getState) => {
  dispatch({
    type: UNCHECK_WORD,
    payload: id,
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
}
