
import Link from 'next/link'
import React from 'react'

const routes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
]

function Page() {
  return (
    <div className='pt-20'>
      {
        routes.map((route, index) => (
          <Link href={route} key={index}>
            <span className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
              {route.replace("/", "").toUpperCase()}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Page