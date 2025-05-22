import { cn } from '@/utilities/ui'
import React from 'react'

import { ProductCard, ProductCardData } from '@/components/ProductCard'

export type Props = {
  products: ProductCardData[]
}

export const ProductList: React.FC<Props> = (props) => {
  const { products } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={result.id || index} className="flex">
                  <ProductCard
                    className="w-full"
                    doc={result}
                    relationTo="products"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
