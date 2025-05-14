import { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  labels: {
    singular: 'Featured Products Block',
    plural: 'Featured Products Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
      ],
    },
    {
      name: 'viewAllLink',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'View All Products',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/products',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
    },
    {
      name: 'productsPerRow',
      type: 'select',
      defaultValue: '3',
      options: [
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: '4',
          value: '4',
        },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'grid',
      },
    },
  ],
}
