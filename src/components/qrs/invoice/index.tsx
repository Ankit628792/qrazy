'use client'
import React, { useState } from 'react'
import {
  Blend,
  BookmarkCheck,
  CircleArrowOutUpRight,
  IndianRupee,
  QrCode,
  ReceiptText,
  SquareActivity
} from 'lucide-react'
import moment from 'moment'
import { getRandomNumber } from '@/lib/index'
import ManageOrderProduct from '../order/ManageOrderProduct'
import { exampleOrderItem, OrderItem } from '../order'
import DigitalQR from '@/assets/digital.png'
import PhysicalQR from '@/assets/physical.png'
import Image from 'next/image'
import Tooltip from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

function Invoice() {
  const [active, setActive] = useState(false)
  const [products, setProducts] = useState(Array(5).fill(exampleOrderItem))

  const handleProductClick = () => {
    setActive(true)
  }

  return (
    <section className="flex flex-col w-full h-full gap-6 relative">
      <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 p-2">
        <div className="p-2 sm:p-2.5 lg:p-3 rounded-full bg-white bg-opacity-50 dark:bg-opacity-10">
          <ReceiptText />
        </div>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Invoice #12345
        </span>
      </div>
      <div className="flex flex-wrap gap-6 justify-between py-5 px-3 sm:px-5 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm rounded-xl">
        <div className="flex items-end gap-2 sm:gap-3 lg:gap-4">
          <div className="p-2 sm:p-2.5 lg:p-3 rounded-full bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm">
            <IndianRupee />
          </div>
          <p>
            <span className="text-5xl xl:text-6xl 2xl:text-7xl font-medium">
              5,876.68
            </span>
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3 sm:gap-4 lg:gap-8 2xl:gap-10">
          <StateCard Icon={Blend} text="UPI" />
          <StateCard
            Icon={BookmarkCheck}
            text={moment().format('DD/MM/YYYY')}
          />
          <StateCard Icon={SquareActivity} text={'Pending'} />
        </div>
      </div>

      <div className="flex-grow w-full rounded-xl flex flex-col-reverse lg:flex-row gap-y-16 gap-x-5 pt-10 pb-5">
        <div className="min-w-96 h-full flex-grow bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm rounded-xl">
          <div className="text-lg font-medium text-center bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm rounded-xl rounded-bl-none py-3 px-5 min-w-28 max-w-max transform -translate-y-2/3 mr-auto">
            <h3>Products</h3>
          </div>
          <Products
            handleProductClick={handleProductClick}
            products={products}
          />
        </div>

        <div className="bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm w-full lg:max-w-sm xl:max-w-md min-w-96 rounded-xl">
          <div className="text-lg font-medium text-center bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm rounded-xl rounded-br-none py-3 px-5 min-w-28 max-w-max transform -translate-y-2/3 ml-auto">
            <h3>Billing</h3>
          </div>
          <div className="px-5 pb-3 -mt-3 flex gap-4">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Download QRs
            </Button>
            <Button>Order Again</Button>
          </div>
          <Billing />
        </div>
      </div>
      {active ? (
        <ManageOrderProduct
          viewOnly={true}
          title="#PR202476"
          description="Product Name - Followed by category"
          products={[]}
          onClose={() => setActive(false)}
        />
      ) : (
        <></>
      )}
    </section>
  )
}

export default Invoice

const Products = ({
  handleProductClick,
  products
}: {
  handleProductClick: (product: OrderItem) => void
  products: OrderItem[]
}) => {
  return (
    <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 -mt-3">
      {products.map((product, i) => (
        <Product
          key={i}
          handleProductClick={() => handleProductClick(product)}
          product={product}
        />
      ))}
    </div>
  )
}

const Product = ({
  product,
  handleProductClick
}: {
  handleProductClick: (product: any) => void
  product: OrderItem
}) => {
  return (
    <div className="w-full relative bg-white dark:bg-black rounded-lg overflow-hidden p-3 flex flex-col gap-2 sm:gap-3 group cursor-pointer">
      <div className="bg-emerald-500 rounded-bl-3xl w-12 h-12 grid place-items-center absolute -top-12 -right-12 group-hover:top-0 group-hover:right-0 transition-all duration-150 ease-out">
        <CircleArrowOutUpRight className="text-white w-5" />
      </div>
      <div className="flex items-center gap-3">
        <img
          src={product.image.url}
          className="w-12 h-12 xl:w-14 xl:h-14 rounded-lg"
          alt=""
        />
        <div>
          <h1 className="text-base xl:text-lg font-medium">{product.title}</h1>
          <p className="text-gray-500 text-xs xl:text-sm">
            {product.category.name}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end gap-3">
        <div>
          <span className="text-xs xl:text-sm text-gray-500 line-clamp-1">
            Expires {moment('2024-10-26T10:16:20.804Z').fromNow()}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm xl:text-base font-medium">
            {product.quantity}
          </span>
          {product.digital ? (
            <Tooltip title="Digital QR">
              <Image
                className="rounded-sm"
                src={DigitalQR.src}
                blurDataURL={DigitalQR.blurDataURL}
                width={28}
                height={28}
                alt="Digital QR"
              />
            </Tooltip>
          ) : (
            <></>
          )}
          {product.physical ? (
            <Tooltip title="Physical QR">
              <Image
                className="rounded-sm"
                src={PhysicalQR.src}
                blurDataURL={PhysicalQR.blurDataURL}
                width={28}
                height={28}
                alt="Physical QR"
              />
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

const Billing = () => {
  const total = getRandomNumber(1000, 10000)

  return (
    <table className="table-auto border-separate border-spacing-y-2 border-spacing-x-5 w-full">
      <tbody>
        <tr>
          <td className="min-w-32 border-b border-dashed pb-3">Total QRs:</td>
          <td className="w-full border-b border-dashed pb-3 text-right flex gap-2 items-center justify-end">
            <QrCode className="w-4" /> <span>775675</span>
          </td>
        </tr>
        <tr>
          <td className="min-w-32">Order ID:</td>
          <td className="w-full text-right">OR897897JHG</td>
        </tr>
        <tr>
          <td className="min-w-32">Transaction ID:</td>
          <td className="w-full text-right">TRN6567567HNS</td>
        </tr>
        <tr>
          <td className="min-w-32">Payment Status:</td>
          <td className="w-full text-right">Received</td>
        </tr>
        <tr>
          <td className="min-w-32 border-b border-dashed pb-3">Received On:</td>
          <td className="w-full border-b border-dashed pb-3 text-right">
            {moment().format('HH:mm, DD/MM/YYYY')}
          </td>
        </tr>
        <tr>
          <td className="min-w-32">Subtotal:</td>
          <td className="w-full text-right">+ ₹ {total.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="min-w-32">Discount (5%):</td>
          <td className="w-full text-right">- ₹ {(total * 0.05).toFixed(2)}</td>
        </tr>
        <tr>
          <td className="min-w-32">Tax (8%):</td>
          <td className="w-full text-right">+ ₹ {(total * 0.08).toFixed(2)}</td>
        </tr>
        <tr className="">
          <td className="border-t border-dashed pt-3">Total:</td>
          <td className="w-full pt-3 text-right border-t border-dashed">
            ₹ {(total - total * 0.05 + total * 0.08).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const StateCard = ({
  Icon,
  text
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}) => {
  return (
    <div className="flex items-center gap-2 min-w-40">
      <div className="p-2 sm:p-2.5 rounded-full bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm">
        <Icon />
      </div>
      <span className="text-base sm:text-lg font-medium">{text}</span>
    </div>
  )
}
