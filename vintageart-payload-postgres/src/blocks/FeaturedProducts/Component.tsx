import type { Product, FeaturedProductsBlock as FeaturedProductsProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ProductList } from '@/components/ProductList'
import { CMSLink } from '@/components/Link'

export const FeaturedProductsBlock: React.FC<
  FeaturedProductsProps & {
    id?: string
  }
> = async ({ id, introContent, selectedProducts, links }) => {
  const payload = await getPayload({ config: configPromise })

  let products: Product[] = []

  if (selectedProducts?.length) {
    const productIDs = selectedProducts.map((item) =>
      typeof item === 'object' && item !== null ? item.id : item,
    )

    const result = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: productIDs,
        },
      },
      limit: productIDs.length,
      depth: 3, // Reduced depth to avoid over-fetching
    })

    // Maintain the order of selected products
    products = productIDs
      .map((id) => result.docs.find((product) => product.id === id))
      .filter(Boolean) as Product[]
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="container">
          <p className="text-center text-muted-foreground">No featured products selected.</p>
        </div>
      )}
      {
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      }
    </div>
  )
}

// import type { Product, FeaturedProductsBlock as FeaturedProductsProps } from '@/payload-types'

// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import React from 'react'
// import RichText from '@/components/RichText'

// import { ProductList } from '@/components/ProductList'

// export const FeaturedProductsBlock: React.FC<
//   FeaturedProductsProps & {
//     id?: string
//   }
// > = async (props) => {
//   const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

//   const limit = limitFromProps || 3

//   let products: Product[] = []

//   if (populateBy === 'collection') {
//     const payload = await getPayload({ config: configPromise })

//     const flattenedCategories = categories?.map((category) => {
//       if (typeof category === 'object') return category.id
//       else return category
//     })

//     const fetchedPosts = await payload.find({
//       collection: 'products',
//       depth: 3,
//       limit,
//       ...(flattenedCategories && flattenedCategories.length > 0
//         ? {
//             where: {
//               categories: {
//                 in: flattenedCategories,
//               },
//             },
//           }
//         : {}),
//     })

//     products = fetchedPosts.docs
//   } else {
//     if (selectedDocs?.length) {
//       const filteredSelectedPosts = selectedDocs.map((post) => {
//         if (typeof post.value === 'object') return post.value
//       }) as unknown as Product[]

//       products = filteredSelectedPosts
//     }
//   }

//   return (
//     <div className="my-16" id={`block-${id}`}>
//       {introContent && (
//         <div className="container mb-16">
//           <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
//         </div>
//       )}
//       <ProductList products={products} />
//     </div>
//   )
// }

// import { cn } from '@/utilities/ui'
// import React from 'react'
// import RichText from '@/components/RichText'

// import type { FeaturedProductsBlock as FeaturedType } from '@/payload-types'

// import { CMSLink } from '../../components/Link'

// export const FeaturedProductsBlock: React.FC<FeaturedType> = (props) => {
//   const { columns } = props

//   const colsSpanClasses = {
//     full: '12',
//     half: '6',
//     oneThird: '4',
//     twoThirds: '8',
//   }

//   return (
//     <div className="container my-16">
//       <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
//         {columns &&
//           columns.length > 0 &&
//           columns.map((col, index) => {
//             const { enableLink, link, richText, size } = col

//             return (
//               <div
//                 className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
//                   'md:col-span-2': size !== 'full',
//                 })}
//                 key={index}
//               >
//                 {richText && <RichText data={richText} enableGutter={false} />}

//                 {enableLink && <CMSLink {...link} />}
//               </div>
//             )
//           })}
//       </div>
//     </div>
//   )
// }
