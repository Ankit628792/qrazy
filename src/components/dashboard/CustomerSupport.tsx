import React from 'react'
import SupportCard from './SupportCard'
import { Headphones } from 'lucide-react'

function CustomerSupport() {
    return (
        <SupportCard
            title="Customer Support"
            description="Need help? Our support team is here for you 24/7."
            icon={Headphones}
            buttonText="Contact Support"
        />
    )
}

export default CustomerSupport