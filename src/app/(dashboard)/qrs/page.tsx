import QRInvoice from '@/components/qrs'
import { generateRandomProducts } from '../products/listing/constant'

function QRs() {
    const products = generateRandomProducts(5)

    // const products: Product[] = [
    //     {
    //         "id": 198,
    //         "title": "Oriental Granite Car",
    //         "description": "The Football Is Good For Training And Recreational Purposes",
    //         "mrp": 16778.7,
    //         "mrl": 6.39,
    //         "links": [
    //             {
    //                 "id": 4940,
    //                 "url": "https://tasty-excess.name"
    //             }
    //         ],
    //         "category": {
    //             "id": 283,
    //             "name": "Automotive",
    //             "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"
    //         },
    //         "image": {
    //             "id": 2834,
    //             "url": "https://picsum.photos/seed/StXTeGod/200/200?blur=10"
    //         },
    //         "images": [
    //             {
    //                 "id": 12,
    //                 "url": "https://loremflickr.com/200/200/product?lock=2656919073995293"
    //             },
    //             {
    //                 "id": 3540,
    //                 "url": "https://loremflickr.com/200/200/product?lock=5760845446494370"
    //             }
    //         ],
    //         "status": "draft",
    //         "created_at": "2024-10-20T16:16:51.410Z",
    //         "updated_at": "2024-10-20T16:16:51.410Z",
    //         "region": "Lake Houstonworth",
    //         "scans": 32846
    //     },
    //     {
    //         "id": 626,
    //         "title": "Licensed Wooden Shirt",
    //         "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    //         "mrp": 14380.69,
    //         "mrl": 8.6,
    //         "links": [
    //             {
    //                 "id": 9740,
    //                 "url": "https://cuddly-godparent.biz"
    //             }
    //         ],
    //         "category": {
    //             "id": 521,
    //             "name": "Home",
    //             "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive"
    //         },
    //         "image": {
    //             "id": 80,
    //             "url": "https://picsum.photos/seed/5hlbM/200/200?grayscale&blur=6"
    //         },
    //         "images": [
    //             {
    //                 "id": 957,
    //                 "url": "https://loremflickr.com/200/200/product?lock=1856102786515828"
    //             },
    //             {
    //                 "id": 288,
    //                 "url": "https://loremflickr.com/200/200/product?lock=816406829544372"
    //             }
    //         ],
    //         "status": "draft",
    //         "created_at": "2024-10-20T16:16:51.410Z",
    //         "updated_at": "2024-10-20T16:16:51.410Z",
    //         "region": "South Milotown",
    //         "scans": 66011
    //     },
    //     {
    //         "id": 678,
    //         "title": "Licensed Bronze Mouse",
    //         "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    //         "mrp": 943.59,
    //         "mrl": 2.99,
    //         "links": [
    //             {
    //                 "id": 891,
    //                 "url": "https://illustrious-collectivization.com"
    //             }
    //         ],
    //         "category": {
    //             "id": 43,
    //             "name": "Clothing",
    //             "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"
    //         },
    //         "image": {
    //             "id": 9254,
    //             "url": "https://picsum.photos/seed/mU54ildNc/200/200?grayscale&blur=2"
    //         },
    //         "images": [
    //             {
    //                 "id": 8799,
    //                 "url": "https://loremflickr.com/200/200/product?lock=8445123466645212"
    //             },
    //             {
    //                 "id": 8059,
    //                 "url": "https://loremflickr.com/200/200/product?lock=3442633367744693"
    //             }
    //         ],
    //         "status": "active",
    //         "created_at": "2024-10-20T16:16:51.410Z",
    //         "updated_at": "2024-10-20T16:16:51.410Z",
    //         "region": "Paucekborough",
    //         "scans": 7624
    //     },
    //     {
    //         "id": 791,
    //         "title": "Gorgeous Cotton Sausages",
    //         "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    //         "mrp": 6812.45,
    //         "mrl": 1.85,
    //         "links": [
    //             {
    //                 "id": 7262,
    //                 "url": "https://powerful-peninsula.biz"
    //             }
    //         ],
    //         "category": {
    //             "id": 195,
    //             "name": "Tools",
    //             "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
    //         },
    //         "image": {
    //             "id": 3944,
    //             "url": "https://picsum.photos/seed/2uKyO95Lo/200/200?grayscale&blur=3"
    //         },
    //         "images": [
    //             {
    //                 "id": 2509,
    //                 "url": "https://loremflickr.com/200/200/product?lock=4554298220188501"
    //             },
    //             {
    //                 "id": 7934,
    //                 "url": "https://loremflickr.com/200/200/product?lock=3962370830984822"
    //             }
    //         ],
    //         "status": "inactive",
    //         "created_at": "2024-10-20T16:16:51.410Z",
    //         "updated_at": "2024-10-20T16:16:51.410Z",
    //         "region": "Owensboro",
    //         "scans": 12770
    //     },
    //     {
    //         "id": 89,
    //         "title": "Gorgeous Rubber Hat",
    //         "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    //         "mrp": 15941.49,
    //         "mrl": 2.65,
    //         "links": [
    //             {
    //                 "id": 9622,
    //                 "url": "https://front-subsidy.name"
    //             }
    //         ],
    //         "category": {
    //             "id": 269,
    //             "name": "Games",
    //             "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"
    //         },
    //         "image": {
    //             "id": 8221,
    //             "url": "https://picsum.photos/seed/UKCB8v3lj/200/200?grayscale&blur=8"
    //         },
    //         "images": [
    //             {
    //                 "id": 1724,
    //                 "url": "https://loremflickr.com/200/200/product?lock=1340876704785907"
    //             },
    //             {
    //                 "id": 5436,
    //                 "url": "https://loremflickr.com/200/200/product?lock=6831223591013819"
    //             }
    //         ],
    //         "status": "inactive",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "Marquardtland",
    //         "scans": 38133
    //     },
    //     {
    //         "id": 445,
    //         "title": "Intelligent Bronze Chicken",
    //         "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    //         "mrp": 16596.15,
    //         "mrl": 6.85,
    //         "links": [
    //             {
    //                 "id": 5886,
    //                 "url": "https://untried-amnesty.biz"
    //             }
    //         ],
    //         "category": {
    //             "id": 834,
    //             "name": "Home",
    //             "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients"
    //         },
    //         "image": {
    //             "id": 5886,
    //             "url": "https://picsum.photos/seed/xwTrGqFOS6/200/200?blur=7"
    //         },
    //         "images": [
    //             {
    //                 "id": 2550,
    //                 "url": "https://loremflickr.com/200/200/product?lock=3022054847524090"
    //             },
    //             {
    //                 "id": 9736,
    //                 "url": "https://loremflickr.com/200/200/product?lock=3724591566167651"
    //             }
    //         ],
    //         "status": "inactive",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "South Elmo",
    //         "scans": 59338
    //     },
    //     {
    //         "id": 804,
    //         "title": "Electronic Metal Ball",
    //         "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    //         "mrp": 17578.95,
    //         "mrl": 1.15,
    //         "links": [
    //             {
    //                 "id": 8898,
    //                 "url": "https://humiliating-pants.biz"
    //             }
    //         ],
    //         "category": {
    //             "id": 917,
    //             "name": "Toys",
    //             "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"
    //         },
    //         "image": {
    //             "id": 7115,
    //             "url": "https://picsum.photos/seed/WWeioBBsAu/200/200?blur=3"
    //         },
    //         "images": [
    //             {
    //                 "id": 9995,
    //                 "url": "https://loremflickr.com/200/200/product?lock=5622097293002294"
    //             },
    //             {
    //                 "id": 1823,
    //                 "url": "https://loremflickr.com/200/200/product?lock=581137595441631"
    //             }
    //         ],
    //         "status": "inactive",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "Ullrichfort",
    //         "scans": 66877
    //     },
    //     {
    //         "id": 241,
    //         "title": "Rustic Bronze Bacon",
    //         "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    //         "mrp": 9047.4,
    //         "mrl": 6.49,
    //         "links": [
    //             {
    //                 "id": 2697,
    //                 "url": "https://grimy-depot.biz"
    //             }
    //         ],
    //         "category": {
    //             "id": 487,
    //             "name": "Movies",
    //             "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"
    //         },
    //         "image": {
    //             "id": 9667,
    //             "url": "https://picsum.photos/seed/96eL6remH/200/200?grayscale"
    //         },
    //         "images": [
    //             {
    //                 "id": 1629,
    //                 "url": "https://loremflickr.com/200/200/product?lock=2670375253745693"
    //             },
    //             {
    //                 "id": 1299,
    //                 "url": "https://loremflickr.com/200/200/product?lock=5705649196790795"
    //             }
    //         ],
    //         "status": "draft",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "Fort Stantonberg",
    //         "scans": 7426
    //     },
    //     {
    //         "id": 544,
    //         "title": "Sleek Rubber Pants",
    //         "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    //         "mrp": 10231.95,
    //         "mrl": 3.6,
    //         "links": [
    //             {
    //                 "id": 3149,
    //                 "url": "https://impossible-spear.info"
    //             }
    //         ],
    //         "category": {
    //             "id": 266,
    //             "name": "Industrial",
    //             "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"
    //         },
    //         "image": {
    //             "id": 6721,
    //             "url": "https://picsum.photos/seed/Zh2t4lh6/200/200?blur=9"
    //         },
    //         "images": [
    //             {
    //                 "id": 8858,
    //                 "url": "https://loremflickr.com/200/200/product?lock=5610006191038473"
    //             },
    //             {
    //                 "id": 2854,
    //                 "url": "https://loremflickr.com/200/200/product?lock=7840050500593366"
    //             }
    //         ],
    //         "status": "active",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "Novaside",
    //         "scans": 45272
    //     },
    //     {
    //         "id": 911,
    //         "title": "Electronic Fresh Fish",
    //         "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    //         "mrp": 7434.15,
    //         "mrl": 8.49,
    //         "links": [
    //             {
    //                 "id": 2208,
    //                 "url": "https://lively-account.net/"
    //             }
    //         ],
    //         "category": {
    //             "id": 406,
    //             "name": "Computers",
    //             "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support"
    //         },
    //         "image": {
    //             "id": 7444,
    //             "url": "https://picsum.photos/seed/UIAL6k/200/200?grayscale&blur=10"
    //         },
    //         "images": [
    //             {
    //                 "id": 3271,
    //                 "url": "https://loremflickr.com/200/200/product?lock=6872617239448273"
    //             },
    //             {
    //                 "id": 5102,
    //                 "url": "https://loremflickr.com/200/200/product?lock=5373230464512890"
    //             }
    //         ],
    //         "status": "active",
    //         "created_at": "2024-10-20T16:16:51.411Z",
    //         "updated_at": "2024-10-20T16:16:51.411Z",
    //         "region": "El Paso",
    //         "scans": 92736
    //     }
    // ]

    return (
        <QRInvoice products={products} />
    )
}

export default QRs