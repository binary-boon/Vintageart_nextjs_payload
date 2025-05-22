'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Product } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

// Let's try using your Button component
// import { Button } from '@/components/ui/button'

export type ProductCardData = Pick<
  Product,
  'id' | 'slug' | 'image' | 'meta' | 'name' | 'categories' | 'price' | 'description' | 'links'
>

export const ProductCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: ProductCardData
  relationTo?: 'products'
  showCategories?: boolean
  name?: string
  links: typeof CMSLink
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, name: titleFromProps } = props

  const { slug, categories, meta, name, price, description, image, links } = doc || {}
  const { image: metaImage } = meta || {}

  // Debug logging - remove this later
  console.log('ProductCard data:', { name, price, description, image, slug })

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || name
  const productImage = image || metaImage
  const href = `/${relationTo}/${slug || 'product-' + (doc?.id || 'unknown')}`

  const formatPrice = (price?: number | null) => {
    if (typeof price !== 'number' || price === null || price === undefined) {
      return 'Price not available'
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Buy now clicked for product:', name, 'Price:', price)
    alert(`Buy now clicked for: ${name} - Price: ${formatPrice(price)}`)
  }

  // Simple button component inspired by your CMSLink
  const BuyButton = () => (
    <button
      type="button"
      onClick={handleBuyNow}
      className={cn(
        // Base button styles
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        // Primary variant styles
        'bg-primary text-primary-foreground hover:bg-primary/90',
        // Size styles
        'h-10 py-2 px-4',
        // Full width
        'w-full gap-2',
      )}
    >
      <span>Buy Now</span>
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
        />
      </svg>
    </button>
  )

  return (
    <article
      className={cn(
        'group border border-border rounded-xl overflow-hidden bg-card hover:cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {!productImage && (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        {productImage && typeof productImage !== 'string' && (
          <Media
            resource={productImage}
            size="33vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col h-full">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-1 mb-3">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="font-bold text-xl mb-3 line-clamp-2 min-h-[3.5rem] flex items-start">
            <Link
              href={href}
              ref={link.ref}
              className="hover:text-primary transition-colors duration-200"
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto space-y-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-2xl font-bold text-green-600">
              {/* Debug - show raw price first */}
              <div className="text-sm text-gray-500 font-normal">Raw price: {String(price)}</div>
              <div className="text-blue-600">{formatPrice(price)}</div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>

          {/* <button
            onClick={handleBuyNow}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all duration-200 py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Buy Now - {formatPrice(price)}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </article>
  )
}
// 'use client'
// import { cn } from '@/utilities/ui'
// import useClickableCard from '@/utilities/useClickableCard'
// import Link from 'next/link'
// import React, { Fragment } from 'react'

// import type { Product } from '@/payload-types'

// import { Media } from '@/components/Media'

// export type ProductCardData = Pick<
//   Product,
//   'id' | 'slug' | 'image' | 'meta' | 'name' | 'categories' | 'price' | 'description'
// >

// export const ProductCard: React.FC<{
//   alignItems?: 'center'
//   className?: string
//   doc?: ProductCardData
//   relationTo?: 'products'
//   showCategories?: boolean
//   name?: string
// }> = (props) => {
//   const { card, link } = useClickableCard({})
//   const { className, doc, relationTo, showCategories, name: titleFromProps } = props

//   const { slug, categories, meta, name, price, description, image } = doc || {}
//   const { image: metaImage } = meta || {}

//   // Debug logging - remove this later
//   console.log('ProductCard data:', { name, price, description, image, slug })

//   const hasCategories = categories && Array.isArray(categories) && categories.length > 0
//   const titleToUse = titleFromProps || name
//   const productImage = image || metaImage
//   const href = `/${relationTo}/${slug || 'product-' + (doc?.id || 'unknown')}`

//   const formatPrice = (price?: number | null) => {
//     if (typeof price !== 'number' || price === null || price === undefined) {
//       return 'Price not available'
//     }
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price)
//   }

//   const handleBuyNow = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     // Add your buy now logic here
//     console.log('Buy now clicked for product:', name, 'Price:', price)
//     // You can integrate with your cart system, payment gateway, etc.

//     // For debugging - remove this later
//     alert(`Buy now clicked for: ${name} - Price: ${formatPrice(price)}`)
//   }

//   return (
//     <article
//       className={cn(
//         'group border border-border rounded-xl overflow-hidden bg-card hover:cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1',
//         className,
//       )}
//       ref={card.ref}
//     >
//       <div className="relative w-full aspect-square overflow-hidden">
//         {!productImage && (
//           <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//             <span className="text-gray-400 text-sm">No image</span>
//           </div>
//         )}
//         {productImage && typeof productImage !== 'string' && (
//           <Media
//             resource={productImage}
//             size="33vw"
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         )}

//         {/* Overlay gradient for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>

//       <div className="p-6 flex flex-col h-full">
//         {showCategories && hasCategories && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {categories?.map((category, index) => {
//               if (typeof category === 'object') {
//                 const { title: titleFromCategory } = category
//                 const categoryTitle = titleFromCategory || 'Untitled category'

//                 return (
//                   <span
//                     key={index}
//                     className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
//                   >
//                     {categoryTitle}
//                   </span>
//                 )
//               }
//               return null
//             })}
//           </div>
//         )}

//         {titleToUse && (
//           <h3 className="font-bold text-xl mb-3 line-clamp-2 min-h-[3.5rem] flex items-start">
//             <Link
//               href={href}
//               ref={link.ref}
//               className="hover:text-primary transition-colors duration-200"
//             >
//               {titleToUse}
//             </Link>
//           </h3>
//         )}

//         {description && (
//           <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
//             {description}
//           </p>
//         )}

//         <div className="mt-auto space-y-4 bg-gray-50 p-3 rounded-lg">
//           <div className="flex items-center justify-between border-t pt-4">
//             <div className="text-2xl font-bold text-green-600">
//               {/* Debug - show raw price first */}
//               <div className="text-sm text-gray-500 font-normal">Raw price: {String(price)}</div>
//               <div className="text-blue-600">{formatPrice(price)}</div>
//             </div>
//           </div>

//           <button
//             onClick={handleBuyNow}
//             className="w-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all duration-200 py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//           >
//             <span>Buy Now - {formatPrice(price)}</span>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </article>
//   )
// }
