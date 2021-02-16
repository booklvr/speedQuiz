import uuid from 'react-uuid'
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
      id: uuid(),
      subcategories: category.subcategories.map((subcategory) => {
        return {
          subcategory: subcategory.subcategory,
          checked: false,
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
      list: category.list.forEach((listItem) => ({
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
    default:
      return state
  }
}
