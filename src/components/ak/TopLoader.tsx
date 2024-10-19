import NextTopLoader from 'nextjs-toploader'

export default function TopLoader() {
    return (
        <>
            <NextTopLoader
                color="#10b981"
                initialPosition={0.08}
                height={4}
                crawl={true}
                crawlSpeed={200}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #10b981,0 0 5px #10b981"
                zIndex={999}
            />
        </>
    )
}

// Available Props :
// color: propColor, height: propHeight, showSpinner, crawl, crawlSpeed, initialPosition,
//     easing, speed, shadow, template, zIndex, showAtBottom, showForHashAnchor