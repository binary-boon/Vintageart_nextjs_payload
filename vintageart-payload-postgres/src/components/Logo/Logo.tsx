import clsx from 'clsx'
import React from 'react'
import logo from "../../../public/media/Vintage Art & Decor.png";
import Image from 'next/image';

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */

    <Image alt='Vintage art decor Logo' width={400} height={68} decoding='async' className={clsx('max-w-[9.375rem] w-full h-[fit-content]', className)} src={logo}/>
    
  )
}
