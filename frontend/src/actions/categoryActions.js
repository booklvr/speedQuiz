import {
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_COLLAPSE,
  CHECK_WORD,
  UNCHECK_WORD,
  UNCHECK_WORD_BY_BUTTON,
  CHECK_SUBCATEGORY,
  UNCHECK_SUBCATEGORY,
  CHECK_CATEGORY,
  UNCHECK_CATEGORY,
  TOGGLE_ALL_CHECKBOX,
  SUBCATEGORY_ALL_WORDS_CHECKED,
  CATEGORY_ALL_SUBCATEGORIES_CHECKED,
  ALL_CATEGORIES_CHECKED,
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

export const toggleWordCheckbox = ({
  categoryId,
  subcategoryId,
  itemId,
  checked,
}) => (dispatch, getState) => {
  if (!checked) {
    dispatch({
      type: CHECK_WORD,
      payload: { categoryId, subcategoryId, itemId, checked },
    })
    dispatch({
      type: SUBCATEGORY_ALL_WORDS_CHECKED,
      payload: { subcategoryId, categoryId },
    })
    dispatch({
      type: CATEGORY_ALL_SUBCATEGORIES_CHECKED,
      payload: categoryId,
    })
  } else {
    dispatch({
      type: UNCHECK_WORD,
      payload: { categoryId, subcategoryId, itemId },
    })
  }
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
}

export const uncheckWordByBtn = (id) => (dispatch, getState) => {
  const categoryList = getState().categoryList

  categoryList.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.list.forEach((listItem) => {
          if (listItem.id === id) {
            dispatch({
              type: UNCHECK_WORD,
              payload: {
                categoryId: category.id,
                subcategoryId: subcategory.id,
                itemId: id,
              },
            })
            return
          }
        })
      })
    } else {
      category.list.forEach((listItem) => {
        if (listItem.id === id) {
          dispatch({
            type: UNCHECK_WORD,
            payload: {
              categoryId: category.id,
              itemId: id,
            },
          })
          return
        }
      })
    }
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const toggleSubcategoryCheckbox = (
  categoryId,
  subcategoryId,
  checked
) => (dispatch, getState) => {
  if (!checked) {
    dispatch({
      type: CHECK_SUBCATEGORY,
      payload: { categoryId, subcategoryId },
    })
    dispatch({
      type: CATEGORY_ALL_SUBCATEGORIES_CHECKED,
      payload: categoryId,
    })
  } else {
    dispatch({
      type: UNCHECK_SUBCATEGORY,
      payload: { categoryId, subcategoryId },
    })
  }

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
  if (!checked) {
    dispatch({
      type: CHECK_CATEGORY,
      payload: categoryId,
    })
    dispatch({
      type: ALL_CATEGORIES_CHECKED,
    })
  } else {
    dispatch({
      type: UNCHECK_CATEGORY,
      payload: categoryId,
    })
  }

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
    payload: !checked,
  })

  const categories = getState().categoryList
  const wordList = getState().wordList
  categories.forEach((category) => {
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
  })
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}
