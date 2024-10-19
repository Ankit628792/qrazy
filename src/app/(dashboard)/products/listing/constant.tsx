
import { faker } from '@faker-js/faker';

export const filterOptions = [
    {
        id: 1,
        label: "All",
        value: "all",
        checked: true,
    },
    {
        id: 2,
        label: "Active",
        value: "active",
        checked: false,
    },
    {
        id: 3,
        label: "Inactive",
        value: "inactive",
        checked: false,
    },
    {
        id: 4,
        label: "Draft",
        value: "draft",
        checked: false,
    }

]


const status = ['active', 'inactive', 'draft']


// Function to generate a random category
function generateRandomCategory(): Category {
    return {
        id: faker.number.int({ min: 1, max: 1000 }), // Random category ID
        name: faker.commerce.department(), // Random category name
        description: faker.commerce.productDescription(), // Random category description
    };
}

// Function to generate a random region
function generateRandomRegion(): string {
    return faker.location.city(); // Generate a random city name as a region
}

export function generateRandomProducts(count: number): Product[] {
    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
        const randomCategory = generateRandomCategory(); // Generate a random category
        const randomRegion = generateRandomRegion(); // Generate a random region
        const currentDate = new Date();

        const product: Product = {
            id: faker.number.int({ min: 1, max: 1000 }), // Random product ID
            title: faker.commerce.productName(), // Random product title
            description: faker.commerce.productDescription(), // Random product description
            mrp: parseFloat(faker.commerce.price({ min: 100, max: 20000 })), // Random MRP
            mrl: parseFloat(faker.commerce.price({ min: 1, max: 10 })), // Random MRL
            links: [
                {
                    id: faker.number.int({ min: 1, max: 10000 }), // Random link ID
                    url: faker.internet.url(), // Random URL
                },
            ],
            category: randomCategory, // Use the dynamically generated category
            image: {
                id: faker.number.int({ min: 1, max: 10000 }), // Random image ID
                url: faker.image.urlPicsumPhotos({ width: 200, height: 200, }), // Random image URL
            },
            images: [
                {
                    id: faker.number.int({ min: 1, max: 10000 }), // Random image ID
                    url: faker.image.urlLoremFlickr({ width: 200, height: 200, category: "product" }), // Random image URL
                },
                {
                    id: faker.number.int({ min: 1, max: 10000 }), // Random image ID
                    url: faker.image.urlLoremFlickr({ width: 200, height: 200, category: "product" }), // Random image URL
                },
            ],
            status: status[faker.number.int({ min: 0, max: 2 })] as 'active' | 'inactive' | 'draft',
            created_at: currentDate,
            updated_at: currentDate,
            region: randomRegion, // Use the dynamically generated region
            scans: faker.number.int({ min: 0, max: 100000 }), // Random scans
        };

        products.push(product);
    }

    return products;
}

// Usage
const randomProducts = generateRandomProducts(5); // Generate 5 random products

export const productHeaders = [
    {
        accessor: 'image.url',
        title: 'Image',
        type: 'image'
    },
    {
        accessor: 'title',
        title: 'Title',
    },
    {
        accessor: 'status',
        title: 'Status',
    },
    {
        accessor: 'region',
        title: 'Region',
    },
    {
        accessor: 'scans',
        title: 'Scans',
    },
    {
        accessor: 'created_at',
        title: 'Created At',
    },
    {
        accessor: 'updated_at',
        title: 'Updated At',
    },
]
