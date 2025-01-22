import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Category } from './category'
import { Service } from './service'
import { faq } from './faq'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category,Service,faq],
}
