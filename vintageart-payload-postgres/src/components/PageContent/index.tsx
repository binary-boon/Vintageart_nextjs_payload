import React from 'react'
import { Page } from '@/payload-types'
import { RenderBlocks } from '@/blocks/renderBlocks'
import { Hero } from '@/heros/Hero'

export type PageContentProps = {
  page: Page
}

export const PageContent: React.FC<PageContentProps> = ({ page }) => {
  const { hero, layout } = page

  return (
    <React.Fragment>
      {/* Render hero section if it exists */}
      {hero && <Hero {...hero} />}

      {/* Render blocks */}
      {layout && Array.isArray(layout) && layout.length > 0 ? (
        <RenderBlocks blocks={layout} />
      ) : null}
    </React.Fragment>
  )
}
