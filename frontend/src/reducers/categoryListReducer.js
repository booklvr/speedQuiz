import uuid from 'react-uuid'
import {
  CATEGORY_ALL_SUBCATEGORIES_CHECKED,
  CHECK_CATEGORY,
  CHECK_SUBCATEGORY,
  CHECK_WORD,
  SUBCATEGORY_ALL_WORDS_CHECKED,
  TOGGLE_ALL_CHECKBOX,
  TOGGLE_CATEGORY_CHECKBOX,
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_CHECKBOX,
  TOGGLE_SUBCATEGORY_COLLAPSE,
  TOGGLE_WORD_CHECKBOX,
  UNCHECK_CATEGORY,
  UNCHECK_SUBCATEGORY,
  UNCHECK_WORD,
} from '../constants/categoryConstants'

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
    case CHECK_WORD:
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
                          checked: true,
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
                    checked: true,
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
    case UNCHECK_WORD:
      if (payload.subcategoryId) {
        return [...state].map((category) => {
          if (category.id === payload.categoryId && category.subcategories) {
            return {
              ...category,
              checked: false,
              subcategories: category.subcategories.map((subcategory) => {
                if (subcategory.id === payload.subcategoryId) {
                  return {
                    ...subcategory,
                    checked: false,
                    list: [...subcategory.list].map((listItem) => {
                      if (payload.itemId === listItem.id) {
                        return {
                          ...listItem,
                          checked: false,
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
              checked: false,
              list: [...category.list].map((listItem) => {
                if (payload.itemId === listItem.id) {
                  return {
                    ...listItem,
                    checked: false,
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
    case CHECK_SUBCATEGORY:
      return [...state].map((category) => {
        if (category.id === payload.categoryId) {
          return {
            ...category,
            subcategories: [...category.subcategories].map((subcategory) => {
              if (subcategory.id === payload.subcategoryId) {
                return {
                  ...subcategory,
                  checked: true,
                  list: [...subcategory.list].map((listItem) => ({
                    ...listItem,
                    checked: true,
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
    case UNCHECK_SUBCATEGORY:
      return [...state].map((category) => {
        if (category.id === payload.categoryId) {
          return {
            ...category,
            checked: false,
            subcategories: [...category.subcategories].map((subcategory) => {
              if (subcategory.id === payload.subcategoryId) {
                return {
                  ...subcategory,
                  checked: false,
                  list: [...subcategory.list].map((listItem) => ({
                    ...listItem,
                    checked: false,
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
    case CHECK_CATEGORY:
      return [...state].map((category) => {
        if (category.subcategories) {
          if (category.id === payload) {
            return {
              ...category,
              checked: true,
              subcategories: [...category.subcategories].map((subcategory) => ({
                ...subcategory,
                checked: true,
                list: [...subcategory.list].map((listItem) => ({
                  ...listItem,
                  checked: true,
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
    case UNCHECK_CATEGORY:
      return [...state].map((category) => {
        if (category.subcategories) {
          if (category.id === payload) {
            return {
              ...category,
              checked: false,
              subcategories: [...category.subcategories].map((subcategory) => ({
                ...subcategory,
                checked: false,
                list: [...subcategory.list].map((listItem) => ({
                  ...listItem,
                  checked: false,
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
    case SUBCATEGORY_ALL_WORDS_CHECKED:
      return [...state].map((category) => {
        if (category.id === payload.categoryId) {
          return {
            ...category,
            subcategories: [...category.subcategories].map((subcategory) => {
              if (subcategory.id === payload.subcategoryId) {
                return {
                  ...subcategory,
                  checked: subcategory.list.every(
                    (listItem) => listItem.checked
                  ),
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
    case CATEGORY_ALL_SUBCATEGORIES_CHECKED:
      return [...state].map((category) => {
        if (category.id === payload) {
          if (category.subcategories) {
            return {
              ...category,
              checked: category.subcategories.every(
                (subcategory) => subcategory.checked
              ),
            }
          } else {
            return {
              ...category,
              checked: category.list.every((listItem) => listItem.checked),
            }
          }
        } else {
          return {
            ...category,
          }
        }
      })
    default:
      return state
  }
}
