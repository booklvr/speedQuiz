import {
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_COLLAPSE,
  TOGGLE_WORD_CHECKBOX,
  TOGGLE_SUBCATEGORY_CHECKBOX,
  UNCHECK_WORD,
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
  dispatch
) => {
  dispatch({
    type: TOGGLE_WORD_CHECKBOX,
    payload: { categoryId, subcategoryId, itemId },
  })
}

export const toggleSubcategoryCheckbox = (
  categoryId,
  subcategoryId,
  checked
) => (dispatch, getState) => {
  console.log('toggle subcategories checkbox')
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
            console.log('subcategory', subcategory)
            let wordListIds = wordList.map((word) => word.id)
            console.log(wordListIds)
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
}

export const uncheckWord = (id) => (dispatch) => {
  dispatch({
    type: UNCHECK_WORD,
    payload: id,
  })
}
