'use client'
import React from 'react'
import Map from '../ak/Map'
import { dummyLocations, dummyScans } from './constant'
import ChartUp from '@/assets/chart-up.png'
import ChartDown from '@/assets/chart-down.png'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import moment from 'moment'
import ScanTable from './table'
import Tooltip from '../ui/tooltip'

function Scans() {
  const [data, setData] = React.useState(dummyLocations)
  return (
    <>
      {/* <section className='py-5 px-3 sticky -mt-3 -top-3 bg-white bg-opacity-10 dark:bg-zinc-900 dark:bg-opacity-10 backdrop-blur-md rounded-bl-xl rounded-br-xl z-10'>
                <h1 className='text-2xl lg:text-3xl font-semibold pb-3'>Scans</h1>
            </section> */}
      <section className="relative">
        <div className="h-[90dvh] w-full overflow-hidden -mt-3 relative">
          <div className="glass-base w-full max-w-[200px] p-3 absolute top-0 right-0 z-20 flex flex-col gap-2 rounded-bl-xl text-right">
            <h1>
              <span className="text-3xl font-medium">999</span> Scans
            </h1>
            <h2>
              in last <span className="">10 min</span>
            </h2>
          </div>
          <Map data={data} />
        </div>

        <div className="glass-base rounded-2xl overflow-hidden z-10 transform -translate-y-72 min-h-96">
          <div className="flex items-center w-full overflow-x-auto divide-x scroll-hidden ">
            {Array(6)
              .fill(1)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className="glass w-full min-w-80 max-w-xs relative p-5 filter"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Tooltip title="Show Info Here">
                        <Info className="w-5 shrink-0" />
                      </Tooltip>
                      <img
                        src={i % 2 === 0 ? ChartUp.src : ChartDown.src}
                        className="w-48 h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div
                      className={cn(
                        'flex items-end justify-between gap-4 w-full mt-5'
                      )}
                    >
                      <h1 className="text-3xl xl:text-4xl font-medium">123</h1>
                      <p className="text-base">Total Scans</p>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="p-4 flex items-start gap-4 ">
            <div className="flex-grow rounded-xl glass-base p-4 divide-y">
              <h1 className="text-2xl lg:text-3xl font-semibold pb-3">
                Recent Scans
              </h1>
              <div className="w-full flex flex-col divide-y">
                <ScanTable data={dummyScans} />
              </div>
            </div>
            <div className="w-full max-w-sm rounded-xl glass-base p-4 divide-y">
              <h1 className="text-2xl lg:text-3xl font-semibold pb-3">
                Top Places
              </h1>
              <div className="w-full flex flex-col divide-y">
                {Array(10)
                  .fill(1)
                  .map((_, i) => (
                    <Place key={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Scans

const Place = () => {
  return (
    <div className="flex items-center justify-between w-full py-3">
      <h1 className="flex-grow">
        Jammu & Kashmir, Republic of India, Pakistan
      </h1>
      <div className="text-right shrink-0">
        <h3 className="font-medium">156 Scans</h3>
        <p className="text-xs text-gray-500">
          last {moment().subtract(7, 'minutes').fromNow()}
        </p>
      </div>
    </div>
  )
}
