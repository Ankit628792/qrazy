import React from 'react'
import { IGridProps } from '../../../types'
import { Container } from '../../../atoms'

export const Grid: React.FC<IGridProps> = ({
  container = false,
  item = false,
  spacing = 0,
  direction = 'row',
  wrap = 'wrap',
  xs,
  sm,
  md,
  lg,
  xl,
  className = '',
  children
}: IGridProps) => {
  const getGridClasses = () => {
    let gridClasses = ''
    if (container) gridClasses += 'flex flex-wrap '
    if (item) gridClasses += 'flex-grow '
    if (direction === 'row') gridClasses += 'flex-row '
    if (direction === 'row-reverse') gridClasses += 'flex-row-reverse '
    if (direction === 'column') gridClasses += 'flex-col '
    if (direction === 'column-reverse') gridClasses += 'flex-col-reverse '
    if (wrap === 'nowrap') gridClasses += 'flex-nowrap '
    if (wrap === 'wrap-reverse') gridClasses += 'flex-wrap-reverse '
    if (spacing && container) gridClasses += `gap-${spacing} `
    if (xs) gridClasses += `w-${xs}/12 `
    if (sm) gridClasses += `sm:w-${sm}/12 `
    if (md) gridClasses += `md:w-${md}/12 `
    if (lg) gridClasses += `lg:w-${lg}/12 `
    if (xl) gridClasses += `xl:w-${xl}/12 `
    if (className) gridClasses += className
    return gridClasses
  }

  return <Container className={getGridClasses()}>{children}</Container>
}
