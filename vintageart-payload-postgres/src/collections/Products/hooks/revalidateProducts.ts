import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  // Only revalidate if not in admin context and revalidation is enabled
  if (!context.disableRevalidate && !context.isAdmin) {
    const currentPath = `/products/${doc.slug}`

    // Revalidate current product page if published
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating product at path: ${currentPath}`)
      revalidatePath(currentPath)
    }

    // Revalidate old path if slug changed
    if (previousDoc?.slug && previousDoc.slug !== doc.slug && previousDoc._status === 'published') {
      const oldPath = `/products/${previousDoc.slug}`
      payload.logger.info(`Revalidating old product path: ${oldPath}`)
      revalidatePath(oldPath)
    }

    // Only revalidate main pages if not in admin
    try {
      revalidatePath('/') // Home page
      revalidatePath('/products') // Products listing page

      // Revalidate category pages if product has categories
      if (doc.categories && Array.isArray(doc.categories)) {
        doc.categories.forEach((category) => {
          if (typeof category === 'object' && category.slug) {
            const categoryPath = `/categories/${category.slug}`
            payload.logger.info(`Revalidating category page: ${categoryPath}`)
            revalidatePath(categoryPath)
          }
        })
      }

      // Revalidate sitemap and related tags
      revalidateTag('products-sitemap')
      revalidateTag('featured-products')
      revalidateTag('product-cards')

      payload.logger.info(`Product revalidation completed for: ${doc.name || doc.slug}`)
    } catch (error) {
      payload.logger.warn(`Revalidation warning: ${error}`)
    }
  }

  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { payload, context },
}) => {
  // Only revalidate if not in admin context and revalidation is enabled
  if (!context.disableRevalidate && !context.isAdmin && doc) {
    const productPath = `/products/${doc.slug}`

    payload.logger.info(`Revalidating after product deletion: ${productPath}`)

    try {
      // Revalidate the deleted product path
      revalidatePath(productPath)

      // Revalidate main pages
      revalidatePath('/') // Home page
      revalidatePath('/products') // Products listing

      // Revalidate category pages if product had categories
      if (doc.categories && Array.isArray(doc.categories)) {
        doc.categories.forEach((category) => {
          if (typeof category === 'object' && category.slug) {
            const categoryPath = `/categories/${category.slug}`
            payload.logger.info(`Revalidating category page after deletion: ${categoryPath}`)
            revalidatePath(categoryPath)
          }
        })
      }

      // Revalidate tags
      revalidateTag('products-sitemap')
      revalidateTag('featured-products')
      revalidateTag('product-cards')

      payload.logger.info(`Product deletion revalidation completed for: ${doc.name || doc.slug}`)
    } catch (error) {
      payload.logger.warn(`Revalidation warning on delete: ${error}`)
    }
  }

  return doc
}
