'use client'

import React from 'react'
import Image from 'next/image'
import LogoDark from '@/assets/logo-dark.svg'
import { ContainerScroll } from '../container-scroll-animation'

export const SubScroll = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                QR Based Promotion
              </span>
            </h1>
          </>
        }
      >
        <Image
          alt="QR Based Promotion"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          height={720}
          width={1400}
          draggable={false}
          src={LogoDark}
        />
      </ContainerScroll>
    </div>
  )
}
