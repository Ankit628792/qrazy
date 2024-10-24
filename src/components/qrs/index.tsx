"use client"

import Link from "next/link"

function QRInvoice() {

    return (
        <>

            <div className="flex flex-col gap-4 font-medium text-3xl uppercase">
                <Link href={"/qrs/order"}>
                    <h3>Order QR</h3>
                </Link>
                <Link href={"/qrs/invoices"}>
                    <h3>Order Invoices</h3>
                </Link>
            </div>

        </>
    )
}

export default QRInvoice

