import React from 'react'
import Link from 'next/link'
import { Product } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'

type ProductCardProps = {
  product: Product
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { title, slug, featuredImage, price, salePrice } = product

  const isOnSale = salePrice && salePrice < price
  const displayPrice = isOnSale ? salePrice : price

  return (
    <Link
      href={`/products/${slug}`}
      className={`group block h-full transition-transform hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-gray-100">
        {featuredImage && typeof featuredImage === 'object' && (
          <Media
            resource={featuredImage}
            alt={title || 'Product image'}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        )}

        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
            SALE
          </div>
        )}
      </div>

      <h3 className="text-lg font-medium mb-1 text-gray-900">{title}</h3>

      <div className="flex items-center">
        <span className="font-medium text-gray-900">{formatPrice(displayPrice)}</span>
        {isOnSale && (
          <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(price)}</span>
        )}
      </div>
    </Link>
  )
}
