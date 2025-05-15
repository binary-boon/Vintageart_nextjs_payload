import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media', // make sure your Media collection exists
    required: true,
  },
  {
    name: 'btn',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        options: ['custom', 'reference'],
      },
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'newTab',
        type: 'checkbox',
      },
      {
        name: 'url',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData.type === 'custom',
        },
      },
      {
        name: 'reference',
        type: 'relationship',
        relationTo: ['pages', 'products'],
        admin: {
          condition: (_, siblingData) => siblingData.type === 'reference',
        },
      },
      {
        name: 'appearance',
        type: 'select',
        options: ['default', 'outline'],
      },
    ],
  },
  {
    name: 'price',
    type: 'number',
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const FeaturedProductsBlock: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
