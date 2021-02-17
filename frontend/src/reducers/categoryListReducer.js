import uuid from 'react-uuid'
import Categories from '../components/Categories'
import {
  TOGGLE_ALL_CHECKBOX,
  TOGGLE_CATEGORY_CHECKBOX,
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_CHECKBOX,
  TOGGLE_SUBCATEGORY_COLLAPSE,
  TOGGLE_WORD_CHECKBOX,
  UNCHECK_WORD,
} from '../constants/categoryConstants'

import { ADD_WORD_BY_CHECKBOX } from '../constants/wordListConstants'
import categoryList from '../data/categoryList'

const categoryWordList = categoryList.map((category) => {
  if (category.subcategories) {
    return {
      category: category.category,
      checked: false,
      show: false,
      id: uuid(),
      subcategories: category.subcategories.map((subcategory) => {
        return {
          subcategory: subcategory.subcategory,
          checked: false,
          show: false,
          id: uuid(),
          list: subcategory.list.map((listItem) => ({
            word: listItem,
            checked: false,
            id: uuid(),
          })),
        }
      }),
    }
  } else {
    return {
      category: category.category,
      checked: false,
      id: uuid(),
      show: false,
      list: category.list.map((listItem) => ({
        word: listItem,
        checked: false,
        id: uuid(),
      })),
    }
  }
})

export const categoryListReducer = (state = categoryWordList, action) => {
  const { type, payload } = action
  switch (type) {
    case TOGGLE_CATEGORY_COLLAPSE:
      return [...state].map((category) => {
        if (category.id === payload) {
          return {
            ...category,
            show: !category.show,
          }
        } else {
          return { ...category }
        }
      })
    case TOGGLE_SUBCATEGORY_COLLAPSE:
      return [...state].map((category) => {
        if (category.id === payload.categoryId && category.subcategories) {
          return {
            ...category,
            subcategories: [...category.subcategories].map((subcategory) => {
              if (subcategory.id === payload.subcategoryId) {
                return {
                  ...subcategory,
                  show: !subcategory.show,
                }
              } else {
                return {
                  ...subcategory,
                }
              }
            }),
          }
        } else {
          return { ...category }
        }
      })
    case TOGGLE_WORD_CHECKBOX:
      if (payload.subcategoryId) {
        return [...state].map((category) => {
          if (category.id === payload.categoryId && category.subcategories) {
            return {
              ...category,
              subcategories: category.subcategories.map((subcategory) => {
                if (subcategory.id === payload.subcategoryId) {
                  return {
                    ...subcategory,
                    list: [...subcategory.list].map((listItem) => {
                      if (payload.itemId === listItem.id) {
                        return {
                          ...listItem,
                          checked: !listItem.checked,
                        }
                      } else {
                        return {
                          ...listItem,
                        }
                      }
                    }),
                  }
                } else {
                  return {
                    ...subcategory,
                  }
                }
              }),
            }
          } else {
            return { ...category }
          }
        })
      } else {
        return [...state].map((category) => {
          if (category.id === payload.categoryId) {
            return {
              ...category,
              list: [...category.list].map((listItem) => {
                if (payload.itemId === listItem.id) {
                  return {
                    ...listItem,
                    checked: !listItem.checked,
                  }
                } else {
                  return {
                    ...listItem,
                  }
                }
              }),
            }
          } else {
            return { ...category }
          }
        })
      }
    case TOGGLE_SUBCATEGORY_CHECKBOX:
      return [...state].map((category) => {
        if (category.id === payload.categoryId) {
          return {
            ...category,
            subcategories: [...category.subcategories].map((subcategory) => {
              if (subcategory.id === payload.subcategoryId) {
                return {
                  ...subcategory,
                  checked: !subcategory.checked,
                  list: [...subcategory.list].map((listItem) => ({
                    ...listItem,
                    checked: !subcategory.checked,
                  })),
                }
              } else {
                return {
                  ...subcategory,
                }
              }
            }),
          }
        } else {
          return {
            ...category,
          }
        }
      })
    case TOGGLE_CATEGORY_CHECKBOX:
      return [...state].map((category) => {
        if (category.subcategories) {
          if (category.id === payload) {
            return {
              ...category,
              checked: !category.checked,
              subcategories: [...category.subcategories].map((subcategory) => ({
                ...subcategory,
                checked: !category.checked,
                list: [...subcategory.list].map((listItem) => ({
                  ...listItem,
                  checked: !category.checked,
                })),
              })),
            }
          } else {
            return {
              ...category,
            }
          }
        } else {
          if (category.id === payload) {
            return {
              ...category,
              checked: !category.checked,
              list: [...category.list].map((listItem) => ({
                ...listItem,
                checked: !category.checked,
              })),
            }
          } else {
            return {
              ...category,
            }
          }
        }
      })
    case TOGGLE_ALL_CHECKBOX:
      return [...state].map((category) => {
        if (category.subcategories) {
          return {
            ...category,
            checked: payload,
            subcategories: [...category.subcategories].map((subcategory) => ({
              ...subcategory,
              checked: payload,
              list: [...subcategory.list].map((listItem) => ({
                ...listItem,
                checked: payload,
              })),
            })),
          }
        } else {
          return {
            ...category,
            checked: payload,
            list: [...category.list].map((listItem) => ({
              ...listItem,
              checked: payload,
            })),
          }
        }
      })
    case UNCHECK_WORD:
      return [...state].map((category) => {
        if (category.subcategories) {
          return {
            ...category,
            subcategories: [...category.subcategories].map((subcategory) => ({
              ...subcategory,
              list: [...subcategory.list].map((word) => {
                if (word.id === payload) {
                  return {
                    ...word,
                    checked: false,
                  }
                } else {
                  return {
                    ...word,
                  }
                }
              }),
            })),
          }
        } else {
          return {
            ...category,
            list: [...category.list].map((word) => {
              if (word.id === payload) {
                return {
                  ...word,
                  checked: false,
                }
              } else {
                return {
                  ...word,
                }
              }
            }),
          }
        }
      })
    default:
      return state
  }
}
