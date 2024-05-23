import { check } from 'express-validator'
const maxFileSize = 2000000 // around 2Mb
import { RestaurantCategory } from '../../models/models.js'


const checkRCategorieAlready = async (value, { req }) => {
    try {
      const restaurantCategory = await RestaurantCategory.findOne({
        where: { name: value }
      })
  
      if (restaurantCategory !== null) {
        return Promise.reject(new Error('La categoria ' + value + 'ya existe'))
      } else {
        return Promise.resolve()
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 255 }).trim().custom(checkRCategorieAlready)
]

export { create }