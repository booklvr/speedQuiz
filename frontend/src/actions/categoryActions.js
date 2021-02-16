import {
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_COLLAPSE,
} from '../constants/categoryConstants'

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
