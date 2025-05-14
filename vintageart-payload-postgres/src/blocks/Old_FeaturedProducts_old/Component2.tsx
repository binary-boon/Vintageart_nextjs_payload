import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ProductCard } from '@/components/ProductCard'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export type FeaturedProductsProps = {
  heading: string
  description?: any
  products: {
    product:
      | {
          id: string
          name: string
          price: number
          image:
            | {
                id: string
                url: string
                width?: number
                height?: number
                alt?: string
                filename?: string
              }
            | string
          slug?: string
        }
      | string
  }[]
  viewAllLink?: {
    text?: string
    url?: string
  }
  layout?: 'grid' | 'carousel'
  productsPerRow?: '2' | '3' | '4'
  className?: string
  disableInnerContainer?: boolean
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  heading,
  description,
  products,
  viewAllLink,
  layout = 'grid',
  productsPerRow = '3',
  className,
  disableInnerContainer = false,
}) => {
  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const containerClasses = cn(
    'py-12',
    disableInnerContainer ? '' : 'container mx-auto px-4',
    className,
  )

  return (
    <section className={containerClasses}>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
        {description && (
          <div className="prose mx-auto">
            <RichText data={description} />
          </div>
        )}
      </div>

      {layout === 'grid' ? (
        <div className={`grid ${gridCols[productsPerRow]} gap-6 mb-10`}>
          {products.map((item, index) => {
            const product = typeof item.product === 'object' ? item.product : null

            if (!product) return null

            return <ProductCard key={`product-${index}`} product={product} />
          })}
        </div>
      ) : (
        <div className="relative mb-10">
          <div className="flex overflow-x-auto pb-6 snap-x scrollbar-hide -mx-4 px-4">
            {products.map((item, index) => {
              const product = typeof item.product === 'object' ? item.product : null

              if (!product) return null

              return (
                <div
                  key={`product-${index}`}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 snap-start"
                >
                  <ProductCard product={product} />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {viewAllLink?.url && (
        <div className="text-center">
          <Link
            href={viewAllLink.url}
            className="inline-block px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-md transition-colors"
          >
            {viewAllLink.text || 'View All Products'}
          </Link>
        </div>
      )}
    </section>
  )
}
