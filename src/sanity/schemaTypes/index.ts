import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Category } from './category'
import { faq } from './faq'
import newsletter from './newsletter'
import feedback from './feedback'
import review from './review'
import customerInfo from './customerInfo'
import orders from './orders'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category,faq,newsletter,feedback,review,customerInfo,orders],
}
