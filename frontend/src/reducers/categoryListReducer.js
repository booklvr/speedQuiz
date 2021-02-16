import uuid from 'react-uuid'
import {
  TOGGLE_CATEGORY_COLLAPSE,
  TOGGLE_SUBCATEGORY_COLLAPSE,
} from '../constants/categoryConstants'
import categoryList from '../data/categoryList'

console.log('start')

// categoryList.forEach((category) => {
//   console.log('category:', category.category)
//   if (category.subcategories) {
//     category.subcategories.forEach((subcategory) => {
//       console.log('subcategory:', subcategory.subcategory)
//       console.log('LIST')
//       subcategory.list.forEach((listItem) => {
//         console.log(listItem)
//       })
//     })
//   } else {
//     console.log('LIST')
//     category.list.forEach((listItem) => {
//       console.log(listItem)
//     })
//   }
// })

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
      show: true,
      list: category.list.map((listItem) => ({
        word: listItem,
        checked: false,
        id: uuid(),
      })),
    }
  }
})
// console.log(categoryWordList)

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
            subcategories: category.subcategories.map((subcategory) => {
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
    default:
      return state
  }
}
